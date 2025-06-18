import { Component, input, output, signal, computed } from '@angular/core';
import { Observation } from '../../../model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-summary-view',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './summary-view.component.html',
  styleUrl: './summary-view.component.css',
})
export class SummaryViewComponent {
  observations = input<Observation[]>([]);
  selectObservation = output<Observation>();

  summaryData = computed(() => {
    const data = [];

    for (const obs of this.observations()) {
      for (const entry of obs.datas) {
        const row: any = {
          samplingTime: entry.samplingTime,
          observation: obs
        };

        for (const prop of entry.properties) {
          const label = prop.label.toLowerCase();
          if (label.includes('project')) row.projectName = prop.value;
          if (label.includes('count')) row.constructionCount = prop.value;
          if (label.includes('completed')) row.isConstructionCompleted = prop.value;
          if (label.includes('length')) row.lengthOfRoad = prop.value;
        }

        data.push(row);
      }
    }

    return data;
  });
}
