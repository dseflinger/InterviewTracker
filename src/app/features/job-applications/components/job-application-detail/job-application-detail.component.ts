import { Component, computed, inject, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobApplicationActions } from '../../state/job-application-actions';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { selectedApplication } from '../../state/job-application-selectors';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { JobApplicationFormComponent } from "../job-application-form/job-application-form.component";
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Status, UpdateApplication } from '../../state/state';
import { effect } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-job-application-detail',
  imports: [DatePipe, ButtonModule, JobApplicationFormComponent, InputTextModule, ReactiveFormsModule, FloatLabelModule],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.scss',
})
export class JobApplicationDetailComponent implements OnInit, OnDestroy {
  private _store = inject(Store);
  private _actions = inject(Actions);
  private _router = inject(Router);
  private _subscriptions: Subscription[] = [];

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

    var updateSuccessSubscription = this._actions.pipe(
      ofType(JobApplicationActions.updateApplicationSuccess),
    )
      .subscribe(() => this.editMode.set(false));
    this._subscriptions.push(updateSuccessSubscription);
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
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
    if (this.updateForm.invalid) return;

    const updateApp = this.updateForm.value as UpdateApplication;
    var id = this.jobId();
    if (!id) return;

    this._store.dispatch(JobApplicationActions.updateApplication({ id, updateApp }))
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
