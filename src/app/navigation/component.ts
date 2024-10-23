import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";

type Link = { name: string, path: string }

@Component({
    selector: "navigation",
    standalone: true,
    imports: [RouterLink],
    templateUrl: "template.html"
})
export class NavigationComponent {
    @Input() links: Array<Link> = []
}