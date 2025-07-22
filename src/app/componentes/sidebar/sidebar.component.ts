import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  emojis: string[] = ['😡', '😕', '😐', '😊', '😍'];
  selectedEmoji: string | null = null;
  feedbackMessage: string = '';
  showThankYou: boolean = false;

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
  }

  submitFeedback() {
    console.log('Feedback enviado:', this.feedbackMessage);
    this.showThankYou = true;
  }

  closePopup() {
    this.showThankYou = false;
  }
}
