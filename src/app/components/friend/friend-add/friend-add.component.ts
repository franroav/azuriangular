import { Component, OnInit, Input } from '@angular/core';
//MODEL
import { Friend } from '../../../model/friend';
//SERVICIO
import { FriendsService } from '../../../service/friend.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-friend-add',
  templateUrl: './friend-add.component.html',
  styleUrls: ['./friend-add.component.css'],
})
export class FriendAddComponent implements OnInit {
  public friend: Friend;
  id: number;
  name: string;
  gender: string;

  constructor(
    public service: FriendsService,
    public notificationService: NotificationService
  ) {
    //instance New Friend object
    this.friend = new Friend(null, '', '');
  }

  ngOnInit(): void {}

  onSubmit(form) {
    if (this.service.formulario.valid) {
      try {
        const createFriend = this.service
          .postFriend(form.value)
          .subscribe((res) => {
            console.log(res);
            this.service.formulario.reset();
            this.service.initializeFormGroup();
            this.notificationService.success(res.message);
          });
        return createFriend;
      } catch (error) {
        console.log(error);
      }
    }
  }

  updateUser(form) {
    if (this.service.formulario.valid) {
      try {
        const updateFriend = this.service
          .updateFriend(form.value, form.value.id)
          .subscribe((res) => {
            console.log(res);
            this.service.formulario.reset();
            this.service.initializeFormGroup();
            this.notificationService.success(res.message);
          });
        return updateFriend;
      } catch (error) {
        console.log(error);
      }
    }
  }

  onclose() {
    this.service.formulario.reset();
  }

  resetForm() {
    this.friend = new Friend(null, '', '');
  }
}
