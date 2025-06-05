import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TemplateSectionComponent } from './component/template-section/template-section.component';
import { FormFieldOptionsComponent } from './component/form-field-options/form-field-options.component';
import { PreviewTemplateComponent } from './component/preview-template/preview-template.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FieldDetailComponent } from './dailogs/field-detail/field-detail.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  }
];


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    DragDropModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminModule { }
