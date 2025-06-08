import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormFieldOptionsComponent } from './form-field-options.component';

describe('FormFieldOptionsComponent', () => {
  let component: FormFieldOptionsComponent;
  let fixture: ComponentFixture<FormFieldOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormFieldOptionsComponent]
    });
    fixture = TestBed.createComponent(FormFieldOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
