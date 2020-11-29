import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../model/user';
//formulario
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private URL = 'http://localhost:3000/users';
  public user: User;

  constructor(private http: HttpClient) {}

  // FORMULARIO
  formulario: FormGroup = new FormGroup({
    id: new FormControl(null),
    fullname: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    age: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.formulario.setValue({
      id: null,
      fullname: '',
      username: '',
      age: '',
    });
  }

  getUsers() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.URL, {
      headers: headers,
    });
  }

  getUserById(id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.URL + `/${id}`, {
      headers: headers,
    });
  }

  postUser(user: User) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const { fullname, username, age } = user;
    const data = {
      fullname: fullname,
      username: username,
      age: age,
    };
    console.log(data);
    console.log('hola');
    try {
      return this.http.post<any>(this.URL, data, {
        headers: headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateUser(user: User, id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const { fullname, username, age } = user;
    const data = {
      fullname: fullname,
      username: username,
      age: age,
    };
    try {
      return this.http.put<any>(this.URL + `/${id}`, data, {
        headers: headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteUser(id: number) {
    console.log(id);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    try {
      return this.http.delete<any>(this.URL + `/${id}`, {
        headers: headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  populateForm(user) {
    const { fullname, username, age } = user;

    this.formulario.setValue({
      fullname: fullname,
      username: username,
      age: age,
    });
  }
}
