import { Component, OnInit } from '@angular/core';
import {MedicationService} from 'src/app/core/service/medication/medication.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  medication = {
    name:'',
    description:'',
  }

  submitted:boolean;
  success = {
    message: '',
    medicationName: ''
  };

  constructor(private MedicationService:MedicationService) { }
  ngOnInit(): void {}

  saveMedication(){
    const data ={
      name : this.medication.name,
      description : this.medication.description
    };

    this.MedicationService.create(data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Medication created successfully';
        this.success.medicationName = data.name;
        this.newMedication();
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  newMedication() {
    this.medication = {
      name:'',
      description:''
    };
  }

}
