import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormDialogData } from '../users-list-view/models/users-list-view-form.model';
import { UsersListViewService } from '../users-list-view/users-list-view.service';
import { UsersListDeleteService } from './users-list-delete.service';
import { UserListViewResponse } from '../users-list-view/models/users-list-view.response';

@Component({
  selector: 'app-users-list-delete',
  templateUrl: './users-list-delete.component.html',
  styleUrls: ['./users-list-delete.component.scss'],
})
export class UsersListDeleteComponent implements OnInit {
  userDetails!: UserListViewResponse;
  constructor(
    public dialog: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData,
    private usersListViewService: UsersListViewService,
    private usersListDeleteService: UsersListDeleteService
  ) {}

  ngOnInit(): void {
    this.getUserOrThrow();
  }

  private getUserOrThrow() {
    this.usersListViewService
      .getUserById(this.data.id)
      .subscribe((res) => (this.userDetails = res));
  }

  onCancel(): void {
    this.dialog.close();
  }

  onConfirmDelete(): void {
    this.usersListDeleteService.deleteUserById(this.data.id).subscribe(() => {
      this.dialog.close(true);
    });
  }
}
