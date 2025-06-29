import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FloatLabel, FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { JobApplicationActions } from '../../state/job-application-actions';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CreateApplication as CreateApplication, Status } from '../../state/state';
import { JobApplicationFormComponent } from "../job-application-form/job-application-form.component";

@Component({
  selector: 'app-create-job-application',
  imports: [InputTextModule, ReactiveFormsModule, ButtonModule, JobApplicationFormComponent, FloatLabelModule],
  templateUrl: './create-job-application.component.html',
  styleUrl: './create-job-application.component.scss',
  standalone: true
})
export class CreateJobApplicationComponent {
  private _store = inject(Store);
  createAppForm = new FormGroup({
    companyName: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    position: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    status: new FormControl<Status | null>(null, [Validators.required]),
    notes: new FormControl<string>('', [Validators.maxLength(150)]),
    isRemote: new FormControl<boolean>(false, [Validators.required]),
  });


  onSubmit() {
    const raw = this.createAppForm.value;

    const createApp: CreateApplication = {
      companyName: raw.companyName!,
      position: raw.position!,
      status: raw.status!,
      notes: raw.notes || '',
      isRemote: raw.isRemote!,
    };
    if (this.createAppForm.valid)
      this._store.dispatch(JobApplicationActions.createApplication({ createApp }));
  }
}
