import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AppComponent } from "../app.component";
import {
    getString
} from "@nativescript/core/application-settings";
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: "sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ['./sidebar.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SideBarComponent implements OnInit {
    username: string;
    name: string;

    constructor(public appComponent: AppComponent, private router: Router) { }

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                if (event.url == "/home") {
                    console.log("getUser")
                    if (getString('user')) {
                        const user = JSON.parse(getString('user'));

                        if (user.userInfo) {
                            const userInfo = user.userInfo;
                            this.username = userInfo.username;
                            this.name = userInfo.firstName + ' ' + userInfo.lastName;
                        }
                    }
                }
            }
        });
    }
}
