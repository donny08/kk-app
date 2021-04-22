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
    questionOneWeaknessTwo: string;
    questionOneWeaknessThree: string;

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

    data = [];
    total: number = 0;
    percentageOne: number = 0;
    percentageTwo: number = 0;
    percentageThree: number = 0;
    percentageFour: number = 0;
    percentageFive: number = 0;
    percentageSix: number = 0;
    percentageSeven: number = 0;
    percentageEight: number = 0;
    percentageNine: number = 0;
    percentageTen: number = 0;
    percentageEleven: number = 0;
    percentageTwelve: number = 0;
    percentageThirteen: number = 0;



    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        // if (getString('Q1')) {
        //     console.log(JSON.parse(getString('Q1')))
        //     const q1 = JSON.parse(getString('Q1'));
        //     this.questionOneWeakness = q1.weakness;
        // }

        // if (getString('Q2')) {
        //     console.log(JSON.parse(getString('Q2')))
        //     const q2 = JSON.parse(getString('Q2'));
        //     this.questionOneWeaknessTwo = q2.weakness;
        // }

        // if (getString('Q3')) {
        //     console.log(JSON.parse(getString('Q3')))
        //     const q3 = JSON.parse(getString('Q3'));
        //     this.questionOneWeaknessThree = q3.weakness;
        // }
        this.data = [{
            // "question": getString('Q1') ? JSON.parse(getString('Q1')) : null,
            // "images": getString('Q1_images') ? JSON.parse(getString('Q1_images')) : null,
            "percentages": getString('Q1Percentages') ? JSON.parse(getString('Q1Percentages')) : null
        }, {
            // "question": getString('Q2') ? JSON.parse(getString('Q2')) : null,
            // "images": getString('Q2_images') ? JSON.parse(getString('Q2_images')) : null,
            "percentages": getString('Q2Percentages') ? JSON.parse(getString('Q2Percentages')) : null
        }, {
            // "question": getString('Q3') ? JSON.parse(getString('Q3')) : null,
            // "images": getString('Q3_images') ? JSON.parse(getString('Q3_images')) : null,
            "percentages": getString('Q3Percentages') ? JSON.parse(getString('Q3Percentages')) : null
        }, {
            // "question": getString('Q4') ? JSON.parse(getString('Q4')) : null,
            // "images": getString('Q4_images') ? JSON.parse(getString('Q4_images')) : null,
            "percentages": getString('Q4Percentages') ? JSON.parse(getString('Q4Percentages')) : null
        }, {
            // "question": getString('Q5') ? JSON.parse(getString('Q5')) : null,
            // "images": getString('Q5_images') ? JSON.parse(getString('Q5_images')) : null,
            "percentages": getString('Q5Percentages') ? JSON.parse(getString('Q5Percentages')) : null
        }, {
            // "question": getString('Q6') ? JSON.parse(getString('Q6')) : null,
            // "images": getString('Q6_images') ? JSON.parse(getString('Q6_images')) : null,
            "percentages": getString('Q6Percentages') ? JSON.parse(getString('Q6Percentages')) : null
        }, {
            // "question": getString('Q7') ? JSON.parse(getString('Q7')) : null,
            // "images": getString('Q7_images') ? JSON.parse(getString('Q7_images')) : null,
            "percentages": getString('Q7Percentages') ? JSON.parse(getString('Q7Percentages')) : null
        }, {
            // "question": getString('Q8') ? JSON.parse(getString('Q8')) : null,
            // "images": getString('Q8_images') ? JSON.parse(getString('Q8_images')) : null,
            "percentages": getString('Q8Percentages') ? JSON.parse(getString('Q8Percentages')) : null
        }, {
            // "question": getString('Q9') ? JSON.parse(getString('Q9')) : null,
            // "images": getString('Q9_images') ? JSON.parse(getString('Q9_images')) : null,
            "percentages": getString('Q9Percentages') ? JSON.parse(getString('Q9Percentages')) : null
        }, {
            // "question": getString('Q10') ? JSON.parse(getString('Q10')) : null,
            // "images": getString('Q10_images') ? JSON.parse(getString('Q10_images')) : null,
            "percentages": getString('Q10Percentages') ? JSON.parse(getString('Q10Percentages')) : null
        }, {
            // "question": getString('Q11') ? JSON.parse(getString('Q11')) : null,
            // "images": getString('Q11_images') ? JSON.parse(getString('Q11_images')) : null,
            "percentages": getString('Q11Percentages') ? JSON.parse(getString('Q11Percentages')) : null
        }, {
            // "question": getString('Q12') ? JSON.parse(getString('Q12')) : null,
            // "images": getString('Q12_images') ? JSON.parse(getString('Q12_images')) : null,
            "percentages": getString('Q12Percentages') ? JSON.parse(getString('Q12Percentages')) : null
        }, {
            // "question": getString('Q13') ? JSON.parse(getString('Q13')) : null,
            // "images": getString('Q13_images') ? JSON.parse(getString('Q13_images')) : null,
            "percentages": getString('Q13Percentages') ? JSON.parse(getString('Q13Percentages')) : null
        }];
        console.log(this.data)

        this.calculateTotal();
    }

    calculateTotal() {
        if (this.data[0].percentages) { this.percentageOne = this.data[0].percentages.total; this.total += this.data[0].percentages.total; }
        if (this.data[1].percentages) { this.percentageTwo = this.data[1].percentages.total; this.total += this.data[1].percentages.total; }
        if (this.data[2].percentages) { this.percentageThree = this.data[2].percentages.total; this.total += this.data[2].percentages.total; }
        if (this.data[3].percentages) { this.percentageFour = this.data[3].percentages.total; this.total += this.data[3].percentages.total; }
        if (this.data[4].percentages) { this.percentageFive = this.data[4].percentages.total; this.total += this.data[4].percentages.total; }
        if (this.data[5].percentages) { this.percentageSix = this.data[5].percentages.total; this.total += this.data[5].percentages.total; }
        if (this.data[6].percentages) { this.percentageSeven = this.data[6].percentages.total; this.total += this.data[6].percentages.total; }
        if (this.data[7].percentages) { this.percentageEight = this.data[7].percentages.total; this.total += this.data[7].percentages.total; }
        if (this.data[8].percentages) { this.percentageNine = this.data[8].percentages.total; this.total += this.data[8].percentages.total; }
        if (this.data[9].percentages) { this.percentageTen = this.data[9].percentages.total; this.total += this.data[9].percentages.total; }
        if (this.data[10].percentages) { this.percentageEleven = this.data[10].percentages.total; this.total += this.data[10].percentages.total; }
        if (this.data[11].percentages) { this.percentageTwelve = this.data[11].percentages.total; this.total += this.data[11].percentages.total; }
        if (this.data[12].percentages) { this.percentageThirteen = this.data[12].percentages.total; this.total += this.data[12].percentages.total; }
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
