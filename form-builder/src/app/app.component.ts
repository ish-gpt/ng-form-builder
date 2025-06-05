import { Component } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent, RouterLink, RouterLinkActive, RouterOutlet]
})
export class AppComponent {
  title = 'form-builder';
}
