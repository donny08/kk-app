import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppComponent } from "../app.component";

@Component({
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ['./sidebar.component.scss'],
    encapsulation : ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {

    constructor(public appComponent: AppComponent) {}

    ngOnInit(): void {}
}
