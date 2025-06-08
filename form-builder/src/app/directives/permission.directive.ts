import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Directive({
  selector: '[appPermission]',
  standalone: true
})
export class PermissionDirective {
  userRole: string | null = '';
  constructor(private renderer: Renderer2,
    private eleRef: ElementRef,
    sharedService: SharedService,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { 
    this.userRole = sharedService.getRole();
  }

  @Input() set appPermission(role: string) {
    const validRole = this.userRole === role;
    if (validRole) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
