import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-form-field-options',
  standalone:true,
  templateUrl: './form-field-options.component.html',
  styleUrls: ['./form-field-options.component.css'],
  imports: [CdkDropList, CdkDrag, CommonModule, CdkDropListGroup, DragDropModule]
})
export class FormFieldOptionsComponent {
  formFields = ['Text Input', 'Dropdown Select', 'Checkbox', 'Date Picker','Radio button', 'Textarea']
  drop(event:any) {
    
  }
}
