import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FloatLabel } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { JobApplicationActions } from '../../state/job-application-actions';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CreateAppication as CreateApplication, Status } from '../../state/state';

@Component({
  selector: 'app-create-job-application',
  imports: [InputTextModule, FloatLabel, DropdownModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './create-job-application.component.html',
  styleUrl: './create-job-application.component.scss',
  standalone: true
})
export class CreateJobApplicationComponent {
  private _store = inject(Store);
  createAppForm = new FormGroup({
    companyName: new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
    position: new FormControl<string>('', [Validators.required, Validators.maxLength(20)]),
    status: new FormControl<Status>(Status.Applied, [Validators.required]),
    notes: new FormControl<string>('', [Validators.maxLength(150)]),
    isRemote: new FormControl<boolean>(false, [Validators.required]),
  });

  statusOptions = [
    { label: 'Applied', value: Status.Applied },
    { label: 'Interviewing', value: Status.Interviewing },
    { label: 'Rejected', value: Status.Rejected },
    { label: 'Offer Received', value: Status.OfferReceived },
    { label: 'Accepted', value: Status.Accepted }
  ];

  remoteOptions = [
    { label: 'Yes', value: true },
    { label: 'No', value: false }
  ];


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
