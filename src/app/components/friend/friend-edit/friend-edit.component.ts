import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
//MODEL
import { Friend } from '../../../model/friend';
//SERVICIO
import { FriendsService } from '../../../service/friend.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-friend-edit',
  templateUrl: './friend-edit.component.html',
  styleUrls: ['./friend-edit.component.css'],
})
export class FriendEditComponent implements OnInit, DoCheck {
  public friend: Friend;

  @Input('id') id: number;
  @Input('name') name: string;
  @Input('gender') gender: string;
  @Input('edit') edit: boolean;
  @Output() cambio = new EventEmitter();
  constructor(
    public service: FriendsService,
    public notificationService: NotificationService
  ) {
    //instance new Friend object
    this.friend = new Friend(null, '', '');
  }

  ngOnInit(): void {
    if (localStorage.getItem('edituser')) {
      const user = JSON.parse(localStorage.getItem('edituser'));
      console.log(user);
    }
  }

  onClear() {
    this.cambio.emit('data send to parent component');
  }
  ngDoCheck() {
    if (this.edit) {
      this.updateForm();
    }
  }

  updateFriend(form) {
    if (this.service.formulario.valid) {
      try {
        const updateUser = this.service
          .updateFriend(form.value, form.value.id)
          .subscribe((res) => {
            console.log(res);
            this.service.formulario.reset();
            this.service.initializeFormGroup();
            this.notificationService.success(res.message);
          });
        return updateUser;
      } catch (error) {
        console.log(error);
      }
    }
  }

  onclose() {
    this.service.formulario.reset();
  }
  updateForm() {
    this.friend = new Friend(this.id, this.name, this.gender);
  }

  resetForm() {
    this.friend = new Friend(null, '', '');
  }
}
