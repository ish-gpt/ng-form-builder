import { path } from '@angular-devkit/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplatesComponent } from './component/templates/templates.component';
import { LoginComponent } from './component/login/login.component';
import { canActivateAdmin } from './route-guard/route-guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'templates',
    loadChildren: () => import('../template/template.module').then(mod => mod.TemplateModule),
    canActivate: [canActivateAdmin]
    // component: TemplatesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
