import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ObservationService } from '../../services/observation.service';
import { Observation, Property } from '../../../model';

@Component({
  selector: 'app-detailed-view',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './detailed-view.component.html',
})
export class DetailedViewComponent  {
  // form!: FormGroup;
  // selectedIndex = 0;
  // observations: Observation[] = [];

  // private fb = inject(FormBuilder);
  // private obsService = inject(ObservationService);

  // ngOnInit(): void {
  //   this.obsService.getObservations().subscribe((data) => {
  //     this.observations = data;
  //     this.buildForm();
  //   });
  // }

  // get selectedProperties(): Property[] {
  //   return this.observations[this.selectedIndex]?.Datas[0]?.Properties || [];
  // }

  // buildForm(): void {
  //   const group: any = {};
  //   for (let prop of this.selectedProperties) {
  //     const name = this.formatLabel(prop.Label);
  //     group[name] = [prop.Value];
  //   }
  //   this.form = this.fb.group(group);
  // }

  // select(index: number): void {
  //   this.selectedIndex = index;
  //   this.buildForm();
  // }

  // save(): void {
  //   const updatedProps = this.selectedProperties.map((p) => ({
  //     ...p,
  //     Value: this.form.get(this.formatLabel(p.Label))?.value,
  //   }));

  //   const obs = this.observations[this.selectedIndex];
  //   obs.Datas[0].Properties = updatedProps;

  //   this.obsService.updateObservation(obs).subscribe(() => {
  //     alert('Saved!');
  //   });
  // }

  // formatLabel(label: string): string {
  //   return label.toLowerCase().replace(/\s+/g, '_');
  // }
}
