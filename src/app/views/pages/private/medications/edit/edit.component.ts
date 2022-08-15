import { Component, OnInit } from '@angular/core';
import { MedicationService } from 'src/app/core/service/medication/medication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  
  medication = {
    name:'',
    description:''
  }

  submitted:boolean;
  success = {
    message: '',
    medicationName: '',
  };

  constructor(private MedicationService:MedicationService , private route: ActivatedRoute) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    this.MedicationService.get(id).subscribe((data) => {
      this.medication = data;
    });
  }

  updateMedication(){
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    const data ={
      name : this.medication.name,
      description : this.medication.description
    };

    this.MedicationService.update(id,data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Medication updated successfully';
        this.success.medicationName = data.name;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
