import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { Status } from '../../state/state';
import { CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-job-application-form',
  imports: [FloatLabelModule, ReactiveFormsModule, DropdownModule, CheckboxModule, TextareaModule, DropdownModule, InputTextModule],
  templateUrl: './job-application-form.component.html',
  styleUrl: './job-application-form.component.scss'
})
export class JobApplicationFormComponent {
  @Input() form!: FormGroup;

  statusOptions = [
    { label: 'Applied', value: Status.Applied },
    { label: 'Interviewing', value: Status.Interviewing },
    { label: 'Rejected', value: Status.Rejected },
    { label: 'Offer Received', value: Status.OfferReceived },
    { label: 'Accepted', value: Status.Accepted }
  ];
}
