import { Injectable } from "@angular/core";
import PocketBase from "../../../js-sdk-0.21.5/dist/pocketbase.cjs.js";

@Injectable({
    providedIn: "root"
})
export class PocketBaseService {
    pb: any
    getUser() {
        return this.pb.authStore.isValid ? this.pb.authStore.model.username : "No User";
    }
    logout() {
        return this.pb.authStore.clear();
    }
    register(username: string, password: string) {
        return this.pb.collection("users").create({
            "username": username,
            "password": password,
            "passwordConfirm": password
        });
    }
    login(username: string, password: string) {
        return this.pb.collection('users').authWithPassword(username, password);
    }
    constructor() {
        this.pb = new PocketBase();
    }
}