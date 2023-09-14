import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { private_route } from 'src/shared/constants/routes';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: private_route.user_list,
        loadChildren: () =>
          import('../pages/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: private_route.user_list,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
