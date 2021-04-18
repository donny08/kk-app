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
    commentQ12: string;
    statusQ12: boolean = true;
    percentQ12: number = 0.5;
    commentQ13: string;
    statusQ13: boolean = true;
    percentQ13: number = 0.25;
    commentQ14: string;
    statusQ14: boolean = true;
    percentQ14: number = 0.25;
    commentQ15: string;
    statusQ15: boolean = true;
    percentQ15: number = 0.25;
    commentQ16: string;
    statusQ16: boolean = true;
    percentQ16: number = 0.25;
    total: number = 4;
}

class q2TableValues {
    commentQ21: string;
    statusQ21: boolean = true;
    percentQ21: number = 0.5;
    commentQ22: string;
    statusQ22: boolean = true;
    percentQ22: number = 0.5;
    commentQ23: string;
    statusQ23: boolean = true;
    percentQ23: number = 0.5;
    commentQ24: string;
    statusQ24: boolean = true;
    percentQ24: number = 0.5;
    commentQ25: string;
    statusQ25: boolean = true;
    percentQ25: number = 0.5;
    commentQ26: string;
    statusQ26: boolean = true;
    percentQ26: number = 0.5;
    commentQ27: string;
    statusQ27: boolean = true;
    percentQ27: number = 0.5;
    commentQ28: string;
    statusQ28: boolean = true;
    percentQ28: number = 0.5;
    commentQ29: string;
    statusQ29: boolean = true;
    percentQ29: number = 0.5;
    total: number = 9;
}

class q3TableValues {
    commentQ31: string;
    statusQ31: boolean = true;
    percentQ31: number = 0.5;
    commentQ32: string;
    statusQ32: boolean = true;
    percentQ32: number = 0.25;
    commentQ33: string;
    statusQ33: boolean = true;
    percentQ33: number = 0.25;
    commentQ34: string;
    statusQ34: boolean = true;
    percentQ34: number = 0.25;
    commentQ35: string;
    statusQ35: boolean = true;
    percentQ35: number = 0.25;
    commentQ36: string;
    statusQ36: boolean = true;
    percentQ36: number = 0.25;
    commentQ37: string;
    statusQ37: boolean = true;
    percentQ37: number = 0.5;
    commentQ38: string;
    statusQ38: boolean = true;
    percentQ38: number = 0.25;
    commentQ39: string;
    statusQ39: boolean = true;
    percentQ39: number = 0.25;
    commentQ310: string;
    statusQ310: boolean = true;
    percentQ310: number = 0.5;
    commentQ311: string;
    statusQ311: boolean = true;
    percentQ311: number = 0.5;
    commentQ312: string;
    statusQ312: boolean = true;
    percentQ312: number = 0.25;
    commentQ313: string;
    statusQ313: boolean = true;
    percentQ313: number = 0.25;
    commentQ314: string;
    statusQ314: boolean = true;
    percentQ314: number = 0.25;
    total: number = 9;
}

class q4TableValues {
    commentQ41: string;
    statusQ41: boolean = true;
    percentQ41: number = 1;
    commentQ42: string;
    statusQ42: boolean = true;
    percentQ42: number = 0.5;
    commentQ43: string;
    statusQ43: boolean = true;
    percentQ43: number = 0.5;
    commentQ44: string;
    statusQ44: boolean = true;
    percentQ44: number = 0.5;
    commentQ45: string;
    statusQ45: boolean = true;
    percentQ45: number = 0.5;
    commentQ46: string;
    statusQ46: boolean = true;
    percentQ46: number = 0.5;
    commentQ47: string;
    statusQ47: boolean = true;
    percentQ47: number = 0.5;
    total: number = 4;
}

