import { Component, EventEmitter, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-are-you-sure-dialog',
  imports: [DialogModule, ButtonModule],
  templateUrl: './are-you-sure-dialog.component.html',
  styleUrl: './are-you-sure-dialog.component.scss'
})
export class AreYouSureDialogComponent {
  visible = false;
  @Output() confirmed = new EventEmitter<void>();

  onCancel() {
    this.visible = false;
  }

  onYes() {
    this.confirmed.emit();
    this.visible = false;
  }
}
