import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InitialNavigation, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { CarouselComponent } from "../carrosel/carrosel.component";



@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, CarouselComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;
  constructor(private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,) {}
  
  ngOnInit(): void {    
   this.formLogin = this.fb.group({
      nome: ['', Validators.required],
      senha: ['', Validators.required],
    });
  }

onSubmit() {

    const { nome, senha } = this.formLogin.value;

    this.loginService.login(nome, senha).subscribe({
      next: (response) => {
       
        this.router.navigate(['/home']);
      },
      error: (error) => {
        
        console.error('Login failed', error);
      },
    });
  }
  
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('showEye') showEye!: ElementRef<HTMLElement>;
  @ViewChild('hideEye') hideEye!: ElementRef<HTMLElement>;
  @ViewChild('loginBtn') loginBtn!: ElementRef<HTMLButtonElement>;


  passwordVisible = false;

  togglePassword(): void {
    const input = this.passwordInput.nativeElement;
    const showEyeIcon = this.showEye.nativeElement;
    const hideEyeIcon = this.hideEye.nativeElement;

    if (input.type === 'password') {
      input.type = 'text';
      showEyeIcon.style.display = 'none';
      hideEyeIcon.style.display = 'block';
    } else {
      input.type = 'password';
      showEyeIcon.style.display = 'block';
      hideEyeIcon.style.display = 'none';
    }
  }

  positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];

  shiftButton(): void {
    const btn = this.loginBtn.nativeElement;
  
    const currentPosition = this.positions.find(dir =>
      btn.classList.contains(dir)
    );
  
    // Se o formulário está válido, remove as posições e aplica a classe de reset
    if (this.formLogin.valid) {
      if (currentPosition) {
        btn.classList.remove(currentPosition);
      }
  
      // Aplica a classe que traz o botão de volta ao centro
      btn.classList.add('reset-position');
      return;
    }
  
    // Se o formulário está inválido, remove qualquer reset e move o botão
    btn.classList.remove('reset-position');
  
    if (currentPosition) {
      btn.classList.remove(currentPosition);
    }
  
    let newPosition;
    do {
      newPosition = this.positions[Math.floor(Math.random() * this.positions.length)];
    } while (newPosition === currentPosition);
  
    btn.classList.add(newPosition);
  }
  
  
  


  

  
}
