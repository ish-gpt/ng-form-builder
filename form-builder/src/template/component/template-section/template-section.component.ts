import { Component, OnInit } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicDetailsComponent } from 'src/template/dailogs/basic-details/basic-details.component';
import { v4 as uuidv4 } from 'uuid';
import { FormViewComponent } from 'src/template/dailogs/form-view/form-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { PermissionDirective } from 'src/app/directives/permission.directive';
import { Role } from 'src/template/constants/role.constants';
import { SharedService } from 'src/app/services/shared.service';
@Component({
  selector: 'app-template-section',
  templateUrl: './template-section.component.html',
  standalone: true,
  styleUrls: ['./template-section.component.css'],
  imports: [PreviewTemplateComponent, MatCardModule, MatChipsModule,
    MatProgressBarModule, CommonModule, MatButtonModule, MatTooltipModule, MatDividerModule, PermissionDirective,MatIconModule, MatDialogModule]
})
export class TemplateSectionComponent implements OnInit {
  isTemplateListEmpty: boolean = true;
  istTemplateCreateMode: boolean = false;
  currentEditingTemplateId!: string;
  templateName: string = '';
  templateDataMap = new Map();
  editTemplateData!: any;
  role = Role;
  loggedInRole: string | null = '';

  constructor(public dialog: MatDialog, private shared: SharedService) {
    this.loggedInRole = shared.getRole();
  }

  ngOnInit() {
    let data = (localStorage.getItem('templates'));
    if (data) {
      let mapData = new Map(JSON.parse(data));

      this.templateDataMap = mapData;
      this.isTemplateListEmpty = this.templateDataMap.size !== 0 ? false : true;
    }

  }

  toggleMode() {
    let dialogRef = this.dialog.open(BasicDetailsComponent);
    dialogRef.afterClosed().subscribe((name) => {
      this.templateName = name.templateName;
      this.istTemplateCreateMode = name.isCanceled ? false : true;
    })

  }

  discardTemplate(e: any) {
    this.istTemplateCreateMode = false;
  }

  handleTemplateData(e: any) {
    if (e.templateId) {
      this.templateDataMap.set(e.templateId, e);
    } else {
      this.templateDataMap.set(uuidv4(), e);
    }
    this.istTemplateCreateMode = false;
    this.isTemplateListEmpty = false;

    localStorage.setItem('templates', JSON.stringify(Array.from(this.templateDataMap.entries())));
  }

  getKeys() {
    return Array.from(this.templateDataMap.keys());
  }

  getName(id: any) {
    return this.templateDataMap.get(id).templateName;
  }

  openForm(id: string) {
    this.dialog.open(FormViewComponent, {
      data: this.templateDataMap.get(id)
    })
  }

  deleteTemplate(id: string) {
    let confirmDelete = confirm('Are you sure you want to delete this template');
    if (!confirmDelete) return;
    this.templateDataMap.delete(id);
    localStorage.setItem('templates', JSON.stringify(Array.from(this.templateDataMap.entries())));
  }

  editConfiguration(id: string) {
    this.istTemplateCreateMode = true;
    this.editTemplateData = this.templateDataMap.get(id);
    this.currentEditingTemplateId = id;
  }

}
