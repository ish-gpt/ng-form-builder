import { Component } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { DevEnvironment } from 'src/environments/development';


@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, FormsModule],
})
export class LoginComponent {

  constructor(private location: Location,
    private router: Router
  ) {

  }

  onLogin(loginForm: NgForm) {
    // console.log("Hello", form);
    if (loginForm.value.loginRole == '') {
      alert('Please Select a role to login');
      return;
    }
    if (loginForm.value.loginRole === 'admin') {
      if ((loginForm.value.username === '') || (loginForm.value.password === '')) {
        alert('Enter Username/Password');
        return;
      }
      if (!(loginForm.value.username === DevEnvironment.admin.adminUserName) || !(loginForm.value.password === DevEnvironment.admin.adminPassWord)) {
        alert('Incorrect Username/Password');
        return;
      }
      this.router.navigate(['/templates']);
    } else {

    }
  }

}
