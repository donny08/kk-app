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

interface RadioOption {
    text: string;
    selected: boolean;
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

    constructor() {
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
                    if (getString(q)) {
                        const answers: formValues = JSON.parse(getString(q));
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

    onCheckedChange(args, key) {
        console.log(args.value);
        this.formValues[key] = args.value;
        //console.log(this.externalInstallatioinsFoundText);
    }

    takeSnap(type, count) {
        takePicture().
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
                        this.signedApplication.push(source);
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
        if (valid) {
            console.log(this.formValues)
            setString(this.category, JSON.stringify(this.formValues));
            console.log(this.category)
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
