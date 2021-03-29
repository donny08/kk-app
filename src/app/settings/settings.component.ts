import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Image, alert, ImageSource, confirm } from "@nativescript/core";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import {
    getString,
    setString
} from "@nativescript/core/application-settings";
import {
    trigger,
    style,
    animate,
    transition
} from '@angular/animations';
import { RouterExtensions } from "@nativescript/angular";

interface RadioOption {
    text: string;
    selected: boolean;
}

class q1TableValues {
    commentQ11: string;
    statusQ11: boolean = true;
    percentQ11: number = 0.5;
    statusQ12: boolean = true;
    percentQ12: number = 0.5;
    statusQ13: boolean = true;
    percentQ13: number = 0.25;
    statusQ14: boolean = true;
    percentQ14: number = 0.25;
    statusQ15: boolean = true;
    percentQ15: number = 0.25;
    statusQ16: boolean = true;
    percentQ16: number = 0.25;
    total: number = 4;
}

class formValues {
    nameOfLocation: string;
    streetSituation: string;
    nearestLocationDistance: string;
    externalInstallatioinsFound: boolean = false;
    externalInstallatioinsFoundText: string;
    waterBody: boolean = false;
    waterBodyText: string;
    floorOfBuilding: string;
    mainLandmarks: string;
    weakness: string;
}

class formValuesTwo {
    externalMonitorEnv: boolean = false;
    externalMonitorEnvText: string;
    externalPowerStat: boolean = false;
    externalPowerStatText: string;
    externalPerimeter: boolean = false;
    externalPerimeterText: string;
    warningSigns: boolean = false;
    warningSignsText: string;
    roadLeading: boolean = false;
    roadLeadingText: string;
    weakness: string;
}

class formValuesThree {
    heightOuterWall: string;
    surveillanceAlarm: boolean = false;
    surveillanceAlarmText: string;
    secureCCTV: boolean = false;
    secureCCTVText: string;
    moreFence: boolean = false;
    moreFenceText: string;
    lighting: boolean = false;
    lightingText: string;
    adjacent: boolean = false;
    adjacentText: string;
    climbFacility: boolean = false;
    climbFacilityText: string;
    barrier: boolean = false;
    barrierText: string;
    barbedWire: boolean = false;
    barbedWireText: string;
    weakness: string;
}

@Component({
    selector: "Settings",
    animations: [
        trigger('fadeAndSlide', [
            transition(':enter', [
                style({ opacity: 0, transform: "translateY(20)" }),
                animate('1s ease-out', style({ opacity: 1, transform: "translateY(0)" }))
            ]),
            transition(':leave', [
                style({ opacity: 1, transform: "translateY(0)" }),
                animate('1s ease-in', style({ opacity: 0, transform: "translateY(20)" }))
            ])
        ])
    ],
    templateUrl: "./settings.component.html"
})

export class SettingsComponent implements OnInit {
    title: string;
    reason: string;
    public signedApplication: Array<any> = [];
    public signedApplicationTwo: Array<any> = [];
    public signedApplicationThree: Array<any> = [];
    documents = [];
    availableItems: any = [];
    commentList = [{
        "id": 0,
        "comment": ""
    }];
    comment: string;
    //externalInstallatioinsFound: boolean = false;
    //externalInstallatioinsFoundText: string;
    waterBody: boolean = false;
    waterBodyText: string;
    weakness: boolean = false;
    formValues: formValues = new formValues();
    formValuesTwo: formValuesTwo = new formValuesTwo();
    formValuesThree: formValuesThree = new formValuesThree();
    q1TableValues: q1TableValues = new q1TableValues();
    category: string;
    @ViewChild('myfilter') myfilter: ElementRef;

    public listitems = [
        {
            "title": "reason1",
            "code": 'reason1'
        },
        {
            "title": "reason2",
            "code": 'reason2'
        },
        {
            "title": "reason3",
            "code": 'reason3'
        }
    ];

    public items = [{
        "title": 'battery',
        "selected": false
    }]

