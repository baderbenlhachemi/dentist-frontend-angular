import { Component, OnInit, TemplateRef } from '@angular/core';
import { MedicationService } from 'src/app/core/service/medication/medication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
})
export class MedicationsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  success = {
    message: '',
    medicationName: '',
  };
  submitted: boolean;

  medications: any[];

  deleted: boolean = false;

  alert: String = '';

  constructor(
    private medicationService: MedicationService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.medicationService.getAll().subscribe((data) => {
      this.medications = data;
      this.dtTrigger.next(data);
    });
  }

  deleteMedication(content: TemplateRef<any>, id: number) {
    this.modalService
      .open(content, {})
      .result.then((result) => {
        switch (result) {
          case 'delete':
            this.medicationService.delete(id).subscribe(
              (result) => {
                this.success.message = 'Medication deleted successfully';
                this.alert = 'alert alert-success d-flex align-items-center';
                this.submitted = true;
                this.deleted = true;
                this.medicationService.getAll().subscribe((data) => {
                  this.medications = data;
                });
              },
              (err) => {
                if (err.status == 200) {
                  this.success.message = 'Medication deleted successfully';
                  this.alert = 'alert alert-success d-flex align-items-center';
                  this.submitted = true;
                  this.deleted = true;
                  this.medicationService.getAll().subscribe((data) => {
                    this.medications = data;
                  });
                } else {
                  this.success.message = 'Medication cannot be deleted !';
                  this.alert = 'alert alert-danger d-flex align-items-center';
                  this.submitted = true;
                  this.deleted = true;
                }
              }
            );
            break;
        }
      })
      .catch((res) => {});
  }
}
