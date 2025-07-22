import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],  // <-- Importa o CommonModule para habilitar *ngIf, *ngFor
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  emojis: string[] = ['😡', '😟', '😐', '😊', '😍'];
  feedbackText: string = '';
  showThankYou: boolean = false;
  selectedEmoji: string | null = null;

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
  }

  submitFeedback() {
    if (this.selectedEmoji || this.feedbackText.trim()) {
      this.showThankYou = true;
      this.feedbackText = '';
      this.selectedEmoji = null;
    }
  }

  closeThankYou() {
    this.showThankYou = false;
  }
}
