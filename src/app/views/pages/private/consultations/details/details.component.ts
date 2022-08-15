import {Component, ElementRef, Inject, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConsultationService} from "../../../../../core/service/consultation/consultation.service";
import {DoctorInterventionService} from "../../../../../core/service/doctorIntervention/doctor-intervention.service";
import {PatientService} from "../../../../../core/service/patient.service";
import {Subject} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit, OnDestroy {

  defaultNavActiveId = 1;
  verticalNavCode: any;

  id:number=+(this.route.snapshot.paramMap.get('id')||0)
  consultations:any[];
  interventions:any[];
  firstName:any;
  lastName:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  deleted:boolean=false;



  success = {
    message: ''
  };

  constructor(@Inject(DOCUMENT) private document: Document,private route:ActivatedRoute,private consultationService:ConsultationService,private doctorInterventionService:DoctorInterventionService,private patientService:PatientService,private modalService: NgbModal) { }

  ngOnInit(): void {
    this.consultationService.getByPatient(this.id).subscribe((data)=>{
      this.consultations=data;
      this.dtTrigger.next(data);
    })
    this.patientService.get(this.id).subscribe((patient)=>{
      this.firstName=patient.firstName;
      this.lastName=patient.lastName;
    })

  }

  deleteModal(content: TemplateRef<any>,id:number) {
    this.modalService.open(content, {}).result.then((result) => {
      switch (result) {
        case 'delete':
          this.consultationService.delete(id).subscribe(
            (result) => {
              console.log(result);
              this.success.message='Act deleted successfully';
              this.deleted=true;

            },(err)=>{
              if(err.status==200){
                this.success.message='Act deleted successfully';
                this.deleted=true;
              }else{
                this.success.message='Act cannot be deleted !';
                this.deleted=true;
              }

            }
          )
          break;
      }
    }).catch((res) => {});
  }

  showInterventions(content: TemplateRef<any>,id:number) {
    this.doctorInterventionService.getByConsultation(id).subscribe((dt)=>{
      this.interventions=dt;
      for (const int of dt) {
        if(int.workedOnTeeth){
          this.document!.getElementById("Tooth"+int.workedOnTeeth)!.style.fill="#87ff9d";
        }
      }
    })


    this.modalService.open(content, {size: 'xl'}).result.then((result) => {

    }).catch((res) => {});
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
