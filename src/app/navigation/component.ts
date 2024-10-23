import { Component, Input } from "@angular/core";
import { RouterLink } from "@angular/router";
import { UserComponent } from '../user/component';

type Link = { name: string, path: string }

@Component({
    selector: "navigation",
    standalone: true,
    imports: [RouterLink, UserComponent],
    templateUrl: "template.html"
})
export class NavigationComponent {
    @Input() links: Array<Link> = []
}