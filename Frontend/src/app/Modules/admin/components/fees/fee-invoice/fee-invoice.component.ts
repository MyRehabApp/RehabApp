import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GridComponent } from '@syncfusion/ej2-angular-grids';
import { PdfExportProperties } from '@syncfusion/ej2-grids';
import { Subscription } from 'rxjs';
import { AdminService } from '../../../admin.service';
import { FeeMaster } from '../../../models/fee-master';

@Component({
  selector: 'app-fee-invoice',
  templateUrl: './fee-invoice.component.html',
  styleUrls: ['./fee-invoice.component.scss']
})
export class FeeInvoiceComponent implements OnInit {

  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnDestroy(): void {
    this.requestSub.unsubscribe();
  }

  poId!: string
  companyName: string
  ngOnInit(): void {
    this.poId = this.route.snapshot.params['id'];

    let currentUserString = localStorage.getItem('token')
    let currentUser = JSON.parse(currentUserString)
    let comp = currentUser.company;
    this.adminService.getCompanyById(comp).subscribe(company =>{
      this.companyName = company.companyName;
    });

    this.getPOById();
  }

  fee: FeeMaster;
  requestSub!: Subscription;
  amount: any;
  getPOById(){
    this.requestSub = this.adminService.getFeeMasterById(this.poId).subscribe(data => {
      this.fee = data
    })
  }

  printDiv() {
    const divContents = document.getElementById("clinic_invoice")?.innerHTML;

    if (divContents) {
      const printWindow = window.open('', '', 'width=800,height=600');
      if (printWindow) {
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<style>');
        // Include your CSS styles here
        printWindow.document.write(`
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
      }

      .row {
        display: flex;
        flex-direction: row;

      }

      .col {
        flex: 1;
        margin-right: 20px;
        justify-content: space-around;
      }

      .col:last-child {
        margin-right: 0;
      }

      header {
          text-align: center;
          padding: 10px;
          background-color: #f2f2f2;
      }

      section {
          margin: 20px 0;
      }

      table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
      }

      th, td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
      }

      th {
          background-color: #f2f2f2;
      }

      .total {
          font-weight: bold;
      }

      footer {
          text-align: center;
          padding: 10px;
          background-color: #f2f2f2;
      }
        `);
        printWindow.document.write('</style></head><body>');
        printWindow.document.write(divContents);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
      }
    }
  }

  // calculateLineTotal(item: any): number {
  //   // Calculate line total for an item
  //   return item.quantity * item.unitPrice;
  // }
  // testData = {
  //   number: "123",
  //   seller: {
  //     name: "Next Step Webs, Inc.",
  //     road: "12345 Sunny Road",
  //     country: "Sunnyville, TX 12345",
  //   },
  //   buyer: {
  //     name: "Acme Corp.",
  //     road: "16 Johnson Road",
  //     country: "Paris, France 8060",
  //   },
  //   items: [
  //     {
  //       name: "Website design",
  //       price: 300,
  //     },
  //   ],
  // };

  @ViewChild("grid") grid!: GridComponent;
  public pdfExportProperties: PdfExportProperties | undefined;
  public toolbar: string[] | undefined;
  ngAfterViewInit(): void {
    this.toolbar = ["PdfExport"];
  }

  pdfprint = true;


  private getDate(): string {
    let date: string = "";
    date +=
      new Date().getMonth().toString() + "/" + new Date().getDate().toString();
    return (date += "/" + new Date().getFullYear().toString());
  }

  onPdfExport(args: any): void {
    args.item.width = 148; // Set the page size to 148 mm x 210 mm
  }

  print() {
    (this.grid as GridComponent).print();
  }

  private getPdfExportProperties(): any {
    return {
      pageSettings: {
        width: 80, // Specify the width in millimeters
        height: 52, // Specify the height in millimeters
      },
      header: {
        fromTop: 0,
        height: 120,
        contents: [
          {
            type: "Text",
            value: "INVOICE",
            position: { x: 280, y: 0 },
            style: { textBrushColor: "#C25050", fontSize: 25 },
          },
        ],
      },
      footer: {
        fromBottom: 160,
        height: 100,
        contents: [
          {
            type: "Text",
            value: "Thank you for your business !",
            position: { x: 250, y: 20 },
            style: { textBrushColor: "#C67878", fontSize: 14 },
          },
          {
            type: "Text",
            value: "! Visit Again hello !",
            position: { x: 300, y: 45 },
            style: { textBrushColor: "#C67878", fontSize: 14 },
          },
        ],
      },

      fileName: "pdfdocument.pdf",
    };
  }

