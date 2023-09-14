import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'user',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: UserFormComponent },
      { path: 'form/:id', component: UserFormComponent },
      { path: 'list', component: UserListComponent },
      { path: '', redirectTo: '/user/list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
