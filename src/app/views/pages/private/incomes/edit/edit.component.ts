import { IncomeService } from 'src/app/core/service/income.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  income = {
    title: '',
    description: '',
    amount: '',
    date: '',
  };
  incomeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  submitted: boolean = false;

  success = {
    message: '',
    incomeId: 0,
    incomeTitle: '',
  };

  constructor(
    private incomeService: IncomeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Get patient by id
    this.incomeService.get(id).subscribe((income) => {
      this.income = income;
    });
  }

  updateIncome() {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

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
    this.incomeService.update(id, data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Income updated successfully';
        this.success.incomeId = data.id;
        this.success.incomeTitle = data.title;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
