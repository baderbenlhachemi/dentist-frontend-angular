import { Component, Inject, OnInit } from '@angular/core';
import { ConsultationService } from '../../../../../core/service/consultation/consultation.service';
import { DoctorInterventionService } from '../../../../../core/service/doctorIntervention/doctor-intervention.service';
import { ActService } from '../../../../../core/service/act/act.service';
import { PatientService } from '../../../../../core/service/patient.service';
import { AppointmentService } from '../../../../../core/service/appointment.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  patients: any[];
  acts: any[];
  appointments: any[];
  submitted: boolean = false;
  patient: any;
  countInterventions: number = 0;

  success = {
    message: 'Consultation added successfully',
  };
  consultation = {
    date: '',
    note: '',
    appointment: {
      id: null,
    },
  };
  selectedPersonId: string = '';
  constructor(
    private appointmentService: AppointmentService,
    private patientService: PatientService,
    @Inject(DOCUMENT) private document: Document,
    private actService: ActService,
    private consultationService: ConsultationService,
    private doctorInterventionService: DoctorInterventionService
  ) {}

  ngOnInit(): void {
    this.actService.getAll().subscribe((data) => {
      this.acts = data;
    });
    this.patientService.getAll().subscribe((data) => {
      this.patients = data;
      this.patients.map((patient: any) => {
        patient.full_name = patient.lastName + ' ' + patient.firstName;
        return patient;
      });
    });
  }

  submitConsultation() {
    const data = {
      date: this.consultation.date,
      note: this.consultation.note,
      appointment: {
        id: this.consultation.appointment.id,
      },
    };

    this.consultationService.create(data).subscribe({
      next: (data: any) => {
        for (let i = 1; i < this.countInterventions + 1; i++) {
          let planCategory = this.document!.getElementById(
            'planCategory' + i
          ) as HTMLInputElement;
          let workedOnTeeth = this.document!.getElementById(
            'workedOnTeeth' + i
          ) as HTMLInputElement;
          let note = this.document!.getElementById(
            'Note' + i
          ) as HTMLInputElement;
          let price = this.document!.getElementById(
            'Price' + i
          ) as HTMLInputElement;

          let dataIntervention = {
            consultation: {
              id: data.id,
            },
            act: {
              id: planCategory.value,
            },
            workedOnTeeth: workedOnTeeth.value,
            note: note.value,
            price: price.value,
          };

          console.log(dataIntervention);

          this.doctorInterventionService.create(dataIntervention).subscribe({
            next: (dt: any) => {
              console.log(dt);
            },
            error: (er: any) => {
              console.log(er);
            },
          });
        }
        this.submitted = true;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  changePatient() {
    if (this.patient) {
      this.appointmentService.getByPatient(this.patient).subscribe((data) => {
        this.appointments = data;
      });
    }
  }

  newIntervention() {
    this.countInterventions++;
    let div = this.document.createElement('div');
    div.className = 'row my-2';
    let options: string = '';
    for (const act of this.acts) {
      options += '<option  value=' + act.id + ' >' + act.label + '</option>';
    }
    div.innerHTML +=
      '<div class="col-md-3">\n' +
      '                      <label for="Note" class="form-label">Note </label>\n' +
      '                      <input type="text"\n' +
      '                             class="form-control"\n' +
      '                             id="Note' +
      this.countInterventions +
      '"\n' +
      '                             [name]="\'Note\'+index"\n' +
      '                             placeholder="Note"\n' +
      '                             required>\n' +
      '\n' +
      '                </div>\n' +
      '                <div class="col-md-3">\n' +
      '                  <label for="Note" class="form-label">Act</label>\n' +
      '                  <select class="form-select" id="planCategory' +
      this.countInterventions +
      '" [name]="\'act\'+index" >\n' +
      options +
      '                  </select>\n' +
      '\n' +
      '                </div>\n' +
      '                <div class="col-md-3">\n' +
      '                  <label for="workedOnTeeth" class="form-label">Worked on teeth</label>\n' +
      '                  <input type="text"\n' +
      '                         class="form-control"\n' +
      '             (change)="changeTeeth()"            id="workedOnTeeth' +
      this.countInterventions +
      '"\n' +
      '                         [name]="\'workedOnTeeth\' + index"\n' +
      '                         placeholder="workedOnTeeth"\n' +
      '                         required>\n' +
      '\n' +
      '                </div>\n' +
      '                <div class="col-md-3">\n' +
      '                  <label for="Price" class="form-label">Price</label>\n' +
      '                  <input type="number"\n' +
      '                         class="form-control"\n' +
      '                         id="Price' +
      this.countInterventions +
      '"\n' +
      '                         [name]="\'Price\'+index"\n' +
      '                         placeholder="Price"\n' +
      '                         required>\n' +
      '\n' +
      '                </div>';
    this.document!.getElementById('inter')!.appendChild(div);
  }
}
