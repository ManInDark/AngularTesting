import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";

@Component({
    selector: "form",
    standalone: true,
    imports: [FormsModule],
    template: `
    <label for="name">Name:</label>
    <input id="name" type="text" [(ngModel)]="name" />
    @if (name !== '') {
        <p>Hello {{ name }}</p>
    }
`
})
export class FormComponent {
    name = ""
}