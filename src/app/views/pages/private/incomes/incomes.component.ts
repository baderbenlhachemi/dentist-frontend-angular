import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IncomeService } from 'src/app/core/service/income.service';
import { jsPDF } from 'jspdf';
import  autoTable  from 'jspdf-autotable';

@Component({
  selector: 'app-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
})
export class IncomesComponent implements OnInit {
  // List of patients variable
  incomes: any[];
  incomeId: number;
  deleteIncome(id: number) {
    this.incomeService.delete(id).subscribe((data) => {
      this.incomes = this.incomes.filter((income) => income.id !== id);
    });
    this.ngOnInit();
  }
  printRecords() {
    const doc = new jsPDF();
    const head = [['ID', 'Title', 'Description', 'Amount', 'Date']];
    const rows:any[] = [];
    this.incomes.forEach((income) => {
      const row = [
        income.id,
        income.title,
        income.description,
        income.amount,
        income.date,
      ];
      rows.push(row);
    });
    autoTable(doc, {
      head: head,
      body: rows,
      didDrawCell: (data) => {},
    });
    doc.save('Incomes.pdf');
  }
      

  constructor(private incomeService: IncomeService) {}

  ngOnInit(): void {
    this.incomeService.getAll().subscribe((data) => {
      this.incomes = data;
    });
  }
}