    constructor(private router: RouterExtensions) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        // Init your component properties here.
        if (getString('questions')) {
            const questArr: Array<RadioOption> = JSON.parse(getString('questions'));
            console.log(questArr);
            questArr.forEach((option, index) => {
                if (option.selected) {
                    const q = "Q" + (index + 1);
                    this.category = q;
                    this.title = q + '. ' + option.text;

                    if (q == "Q1" && getString(q)) {
                        const answers: formValues = JSON.parse(getString(q));
                        //console.log("_images", getString(this.category + '_images'))
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }

                        this.formValues.nameOfLocation = answers.nameOfLocation;
                        this.formValues.streetSituation = answers.streetSituation;
                        this.formValues.nearestLocationDistance = answers.nearestLocationDistance;
                        this.formValues.externalInstallatioinsFound = answers.externalInstallatioinsFound;
                        this.formValues.externalInstallatioinsFoundText = answers.externalInstallatioinsFoundText;
                        this.formValues.waterBody = answers.waterBody;
                        this.formValues.waterBodyText = answers.waterBodyText;
                        this.formValues.floorOfBuilding = answers.floorOfBuilding;
                        this.formValues.mainLandmarks = answers.mainLandmarks;
                        this.formValues.weakness = answers.weakness;
                        this.weakness = true;
                    }

                    if (q == "Q2" && getString(q)) {
                        const answers: formValuesTwo = JSON.parse(getString(q));
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplicationTwo.push(item.image);
                            });
                        }
                        this.formValuesTwo.externalMonitorEnv = answers.externalMonitorEnv;
                        this.formValuesTwo.externalMonitorEnvText = answers.externalMonitorEnvText;
                        this.formValuesTwo.externalPowerStat = answers.externalPowerStat;
                        this.formValuesTwo.externalPowerStatText = answers.externalPowerStatText;
                        this.formValuesTwo.externalPerimeter = answers.externalPerimeter;
                        this.formValuesTwo.externalPerimeterText = answers.externalPerimeterText;
                        this.formValuesTwo.warningSigns = answers.warningSigns;
                        this.formValuesTwo.warningSignsText = answers.warningSignsText;
                        this.formValuesTwo.roadLeading = answers.roadLeading;
                        this.formValuesTwo.roadLeadingText = answers.roadLeadingText;
                        this.formValuesTwo.weakness = answers.weakness;
                        this.weakness = true;
                    }

