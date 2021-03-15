import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { Application } from "@nativescript/core";
import { WebView, LoadEventData } from "@nativescript/core/ui/web-view";
import {
    getString,
    setString
} from "@nativescript/core/application-settings";
let webView: any;

@Component({
    selector: "Browse",
    templateUrl: "./browse.component.html"
})

export class BrowseComponent implements OnInit {
    @ViewChild("webview", { static: true }) webview: ElementRef;
    pageRenderer: any;
    pdfData: any;

    constructor() {
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void {
        console.log('getString', getString('Q1_images'))
        //const images = JSON.parse(getString('Q1_images'));
        // const base64 = images[0].image;
        // Init your component properties here.
        const graphwebview: WebView = this.webview.nativeElement;
        graphwebview.src = `~/jspdf/jspdf.html?${getString('Q1_images')}`;
    }

    createIosPdf(webView, fileName) {
        var originalBounds = webView.bounds;
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
            console.log("MyPdfFileName", this.createIosPdf(webView, 'report'));
        }, 2000)
        // console.log("MyPdfFileName", this.createIosPdf(webView, 'report'));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
