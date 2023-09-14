import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserFormComponent } from './user-form/user-form.component';
import { FormsModule } from '@angular/forms';
import { UserListComponent } from './user-list/user-list.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [UserFormComponent, UserListComponent],
  imports: [CommonModule, UserRoutingModule, FormsModule, NgxPaginationModule],
  exports: [UserFormComponent, UserListComponent],
})
export class UserModule {}
