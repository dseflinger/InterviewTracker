import { Component, computed, inject, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobApplicationActions } from '../../state/job-application-actions';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { selectedApplication } from '../../state/job-application-selectors';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JobApplicationFormComponent } from "../job-application-form/job-application-form.component";
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Status } from '../../state/state';
import { effect } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-job-application-detail',
  imports: [DatePipe, ButtonModule, JobApplicationFormComponent],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.scss',
})
export class JobApplicationDetailComponent implements OnInit {
  private _store = inject(Store);
  private _actions = inject(Actions);
  private _router = inject(Router);

  editMode = signal(false);
  constructor(private _route: ActivatedRoute) { }

  job = this._store.selectSignal(selectedApplication);
  jobId: Signal<string | undefined> = computed(() => this.job()?.id);
  updateForm = new FormGroup({
    companyName: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    position: new FormControl<string>('', [Validators.required, Validators.maxLength(30)]),
    status: new FormControl<Status | null>(null, [Validators.required]),
    notes: new FormControl<string>('', [Validators.maxLength(150)]),
    isRemote: new FormControl<boolean>(false, [Validators.required]),
  });

  ngOnInit(): void {
    this._route.paramMap.pipe(take(1)).subscribe(params => {
      const id = params.get('id');
      if (id) {
        this._store.dispatch(JobApplicationActions.loadApplication({ id }));
      }
    });

    this._actions.pipe(
      ofType(JobApplicationActions.deleteApplicationSuccess),
      take(1)
    )
      .subscribe(() => this._router.navigate(['/applications']));
  }

  onDelete() {
    var id = this.jobId();
    if (!id) return;
    this._store.dispatch(JobApplicationActions.deleteApplication({ id }))
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
