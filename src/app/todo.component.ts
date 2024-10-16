import { Component, inject, Injectable } from "@angular/core";
import { LowerCasePipe } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { Pipe, PipeTransform } from '@angular/core';
import { PocketBaseService } from "./login.component";

// https://angular.dev/tutorials/learn-angular/17-reactive-forms könnte man hier noch anwenden, hab ich aber nicht gemacht
// https://angular.dev/tutorials/learn-angular/18-forms-validation

@Pipe({
  standalone: true,
  name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string): string {
    return value.length === 0 ? "" : `${value[0].toUpperCase() + value.slice(1).toLowerCase()}`;
  }
}

@Component({
    selector: 'todo',
    standalone: true,
    imports: [FormsModule, CapitalizePipe],
    template: `
    <ol>
        @for (entry of listservice.getList(); track entry) {
            <li>{{ entry | capitalize }}<button (click)="removeEntry(entry)">-</button></li>
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
    pocketbase = inject(PocketBaseService)
    list: Array<string> = ["alpha", "beta", "gamma", "delta"]
    id: string = "";
    getList() { return this.list; }
    setList(list: Array<string>) { this.list = list; this.saveList(); }
    addEntry(entry: string) { this.list.push(entry); this.saveList(); }
    removeEntry(entry: string) { this.list.splice(this.list.indexOf(entry), 1); this.saveList(); }
    saveList() {
        localStorage.setItem("todo", JSON.stringify(this.list));
        if (this.pocketbase.pb.authStore.isValid) {
            const data = { "user": this.pocketbase.pb.authStore.model.id, "entries": this.list };
            this.pocketbase.pb.collection("todo").update(this.id, data);
        }
    }
    getId() { return this.id; }
    setId(id: string) { this.id = id; }
    constructor() {
        let storedData = localStorage.getItem("todo");
        if (storedData !== null) {
            this.setList(JSON.parse(storedData));
        }
        if (this.pocketbase.pb.authStore.isValid) {
            this.pocketbase.pb.collection("todo").getFullList().then((data: [{"entries": [], "id": string}]) => {
                if (data.length > 0) {
                    this.setList(data[0].entries);
                    this.setId(data[0].id);
                } else {
                    const data = { "user": this.pocketbase.pb.authStore.model.id, "entries": this.list };
                    console.log(this.pocketbase.pb.collection("todo").create(data));
                }
            });
        }
    }
}