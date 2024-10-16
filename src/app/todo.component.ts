import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

// https://angular.dev/tutorials/learn-angular/17-reactive-forms könnte man hier noch anwenden, hab ich aber nicht gemacht
// https://angular.dev/tutorials/learn-angular/18-forms-validation

@Component({
    selector: 'todo',
    standalone: true,
    imports: [FormsModule],
    template: `
    <ol>
        @for (entry of list; track entry) {
            <li>{{ entry }}<button (click)="removeEntry(entry)">-</button></li>
        }
    </ol>
    <input id="newentry" type="text" [(ngModel)]="newentry" />
    <button (click)="addEntry()">+</button>
    `
})
export class TodoComponent {
    list: Array<string> = []
    newentry: string = "";
    addEntry() {
        this.list.push(this.newentry);
        this.newentry = "";
    }
    removeEntry(entry: any) {
        this.list.splice(this.list.indexOf(entry), 1);
    }
}