class q5TableValues {
    commentQ51: string;
    statusQ51: boolean = true;
    percentQ51: number = 1;
    commentQ52: string;
    statusQ52: boolean = true;
    percentQ52: number = 1;
    commentQ53: string;
    statusQ53: boolean = true;
    percentQ53: number = 1;
    commentQ54: string;
    statusQ54: boolean = true;
    percentQ54: number = 0.5;
    commentQ55: string;
    statusQ55: boolean = true;
    percentQ55: number = 0.5;
    commentQ56: string;
    statusQ56: boolean = true;
    percentQ56: number = 0.5;
    commentQ57: string;
    statusQ57: boolean = true;
    percentQ57: number = 0.5;
    commentQ58: string;
    statusQ58: boolean = true;
    percentQ58: number = 0.5;
    commentQ59: string;
    statusQ59: boolean = true;
    percentQ59: number = 0.5;
    commentQ510: string;
    statusQ510: boolean = true;
    percentQ510: number = 0.5;
    commentQ511: string;
    statusQ511: boolean = true;
    percentQ511: number = 0.5;
    commentQ512: string;
    statusQ512: boolean = true;
    percentQ512: number = 0.5;
    commentQ513: string;
    statusQ513: boolean = true;
    percentQ513: number = 1;
    commentQ514: string;
    statusQ514: boolean = true;
    percentQ514: number = 0.5;
    commentQ515: string;
    statusQ515: boolean = true;
    percentQ515: number = 1;
    total: number = 9;
}

class q6TableValues {
    commentQ61: string;
    statusQ61: boolean = true;
    percentQ61: number = 1;
    commentQ62: string;
    statusQ62: boolean = true;
    percentQ62: number = 1;
    commentQ63: string;
    statusQ63: boolean = true;
    percentQ63: number = 1;
    commentQ64: string;
    statusQ64: boolean = true;
    percentQ64: number = 1;
    total: number = 4;
}

