import { Component, OnInit } from '@angular/core';
import { MedicationService } from 'src/app/core/service/medication/medication.service';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  submitted: boolean = false;
  patients: any[];
  medications :any[];
  success = {
    message: '',
    patientId: 0,
    patientName: '',
  };
  constructor(private patientService: PatientService , private medicationService:MedicationService) { }

  ngOnInit(): void {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
    });
     this.medicationService.getAll().subscribe((data) => {
      this.medications = data;
    });
  }

}
