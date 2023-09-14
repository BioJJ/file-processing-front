import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserService } from 'src/app/user.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users?: User[] | any = [];
  userSelecionado!: User;
  mensagemSucesso: string = '';
  mensagemErro: string = '';

  totalElementos? = 0;
  pagina? = 0;
  tamanho = 10;
  pageSizeOptions: number[] = [10];

  colunas = ['id', 'username', 'nome', 'email'];

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.listarUsers(this.pagina, this.tamanho);
  }

  listarUsers(pagina = 0, tamanho = 5) {
    this.service.list(pagina, tamanho).subscribe((response) => {
      this.users = response.content;
      this.totalElementos = response.totalElements;
      this.pagina = response.number;
    });
  }

  paginar(event: PageEvent) {
    this.pagina = event.pageIndex;
    this.listarUsers(this.pagina, this.tamanho);
  }

  novoCadastro() {
    this.router.navigate(['/user/form']);
  }

  preparaDelecao(candidate: User) {
    this.userSelecionado = candidate;
  }

  deletarUser() {
    this.service.deletar(this.userSelecionado).subscribe(
      (response) => {
        this.mensagemSucesso = 'User deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.mensagemErro = 'Ocorreu um erro ao deletar o User.')
    );
  }
}
