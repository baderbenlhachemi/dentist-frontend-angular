import { IncomeService } from './../../../../../core/service/income.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  income = {
    title: '',
    description: '',
    amount: '',
    date: '',
  };

  submitted: boolean = false;

  success = {
    message: '',
    incomeId: 0,
    incomeTitle: '',
  };

  constructor(private incomeService: IncomeService) {}

  ngOnInit(): void {
  }
  incomeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  saveIncome() {
    const date = JSON.parse(JSON.stringify(this.income.date));

    this.incomeForm.patchValue({
      date: date.year + '-' + date.month + '-' + date.day,
      title: this.income.title,
      description: this.income.description,
      amount: this.income.amount,
    });
    if (!this.incomeForm.valid) {
      return;
    }
    const data = this.incomeForm.value;

    this.incomeService.create(data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Income created successfully';
        this.success.incomeId = data.id;
        this.success.incomeTitle = data.title;

      },
      error: (err) => {
        console.log(err);
      },
    });
    this.newIncome();
  }

  newIncome() {
    this.submitted = false;
    this.income = {
      title: '',
      description: '',
      amount: '',
      date: '',
    };
  }
}
