import { path } from '@angular-devkit/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './component/templates/templates.component';
import { LoginComponent } from './component/login/login.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'templates',
    loadChildren: () => import('../template/service/template.module').then(mod => mod.TemplateModule)
    // component: TemplatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
