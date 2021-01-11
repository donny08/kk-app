import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule, NativeScriptFormsModule } from "@nativescript/angular";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular";
import { TNSCheckBoxModule } from '@nstudio/nativescript-checkbox/angular';
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from '@angular/forms'
import { SideBarComponent } from "./sidebar/sidebar.component";
import { CommonModule } from '@angular/common';

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        NativeScriptUISideDrawerModule,
        AppRoutingModule,
        TNSCheckBoxModule,
        // ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
        SideBarComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
