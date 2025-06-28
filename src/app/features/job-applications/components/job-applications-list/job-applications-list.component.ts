import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { JobApplicationActions } from '../../state/job-application-actions';
import { allApplications } from '../../state/job-application-selectors';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-applications-list',
  imports: [TableModule, DatePipe],
  templateUrl: './job-applications-list.component.html',
  styleUrl: './job-applications-list.component.scss',
})
export class JobApplicationsListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  applications$ = this.store.selectSignal(allApplications);

  ngOnInit(): void {
    this.store.dispatch(JobApplicationActions.loadApplications());
  }

  onRowSelect(id: string) {
    this.router.navigate(['/applications', id]);
  }
}
