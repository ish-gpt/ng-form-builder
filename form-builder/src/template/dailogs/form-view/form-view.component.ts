import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { types } from '../enums/types';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { debounceTime, flatMap } from 'rxjs';
import { ApiService } from 'src/template/service/api.service';
import { LoaderService } from 'src/template/service/loader.service';

@Component({
  selector: 'app-form-view',
  templateUrl: './form-view.component.html',
  styleUrls: ['./form-view.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatChipsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatRadioModule,

  ],
})
export class FormViewComponent implements OnInit {
  types = types;
  loading = false;
  type = ['Dropdown Select', 'Checkbox', 'Date Picker', 'Radio button'];
  dynamicFormGroup!: FormGroup;
  errors: string[] = [];
  templateName!: string;
  successFullSubmission = false;
  errorSubmission = false;
  timeInSec = 5;
  isFormView = true;
  dataSubmitted!: any;
  constructor(
    public dialogRef: MatDialogRef<FormViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService,
    private loaderService: LoaderService
  ) {
    this.dialogRef.afterOpened().subscribe((data) => {
      this.templateName = this.data.templateName;
    });
  }

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    let formControls = this.createFormControls();
    this.dynamicFormGroup = new FormGroup(formControls);
    this.dynamicFormGroup.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        // console.log(value)
        this.errors = [];
        Object.keys(this.dynamicFormGroup.controls).forEach((control) => {
          // console.log(this.dynamicFormGroup.controls[control]);
          if (this.dynamicFormGroup.controls[control].errors && this.dynamicFormGroup.controls[control].touched) {
            let error = `${control} is Required or Wrong`;
            this.errors.push(error);
          }
        });
      });
  }

  createFormControls() {
    let controls: any;
    this.data.templateItem.forEach((data: any) => {
      if (data.fieldType === types.checkbox) {
        let ctrl = this.createSubFormControls(data);
        controls = { ...controls, [data.fieldName]: new FormGroup(ctrl) };
      } else {
        let validators = this.getValidators(data);
        controls = {
          ...controls,
          [data.fieldName]: new FormControl(null, validators),
        };
      }
    });
    return controls;
  }

  //pass - /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  //email - /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  getValidators(data: any) {
    let validators = [];
    if (data.required) validators.push(Validators.required);
    if (data.min && !this.type.includes(data.fieldType))
      validators.push(Validators.minLength(data.min));
    if (data.max && !this.type.includes(data.fieldType))
      validators.push(Validators.maxLength(data.max));
    if (data.pattern) validators.push(Validators.pattern(data.pattern));
    return validators;
  }

  createSubFormControls(control: any) {
    let subControl = {};
    control.chips.forEach((chip: any) => {
      subControl = { ...subControl, [chip]: new FormControl(false) };
    });
    return subControl;
  }

  onFormSubmit(dynamicFormGroup: FormGroup) {
    if (this.dynamicFormGroup.invalid) {
      this.errors = [];
      alert('Required Fields Missing');
      Object.keys(this.dynamicFormGroup.controls).forEach((control) => {
        if (this.dynamicFormGroup.controls[control].errors && this.dynamicFormGroup.controls[control].touched) {
          let error = `${control} is Required or Wrong`;
          this.errors.push(error);
        }
      });
      return;
    }
    let dataToBeSubmitted = this.getDubmittedData();
    this.loaderService.show();
    this.apiService.postData(dataToBeSubmitted).subscribe({
      next: (response) => {
        this.loaderService.hide();
        this.dataSubmitted = response;
        this.timeInSec = 10;
        this.successFullSubmission = true;
        this.isFormView = false
        let intervalId = setInterval(() => {
          this.timeInSec--;
        }, 1000);
        setTimeout(() => {
          this.successFullSubmission = false;
          this.dialogRef.close();
          clearInterval(intervalId);
        }, 10000)
        console.log(response);
      },
      error: (error) => {
        this.loaderService.hide();
        this.errorSubmission = true;
        setTimeout(() => {
          this.errorSubmission = false;
        }, 5000)
        console.error('Error:', error);
      }
    }
    )
  }

  getDubmittedData() {
    return this.dynamicFormGroup.value;
  }
}
