import { LoadingIndicator, OptionsCommon, Mode } from "@nstudio/nativescript-loading-indicator";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class LoaderService {
    private loadingIndicator: LoadingIndicator; 
    
    constructor() {
        this.loadingIndicator = new LoadingIndicator();
        //loader:LoadingIndicator;
        // this.options = {
        //     color: "#999",
        //     progress: 0.65,
        //     android: {
        //         cancelable: false,
        //         cancelListener: function (dialog) {
        //             console.log('Loading cancelled');
        //         },
        //         max: 100,
        //         progressNumberFormat: "%1d/%2d",
        //         progressPercentFormat: 0.53,
        //         progressStyle: 1,
        //         secondaryProgress: 1
        //     },
        //     ios: {
        //         square: false,
        //     }
        // };
    }

    public show(message?: string, options?: any) {
        const defaultOptions: OptionsCommon = {
            message: message,
            dimBackground: true,
            color: '#000000',
            mode: Mode.Indeterminate,
            android: {
                cancelable: false,
            },
            ios: {
                square: false,
            },
        };
        this.loadingIndicator.show({
            ...defaultOptions,
            ...options,
        });
    }

    hide() {
        this.loadingIndicator.hide();
    }

    // show() {
    //     this.options.message = '';
    //     this.loader.show(this.options);
    // }

    // showMessageLoader() {
    //     this.options.message = 'Please wait, this may take a few minutes...';
    //     this.loader.show(this.options);
    // }
}