import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './users-list/users-list.component';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersListViewComponent } from './users-list-view/users-list-view.component';
import { SharedModule } from 'src/shared/shared.module';
import { UsersListDeleteComponent } from './users-list-delete/users-list-delete.component';
import { UsersCreateComponent } from './users-create/users-create.component';

@NgModule({
  declarations: [
    UsersListComponent,
    UsersListViewComponent,
    UsersListDeleteComponent,
    UsersCreateComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ],
})
export class UsersModule {}
