import { UsersListService } from './users-list.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/shared/model/base-component';
import { UsersListResponse } from './models/users-list.response';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UsersListRequestDto } from './models/users-list.dto';
import { BaseListResponseMeta } from 'src/shared/model/base-list.model';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends BaseComponent implements OnInit {
  users!: MatTableDataSource<UsersListResponse>;
  displayedColumns: string[] = [
    'nome',
    'dataNascimento',
    'cpf',
    'cidade',
    'actions',
  ];

  meta: BaseListResponseMeta = {
    page: 1,
    itemsPerPage: 10,
    totalItems: 0,
  };

  constructor(private usersListService: UsersListService) {
    super();
  }
  ngOnInit(): void {
    this.getUsersOrThrow({});
  }

  private getUsersOrThrow(payload: UsersListRequestDto) {
    this.usersListService.getUsers(payload).subscribe((res) => {
      this.users = new MatTableDataSource(res.data);
      this.meta = res.meta;
    });
  }

  public onPageChange(event: PageEvent) {
    const request: UsersListRequestDto = {
      page: event.pageIndex + 1,
      pageSize: event.pageSize,
    };
    this.getUsersOrThrow(request);
  }

  viewUser(user: UsersListResponse) {}

  editUser(user: UsersListResponse) {}

  deleteUser(user: UsersListResponse) {}
}
