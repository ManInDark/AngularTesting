import { inject, Injectable } from "@angular/core";
import { PocketBaseService } from "./pocketbase.service";

@Injectable({
    providedIn: "root"
})
export class TodoListService {
    pocketbase = inject(PocketBaseService)
    list: Array<string> = []
    id: string = "";
    getList() { return this.list; }
    setList(list: Array<string>) { this.list = list; this.saveList(); }
    addEntry(entry: string) { this.list.push(entry); this.saveList(); }
    removeEntry(entry: string) { this.list.splice(this.list.indexOf(entry), 1); this.saveList(); }
    saveList() {
        localStorage.setItem("todo", JSON.stringify(this.list));
        if (this.pocketbase.pb.authStore.isValid) {
            const data = { "user": this.pocketbase.pb.authStore.model.id, "entries": this.list };
            if (this.id !== "") {
                this.pocketbase.pb.collection("todo").update(this.id, data);
            }
        }
    }
    loadList() {
        let storedData = localStorage.getItem("todo");
        this.setList(storedData !== null ? JSON.parse(storedData) : []);
        if (this.pocketbase.pb.authStore.isValid) {
            this.pocketbase.pb.collection("todo").getFullList().then((data: [{ "entries": [], "id": string }]) => {
                if (data.length > 0) {
                    this.setId(data[0].id);
                    this.setList(data[0].entries);
                } else {
                    const data = { "user": this.pocketbase.pb.authStore.model.id, "entries": this.list };
                    console.log(this.pocketbase.pb.collection("todo").create(data));
                }
            });
        }
    }
    getId() { return this.id; }
    setId(id: string) { this.id = id; }
    constructor() {
        this.loadList();
    }
}