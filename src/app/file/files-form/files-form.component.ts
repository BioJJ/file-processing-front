import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FilesService } from 'src/app/file.service';
import { Observable, finalize } from 'rxjs';

@Component({
  selector: 'app-files-form',
  templateUrl: './files-form.component.html',
  styleUrls: ['./files-form.component.css'],
})
export class FilesFormComponent implements OnInit {
  file: File;
  success: boolean = false;
  errors: string[] | null = null;
  id: number | null = null;

  constructor(
    private service: FilesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.file = new File();
  }

  ngOnInit(): void {
    let params: Observable<Params> = this.activatedRoute.params;
    params.pipe(finalize(() => {})).subscribe((urlParams) => {
      this.id = urlParams['id'];
      if (this.id) {
        this.service.getFileById(this.id).subscribe(
          (response) => (this.file = response),
          (errorResponse) => (this.file = new File())
        );
      }
    });
  }

  onSubmit() {
    if (this.id) {
      this.service.update(this.file).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
        },
        (errorResponse) => {
          this.errors = ['Erro ao atualizar o File.'];
        }
      );
    } else {
      this.service.save(this.file).subscribe(
        (response) => {
          this.success = true;
          this.errors = null;
          this.file = response;
        },
        (errorResponse) => {
          this.success = false;
          this.errors = errorResponse.error.errors;
        }
      );
    }
  }

  backToList() {
    this.router.navigate(['/files/list']);
  }
}
