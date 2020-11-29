import { Component, OnInit } from '@angular/core';
import { RouteService } from './service/routes.service';
import { Route } from './model/route';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(public routeService: RouteService) {}

  title = 'azurian';
  routes: Route[];

  ngOnInit() {
    this.AppGetRutes();
  }

  AppGetRutes() {
    this.routes = this.routeService.getRoutes();
  }
}
