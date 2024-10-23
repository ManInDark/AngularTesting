import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, NavigationComponent],
  template: `
  <navigation class="mb-3" [links]="links"></navigation>
  <router-outlet></router-outlet>
  `
})
export class RootComponent {
  links = [
    { "name": "Todo", "path": "/todo" },
    { "name": "Login", "path": "/login" }
  ];
}