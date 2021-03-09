import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Application, Image, alert, ImageSource, Page } from "@nativescript/core";

class User {
    username: string;
    password: string;
}

@Component({
    selector: "Login",
    templateUrl: "./login.component.html",
    styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
    user: User = new User();

    constructor(private page: Page) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void { }

    submit(valid) {
        console.log("login", valid);
        console.log(this.user)
     }
}