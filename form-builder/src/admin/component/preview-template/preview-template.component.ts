import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { types } from 'src/admin/dailogs/enums/types';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldDetailComponent } from 'src/admin/dailogs/field-detail/field-detail.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    FormsModule, CdkDropList, CdkDrag, CommonModule, CdkDropListGroup, DragDropModule, MatDialogModule]
})
export class PreviewTemplateComponent {
  formItems: any[] = [];
  types = types;
  constructor(public dialog: MatDialog) {
    

  }
  drop(event:any) {
    // console.log("Drooped inside box", event.item.data);
    // this.droppedItems.push('New Item');
    let dialogRef = this.dialog.open(FieldDetailComponent, {
      data: {
        type: event.item.data
      }
    })
    dialogRef.afterClosed().subscribe((fieldData: any) => {
      this.formItems.push(fieldData);
      console.log(fieldData);
    })
  }
}
