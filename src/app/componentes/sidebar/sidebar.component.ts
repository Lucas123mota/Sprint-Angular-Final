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

  nome: string = '';
  sobrenome: string = '';
  telefone: string = '';
  email: string = '';
  contato: string = '';
  aceitouTermos: boolean = false;

  selectEmoji(emoji: string) {
    this.selectedEmoji = emoji;
  }

  submitFeedback() {
    if (!this.aceitouTermos) return;

    console.log('Feedback enviado:', {
      nome: this.nome,
      sobrenome: this.sobrenome,
      telefone: this.telefone,
      email: this.email,
      contato: this.contato,
    });

    this.showThankYou = true;
  }

  closePopup() {
    this.showThankYou = false;
  }
}
