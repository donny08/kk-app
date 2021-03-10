import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "@nativescript/angular";
import { CommonModule } from '@angular/common';
import { LoginRoutingModule } from "./login-routing.module";
import { LoginComponent } from "./login.component";
import { SideBarComponent } from "../sidebar/sidebar.component";

@NgModule({
    imports: [
        CommonModule,
        NativeScriptFormsModule,
        
        LoginRoutingModule
    ],
    declarations: [
        LoginComponent
    ],
    providers: [SideBarComponent],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class LoginModule { }
