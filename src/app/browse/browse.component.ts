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
            "images": getString('Q1_images') ? JSON.parse(getString('Q1_images')) : null,
            "percentages": getString('Q1Percentages') ? JSON.parse(getString('Q1Percentages')) : null
        }, {
            "question": getString('Q2') ? JSON.parse(getString('Q2')) : null,
            "images": getString('Q2_images') ? JSON.parse(getString('Q2_images')) : null,
            "percentages": getString('Q2Percentages') ? JSON.parse(getString('Q2Percentages')) : null
        }, {
            "question": getString('Q3') ? JSON.parse(getString('Q3')) : null,
            "images": getString('Q3_images') ? JSON.parse(getString('Q3_images')) : null,
            "percentages": getString('Q3Percentages') ? JSON.parse(getString('Q3Percentages')) : null
        }, {
            "question": getString('Q4') ? JSON.parse(getString('Q4')) : null,
            "images": getString('Q4_images') ? JSON.parse(getString('Q4_images')) : null,
            "percentages": getString('Q4Percentages') ? JSON.parse(getString('Q4Percentages')) : null
        }, {
            "question": getString('Q5') ? JSON.parse(getString('Q5')) : null,
            "images": getString('Q5_images') ? JSON.parse(getString('Q5_images')) : null,
            "percentages": getString('Q5Percentages') ? JSON.parse(getString('Q5Percentages')) : null
        }, {
            "question": getString('Q6') ? JSON.parse(getString('Q6')) : null,
            "images": getString('Q6_images') ? JSON.parse(getString('Q6_images')) : null,
            "percentages": getString('Q6Percentages') ? JSON.parse(getString('Q6Percentages')) : null
        }, {
            "question": getString('Q7') ? JSON.parse(getString('Q7')) : null,
            "images": getString('Q7_images') ? JSON.parse(getString('Q7_images')) : null,
            "percentages": getString('Q7Percentages') ? JSON.parse(getString('Q7Percentages')) : null
        }, {
            "question": getString('Q8') ? JSON.parse(getString('Q8')) : null,
            "images": getString('Q8_images') ? JSON.parse(getString('Q8_images')) : null,
            "percentages": getString('Q8Percentages') ? JSON.parse(getString('Q8Percentages')) : null
        }, {
            "question": getString('Q9') ? JSON.parse(getString('Q9')) : null,
            "images": getString('Q9_images') ? JSON.parse(getString('Q9_images')) : null,
            "percentages": getString('Q9Percentages') ? JSON.parse(getString('Q9Percentages')) : null
        }, {
            "question": getString('Q10') ? JSON.parse(getString('Q10')) : null,
            "images": getString('Q10_images') ? JSON.parse(getString('Q10_images')) : null,
            "percentages": getString('Q10Percentages') ? JSON.parse(getString('Q10Percentages')) : null
        }, {
            "question": getString('Q11') ? JSON.parse(getString('Q11')) : null,
            "images": getString('Q11_images') ? JSON.parse(getString('Q11_images')) : null,
            "percentages": getString('Q11Percentages') ? JSON.parse(getString('Q11Percentages')) : null
        }, {
            "question": getString('Q12') ? JSON.parse(getString('Q12')) : null,
            "images": getString('Q12_images') ? JSON.parse(getString('Q12_images')) : null,
            "percentages": getString('Q12Percentages') ? JSON.parse(getString('Q12Percentages')) : null
        }, {
            "question": getString('Q13') ? JSON.parse(getString('Q13')) : null,
            "images": getString('Q13_images') ? JSON.parse(getString('Q13_images')) : null,
            "percentages": getString('Q13Percentages') ? JSON.parse(getString('Q13Percentages')) : null
        }, {
            "total": 0
        }];

        questions[13]['total'] = this.calculateTotal(questions);
        //const images = JSON.parse(getString('Q1_images'));
        // const base64 = images[0].image;
        // Init your component properties here.
        const graphwebview: WebView = this.webview.nativeElement;
        graphwebview.src = `~/jspdf/jspdf.html?${JSON.stringify(questions)}`;
    }

    calculateTotal(data) {
        let total = 0;
        if (data[0].percentages) { total += data[0].percentages.total; }
        if (data[1].percentages) { total += data[1].percentages.total; }
        if (data[2].percentages) { total += data[2].percentages.total; }
        if (data[3].percentages) { total += data[3].percentages.total; }
        if (data[4].percentages) { total += data[4].percentages.total; }
        if (data[5].percentages) { total += data[5].percentages.total; }
        if (data[6].percentages) { total += data[6].percentages.total; }
        if (data[7].percentages) { total += data[7].percentages.total; }
        if (data[8].percentages) { total += data[8].percentages.total; }
        if (data[9].percentages) { total += data[9].percentages.total; }
        if (data[10].percentages) { total += data[10].percentages.total; }
        if (data[11].percentages) { total += data[11].percentages.total; }
        if (data[12].percentages) { total += data[12].percentages.total; }
        return total;
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
        }, 1000);
        // console.log("MyPdfFileName", this.createIosPdf(webView, 'report'));
    }

    onDrawerButtonTap(): void {
        const sideDrawer = <RadSideDrawer>Application.getRootView();
        sideDrawer.showDrawer();
    }
}
