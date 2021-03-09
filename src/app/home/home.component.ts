import { Component, OnInit, OnDestroy } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, Image, alert, ImageSource, Page } from "@nativescript/core";
import { Accuracy } from "@nativescript/core/ui/enums";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import * as geolocation from "@nativescript/geolocation";
import { HomeService } from "./home.service";
import { take } from 'rxjs/operators';
import { LoaderService } from '../utils/index';
import {
    getString,
    setString
} from "@nativescript/core/application-settings";
import { RouterExtensions } from "@nativescript/angular";
//import { ReferralStore } from '../store/referral/referral.store';
import { QuestionnaireStore } from "../store/questionnaire/questionnaire.store";
import { connectionType, getConnectionType, startMonitoring, stopMonitoring } from "@nativescript/core/connectivity";


class RadioOption {
    index: number;
    text: string;
    answers: string;
    selected: boolean = false;

    constructor(text: string) {
        this.text = text;
    }
}

@Component({
    selector: "Home",
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit, OnDestroy {
    image: ImageSource;
    question1: boolean = false;
    question2: boolean = false;
    question3: boolean = false;
    question4: boolean = false;
    question5: boolean = false;
    question6: boolean = false;
    question7: boolean = false;
    question8: boolean = false;
    online: boolean = false;
    questArr: Array<RadioOption> = [{
        "index": 1,
        "text": "Evaluate the location of the building?",
        "answers": '',
        "selected": false
    }, {
        "index": 2,
        "text": "Evaluate the external facility of the building?",
        "answers": '',
        "selected": false
    }, {
        "index": 3,
        "text": "Evaluate the perimeter of the building?",
        "answers": '',
        "selected": false
    }];
    id: any;
    constructor(private page: Page, private homeService: HomeService, private loaderService: LoaderService, private router: RouterExtensions, private store: QuestionnaireStore) {
        // Use the component constructor to inject providers.

    }

    ngOnInit(): void {
        this.id = setInterval(() => {
            const type = getConnectionType();
            switch (type) {
                case connectionType.none:
                   // console.log("Connection type changed to none.");
                    this.online = false;
                    break;
                case connectionType.wifi:
                    //console.log("Connection type changed to WiFi.");
                    this.online = true;
                    break;
                case connectionType.mobile:
                    //console.log("Connection type changed to mobile.");
                    break;
                case connectionType.ethernet:
                    //console.log("Connection type changed to ethernet.");
                    this.online = true;
                    break;
                case connectionType.bluetooth:
                    //console.log("Connection type changed to bluetooth.");
                    break;
                default:
                    break;
            }
        }, 1000);
       /* this.page.on(Page.navigatedFromEvent, (event) => {
            console.log("ngOnDestroy");
            if (this.id) {
                clearInterval(this.id);
            }
        });

        this.page.on(Page.navigatedToEvent, (event) => {
            console.log("ngOnInit");
            this.id = setInterval(() => {
                const type = getConnectionType();
                switch (type) {
                    case connectionType.none:
                        console.log("Connection type changed to none.");
                        this.online = false;
                        break;
                    case connectionType.wifi:
                        console.log("Connection type changed to WiFi.");
                        this.online = true;
                        break;
                    case connectionType.mobile:
                        //console.log("Connection type changed to mobile.");
                        break;
                    case connectionType.ethernet:
                        //console.log("Connection type changed to ethernet.");
                        this.online = true;
                        break;
                    case connectionType.bluetooth:
                        //console.log("Connection type changed to bluetooth.");
                        break;
                    default:
                        break;
                }
            }, 1000);
        });*/

        setTimeout(() => {
            // console.log(this.store.getQuestions())
            // this.store.setToken('', '');
            //   this.loaderService.show('Please wait, this may take a few minutes...');
            //  setTimeout(() => { this.loaderService.hide(); }, 3000)
            // geolocation.enableLocationRequest();
            // geolocation.getCurrentLocation({
            //     desiredAccuracy: Accuracy.high,
            //     updateDistance: 10,
            //     maximumAge: 20000,
            //     timeout: 20000
            // }).then(function (loc) {
            //     if (loc) {
            //         console.log(loc)
            //     }
            // }, function (e) {

            // });
        }, 3000);
        // this.homeService.insertCIF({ "title": "eida2", "description": "descripty" }).pipe(take(1)).subscribe(
        //     res => {
        //         console.log(res)
        //     },
        //     error => {
        //     });


        //console.log("Result is an image asset instance", isAvailable());
        // Init your component properties here.

    }



    ngOnDestroy() {
        console.log("ngOnDestroy");
        if (this.id) {
            clearInterval(this.id);
        }
    }



    storeDataServer() {
        console.log(getString('Q1'))
        console.log(getString('Q1_images'))
    }

    public checkedChange(modelRef, key) {
        //console.log('checkedChange:', key);
        // this[key] = modelRef.checked;
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }

    changeCheckedRadio(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;

        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.questArr.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
    }

    goNext() {
        // const questions = [{
        //     "id": 1,
        //     "selected": this.question1
        // }, {
        //     "id": 2,
        //     "selected": this.question2
        // }, {
        //     "id": 3,
        //     "selected": this.question3
        // }, {
        //     "id": 4,
        //     "selected": this.question4
        // }, {
        //     "id": 5,
        //     "selected": this.question5
        // }, {
        //     "id": 6,
        //     "selected": this.question6
        // }, {
        //     "id": 7,
        //     "selected": this.question7
        // }, {
        //     "id": 8,
        //     "selected": this.question8
        // }];

        setString('questions', JSON.stringify(this.questArr));
        this.router.navigate(['settings']);
        //console.log(getString('questions'));
    }
}


/*
, {
        "text": "Which of the following can only generate “sensible heat” (rather than “latent heat”) inside a building?",
        "selected": false
    }, {
        "text": "What does the unit W /m²K in respect of the performance of building materials refer to?",
        "selected": false
    }, {
        "text": "Which of the following is not an assessment criteria for green assessment system BEAM Plus?",
        "selected": false
    }, {
        "text": "Which of the following is least effective to reduce “heat island effects” in designing an open air car parking lot?",
        "selected": false
    }, {
        "text": "Which of the following is not a benchmark for environmental performance assessment?",
        "selected": false
    }, {
        "text": "Which of the following actions may best help maintain human comfort even in an increased indoor temperature?",
        "selected": false
    }, {
        "text": "Which of the following premises should be provided with smoke extraction system?",
        "selected": false
    }*/