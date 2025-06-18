using api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObservationController : ControllerBase
    {
        private readonly string _jsonFilePath;

        public ObservationController(IWebHostEnvironment env)
        {
            _jsonFilePath = Path.Combine(env.ContentRootPath, "Data", "data.json");
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                if (!System.IO.File.Exists(_jsonFilePath))
                {
                    return NotFound("Data file not found.");
                }

                var json = System.IO.File.ReadAllText(_jsonFilePath);
                var observation = JsonSerializer.Deserialize<Observation>(json);
                return Ok(observation);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error reading data: {ex.Message}");
            }
        }

        [HttpPost]
    public IActionResult Create([FromBody] Observation newObservation)
    {
        try
        {
            if (newObservation == null || newObservation.Datas == null)
                return BadRequest("Invalid observation data.");

            List<Observation> observations;
            if (System.IO.File.Exists(_jsonFilePath))
            {
                var existingJson = System.IO.File.ReadAllText(_jsonFilePath);
                observations = JsonSerializer.Deserialize<List<Observation>>(existingJson) ?? new List<Observation>();
            }
            else
            {
                observations = new List<Observation>();
            }

            newObservation.Id = observations.Count > 0 ? observations.Max(o => o.Id) + 1 : 1;
            observations.Add(newObservation);

            var json = JsonSerializer.Serialize(observations, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_jsonFilePath, json);

            return CreatedAtAction(nameof(Get), new { id = newObservation.Id }, newObservation);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error creating data: {ex.Message}");
        }
    }

    [HttpPut]
    public IActionResult Update([FromBody] Observation updatedObservation)
    {
        try
        {
            if (updatedObservation == null || updatedObservation.Datas == null)
                return BadRequest("Invalid observation data.");

            if (!System.IO.File.Exists(_jsonFilePath))
                return NotFound("No observations found to update.");

            var existingJson = System.IO.File.ReadAllText(_jsonFilePath);
            var observations = JsonSerializer.Deserialize<List<Observation>>(existingJson);

            if (observations == null || observations.Count == 0)
                return NotFound("No observations found to update.");

            var index = observations.FindIndex(o => o.Id == updatedObservation.Id);
            if (index == -1)
                return NotFound($"Observation with ID {updatedObservation.Id} not found.");

            observations[index] = updatedObservation;

            var json = JsonSerializer.Serialize(observations, new JsonSerializerOptions { WriteIndented = true });
            System.IO.File.WriteAllText(_jsonFilePath, json);

            return Ok(updatedObservation);
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Error updating data: {ex.Message}");
        }
    }
    }
}
