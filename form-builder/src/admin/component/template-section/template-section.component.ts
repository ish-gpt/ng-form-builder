import { Component } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { PreviewTemplateComponent } from '../preview-template/preview-template.component';

@Component({
  selector: 'app-template-section',
  templateUrl: './template-section.component.html',
  standalone: true,
  styleUrls: ['./template-section.component.css'],
  imports: [PreviewTemplateComponent,MatCardModule, MatChipsModule, MatProgressBarModule, CommonModule, MatButtonModule, MatDividerModule, MatIconModule]
})
export class TemplateSectionComponent {
  isTemplateListEmpty: boolean = true;
  istTemplateCreateMode:boolean =  false;

  constructor() {

  }

  toggleMode() {
    this.istTemplateCreateMode = !this.istTemplateCreateMode;
  }
  longText = `The Chihuahua is a Mexican breed of toy dog. It is named for the
  Mexican state of Chihuahua and is among the smallest of all dog breeds. It is
  usually kept as a companion animal or for showing.`;
}
