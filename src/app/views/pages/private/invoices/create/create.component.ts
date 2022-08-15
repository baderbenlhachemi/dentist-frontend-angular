import { Component, OnInit } from '@angular/core';
import { ActService } from 'src/app/core/service/act/act.service';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent implements OnInit {
  patients: any[];
  patientsFilter: any[];
  selectedPatient: number = 0;

  acts: any[];

  filter: string;

  page = 1;

  patient = {
    id: 0,
    firstName: '',
    lastName: '',
    cin: '',
    birthday: '',
  };

  submitted: boolean = false;

  success = {
    message: '',
  };

  constructor(
    private patientService: PatientService,
    private actService: ActService
  ) {}

  ngOnInit(): void {
    // Fetch all patients
    this.patientService.getAll().subscribe({
      next: (data) => {
        this.patients = data;
        this.patientsFilter = data;
      },
    });
  }

  filterPatients() {
    this.patientsFilter = this.patients.filter((patient) => {
      // firstName or lastName or CIN
      return (
        patient.firstName.toLowerCase().includes(this.filter.toLowerCase()) ||
        patient.lastName.toLowerCase().includes(this.filter.toLowerCase()) ||
        patient.cin.toLowerCase().includes(this.filter.toLowerCase())
      );
    });

    this.page = 1;

    console.log(this.patientsFilter);
  }

  selectPatient(patientId: number) {
    this.selectedPatient = patientId;

    this.patient = this.patients.find((patient) => patient.id === patientId);

    // Get acts of patient
    this.actService.getAll().subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }
}
