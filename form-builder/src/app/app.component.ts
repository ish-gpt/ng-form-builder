import { Component } from '@angular/core';
import { LoginComponent } from './component/login/login.component';
import { RouterOutlet, RouterLinkActive, RouterLink } from '@angular/router';
import { LoaderComponent } from './component/loader/loader.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'form-builder';
}
