import { Component, signal, OnInit, inject } from '@angular/core';
import { Observation } from '../model';
import { SummaryViewComponent } from './components/summary-view/summary-view.component';
import { DetailedViewComponent } from './components/detailed-view/detailed-view.component';
import { ObservationService } from './services/observation.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SummaryViewComponent, DetailedViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Task';
  selectedTab = signal<'summary' | 'detailed'>('summary');
  observations = signal<Observation[]>([]);
  selectedObservation = signal<Observation | null>(null);

  private obsService = inject(ObservationService);

  ngOnInit() {
    this.obsService.getObservations().subscribe({
      next: (data) => {
        this.observations.set(data);
        this.selectedObservation.set(data[0] || null);
      },
      error: (err) => console.error('Failed to fetch observations:', err)
    });
  }

  selectObservation(observation: Observation) {
    this.selectedObservation.set(observation);
    this.selectedTab.set('detailed');
  }
}
