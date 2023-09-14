import { UsersListViewService } from './users-list-view.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialogData } from './models/users-list-view-form.model';
import { UserListViewResponse } from './models/users-list-view.response';

@Component({
  selector: 'app-users-list-view',
  templateUrl: './users-list-view.component.html',
  styleUrls: ['./users-list-view.component.scss'],
})
export class UsersListViewComponent implements OnInit {
  userDetails!: UserListViewResponse;
  constructor(
    public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData,
    private usersListViewService: UsersListViewService
  ) {}

  ngOnInit(): void {
    this.getUserOrThrow();
  }

  private getUserOrThrow() {
    this.usersListViewService
      .getUserById(this.data.id)
      .subscribe((res) => (this.userDetails = res));
  }
}
