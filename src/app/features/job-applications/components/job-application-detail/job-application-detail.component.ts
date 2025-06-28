import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobApplicationActions } from '../../state/job-application-actions';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { selectedApplication } from '../../state/job-application-selectors';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JobApplicationFormComponent } from "../job-application-form/job-application-form.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from '../../state/state';
import { effect } from '@angular/core';

@Component({
  selector: 'app-job-application-detail',
  imports: [DatePipe, ButtonModule, JobApplicationFormComponent],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.scss',
})
export class JobApplicationDetailComponent implements OnInit {
  private _store = inject(Store);
  editMode = signal(false);
  constructor(private _route: ActivatedRoute) { }

  job = this._store.selectSignal(selectedApplication);
  updateForm = new FormGroup({
    companyName: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    position: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    status: new FormControl<Status | null>(null, [Validators.required]),
    notes: new FormControl<string>('', [Validators.maxLength(150)]),
    isRemote: new FormControl<boolean>(false, [Validators.required]),
  });

  ngOnInit(): void {
    // this._store.dispatch(JobApplicationActions.loadApplication());
    this._route.paramMap.pipe(take(1)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._store.dispatch(JobApplicationActions.loadApplication({ id }));
      }
    });
  }

  onDelete() {
    throw new Error('Method not implemented.');
  }

  onEdit() {
    this.editMode.set(!this.editMode());
  }

  onUpdate() {
    throw new Error('Method not implemented.');
  }

  patchEffect = effect(() => {
    const job = this.job();

    if (job) {
      this.updateForm.patchValue({
        companyName: job.companyName,
        position: job.position,
        status: job.status,
        notes: job.notes,
        isRemote: job.isRemote
      });
    }
  });
}
