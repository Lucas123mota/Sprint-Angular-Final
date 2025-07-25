import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  sendMessage() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    alert('Mensagem enviada com sucesso!');
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