  saveAndDownload(): void {
    // const ps = new ThermalPrinterManager();
    // ps.addLineWithClassName(`text-center font-bold`, `PURCHASE REQUEST`);
    // ps.addLineCenter(this.requests.store.storeName);
    // ps.addLineCenter(this.requests.store.storeLocation);

    // ps.addEmptyLine();

    // ps.addLine(`<div style="display: flex; justify-content: space-between;">RequestNo: <span>${this.requests.requestNo}</span></div>`);
    // ps.addLine(`<div style="display: flex; justify-content: space-between;">Date: <span>${this.requests.date}</span></div>`);
    // ps.addLine(`<div style="display: flex; justify-content: space-between;">SendBy: <span>${this.requests.user.name}</span></div>`);

    // ps.addEmptyLine();

    // // Table header
    // ps.addLine('<div style="display: flex; justify-content: space-between; font-weight: bold;">');
    // ps.addLine('<div style="flex: 1;">Product</div>');
    // ps.addLine('<div style="flex: 1;">Quantity</div>');
    // ps.addLine('<div style="flex: 1;">Unit</div>');
    // ps.addLine('</div>');
    // ps.addEmptyLine();

    // // Table rows
    // for (let i = 0; i < this.requestDetails.length; i++) {
    //   ps.addLine('<div style="display: flex; justify-content: space-between;">');
    //   ps.addLine(`<div style="flex: 1;">${this.requestDetails[i].product.productName}</div>`);
    //   ps.addLine(`<div style="flex: 1;">${this.requestDetails[i].quantity}</div>`);
    //   ps.addLine(`<div style="flex: 1;">${this.requestDetails[i].secondaryUnit.secondaryUnitName}</div>`);
    //   ps.addLine('</div>');
    // }


    // ps.addEmptyLine();
    // ps.addLine(`Ticket #1 - Walk-in`);
    // ps.print();
    // this.dirToPrint.print();
  }
}

class ThermalPrinterManager {
  // styles = StyleSheet.create({
  //   red: {
  //     backgroundColor: "red"
  //   },

  //   blue: {
  //     backgroundColor: "blue"
  //   },

  //   hovered: {
  //     backgroundColor: 'red',
  //   },

  //   // small: {
  //   //   "@media (max-width: 600px)": {
  //   //     backgroundColor: "red"
  //   //   }
  //   // }

  // });

  printContent = ``;

  addRawHtml(htmlEl: any) {
    this.printContent += `\n${htmlEl}`;
  }

  addLine(text: any) {
    this.addRawHtml(`<p>${text}</p>`);
  }

  addLineWithClassName(className: any, text: any) {
    this.addRawHtml(`<p class="${className}">${text}</p>`);
  }

  addEmptyLine() {
    this.addLine('----------------------------------------');
    this.addLine(`&nbsp;`);
  }

  addLineCenter(text: any) {
    this.addLineWithClassName("text-center", text);
  }

  print() {
    const printerWindow = window.open(``, `_blank`);
    const contentHeight = this.calculateContentHeight(); // Add a function to calculate content height


    printerWindow?.document.write(`
    <!DOCTYPE html>
    <html>

    <head>
      <title>Print</title>
      <style>

        html {
          padding: 0;
          margin: 0;
          font-family: monospace;
          width: 80mm;
        }

        body {
          margin: 0;
          padding: 8px;
        }

        p {
          margin-top: 0.25rem;
          margin-bottom: 0.25rem;
          white-space: pre-wrap;
        }

        .text-center {
          text-align: center;
        }

        .text-right {
          text-align: right;
        }

        .text-left {
          text-align: left;
        }

        .font-bold {
          font-weight: bold;
        }

        table {
          width: 100%;
        }

        tr, th, td {
          padding: 0;
        }

        .grid-line {
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;
          grid-column: span 3 / span 3;
        }

        .nowrap {
          overflow: hidden;
          text-overflow: clip;
          white-space: nowrap;
        }

        .col-span-2 {
          grid-column: span 2 / span 2;
        }

        .max-line-2 {
          max-height: ${contentHeight}px; /* Set to calculated content height */
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }

      </style>
      <script>
        window.onafterprint = event => {
          window.close();
        };
      </script>
    </head>

    <body>
      ${this.printContent}
    </body>


    </html>

    `);

    printerWindow?.document.close();
    printerWindow?.focus();
    printerWindow?.print();
    // mywindow.close();
  }

  calculateContentHeight() {
    // Add logic to calculate the content height dynamically
    // You may use document.body.scrollHeight or any other suitable method
    // Adjust this logic based on your specific requirements
    return document.body.scrollHeight;
  }
}
