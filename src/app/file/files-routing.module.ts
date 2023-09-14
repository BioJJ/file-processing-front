import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilesFormComponent } from './files-form/files-form.component';
import { FilesListComponent } from './files-list/files-list.component';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
    path: 'files',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'form', component: FilesFormComponent },
      { path: 'form/:id', component: FilesFormComponent },
      { path: 'list', component: FilesListComponent },
      { path: '', redirectTo : '/files/list', pathMatch: 'full' }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilesRoutingModule {}