                    if (q == "Q3" && getString(q)) {
                        const answers: formValuesThree = JSON.parse(getString(q));
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplicationThree.push(item.image);
                            });
                        }
                        this.formValuesThree.heightOuterWall = answers.heightOuterWall;
                        this.formValuesThree.surveillanceAlarm = answers.surveillanceAlarm;
                        this.formValuesThree.surveillanceAlarmText = answers.surveillanceAlarmText;
                        this.formValuesThree.secureCCTV = answers.secureCCTV;
                        this.formValuesThree.secureCCTVText = answers.secureCCTVText;
                        this.formValuesThree.moreFence = answers.moreFence;
                        this.formValuesThree.moreFenceText = answers.moreFenceText;
                        this.formValuesThree.lighting = answers.lighting;
                        this.formValuesThree.lightingText = answers.lightingText;
                        this.formValuesThree.adjacent = answers.adjacent;
                        this.formValuesThree.adjacentText = answers.adjacentText;
                        this.formValuesThree.climbFacility = answers.climbFacility;
                        this.formValuesThree.climbFacilityText = answers.climbFacilityText;
                        this.formValuesThree.barrier = answers.barrier;
                        this.formValuesThree.barrierText = answers.barrierText;
                        this.formValuesThree.barbedWire = answers.barbedWire;
                        this.formValuesThree.barbedWireText = answers.barbedWireText;
                        this.formValuesThree.weakness = answers.weakness;
                        this.weakness = true;
                    }
                }
            });
        }


        if (isAvailable()) {
            requestCameraPermissions()
                .then(
                    fulfilled => {
                        alert('requestCameraPermissions fulfilled.');

                    },
                    rejected => {
                        alert('No camera permissions set.');
                    }
                )
        } else {
            //  alert('No camera detected of available.');
        }
    }

    addMoreComments(id: number) {
        console.log(this.comment)
        this.commentList.push({
            "id": id + 1,
            "comment": ""
        });
    }

    onCheckedSummaryChange(args, key, match, percent, pMatch) {
        if (match == 'Q1') {
            this.q1TableValues[key] = args.value;
            if (args.value) {
                this.q1TableValues[pMatch] = percent;
            } else {
                this.q1TableValues[pMatch] = 0;
            }
            this.q1TableValues['total'] = this.q1TableValues['percentQ11'] + this.q1TableValues['percentQ12'] + this.q1TableValues['percentQ13'] + this.q1TableValues['percentQ14'] + this.q1TableValues['percentQ15'] + this.q1TableValues['percentQ16'];
            console.log(this.q1TableValues);
        }
    }

    onCheckedChange(args, key) {
        console.log(args.value);
        this.formValues[key] = args.value;
    }

    onCheckedChangeTwo(args, key) {
        console.log(args.value);
        this.formValuesTwo[key] = args.value;
    }

    onCheckedChangeThree(args, key) {
        console.log(args.value);
        this.formValuesThree[key] = args.value;
    }

    takeSnap(type, count, arr) {
        var options = { width: 300, height: 300, keepAspectRatio: true, saveToGallery: false, allowsEditing: false };
        takePicture(options).
            then((imageAsset) => {
                //  alert("Result is an image asset instance");
                //let source = new ImageSource();
                ImageSource.fromAsset(imageAsset).then((source) => {
                    //this.image = source;
                    let imagename = type + "_" + (count + 1) + ".jpg";
                    let docuid = type + "_" + (count + 1);
                    let base64 = source.toBase64String("jpg", 70);

                    try {
                        for (var i = 0; i < this.documents.length; i++) {
                            if (this.documents[i]._id === docuid) {
                                this.documents.splice(i, 1);
                                break;
                            }
                        }

                        this.documents.push({
                            "_id": docuid,
                            "title": imagename,
                            "type": "image",
                            "image": base64,
                            "timestamp": (new Date()).getTime()
                        });
                        arr.push(source);
                    } catch (error) { }
                });
                //var image = new Image();
                // image.src = imageAsset;
            }).catch((err) => {
                console.log("Error -> " + err.message);
            });
    }

    cancelFilterableList() {
        console.log('canceled');
    }

    deleteImage(type, index, imagearray) {
        let options = {
            title: "IMPORTANT!!",
            message: "Are you sure you want to delete this image?",
            okButtonText: "Yes",
            cancelButtonText: "No",
            neutralButtonText: "Cancel"
        };

        confirm(options).then((result: boolean) => {
            if (result) {
                imagearray.splice(index, 1);
                console.log(imagearray)

                for (var i = 0; i < this.documents.length; i++) {
                    if (this.documents[i]._id === type + "_" + (index + 1)) {
                        this.documents.splice(i, 1);
                        break;
                    }
                }
            }
        });
    }

    submit(valid) {
        console.log(valid)
        if (valid) {
            //console.log(this.formValues)
            //console.log(this.category, this.formValuesTwo)
            console.log(this.documents)

            if (this.category == "Q1") setString(this.category, JSON.stringify(this.formValues));
            if (this.category == "Q2") setString(this.category, JSON.stringify(this.formValuesTwo));
            if (this.category == "Q3") setString(this.category, JSON.stringify(this.formValuesThree));

            if (this.documents && this.documents.length > 0) setString(this.category + '_images', JSON.stringify(this.documents));

            alert("Information submitted successfully").then(() => {
                this.router.navigate(['home'], {
                    clearHistory: true
                });
            });
        }
    }

    showWeakness() { this.weakness = !this.weakness; }

    checkedChange(modelRef, key) {
        console.log(modelRef.checked, key);
        if (this.availableItems.indexOf(key) != -1) {
            if (!modelRef.checked) this.availableItems.splice(this.availableItems.indexOf(key), 1);
        } else {
            this.availableItems.push(key);
        }
        console.log(this.availableItems);
    }

    itemTapped(args) {
        console.log(args.selectedItem)
        this.reason = args.selectedItem.title;
    }

    showPicker() {
        this.myfilter.nativeElement.show();
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
