import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";

@Component({
    selector: "Search",
    templateUrl: "./search.component.html"
})
export class SearchComponent implements OnInit {
    @ViewChild('myfilter') myfilter: ElementRef;

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
