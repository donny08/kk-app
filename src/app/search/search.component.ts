import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import {
    getString
} from "@nativescript/core/application-settings";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    @ViewChild('myfilter') myfilter: ElementRef;
    questionOneWeakness: string;

    public listitems = [
        {
            "title": "Brown Bear",
            "code": '123'
        },
        {
            "title": "Red Bird",
            "code": '124'
        },
        {
            "title": "Purple Cat",
            "code": '125'
        }
    ];

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        if (getString('Q1')) {
            console.log(JSON.parse(getString('Q1')))
            const q1 = JSON.parse(getString('Q1'));
            this.questionOneWeakness = q1.weakness;
        }
    }

    cancelFilterableList() {
        console.log('canceled');
    }

    itemTapped(args) {
        console.log(args.selectedItem)
    }

    showPicker() {
        this.myfilter.nativeElement.show();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
