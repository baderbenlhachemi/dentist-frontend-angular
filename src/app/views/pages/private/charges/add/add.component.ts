import { ChargeService } from './../../../../../core/service/charge.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  charge = {
    title: '',
    description: '',
    amount: '',
    date: '',
  };

  submitted: boolean = false;

  success = {
    message: '',
    chargeId: 0,
    chargeTitle: '',
  };

  constructor(private chargeService: ChargeService) {}

  ngOnInit(): void {
  }
  chargeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  saveCharge() {
    const date = JSON.parse(JSON.stringify(this.charge.date));

    this.chargeForm.patchValue({
      date: date.year + '-' + date.month + '-' + date.day,
      title: this.charge.title,
      description: this.charge.description,
      amount: this.charge.amount,
    });
    if (!this.chargeForm.valid) {
      return;
    }
    const data = this.chargeForm.value;

    this.chargeService.create(data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Charge created successfully';
        this.success.chargeId = data.id;
        this.success.chargeTitle = data.title;

      },
      error: (err) => {
        console.log(err);
      },
    });
    this.newCharge();
  }

  newCharge() {
    this.submitted = false;
    this.charge = {
      title: '',
      description: '',
      amount: '',
      date: '',
    };
  }
}
