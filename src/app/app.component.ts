import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { UserComponent } from './login.component';

@Component({
  selector: "message",
  standalone: true,
  template: `
    <p>{{ message }}</p>
  `
})
export class Message {
  @Input() message = '';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Message],
  template: `
    @if (running) {
      <p>Hello</p>
    }
    @else {
      <p>Bye</p>
    }
    @for (os of operatingSystems; track os.id) {
      <div>
        <p>{{ os.id }}</p> <p>{{ os.name }}</p>
      </div>
    }
    <div [contentEditable]="isEditable"></div>
    <button (click)="onClick()">Hi</button>
    <message message="this is a message"></message>
  `,
  styles: `
  p { display: inline; margin: 5px }
  `
})
export class HomeComponent {
  running = true;
  isEditable = true;
  title = 'angular-testproject';
  operatingSystems = [{ id: 'win', name: 'Windows' }, { id: 'osx', name: 'MacOS' }, { id: 'linux', name: 'Linux' }];
  onClick() {
    alert("Hi");
  }
  setValue(i: number) {
    let counter = document.querySelector('#counter');
    if (counter !== null) {
      counter.innerHTML = "" + i;
    }
  }
}

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterLink, RouterOutlet, UserComponent],
  template: `
  <nav>
      <a routerLink="/">Root</a>
      <a routerLink="/second">Second</a>
      <a routerLink="/form">Form</a>
      <a routerLink="/todo">Todo</a>
      <a routerLink="/login">Login</a>
  </nav>
  <user-component></user-component>
  <router-outlet></router-outlet>
  `
})
export class RootComponent {
}