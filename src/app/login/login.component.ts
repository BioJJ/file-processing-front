import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  name: string = '';
  cadastrando?: boolean;
  mensagemSucesso?: string | null;
  errors?: String[];

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  onSubmit() {
    this.authService.tentarLogar(this.username, this.password).subscribe(
      (response) => {
        const access_token = JSON.stringify(response);
        localStorage.setItem('access_token', access_token);
        this.router.navigate(['/home']);
      },
      (errorResponse) => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      }
    );
  }

  preparaCadastrar(event: any) {
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    const usuario: User = new User();
    usuario.username = this.username;
    usuario.password = this.password;
    usuario.name = this.name;
    this.authService.salvar(usuario).subscribe(
      (response) => {
        this.mensagemSucesso =
          'Cadastro realizado com sucesso! Efetue o login.';
        this.cadastrando = false;
        this.username = '';
        this.password = '';
        this.errors = [];
      },
      (errorResponse) => {
        this.mensagemSucesso = null;
        this.errors = errorResponse.error.errors;
      }
    );
  }
}
