import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isSidebarHovered = false;

  onMouseEnterSidebar(): void {
    this.isSidebarHovered = true;
  }

  onMouseLeaveSidebar(): void {
    this.isSidebarHovered = false;
  }
}
