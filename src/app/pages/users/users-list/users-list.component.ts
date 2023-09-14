import { UsersListService } from './users-list.service';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/shared/model/base-component';
import { UsersListResponse } from './models/users-list.response';
import { MatTableDataSource } from '@angular/material/table';
import { PageEvent } from '@angular/material/paginator';
import { UsersListRequestDto } from './models/users-list.dto';
import { BaseListResponseMeta } from 'src/shared/model/base-list.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DialogPosition, MatDialog } from '@angular/material/dialog';
import { UsersListViewComponent } from '../users-list-view/users-list-view.component';
import { FormDialogData } from '../users-list-view/models/users-list-view-form.model';
import { UsersListDeleteComponent } from '../users-list-delete/users-list-delete.component';
import { private_route } from 'src/shared/constants/routes';
import { Router } from '@angular/router';

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

  filterForm!: FormGroup;

  constructor(
    private usersListService: UsersListService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router: Router
  ) {
    super();
  }
  ngOnInit(): void {
    this.createFormFilter();
    this.filterObserver();
    this.getUsersOrThrow({});
  }

  private filterObserver() {
    this.filterForm
      .get('name')
      ?.valueChanges.pipe(debounceTime(1000))
      .subscribe((value) => {
        this.getUsersOrThrow({
          name: value,
        });
      });
  }

  private createFormFilter() {
    this.filterForm = this.formBuilder.group({
      name: [''],
    });
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

  viewUser(user: UsersListResponse) {
    const formDialogData: FormDialogData = {
      title: 'Detalhes',
      id: user.id,
    };

    this.dialog.open(UsersListViewComponent, {
      minHeight: 'auto',

      disableClose: false,
      data: formDialogData,
    });
  }

  editUser(user: UsersListResponse) {
    this.router.navigate([
      `${private_route.user_list}/${private_route.user_update}/${user.id}`,
    ]);
  }

  deleteUser(user: UsersListResponse) {
    const formDialogData: FormDialogData = {
      title: 'Exclusão',
      id: user.id,
    };

    const dialogRef = this.dialog.open(UsersListDeleteComponent, {
      minHeight: 'auto',

      disableClose: false,
      data: formDialogData,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getUsersOrThrow({});
    });
  }

  goToCreate() {
    this.router.navigate([
      `${private_route.user_list}/${private_route.user_create}`,
    ]);
  }
}
