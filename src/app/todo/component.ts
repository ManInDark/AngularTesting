import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TodoListService } from "../services/todolist.service";
import { CapitalizePipe } from "./capitalize.pipe";

@Component({
    selector: 'todo',
    standalone: true,
    imports: [FormsModule, CapitalizePipe],
    templateUrl: "template.html"
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
