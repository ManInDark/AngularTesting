import { Component, inject } from "@angular/core";
import { PocketBaseService } from "../services/pocketbase.service";

@Component({
    selector: "user-component",
    standalone: true,
    templateUrl: "template.html"
})
export class UserComponent {
    pocketbase = inject(PocketBaseService)
}