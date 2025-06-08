import { Component, Inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basic-details',
  templateUrl: './basic-details.component.html',
  styleUrls: ['./basic-details.component.css'],
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatDialogModule, MatInputModule, MatButtonModule]
})
export class BasicDetailsComponent {
  templateName: string = '';
  isDisabled:boolean =  true;
  constructor(public dialogRef: MatDialogRef<BasicDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  onTemplateNameSubmit() {
    let data = {
      templateName: this.templateName,
      isCanceled: false
    }
    this.dialogRef.close(data);
  }

  close() {
    let data = {
      templateName: this.templateName,
      isCanceled: true
    }
    this.dialogRef.close(data);
  }

  onChange(e: any) {
    this.isDisabled = e === '' ? true : false;
  }
}
