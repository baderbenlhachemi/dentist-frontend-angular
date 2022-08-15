import { Component, OnInit, TemplateRef } from '@angular/core';
import { MedicationService } from 'src/app/core/service/medication/medication.service';
import { PrescriptionService } from 'src/app/core/service/prescription/prescription.service';
import { ActivatedRoute } from '@angular/router';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  submitted: boolean = false;
  medications :any[];
  medication_rules: any[];

  success = {
    message: ''
  };

  Prescription = {
    consultation:{
      id : ''
    }
  }


  MedicationRules = {
    prescription:{
      id:''
    },
    medication:{
      id:''
    },
    timeRestriction:'',
    maxDrugUnits:'',
    minDrugUnits:'',
    foodRestriction:''
  }

  
  constructor(private prescriptionService:PrescriptionService ,private modalService: NgbModal, private medicationService:MedicationService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;
    this.prescriptionService.getAllByPrescription(id).subscribe((data) => {
      this.medication_rules = data;
      console.log(data);
    });

     this.medicationService.getAll().subscribe((data) => {
      this.medications = data;
    });
  }

  savePrescription(content: TemplateRef<any>){
    const idConsultation = Number(this.route.snapshot.paramMap.get('id')) as number;

    const dataPrescription = {
      consultation : {
        id : idConsultation
      }
    }
    
    this.modalService.open(content, {}).result.then((result) => {
      switch (result) {
        case 'save':
          this.prescriptionService.create(dataPrescription).subscribe({
            next: (data : any) => {
              
              const dataMedication ={
                prescription:{
                  id: data.id
                },
                medication:{
                  id:this.MedicationRules.medication.id
                },
                timeRestriction: this.MedicationRules.timeRestriction,
                maxDrugUnits: this.MedicationRules.maxDrugUnits,
                minDrugUnits: this.MedicationRules.minDrugUnits,
                foodRestriction: this.MedicationRules.foodRestriction
              }
              console.log(dataMedication);

            }
          });


          /*this.prescriptionService.createMedicationRule(dataMedication).subscribe({
            next: (data: any) => {
             this.submitted = true;
             this.success.message = 'Medication rule added successfully';
             this.newPrescription();
            },
            error : (err)=> {
              console.log(err);
            }
          });*/
        }
      }).catch((res) => {});
  }


  clicked:boolean = false;
  add(){
    if(this.clicked == false){
      this.clicked=true;
    }else
      this.clicked=false;
  }

  newPrescription(){
    this.MedicationRules = {
      prescription:{
        id:''
      },
      medication:{
        id:''
      },
      timeRestriction:'',
      maxDrugUnits:'',
      minDrugUnits:'',
      foodRestriction:''
    }
  }

}
