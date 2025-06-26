import { Routes } from '@angular/router';
import { JobApplicationsListComponent } from './features/job-applications/components/job-applications-list/job-applications-list.component';
import { CreateJobApplicationComponent } from './features/job-applications/components/create-job-application/create-job-application.component';
import { JobApplicationDetailComponent } from './features/job-applications/components/job-application-detail/job-application-detail.component';

export const routes: Routes = [
    { path: 'applications', component: JobApplicationsListComponent },
    { path: 'applications/create', component: CreateJobApplicationComponent },
    { path: 'applications/:id', component: JobApplicationDetailComponent },
    { path: '', redirectTo: '/applications', pathMatch: 'full' },
];
