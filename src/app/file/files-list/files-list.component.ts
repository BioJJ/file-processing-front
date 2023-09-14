import { Component, OnInit } from '@angular/core';
import { File } from '../file';
import { FilesService } from 'src/app/file.service';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files-list',
  templateUrl: './files-list.component.html',
  styleUrls: ['./files-list.component.css'],
})
export class FilesListComponent implements OnInit {
  files?: File[] | any = [];
  fileSelected!: File;
  messageSuccess: string = '';
  messageError: string = '';

  totalElements? = 0;
  page? = 0;
  size = 10;
  pageSizeOptions: number[] = [10];

  colum = ['id', 'name', 'status'];

  constructor(private service: FilesService, private router: Router) {}

  ngOnInit(): void {
    this.listFiles(this.page, this.size);
  }

  listFiles(page = 0, size = 5) {
    this.service.list(page, size).subscribe((response) => {
      this.files = response.content;
      this.totalElements = response.totalElements;
      this.page = response.number;
    });
  }

  pager(event: PageEvent) {
    this.page = event.pageIndex;
    this.listFiles(this.page, this.size);
  }

  registry() {
    this.router.navigate(['/files/form']);
  }

  prepareDelete(file: File) {
    this.fileSelected = file;
  }

  DeleteFile() {
    this.service.delete(this.fileSelected).subscribe(
      (response) => {
        this.messageSuccess = 'File deletado com sucesso!';
        this.ngOnInit();
      },
      (erro) => (this.messageError = 'Ocorreu um erro ao deletar o File.')
    );
  }
}
