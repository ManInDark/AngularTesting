import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/component";
import { UserComponent } from './user/component';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, UserComponent, NavigationComponent],
  template: `
  <navigation [links]="links"></navigation>
  <user-component></user-component>
  <router-outlet></router-outlet>
  `
})
export class RootComponent {
  links = [
    { "name": "Todo", "path": "/todo" },
    { "name": "Login", "path": "/login" }
  ];
}