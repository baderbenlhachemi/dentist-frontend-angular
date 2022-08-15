
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ChargeService } from 'src/app/core/service/charge.service';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  charge = {
    title: '',
    description: '',
    amount: '',
    date: '',
  };
  chargeForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    date: new FormControl('', [Validators.required]),
  });

  submitted: boolean = false;

  success = {
    message: '',
    chargeId: 0,
    chargeTitle: '',
  };

  constructor(
    private chargeService: ChargeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Get charge by id
    this.chargeService.get(id).subscribe((charge) => {
      this.charge = charge;
    });
  }

  updateCharge() {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

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
    this.chargeService.update(id, data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'charge updated successfully';
        this.success.chargeId = data.id;
        this.success.chargeTitle = data.title;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
