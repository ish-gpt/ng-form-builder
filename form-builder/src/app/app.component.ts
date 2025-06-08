import { Component } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { LoaderComponent } from './component/loader/loader.component';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [LoginComponent, RouterLink, RouterLinkActive, RouterOutlet, LoaderComponent]
})
export class AppComponent {
  title = 'form-builder';
}
