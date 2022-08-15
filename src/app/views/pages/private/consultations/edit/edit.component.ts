import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ConsultationService} from "../../../../../core/service/consultation/consultation.service";
import {DoctorInterventionService} from "../../../../../core/service/doctorIntervention/doctor-intervention.service";
import {ActService} from "../../../../../core/service/act/act.service";
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:string | number=this.route.snapshot.paramMap.get('id')||0
  consultation={
    id:+this.id,
    date:'',
    note:'',
    appointment:{
      id:null
    }
  }
  interventions:any[];
  acts:any[];
  submitted: boolean = false;

  success = {
    message: 'Consultation updated successfully',
    consultationId: this.consultation.id
  };


  constructor(@Inject(DOCUMENT) private document: Document,private actService:ActService,private route:ActivatedRoute,private consultationService:ConsultationService,private doctorInterventionService:DoctorInterventionService) { }

  ngOnInit(): void {
    this.consultationService.get(this.consultation.id).subscribe((result)=>{
      this.consultation.date=result.date;
      this.consultation.note=result.note;
      this.consultation.appointment.id=result.appointment.id;
    })
    this.drawTeeth()
    this.actService.getAll().subscribe((data)=>{
      this.acts=data;
    })
  }

  drawTeeth(){
    this.doctorInterventionService.getByConsultation(this.consultation.id).subscribe((result)=>{
      this.interventions=result;
      for(let i=1;i<33;i++){
        this.document!.getElementById("Tooth"+i)!.style.fill="#ffffff";
        console.log("mse7")
      }
      for (const int of this.interventions) {
        if(int.workedOnTeeth){
          this.document!.getElementById("Tooth"+int.workedOnTeeth)!.style.fill="#87ff9d";
        }
      }
    })
  }
  updateConsultation() {
    const dataConsultation={
      date:this.consultation.date,
      note:this.consultation.note,
      appointment: {
        id:this.consultation.appointment.id
      }
    }

    this.consultationService.update(this.consultation.id,dataConsultation).subscribe({
      next : (data:any)=>{
        this.submitted=true;
        this.success.consultationId = data.id;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    })

    for (const intervention of this.interventions) {
      const data={
        consultation: {
          id:this.consultation.id
        },
        act: {
          id:intervention.act.id
        },
        workedOnTeeth: intervention.workedOnTeeth,
        note: intervention.note,
        price:intervention.price
      }
      this.doctorInterventionService.update(intervention.id,data).subscribe({
        next:(data:any)=>{
          console.log(data)
          this.drawTeeth()
        },error:(err:any)=>{
          console.log(err)
        }
      })

    }
  }
}
