import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

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
}
