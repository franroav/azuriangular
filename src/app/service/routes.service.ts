import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RouteService {
  constructor() {}

  public routes = [
    {
      name: 'Users',
      icon: 'account_circle',
      url: 'users',
    },
    {
      name: 'Friends',
      icon: 'supervised_user_circle',
      url: 'friends',
    },
  ];

  getRoutes() {
    return this.routes;
  }
}
