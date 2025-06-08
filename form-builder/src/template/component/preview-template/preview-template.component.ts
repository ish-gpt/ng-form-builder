import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { types } from 'src/template/dailogs/enums/types';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
  CdkDropListGroup
} from '@angular/cdk/drag-drop';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldDetailComponent } from 'src/template/dailogs/field-detail/field-detail.component';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-preview-template',
  templateUrl: './preview-template.component.html',
  styleUrls: ['./preview-template.component.css'],
  standalone: true,
  imports: [MatButtonModule, MatSelectModule, MatInputModule, MatFormFieldModule,
    FormsModule, CdkDropList, CdkDrag, CommonModule, CdkDropListGroup, DragDropModule, MatDialogModule, MatCheckboxModule, MatRadioModule]
})
export class PreviewTemplateComponent implements OnChanges {
  @Input() templateName!: string;
  @Input() editTemplateData!: string;
  @Input() currentEditingTemplateId!: string;
  @Output('templateData') templateData = new EventEmitter<any>();
  @Output('discardTemplate') discardTemplate = new EventEmitter<any>()
  formItems: any[] = [];
  types = types;
  editingTemplateId!: string;
  isTemplateEmpty: boolean = true;
  constructor(public dialog: MatDialog) {


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.formItems = changes['editTemplateData'].currentValue?.templateItem ? changes['editTemplateData'].currentValue?.templateItem : [];
    this.templateName = changes['editTemplateData'].currentValue?.templateName ? changes['editTemplateData'].currentValue?.templateName : changes['templateName'].currentValue;
    this.editingTemplateId = changes['currentEditingTemplateId'].currentValue ? changes['currentEditingTemplateId'].currentValue : undefined;
  }

  drop(event: any) {
    let dialogRef = this.dialog.open(FieldDetailComponent, {
      data: {
        type: event.item.data
      }
    })
    dialogRef.afterClosed().subscribe((fieldData: any) => {
      if (fieldData) {
        this.formItems.push(fieldData);
        this.isTemplateEmpty = false;
      }
    })
  }

  discard() {
    let continueDiscard = confirm('Are you sure you want to discard');
    if (!continueDiscard) return;
    this.formItems = [];
    this.isTemplateEmpty = true;
    this.discardTemplate.emit();
  }



  onTemplateSubmit() {
    let templateMetaData = {
      templateItem: this.formItems,
      templateName: this.templateName,
      templateId: this.editingTemplateId
    }
    this.templateData.emit(templateMetaData);
  }

  editField(indx: number) {
    this.isTemplateEmpty = false;
    let dialogRef = this.dialog.open(FieldDetailComponent, {
      data: {
        data: this.formItems[indx],
        type: this.formItems[indx].fieldType,
        isEditMode: true
      }
    })
    dialogRef.afterClosed().subscribe((fieldData: any) => {
      if (fieldData) {
        this.formItems[indx] = fieldData;

      }
    })
  }
}
