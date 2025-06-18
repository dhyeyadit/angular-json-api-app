namespace api.Models
{
    public class Observation
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DataItem> Datas { get; set; }
    }
}
