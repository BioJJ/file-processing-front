import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';
import { Observable, finalize, tap } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  user: User;
  success: boolean = false;
  errors: string[] | null = null;
  id: number | null = null;

  constructor(
    private service: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = new User();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.pipe(finalize(() => {})).subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getUserById(this.id).subscribe(
          (response) => (this.user = response),
          (errorResponse) => (this.user = new User())
        );
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.service.update(this.user).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar o user.'];
        }
      );
    } else {
      this.service.save(this.user).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.user = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

  BackToList() {
    this.router.navigate(['/user/list']);
  }
}
