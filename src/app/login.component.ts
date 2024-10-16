import { Component, inject, Injectable, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import PocketBase from "../../js-sdk-0.21.5/dist/pocketbase.cjs";

@Component({
    standalone: true,
    imports: [FormsModule],
    template: `
    <div><label for="username">Name:</label><input type="text" id="username" [(ngModel)]="username"></div>
    <div><label for="password">Password:</label><input type="password" id="password" [(ngModel)]="password"></div>
    <div><button (click)="login()">Login</button><button (click)="register()">Register</button><button (click)="logout()">Logout</button></div>
    `
})
export class LoginComponent {
    username: string = ""
    password: string = ""
    pocketbase = inject(PocketBaseService)
    async login() {
        await this.pocketbase.pb.collection('users').authWithPassword(this.username, this.password);
    }
    async register() {
        await this.pocketbase.pb.collection("users").create({
            "username": this.username,
            "password": this.password,
            "passwordConfirm": this.password
        });
    }
    async logout() {
        this.pocketbase.pb.authStore.clear();
    }
}

@Component({
    selector: "user-component",
    standalone: true,
    template: `
    <p>{{ this.pocketbase.getUser() }}</p>
    `
})
export class UserComponent {
    pocketbase = inject(PocketBaseService)
}

@Injectable({
    providedIn: "root"
})
export class PocketBaseService {
    pb: any
    getUser() {
        return this.pb.authStore.isValid ? this.pb.authStore.model.username : "No User";
    }
    constructor() {
        this.pb = new PocketBase();
    }
}