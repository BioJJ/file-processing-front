import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FilesRoutingModule } from './files-routing.module';
import { FilesFormComponent } from './files-form/files-form.component';
import { FormsModule } from '@angular/forms';
import { FilesListComponent } from './files-list/files-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [FilesFormComponent, FilesListComponent],
  imports: [CommonModule, FilesRoutingModule, FormsModule, NgxPaginationModule],
  exports: [FilesFormComponent, FilesListComponent],
})
export class FilesModule {}
