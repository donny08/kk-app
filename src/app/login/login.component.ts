import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Application, Image, alert, ImageSource, Page } from "@nativescript/core";
import { APIService, LoaderService } from "../utils/index";
import { take } from 'rxjs/operators';
import { RouterExtensions } from "@nativescript/angular";
import {
    setString
} from "@nativescript/core/application-settings";

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

    constructor(private page: Page, private apiService: APIService, private loaderService: LoaderService, private router: RouterExtensions) {
        this.page.actionBarHidden = true;
    }

    ngOnInit(): void { }

    submit(valid) {
        console.log("login", valid);
        if (valid) {
            console.log(this.user)
            this.loaderService.show();
            this.apiService.login(this.user.username, this.user.password).pipe(take(1)).subscribe(
                data => {
                    console.log(data);
                    setString('user', JSON.stringify(data));
                    this.router.navigate(['home']);
                    this.loaderService.hide();
                },
                error => {
                    alert("Please enter valid username and password");
                    this.user.password = '';
                    this.loaderService.hide();
                    console.log(error);
                }
            );
        }
    }
}