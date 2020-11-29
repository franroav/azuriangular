import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  DoCheck,
} from '@angular/core';
//MODEL
import { User } from '../../../model/user';
//SERVICIO
import { UsersService } from '../../../service/user.service';
import { NotificationService } from '../../../service/notification.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent implements OnInit {
  public user: User;

  @Input('id') id: number;
  @Input('fullname') fullname: string;
  @Input('username') username: string;
  @Input('age') age: number;
  @Input('edit') edit: boolean;
  @Output() cambio = new EventEmitter();
  constructor(
    public service: UsersService,
    public notificationService: NotificationService
  ) {
    //instance User object
    this.user = new User(null, '', '', null);
  }

  ngOnInit(): void {
    if (localStorage.getItem('edituser')) {
      const user = JSON.parse(localStorage.getItem('edituser'));
      console.log(user);
      //this.user = new User(user.id, user.fullname, user.username, user.age);
    }
  }

  onClear() {
    this.cambio.emit('Dato emitido');
    /*this.user = new User(null, '', '', null);
    this.service.initializeFormGroup();
    this.service.formulario.reset();
    this.propiedad_cuatro = false;*/
    //EVENTO CLEAR
    //this.service.initializeFormGroup();
  }
  ngDoCheck() {
    //el ngDoCheck se ejecutara siempre que haya un cambio en mi aplicacion
    if (this.edit) {
      console.log('evento padre');
      //this.service.formulario.reset();
      //this.service.initializeFormGroup();
      //this.resetForm();
      this.updateForm();
    } /**/
  }

  onSubmit(form) {
    if (this.service.formulario.valid) {
      try {
        const createUser = this.service
          .postUser(form.value)
          .subscribe((res) => {
            console.log(res);
            this.service.formulario.reset();
            this.service.initializeFormGroup();
            this.notificationService.success(res.message);
          });
        return createUser;
      } catch (error) {
        console.log(error);
      }
    }
  }

  updateUser(form) {
    //const user = this.service.formulario.value;
    if (this.service.formulario.valid) {
      try {
        const updateUser = this.service
          .updateUser(form.value, form.value.id)
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
    // console.log(this.service.formulario.value);
    //  console.log(this.user);
  }

  onclose() {
    this.service.formulario.reset();
    //this.service.initializeFormGroup();
    // this.dialogRef.close();
  }
  updateForm() {
    /*if (localStorage.getItem('edituser')) {
      const user = JSON.parse(localStorage.getItem('edituser'));
      console.log(user);
      this.user = new User(user.id, user.fullname, user.username, user.age);
    }
    console.log('evento update');*/
    this.user = new User(this.id, this.fullname, this.username, this.age);
    //  this.service.formulario.reset();
    //this.service.initializeFormGroup();

    /* this.service.onServiceEdit().subscribe((res) => {
          
    })*/
    /**/
    //console.log('Respuesta del componente hijo');
  }

  resetForm() {
    this.user = new User(null, '', '', 0);
  }
}
