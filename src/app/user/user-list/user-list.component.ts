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
  userSelected!: User;
  messageSuccess: string = '';
  messageError: string = '';

  totalElements? = 0;
  page? = 0;
  size = 10;
  pageSizeOptions: number[] = [10];

  colum = ['id', 'username', 'name', 'email'];

  constructor(private service: UserService, private router: Router) {}

  ngOnInit(): void {
    this.listUsers(this.page, this.size);
  }

  listUsers(page = 0, size = 5) {
    this.service.list(page, size).subscribe((response) => {
      this.users = response.content;
      this.totalElements = response.totalElements;
      this.page = response.number;
    });
  }

  pager(event: PageEvent) {
    this.page = event.pageIndex;
    this.listUsers(this.page, this.size);
  }

  registry() {
    this.router.navigate(['/user/form']);
  }

  prepareDelete(candidate: User) {
    this.userSelected = candidate;
  }

  deletarUser() {
    this.service.delete(this.userSelected).subscribe(
      (response) => {
        this.messageSuccess = 'User deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.messageError = 'Ocorreu um erro ao deletar o User.')
    );
  }
}
