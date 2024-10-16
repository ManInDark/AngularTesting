import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './login.component';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterLink, RouterOutlet, UserComponent],
  template: `
  <nav>
      <a routerLink="/todo">Todo</a>
      <a routerLink="/login">Login</a>
  </nav>
  <user-component></user-component>
  <router-outlet></router-outlet>
  `
})
export class RootComponent {
}