class q7TableValues {
    commentQ71: string;
    statusQ71: boolean = true;
    percentQ71: number = 1;
    commentQ72: string;
    statusQ72: boolean = true;
    percentQ72: number = 1;
    commentQ73: string;
    statusQ73: boolean = true;
    percentQ73: number = 1;
    commentQ74: string;
    statusQ74: boolean = true;
    percentQ74: number = 1;
    commentQ75: string;
    statusQ75: boolean = true;
    percentQ75: number = 1;
    commentQ76: string;
    statusQ76: boolean = true;
    percentQ76: number = 1;
    commentQ77: string;
    statusQ77: boolean = true;
    percentQ77: number = 1;
    commentQ78: string;
    statusQ78: boolean = true;
    percentQ78: number = 1;
    commentQ79: string;
    statusQ79: boolean = true;
    percentQ79: number = 1;
    commentQ710: string;
    statusQ710: boolean = true;
    percentQ710: number = 1;
    total: number = 10;
}
class q8TableValues {
    commentQ81: string;
    statusQ81: boolean = true;
    percentQ81: number = 1;
    commentQ82: string;
    statusQ82: boolean = true;
    percentQ82: number = 1;
    commentQ83: string;
    statusQ83: boolean = true;
    percentQ83: number = 1;
    commentQ84: string;
    statusQ84: boolean = true;
    percentQ84: number = 1;
    commentQ85: string;
    statusQ85: boolean = true;
    percentQ85: number = 1;
    commentQ86: string;
    statusQ86: boolean = true;
    percentQ86: number = 1;
    commentQ87: string;
    statusQ87: boolean = true;
    percentQ87: number = 1;
    commentQ88: string;
    statusQ88: boolean = true;
    percentQ88: number = 1;
    commentQ89: string;
    statusQ89: boolean = true;
    percentQ89: number = 1;
    total: number = 9;
}
class q9TableValues {
    commentQ91: string;
    statusQ91: boolean = true;
    percentQ91: number = 1;
    commentQ92: string;
    statusQ92: boolean = true;
    percentQ92: number = 1;
    commentQ93: string;
    statusQ93: boolean = true;
    percentQ93: number = 1;
    commentQ94: string;
    statusQ94: boolean = true;
    percentQ94: number = 1;
    total: number = 4;
}
class q10TableValues {
    commentQ101: string;
    statusQ101: boolean = true;
    percentQ101: number = 1;
    commentQ102: string;
    statusQ102: boolean = true;
    percentQ102: number = 1;
    commentQ103: string;
    statusQ103: boolean = true;
    percentQ103: number = 1;
    commentQ104: string;
    statusQ104: boolean = true;
    percentQ104: number = 1;
    commentQ105: string;
    statusQ105: boolean = true;
    percentQ105: number = 1;
    commentQ106: string;
    statusQ106: boolean = true;
    percentQ106: number = 0.5;
    commentQ107: string;
    statusQ107: boolean = true;
    percentQ107: number = 1;
    commentQ108: string;
    statusQ108: boolean = true;
    percentQ108: number = 0.5;
    commentQ109: string;
    statusQ109: boolean = true;
    percentQ109: number = 0.5;
    commentQ1010: string;
    statusQ1010: boolean = true;
    percentQ1010: number = 0.5;
    commentQ1011: string;
    statusQ1011: boolean = true;
    percentQ1011: number = 1;
    commentQ1012: string;
    statusQ1012: boolean = true;
    percentQ1012: number = 1;
    total: number = 10;
}
class q11TableValues {
    commentQ111: string;
    statusQ111: boolean = true;
    percentQ111: number = 1;
    commentQ112: string;
    statusQ112: boolean = true;
    percentQ112: number = 1;
    commentQ113: string;
    statusQ113: boolean = true;
    percentQ113: number = 1;
    commentQ114: string;
    statusQ114: boolean = true;
    percentQ114: number = 2;
    commentQ115: string;
    statusQ115: boolean = true;
    percentQ115: number = 2;
    total: number = 7;
}
class q12TableValues {
    commentQ121: string;
    statusQ121: boolean = true;
    percentQ121: number = 2;
    commentQ122: string;
    statusQ122: boolean = true;
    percentQ122: number = 1;
    commentQ123: string;
    statusQ123: boolean = true;
    percentQ123: number = 1;
    commentQ124: string;
    statusQ124: boolean = true;
    percentQ124: number = 1;
    commentQ125: string;
    statusQ125: boolean = true;
    percentQ125: number = 2;
    commentQ126: string;
    statusQ126: boolean = true;
    percentQ126: number = 2;
    commentQ127: string;
    statusQ127: boolean = true;
    percentQ127: number = 2;
    total: number = 11;
}
class q13TableValues {
    commentQ131: string;
    statusQ131: boolean = true;
    percentQ131: number = 1;
    commentQ132: string;
    statusQ132: boolean = true;
    percentQ132: number = 0.5;
    commentQ133: string;
    statusQ133: boolean = true;
    percentQ133: number = 1;
    commentQ134: string;
    statusQ134: boolean = true;
    percentQ134: number = 1;
    commentQ135: string;
    statusQ135: boolean = true;
    percentQ135: number = 1;
    commentQ136: string;
    statusQ136: boolean = true;
    percentQ136: number = 1;
    commentQ137: string;
    statusQ137: boolean = true;
    percentQ137: number = 1;
    commentQ138: string;
    statusQ138: boolean = true;
    percentQ138: number = 0.5;
    commentQ139: string;
    statusQ139: boolean = true;
    percentQ139: number = 0.5;
    commentQ1310: string;
    statusQ1310: boolean = true;
    percentQ1310: number = 0.5;
    commentQ1311: string;
    statusQ1311: boolean = true;
    percentQ1311: number = 0.5;
    commentQ1312: string;
    statusQ1312: boolean = true;
    percentQ1312: number = 0.5;
    total: number = 9;
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

class formValuesFour {
    heightFenceText: string;
    fenceFacility: boolean = false;
    fenceFacilityText: string;
    lightingFence: boolean = false;
    lightingFenceText: string;
    fenceLanyardText: string;
    alarmFence: boolean = false;
    alarmFenceText: string;
    barrierFence: boolean = false;
    barrierFenceText: string;
    weakness: string;
}

class formValuesFive {
    useGate: string;
    gateFacility: string;
    protectionPortal: string;
    guarding: string;
    unauthorizedText: string;
    unauthorized: boolean = false;
    warningSignsText: string;
    warningSigns: boolean = false;
    emergencyPortalText: string;
    emergencyPortal: boolean = false;
    eveningHourText: string;
    eveningHour: boolean = false;
    vehicleInspectionText: string;
    vehicleInspection: boolean = false;
    weakness: string;
}

class formValuesSix {
    visitorsParking: string;
    parkingSpaces: boolean = false;
    parkingSpacesText: string;
    parkingNumbers: string;
    outdoorParking: string;
    indoorParking: boolean = false;
    indoorParkingText: string;
    distanceIndoor: string;
    lightingParking: boolean = false;
    lightingParkingText: string;
    weakness: string;
}

class formValuesSeven {
    receptionBuildingSecured: boolean = false;
    receptionBuildingSecuredText: string;
    buildingToReceive: boolean = false;
    buildingToReceiveText: string;
    systemOfEntry: boolean = false;
    systemOfEntryText: string;
    recordsOfMall: boolean = false;
    recordsOfMallText: string;
    mechanismForSearching: string;
    weakness: string;
}

class formValuesEight {
    externalService: boolean = false;
    externalServiceText: string;
    buildingForExternal: boolean = false;
    buildingForExternalText: string;
    entryAndExit: boolean = false;
    entryAndExitText: string;
    material: boolean = false;
    materialText: string;
    mallSearched: boolean = false;
    mallSearchedText: string;
    weakness: string;
}

class formValuesNine {
    perimeterSecured: boolean = false;
    perimeterSecuredText: string;
    adequateLighting: boolean = false;
    adequateLightingText: string;
    internalPath: boolean = false;
    internalPathText: string;
    vehiclesSecured: boolean = false;
    vehiclesSecuredText: string;
    rightVision: boolean = false;
    rightVisionText: string;
    assemblyPoint: boolean = false;
    assemblyPointText: string;
    weakness: string;
}

class formValuesTen {}

class formValuesEleven {}

class formValuesTwelve {}

class formValuesThirteen {}

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
    // public signedApplicationTwo: Array<any> = [];
    // public signedApplicationThree: Array<any> = [];
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
    formValuesFour: formValuesFour = new formValuesFour();
    formValuesFive: formValuesFive = new formValuesFive();
    formValuesSix: formValuesSix = new formValuesSix();
    formValuesSeven: formValuesSeven = new formValuesSeven();
    formValuesEight: formValuesEight = new formValuesEight();
    formValuesNine: formValuesNine = new formValuesNine();
    formValuesTen: formValuesTen = new formValuesTen();
    formValuesEleven: formValuesEleven = new formValuesEleven();
    formValuesTwelve: formValuesTwelve = new formValuesTwelve();
    formValuesThirteen: formValuesThirteen = new formValuesThirteen();

