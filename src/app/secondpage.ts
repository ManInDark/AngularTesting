import { Component, EventEmitter, Output } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: "counter",
  standalone: true,
  template: `
    <button (click)="increment()">Increment</button>
    `
})
export class Counter {
  counter = 0;
  increment() {
    this.counter++;
    this.counterEvent.emit(this.counter);
  }
  @Output() counterEvent = new EventEmitter<number>();
}

@Component({
  selector: 'app-second',
  standalone: true,
  imports: [RouterOutlet, Counter],
  template: `
      @defer {
        <counter (counterEvent)="setValue($event)"></counter>
        <p id='counter'>0</p>
      }
      @placeholder {
        <p>Waiting for counter</p>
      }
      @loading (minimum 3s) {
        <p>Loading</p>
      }
    `
})
export class AppComponent {
  setValue(i: number) {
    let counter = document.querySelector('#counter');
    if (counter !== null) {
      counter.innerHTML = "" + i;
    }
  }
}
