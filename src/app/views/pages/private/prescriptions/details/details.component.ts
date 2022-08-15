import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PrescriptionService } from 'src/app/core/service/prescription/prescription.service';
import { StorageService } from 'src/app/core/service/storage.service';
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  currentDate = new Date();
  medication_rules : any[];
  user : any;
  constructor(private prescriptionService:PrescriptionService , private route: ActivatedRoute ,private storageService: StorageService) { }

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    const id = Number(this.route.snapshot.paramMap.get('id')) as number;
    this.prescriptionService.getAllByPrescription(id).subscribe((data) => {
      this.medication_rules = data;
      console.log(data);
    });
  }

  print(){
    html2canvas(document.getElementById('prescription')!).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('l', 'mm', 'a4'); // A4 size page of PDF
      var width = pdf.internal.pageSize.getWidth();
      var height = canvas.height * width / canvas.width;
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height)
      pdf.save('prescription.pdf'); // Generated PDF
      });
  }

}
