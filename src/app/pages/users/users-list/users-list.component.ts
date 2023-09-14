import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BaseComponent } from 'src/shared/model/base-component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent extends BaseComponent implements OnInit {
  constructor(private httpClient: HttpClient) {
    super();
  }
  ngOnInit(): void {}

  teste(): void {
    this.httpClient
      .get(`${environment.api_url}/users`)
      .pipe()
      .subscribe((res) => console.log(res));
  }
}
