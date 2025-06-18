import { Component, Input, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observation, Property } from '../../../model';
import { ObservationService } from '../../services/observation.service';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './detailed-view.component.html',
})
export class DetailedViewComponent implements OnInit, OnChanges {
  @Input() observation: Observation | null = null;

  form!: FormGroup;
  selectedIndex = 0;

  private fb = inject(FormBuilder);
  private observationService = inject(ObservationService);

  ngOnInit(): void {
    if (this.observation) {
      this.buildForm();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['observation'] && this.observation) {
      this.selectedIndex = 0;
      this.buildForm();
    }
  }

  buildForm(): void {
    const properties = this.observation?.datas?.[this.selectedIndex]?.properties || [];
    const projectName = properties.find(p => p.label.toLowerCase() === 'project name')?.value ?? 'Road Construction';
    const constructionCount = properties.find(p => p.label.toLowerCase() === 'construction count')?.value ?? 2;
    const isConstructionCompleted = properties.find(p => p.label.toLowerCase() === 'is construction completed')?.value ?? false;
    const lengthOfTheRoad = properties.find(p => p.label.toLowerCase() === 'length of the road')?.value ?? 5.6;

    this.form = this.fb.group({
      project_name: [projectName],
      construction_count: [constructionCount],
      is_construction_completed: [isConstructionCompleted],
      length_of_the_road: [lengthOfTheRoad]
    });
  }

  select(index: number): void {
    this.selectedIndex = index;
    this.buildForm();
  }

  save(): void {
    const updatedProps: Property[] = [
      { label: 'Project Name', value: this.form.get('project_name')?.value },
      { label: 'Construction Count', value: this.form.get('construction_count')?.value },
      { label: 'Is Construction Completed', value: this.form.get('is_construction_completed')?.value },
      { label: 'Length of the road', value: this.form.get('length_of_the_road')?.value }
    ];

    if (this.observation) {
      this.observation.datas[this.selectedIndex].properties = updatedProps;
      this.observationService.updateObservation(this.observation).subscribe({
        next: () => alert('Saved!'),
        error: (err) => {
          console.error('Error updating:', err);
          alert('Failed to save.');
        }
      });
    }
  }
}