import { Component, OnInit } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeaturedService } from "./featured.service";
import { isAvailable, requestCameraPermissions, takePicture } from '@nativescript/camera';
import {
    getString
} from "@nativescript/core/application-settings";

interface Item {
    id: number;
    name: string;
    role: string;
}

class RadioOption {
    text: string;
    selected: boolean = false;

    constructor(text: string) {
        this.text = text;
    }
}

@Component({
    selector: "Featured",
    templateUrl: "./featured.component.html"
})
export class FeaturedComponent implements OnInit {
    formGroup: FormGroup;
    checkTest: boolean;
    items: Item[];
    radioOptions?: Array<RadioOption>;


    constructor(
        private formBuilder: FormBuilder,
        private featuredService: FeaturedService
    ) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        console.log(getString('questions'));
        // Init your component properties here.
        this.formGroup = this.formBuilder.group({
            testCheck: [
                {
                    value: true,
                    disabled: false
                },
                [Validators.required]
            ]
        });

        this.items = this.featuredService.getItems();

        // Plain ol' inline Array definition coming up :)
        this.radioOptions = [
            new RadioOption('Radio option 1'),
            new RadioOption('Radio option 2'),
            new RadioOption('Radio option 3')
        ];
    }

    public checkedChange(modelRef) {
        console.log('checkedChange:', modelRef.checked);
    }

    public submit() {
        console.log('NgModel value:', this.checkTest);
        console.log(
            'Reactive FormGroup value:',
            this.formGroup.get('testCheck').value
        );
    }

    changeCheckedRadio(radioOption: RadioOption): void {
        radioOption.selected = !radioOption.selected;

        if (!radioOption.selected) {
            return;
        }

        // uncheck all other options
        this.radioOptions.forEach(option => {
            if (option.text !== radioOption.text) {
                option.selected = false;
            }
        });
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
