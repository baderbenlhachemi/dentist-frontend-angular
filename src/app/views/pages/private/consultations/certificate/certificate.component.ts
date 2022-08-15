import { Component, OnInit } from '@angular/core';
import { ConsultationService } from 'src/app/core/service/consultation/consultation.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { ActivatedRoute } from '@angular/router';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent implements OnInit {
  user : any;
  Patient_firstName : any;
  Patient_lastName : any;
  Consultation_date : any;
  jours : any;


  constructor(private storageService: StorageService,private consultationService:ConsultationService, private route: ActivatedRoute ) { }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;
    this.user = this.storageService.getUser();

    this.consultationService.get(id).subscribe((data)=>{
      this.Patient_firstName=data.appointment.patient.firstName;
      this.Patient_lastName=data.appointment.patient.lastName;
      this.Consultation_date = data.date;
      })

    this.jours =  prompt("Jours du repos pour ce patient : ");
  }

  public convertToPDF(){
    html2canvas(document.getElementById('certicationMedicale')!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
      pdf.save('certification_medicale _'+this.Patient_firstName+' '+this.Patient_lastName+'.pdf'); // Generated PDF
      });
    }

}
