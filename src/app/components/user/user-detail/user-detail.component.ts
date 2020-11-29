import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../service/user.service';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';

export interface userDetails {
  id: number;
  fullname: string;
  username: string;
  age: number;
  createdAt: Date;
  updateAt: Date;
}

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [UsersService],
})
export class UserDetailComponent implements OnInit {
  public user: userDetails;
  constructor(
    public service: UsersService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe((params) => {
      console.log(params['id']);
      this.service.getUserById(params['id']).subscribe((res) => {
        console.log(res);
        this.user = res;
      });
    });
  }

  ngOnInit(): void {}
}
