import { Component } from '@angular/core';
import { Router } from '@angular/router'; 
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';

  constructor(private router: Router) {} 

  sendMessage() {
    console.log('Name:', this.name);
    console.log('Email:', this.email);
    console.log('Message:', this.message);
    

    
    this.name = '';
    this.email = '';
    this.message = '';

    
    this.router.navigate(['/login']);
  }
}
