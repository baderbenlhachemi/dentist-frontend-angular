import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConsultationService } from '../../../../core/service/consultation/consultation.service';
import { PatientService } from '../../../../core/service/patient.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-consultations',
  templateUrl: './consultations.component.html',
  styleUrls: ['./consultations.component.scss'],
})
export class ConsultationsComponent implements OnInit, OnDestroy {
  consultations: any[];
  patients: any[];

  success = {
    message: '',
  };

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private consultationService: ConsultationService,
    private patientService: PatientService
  ) {}

  ngOnInit(): void {
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
      this.dtTrigger.next(data);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
