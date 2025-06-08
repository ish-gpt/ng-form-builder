import { Component } from '@angular/core';
import { FormFieldOptionsComponent } from '../form-field-options/form-field-options.component';
import { TemplateSectionComponent } from '../template-section/template-section.component';
import { PermissionDirective } from 'src/app/directives/permission.directive';
import { Role } from 'src/template/constants/role.constants';
import { SharedService } from 'src/app/services/shared.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  standalone:true,
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [
    FormFieldOptionsComponent,
    TemplateSectionComponent, PermissionDirective, MatButtonModule
  ]
})
export class AdminDashboardComponent {
  role = Role
  loggedInRole: any= '';
  constructor(private sharedService: SharedService,
    private router: Router
  ) {
    this.loggedInRole = sharedService.getRole();
  }

  logout() {
    localStorage.removeItem('loggedInAsRole');
    localStorage.removeItem('isUserLoggedIn');
    this.router.navigate(['/']);
  }
}
