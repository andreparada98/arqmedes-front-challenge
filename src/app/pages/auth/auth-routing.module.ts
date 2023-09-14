import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { public_route } from 'src/shared/constants/routes';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: public_route.login,
    component: LoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
