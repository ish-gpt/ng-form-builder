import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { types } from '../enums/types';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-field-detail',
  templateUrl: './field-detail.component.html',
  styleUrls: ['./field-detail.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, FormsModule,
    CommonModule, MatCheckboxModule, MatChipsModule]
})

export class FieldDetailComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  fieldType: string = '';
  fieldName: string = '';
  helpText: string = '';
  required: boolean = true;
  minLength: number = 1;
  maxLength: number = 1;
  pattern: string = '';
  types = types;
  options: any[] = [];


  constructor(public dialogRef: MatDialogRef<FieldDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    if (this.data.isEditMode) {
      this.fieldName = this.data.data.fieldName;
      this.helpText = this.data.data.helpText;
      this.required = this.data.data.required;
      this.minLength = this.data.data.min;
      this.maxLength = this.data.data.max;
      this.pattern = this.data.data.pattern;
    }
    // console.log(data);
    // console.log(this.data);
    }

  ngOnInit(): void {
    this.fieldType = this.data.type;
  }

  onNoClick() {
    this.dialogRef.close(null)
  }

  isPatternValid(pattern: string): boolean {
    try {
      new RegExp(pattern);
      return true;
    } catch (e) {
      return false;
    }
  }

  onFieldSubmit() {
    if (this.fieldName === '') {
      alert('Field name cannot be empty')
      return;
    }
    if (this.isPatternValid(this.pattern) && this.pattern != '') {
      alert('Patter is not valid');
      return;
    }
    let fieldDetails = {
      fieldName: this.fieldName,
      fieldType: this.data.type,
      min: this.minLength,
      max: this.maxLength,
      required: this.required,
      helpText: this.helpText,
      pattern: this.pattern,
      chips: this.options
    }
    this.dialogRef.close(fieldDetails);
  }

  remove(fruit: string): void {
    const index = this.options.indexOf(fruit);
    if (index >= 0) {
      this.options.splice(index, 1);
    }
  }

  add(event: any): void {
    const value = (event.value || '').trim();
    if (value) {
      this.options.push(value);
    }
    event.chipInput!.clear();
  }
}


