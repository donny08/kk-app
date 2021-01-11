import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Image, alert, ImageSource, confirm } from "@nativescript/core";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import {
    getString
} from "@nativescript/core/application-settings";

interface RadioOption {
    text: string;
    selected: boolean;
}

@Component({
    selector: "Settings",
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
    externalInstallatioinsFound: boolean = false;
    externalInstallatioinsFoundText: string;
    waterBody: boolean = false;
    waterBodyText: string;
    weakness: boolean = false;
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

        const questArr: Array<RadioOption> = JSON.parse(getString('questions'));
        console.log(questArr);
        questArr.forEach((option, index) => {
            if (option.selected) {
                const q = "Q" + (index + 1);
                this.title = q + '. ' + option.text;
            }
        });

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
        key = args.value;
        console.log(this.externalInstallatioinsFoundText);
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
