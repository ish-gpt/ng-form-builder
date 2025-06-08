import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './service/api.service';
import { LoaderService } from './service/loader.service';


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
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ApiService
  ]
})
export class TemplateModule { }
