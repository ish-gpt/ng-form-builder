import { Component } from '@angular/core';
import { FormFieldOptionsComponent } from '../form-field-options/form-field-options.component';
import { TemplateSectionComponent } from '../template-section/template-section.component';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone:true,
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    FormFieldOptionsComponent,
    TemplateSectionComponent
  ]
})
export class AdminDashboardComponent {

}
