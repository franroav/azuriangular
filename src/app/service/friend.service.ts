import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Friend } from '../model/friend';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private URL = 'http://localhost:3000/friends';
  public friend: Friend;
  constructor(private http: HttpClient) {}

  // FORMULARIO
  formulario: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.minLength(8)]),
    gender: new FormControl('', Validators.required),
  });

  initializeFormGroup() {
    this.formulario.setValue({
      id: null,
      name: '',
      gender: '',
    });
  }

  getFriends() {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>('http://localhost:3000/friends', {
      headers: headers,
    });
  }

  getFriendById(id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.get<any>(this.URL + `/${id}`, {
      headers: headers,
    });
  }

  postFriend(friend: Friend) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const { name, gender } = friend;
    const data = {
      name: name,
      gender: gender,
    };
    console.log(data);
    try {
      return this.http.post<any>(this.URL, data, {
        headers: headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  updateFriend(friend: Friend, id: number) {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const { name, gender } = friend;
    const data = {
      name: name,
      gender: gender,
    };
    try {
      return this.http.put<any>(this.URL + `/${id}`, data, {
        headers: headers,
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteFriend(id: number) {
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

  populateForm(friend) {
    const { name, gender } = friend;

    this.formulario.setValue({
      name: name,
      gender: gender,
    });
  }
}
