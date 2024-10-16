import { Component, inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { PocketBaseService } from "../services/pocketbase.service";

@Component({
    standalone: true,
    imports: [FormsModule],
    templateUrl: "template.html",
})
export class LoginComponent {
    username: string = ""
    password: string = ""
    pocketbase = inject(PocketBaseService)
}