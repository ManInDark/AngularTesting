import { Component, inject, Injectable } from "@angular/core";
import { FormsModule } from "@angular/forms";

// https://angular.dev/tutorials/learn-angular/17-reactive-forms könnte man hier noch anwenden, hab ich aber nicht gemacht
// https://angular.dev/tutorials/learn-angular/18-forms-validation

@Component({
    selector: 'todo',
    standalone: true,
    imports: [FormsModule],
    template: `
    <ol>
        @for (entry of listservice.getList(); track entry) {
            <li>{{ entry }}<button (click)="removeEntry(entry)">-</button></li>
        }
    </ol>
    <input id="newentry" type="text" [(ngModel)]="newentry" />
    <button (click)="addEntry()">+</button>
    `
})
export class TodoComponent {
    listservice = inject(TodoListService)
    newentry: string = "";
    addEntry() {
        this.listservice.addEntry(this.newentry)
        this.newentry = "";
    }
    removeEntry(entry: any) {
        this.listservice.removeEntry(entry);
    }
}

@Injectable({
    providedIn: "root"
})
export class TodoListService {
    list: Array<string> = ["alpha", "beta", "gamma", "delta"]
    getList() { return this.list; }
    setList(list: Array<string>) { this.list = list; }
    addEntry(entry: string) { this.list.push(entry); this.saveList(); }
    removeEntry(entry: string) { this.list.splice(this.list.indexOf(entry), 1); this.saveList(); }
    saveList() {
        localStorage.setItem("todo", JSON.stringify(this.list));
    }
    constructor() {
        let storedData = localStorage.getItem("todo");
        if (storedData !== null) {
            this.list = JSON.parse(storedData);
        }
    }
}