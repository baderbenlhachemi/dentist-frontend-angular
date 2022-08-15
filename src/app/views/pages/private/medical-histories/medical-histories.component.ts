import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedicalHistoryService } from 'src/app/core/service/medical-history/medical-history.service';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-medical-histories',
  templateUrl: './medical-histories.component.html',
  styleUrls: ['./medical-histories.component.scss'],
})
export class MedicalHistoriesComponent implements OnInit {
  patients: any[];
  patientsFilter: any[];
  selectedPatient: number = 0;

  filter: string;

  page = 1;

  patient = {
    id: 0,
    firstName: '',
    lastName: '',
    cin: '',
    birthday: '',
  };

  medicalHistory = {
    id: 0,
    patientId: 0,
    md1: '',
    md2: '',
    md3: '',
    md4: '',
    md5: '',
    md6: '',
    md7: '',
    md8: '',
    md9: '',
    md10: '',
    patient: '',
  };

  submitted: boolean = false;

  success = {
    message: '',
  };

  constructor(
    private patientService: PatientService,
    private medicalHistoryService: MedicalHistoryService
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

    // Get medical history

    this.medicalHistoryService.getByPatientId(patientId).subscribe({
      next: (data) => {
        console.log(data);
        this.medicalHistory = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateMedicalHistory() {
    if (!this.selectedPatient) return alert('Please select a patient');

    this.medicalHistoryService
      .update(this.medicalHistory.id, this.medicalHistory)
      .subscribe({
        next: (data) => {
          this.submitted = true;

          this.success.message = 'Médical history updated successfully';
          console.log(data);
        },
      });
  }
}
