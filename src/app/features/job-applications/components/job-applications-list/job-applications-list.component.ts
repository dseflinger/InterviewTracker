import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TableModule } from 'primeng/table';
import { JobApplicationActions } from '../../state/job-application-actions';
import { selectSortedItems } from '../../state/job-application-selectors';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Status, StatusLabels } from '../../state/state';

@Component({
  selector: 'app-job-applications-list',
  imports: [TableModule, DatePipe, CommonModule],
  templateUrl: './job-applications-list.component.html',
  styleUrl: './job-applications-list.component.scss',
})
export class JobApplicationsListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);

  statusLabels = StatusLabels;
  applications = this.store.selectSignal(selectSortedItems);

  ngOnInit(): void {
    this.store.dispatch(JobApplicationActions.loadApplications());
  }

  onRowSelect(id: string) {
    this.router.navigate(['/applications', id]);
  }

  getStatusLabel(status: Status): string {
    return this.statusLabels[status];
  }
}
