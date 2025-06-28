import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { JobApplicationActions } from '../../state/job-application-actions';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { selectedApplication } from '../../state/job-application-selectors';
import { DatePipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-job-application-detail',
  imports: [DatePipe, ButtonModule],
  templateUrl: './job-application-detail.component.html',
  styleUrl: './job-application-detail.component.scss',
})
export class JobApplicationDetailComponent implements OnInit {
  private _store = inject(Store);
  editMode = signal(false);
  constructor(private _route: ActivatedRoute) { }

  job$ = this._store.selectSignal(selectedApplication);

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
}
