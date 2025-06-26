import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-job-applications-list',
  imports: [TableModule],
  templateUrl: './job-applications-list.component.html',
  styleUrl: './job-applications-list.component.scss',
})
export class JobApplicationsListComponent {

}
