import { inject, Injectable } from "@angular/core";
import { PocketBaseService } from "./pocketbase.service";

@Injectable({
    providedIn: "root"
})
export class TodoListService {
    pocketbase = inject(PocketBaseService)
    #list: Array<string> = []
    #id: string = "";
    get id() { return this.#id; }
    set id(id: string) { this.#id = id; }
    get list() { return this.#list; }
    set list(list: Array<string>) { this.#list = list; }
    addEntry(entry: string) { this.list.push(entry); this.saveList(); }
    removeEntry(entry: string) { this.list.splice(this.list.indexOf(entry), 1); this.saveList(); }
    saveList() {
        if (this.pocketbase.pb.authStore.isValid && this.id !== "") {
            this.pocketbase.pb.collection("todo").update(this.id, { 
                "user": this.pocketbase.pb.authStore.model.id,
                 "entries": this.list
            });
        }
    }
    loadList() {
        if (this.pocketbase.pb.authStore.isValid) {
            this.pocketbase.pb.collection("todo").getFullList().then((data: [{ "entries": [], "id": string }]) => {
                if (data.length > 0) {
                    this.id = data[0].id;
                    this.list = data[0].entries;
                    this.pocketbase.pb.collection('todo').subscribe('*', (data: { record: { id: string, entries: Array<string> } }) => {
                        this.list = data.record.entries;
                    }, {});
                } else {
                    const data = { "user": this.pocketbase.pb.authStore.model.id, "entries": this.list };
                    this.pocketbase.pb.collection("todo").create(data);
                    this.loadList();
                }
            });
        }
    }
    constructor() {
        this.loadList();
    }
}