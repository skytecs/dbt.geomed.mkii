import { Component, Input, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  @Input() pageSidebarTwo;
  @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();

  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }
  mobileRightSidebarToggle() {
    this.toggleMobileRightSidebar.emit(true);
  }
  toggleSidebarRight() {
    this.toggleSidebarRightCollapsed.emit(true);
  }

  ngOnDestroy() { }

  constructor(private renderer: Renderer2, private auth: AuthenticationService) {
    
  }

  public isAuthenticated(): boolean {
    return this.auth.authorized();
  }
}
