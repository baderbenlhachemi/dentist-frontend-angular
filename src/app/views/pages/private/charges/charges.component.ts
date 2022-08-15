import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ChargeService } from 'src/app/core/service/charge.service';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-charges',
  templateUrl: './charges.component.html',
  styleUrls: ['./charges.component.scss'],
})
export class ChargesComponent implements OnInit {
  // List of patients variable
  charges: any[];
  chargeId: number;
  deleteCharge(id: number) {
    this.chargeService.delete(id).subscribe((data) => {
      this.charges = this.charges.filter((charge) => charge.id !== id);
    });
    this.ngOnInit();
  }
  printRecords() {
    const doc = new jsPDF();
    const head = [['ID', 'Title', 'Description', 'Amount', 'Date']];
    const rows: any[] = [];
    this.charges.forEach((charge) => {
      const row = [
        charge.id,
        charge.title,
        charge.description,
        charge.amount,
        charge.date,
      ];
      rows.push(row);
    });
    autoTable(doc, {
      head: head,
      body: rows,
      didDrawCell: (data) => {},
    });
    doc.save('Charges.pdf');
  }

  constructor(private chargeService: ChargeService) {}

  ngOnInit(): void {
    this.chargeService.getAll().subscribe((data) => {
      this.charges = data;
      console.log(data);
    });
  }
}