    q1TableValues: q1TableValues = new q1TableValues();
    q2TableValues: q2TableValues = new q2TableValues();
    q3TableValues: q3TableValues = new q3TableValues();
    q4TableValues: q4TableValues = new q4TableValues();
    q5TableValues: q5TableValues = new q5TableValues();
    q6TableValues: q6TableValues = new q6TableValues();

    q7TableValues: q7TableValues = new q7TableValues();
    q8TableValues: q8TableValues = new q8TableValues();
    q9TableValues: q9TableValues = new q9TableValues();
    q10TableValues: q10TableValues = new q10TableValues();
    q11TableValues: q11TableValues = new q11TableValues();
    q12TableValues: q12TableValues = new q12TableValues();
    q13TableValues: q13TableValues = new q13TableValues();

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
                        this.q1TableValues = JSON.parse(getString('Q1Percentages'));
                    }

                    if (q == "Q2" && getString(q)) {
                        const answers: formValuesTwo = JSON.parse(getString(q));
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
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

                        //Q1Percentages
                        this.q2TableValues = JSON.parse(getString('Q2Percentages'));
                    }

                    if (q == "Q3" && getString(q)) {
                        const answers: formValuesThree = JSON.parse(getString(q));
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
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
                        this.q3TableValues = JSON.parse(getString('Q3Percentages'));
                    }

                    if (q == "Q4" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesFour = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q4TableValues = JSON.parse(getString('Q4Percentages'));
                    }

                    if (q == "Q5" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesFive = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q5TableValues = JSON.parse(getString('Q5Percentages'));
                    }

                    if (q == "Q6" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesSix = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q6TableValues = JSON.parse(getString('Q6Percentages'));
                    }

                    if (q == "Q7" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesSeven = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q7TableValues = JSON.parse(getString('Q7Percentages'));
                    }

                    if (q == "Q8" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesEight = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q8TableValues = JSON.parse(getString('Q8Percentages'));
                    }

                    if (q == "Q9" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesNine = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q9TableValues = JSON.parse(getString('Q9Percentages'));
                    }

                    if (q == "Q10" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesNine = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q10TableValues = JSON.parse(getString('Q10Percentages'));
                    }

                    if (q == "Q11" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesEleven = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q11TableValues = JSON.parse(getString('Q11Percentages'));
                    }

                    if (q == "Q12" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesEleven = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q12TableValues = JSON.parse(getString('Q12Percentages'));
                    }

                    if (q == "Q13" && getString(q)) {
                        if (getString(this.category + '_images')) {
                            const documents = JSON.parse(getString(this.category + '_images'));
                            this.documents = documents;
                            documents.forEach((item, index: number) => {
                                this.signedApplication.push(item.image);
                            });
                        }
                        this.formValuesThirteen = JSON.parse(getString(q));
                        this.weakness = true;
                        this.q13TableValues = JSON.parse(getString('Q13Percentages'));
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

        if (match == 'Q2') {
            this.q2TableValues[key] = args.value;
            if (args.value) {
                this.q2TableValues[pMatch] = percent;
            } else {
                this.q2TableValues[pMatch] = 0;
            }
            this.q2TableValues['total'] = this.q2TableValues['percentQ21'] + this.q2TableValues['percentQ22'] + this.q2TableValues['percentQ23'] + this.q2TableValues['percentQ24'] + this.q2TableValues['percentQ25'] + this.q2TableValues['percentQ26'] + this.q2TableValues['percentQ27'] + this.q2TableValues['percentQ28'] + this.q2TableValues['percentQ29'];
            console.log(this.q2TableValues);
        }
        //q3TableValues

        if (match == 'Q3') {
            this.q3TableValues[key] = args.value;
            if (args.value) {
                this.q3TableValues[pMatch] = percent;
            } else {
                this.q3TableValues[pMatch] = 0;
            }
            this.q3TableValues['total'] = this.q3TableValues['percentQ31'] + this.q3TableValues['percentQ32'] + this.q3TableValues['percentQ33'] + this.q3TableValues['percentQ34'] + this.q3TableValues['percentQ35'] + this.q3TableValues['percentQ36'] + this.q3TableValues['percentQ37'] + this.q3TableValues['percentQ38'] + this.q3TableValues['percentQ39'] + this.q3TableValues['percentQ310'] + this.q3TableValues['percentQ311'] + this.q3TableValues['percentQ312'] + this.q3TableValues['percentQ313'] + this.q3TableValues['percentQ314'];
            console.log(this.q3TableValues);
        }

        if (match == 'Q4') {
            this.q4TableValues[key] = args.value;
            if (args.value) {
                this.q4TableValues[pMatch] = percent;
            } else {
                this.q4TableValues[pMatch] = 0;
            }
            this.q4TableValues['total'] = this.q4TableValues['percentQ41'] + this.q4TableValues['percentQ42'] + this.q4TableValues['percentQ43'] + this.q4TableValues['percentQ44'] + this.q4TableValues['percentQ45'] + this.q4TableValues['percentQ46'] + this.q4TableValues['percentQ47'];
            console.log(this.q4TableValues);
        }

        if (match == 'Q5') {
            this.q5TableValues[key] = args.value;
            if (args.value) {
                this.q5TableValues[pMatch] = percent;
            } else {
                this.q5TableValues[pMatch] = 0;
            }
            this.q5TableValues['total'] = this.q5TableValues['percentQ51'] + this.q5TableValues['percentQ52'] + this.q5TableValues['percentQ53'] + this.q5TableValues['percentQ54'] + this.q5TableValues['percentQ55'] + this.q5TableValues['percentQ56'] + this.q5TableValues['percentQ57'] + this.q5TableValues['percentQ58'] + this.q5TableValues['percentQ59'] + this.q5TableValues['percentQ510'] + this.q5TableValues['percentQ511'] + this.q5TableValues['percentQ512'] + this.q5TableValues['percentQ513'] + this.q5TableValues['percentQ514'] + this.q5TableValues['percentQ515'];
            console.log(this.q5TableValues);
        }

        if (match == 'Q6') {
            this.q6TableValues[key] = args.value;
            if (args.value) {
                this.q6TableValues[pMatch] = percent;
            } else {
                this.q6TableValues[pMatch] = 0;
            }
            this.q6TableValues['total'] = this.q6TableValues['percentQ61'] + this.q6TableValues['percentQ62'] + this.q6TableValues['percentQ63'] + this.q6TableValues['percentQ64'];
            console.log(this.q6TableValues);
        }

        if (match == 'Q7') {
            this.q7TableValues[key] = args.value;
            if (args.value) {
                this.q7TableValues[pMatch] = percent;
            } else {
                this.q7TableValues[pMatch] = 0;
            }
            this.q7TableValues['total'] = this.q7TableValues['percentQ71'] + this.q7TableValues['percentQ72'] + this.q7TableValues['percentQ73'] + this.q7TableValues['percentQ74'] + this.q7TableValues['percentQ75'] + this.q7TableValues['percentQ76'] + this.q7TableValues['percentQ77'] + this.q7TableValues['percentQ78'] + this.q7TableValues['percentQ79'] + this.q7TableValues['percentQ710'];
            console.log(this.q7TableValues);
        }

        if (match == 'Q8') {
            this.q8TableValues[key] = args.value;
            if (args.value) {
                this.q8TableValues[pMatch] = percent;
            } else {
                this.q8TableValues[pMatch] = 0;
            }
            this.q8TableValues['total'] = this.q8TableValues['percentQ81'] + this.q8TableValues['percentQ82'] + this.q8TableValues['percentQ83'] + this.q8TableValues['percentQ84'] + this.q8TableValues['percentQ85'] + this.q8TableValues['percentQ86'] + this.q8TableValues['percentQ87'] + this.q8TableValues['percentQ88'] + this.q8TableValues['percentQ89'];
            console.log(this.q8TableValues);
        }

        if (match == 'Q9') {
            this.q9TableValues[key] = args.value;
            if (args.value) {
                this.q9TableValues[pMatch] = percent;
            } else {
                this.q9TableValues[pMatch] = 0;
            }
            this.q9TableValues['total'] = this.q9TableValues['percentQ91'] + this.q9TableValues['percentQ92'] + this.q9TableValues['percentQ93'] + this.q9TableValues['percentQ94'] ;
            console.log(this.q9TableValues);
        }

        if (match == 'Q10') {
            this.q10TableValues[key] = args.value;
            if (args.value) {
                this.q10TableValues[pMatch] = percent;
            } else {
                this.q10TableValues[pMatch] = 0;
            }
            this.q10TableValues['total'] = this.q10TableValues['percentQ101'] + this.q10TableValues['percentQ102'] + this.q10TableValues['percentQ103'] + this.q10TableValues['percentQ104'] + this.q10TableValues['percentQ105'] + this.q10TableValues['percentQ106'] + this.q10TableValues['percentQ107'] + this.q10TableValues['percentQ108'] + this.q10TableValues['percentQ109'] + this.q10TableValues['percentQ1010'] + this.q10TableValues['percentQ1011'] + this.q10TableValues['percentQ1012'];
            console.log(this.q10TableValues);
        }

        if (match == 'Q11') {
            this.q11TableValues[key] = args.value;
            if (args.value) {
                this.q11TableValues[pMatch] = percent;
            } else {
                this.q11TableValues[pMatch] = 0;
            }
            this.q11TableValues['total'] = this.q11TableValues['percentQ111'] + this.q11TableValues['percentQ112'] + this.q11TableValues['percentQ113'] + this.q11TableValues['percentQ114'] + this.q11TableValues['percentQ115'];
            console.log(this.q11TableValues);
        }

        if (match == 'Q12') {
            this.q12TableValues[key] = args.value;
            if (args.value) {
                this.q12TableValues[pMatch] = percent;
            } else {
                this.q12TableValues[pMatch] = 0;
            }
            this.q12TableValues['total'] = this.q12TableValues['percentQ121'] + this.q12TableValues['percentQ122'] + this.q12TableValues['percentQ123'] + this.q12TableValues['percentQ124'] + this.q12TableValues['percentQ125'] + this.q12TableValues['percentQ126'] + this.q12TableValues['percentQ127'];
            console.log(this.q12TableValues);
        }

        if (match == 'Q13') {
            this.q13TableValues[key] = args.value;
            if (args.value) {
                this.q13TableValues[pMatch] = percent;
            } else {
                this.q13TableValues[pMatch] = 0;
            }
            this.q13TableValues['total'] = this.q13TableValues['percentQ131'] + this.q13TableValues['percentQ132'] + this.q13TableValues['percentQ133'] + this.q13TableValues['percentQ134'] + this.q13TableValues['percentQ135'] + this.q13TableValues['percentQ136'] + this.q13TableValues['percentQ137'] + this.q13TableValues['percentQ138'] + this.q13TableValues['percentQ139'] + this.q13TableValues['percentQ1310'] + this.q13TableValues['percentQ1311'] + this.q13TableValues['percentQ1312'];
            console.log(this.q13TableValues);
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

    onCheckedChangeFour(args, key) {
        console.log(args.value);
        this.formValuesFour[key] = args.value;
    }

    onCheckedChangeFive(args, key) {
        console.log(args.value);
        this.formValuesFive[key] = args.value;
    }

    onCheckedChangeSix(args, key) {
        console.log(args.value);
        this.formValuesSix[key] = args.value;
    }

    onCheckedChangeSeven(args, key) {
        console.log(args.value);
        this.formValuesSeven[key] = args.value;
    }

    onCheckedChangeEight(args, key) {
        console.log(args.value);
        this.formValuesEight[key] = args.value;
    }

    onCheckedChangeNine(args, key) {
        console.log(args.value);
        this.formValuesNine[key] = args.value;
    }

    onCheckedChangeTen(args, key) {
        console.log(args.value);
        this.formValuesTen[key] = args.value;
    }

    onCheckedChangeEleven(args, key) {
        console.log(args.value);
        this.formValuesEleven[key] = args.value;
    }

    onCheckedChangeTwelve(args, key) {
        console.log(args.value);
        this.formValuesTwelve[key] = args.value;
    }

    onCheckedChangeThirteen(args, key) {
        console.log(args.value);
        this.formValuesThirteen[key] = args.value;
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

            if (this.category == "Q1") { setString(this.category, JSON.stringify(this.formValues)); setString('Q1Percentages', JSON.stringify(this.q1TableValues)); }
            if (this.category == "Q2") { setString(this.category, JSON.stringify(this.formValuesTwo)); setString('Q2Percentages', JSON.stringify(this.q2TableValues)); }
            if (this.category == "Q3") { setString(this.category, JSON.stringify(this.formValuesThree)); setString('Q3Percentages', JSON.stringify(this.q3TableValues)); }
            if (this.category == "Q4") { setString(this.category, JSON.stringify(this.formValuesFour)); setString('Q4Percentages', JSON.stringify(this.q4TableValues)); }
            if (this.category == "Q5") { setString(this.category, JSON.stringify(this.formValuesFive)); setString('Q5Percentages', JSON.stringify(this.q5TableValues)); }
            if (this.category == "Q6") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q6Percentages', JSON.stringify(this.q6TableValues)); }
            if (this.category == "Q7") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q7Percentages', JSON.stringify(this.q7TableValues)); }
            if (this.category == "Q8") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q8Percentages', JSON.stringify(this.q8TableValues)); }
            if (this.category == "Q9") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q9Percentages', JSON.stringify(this.q9TableValues)); }
            if (this.category == "Q10") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q10Percentages', JSON.stringify(this.q10TableValues)); }
            if (this.category == "Q11") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q11Percentages', JSON.stringify(this.q11TableValues)); }
            if (this.category == "Q12") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q12Percentages', JSON.stringify(this.q12TableValues)); }
            if (this.category == "Q13") { setString(this.category, JSON.stringify(this.formValuesSix)); setString('Q13Percentages', JSON.stringify(this.q13TableValues)); }

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
