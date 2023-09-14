import { private_route } from './../../../shared/constants/routes';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './users-list/users-list.component';
import { UsersCreateComponent } from './users-create/users-create.component';

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
  },
  {
    path: private_route.user_create,
    component: UsersCreateComponent,
  },
  {
    path: `${private_route.user_update}/:id`,
    component: UsersCreateComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
