import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application, alert } from "@nativescript/core";
import { WebView, LoadEventData } from "@nativescript/core/ui/web-view";
import {
    getString,
    setString
} from "@nativescript/core/application-settings";
import { LoaderService } from "../utils/index";

let webView: any;

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})

export class BrowseComponent implements OnInit {
    @ViewChild("webview", { static: true }) webview: ElementRef;
    pageRenderer: any;
    pdfData: any;

    constructor(private loaderService: LoaderService) {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        this.loaderService.show('Generating Report. Please wait...');
       // console.log('getString', getString('Q1_images'))
        const questions = [{
            "question": getString('Q1') ? JSON.parse(getString('Q1')) : null,
            "images": getString('Q1_images') ? JSON.parse(getString('Q1_images')) : null
        }, {
            "question": getString('Q2') ? JSON.parse(getString('Q2')) : null,
            "images": getString('Q2_images') ? JSON.parse(getString('Q2_images')) : null
        }, {
            "question": getString('Q3') ? JSON.parse(getString('Q3')) : null,
            "images": getString('Q3_images') ? JSON.parse(getString('Q3_images')) : null
        }];
        //const images = JSON.parse(getString('Q1_images'));
        // const base64 = images[0].image;
        // Init your component properties here.
        const graphwebview: WebView = this.webview.nativeElement;
        graphwebview.src = `~/jspdf/jspdf.html?${JSON.stringify(questions)}`;
    }

    createIosPdf(webView, fileName) {
        var originalBounds = webView.bounds;
        //console.log("webView.bounds.size.width", webView.bounds.size.width)
        webView.bounds = CGRectMake(originalBounds.origin.x, originalBounds.origin.y, webView.bounds.size.width, webView.scrollView.contentSize.height);
        var pdfPageSize = CGRectMake(0, 0, 612, 792);
        var pdfPageFrame = CGRectMake(32, 32, 612 - 32 - 32, 792 - 32 - 32);
        var printPageRenderer = new UIPrintPageRenderer();
        printPageRenderer.addPrintFormatterStartingAtPageAtIndex(webView.viewPrintFormatter(), 0);
        printPageRenderer.setValueForKey(NSValue.valueWithCGRect(pdfPageSize), 'paperRect');
        printPageRenderer.setValueForKey(NSValue.valueWithCGRect(pdfPageFrame), 'printableRect');
        webView.bounds = originalBounds;
        this.pageRenderer = printPageRenderer;
        this.generatePdfData();
        return this.saveWebViewPdf(fileName);
    }

    generatePdfData() {
        var printPageRenderer = this.pageRenderer;
        var pdfData = new NSMutableData({
            length: 10000
        });
        UIGraphicsBeginPDFContextToData(pdfData, printPageRenderer.paperRect, null);
        printPageRenderer.prepareForDrawingPages({
            location: 0, length: printPageRenderer.numberOfPages
        });
        var printRect = UIGraphicsGetPDFContextBounds();
        for (var pdfPage = 0; pdfPage < printPageRenderer.numberOfPages; pdfPage++) {
            UIGraphicsBeginPDFPage();
            printPageRenderer.drawPageAtIndexInRect(pdfPage, printRect);
        }
        UIGraphicsEndPDFContext();
        this.pdfData = pdfData;
    }

    saveWebViewPdf(fileName) {
        var paths = NSFileManager.defaultManager.URLsForDirectoryInDomains(9, 1);
        var docDirectoryPath = paths[0];
        var pdfPath = docDirectoryPath.URLByAppendingPathComponent(fileName + ".pdf");
        if (this.pdfData.writeToFileAtomically(pdfPath.path, true)) {
            return pdfPath.path;
        }
        else {
            return '';
        }
    }

    onWebViewLoaded(args: LoadEventData) {
        webView = (<WebView>args.object).nativeView;
        setTimeout(() => {
            const located = this.createIosPdf(webView, 'report');
            console.log("MyPdfFileName", located);
            this.loaderService.hide();
            alert({
                title: "PDF stored at",
                message: located,
                okButtonText: "OK"
            });
        }, 2000)
        // console.log("MyPdfFileName", this.createIosPdf(webView, 'report'));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
