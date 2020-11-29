import { Component, OnInit, ViewChild } from '@angular/core';
import { FriendsService } from '../../../service/friend.service';
//ROUTER
import { Router, ActivatedRoute, Params } from '@angular/router';

export interface friendDetails {
  id: number;
  name: string;
  gender: string;
  createdAt: Date;
  updateAt: Date;
}

@Component({
  selector: 'app-friend-detail',
  templateUrl: './friend-detail.component.html',
  styleUrls: ['./friend-detail.component.css'],
})
export class FriendDetailComponent implements OnInit {
  public friend: friendDetails;
  constructor(
    public service: FriendsService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this._route.params.subscribe((params) => {
      console.log(params['id']);
      this.service.getFriendById(params['id']).subscribe((res) => {
        console.log(res);
        this.friend = res;
      });
    });
  }

  ngOnInit(): void {}
}
