import { Component, OnInit } from '@angular/core';
import { PrescriptionService } from 'src/app/core/service/prescription/prescription.service';
import {Subject} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prescriptions',
  templateUrl: './prescriptions.component.html',
  styleUrls: ['./prescriptions.component.scss']
})
export class PrescriptionsComponent implements OnInit {
  submitted: boolean = false;
  prescriptions: any[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  success = {
    message: ''
  };

  constructor(private prescriptionsService : PrescriptionService, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    this.prescriptionsService.getByConsultation(id).subscribe((data) => {
      this.prescriptions = data;
      this.dtTrigger.next(data);
      console.log(data);
    });
  }
  
  clicked:boolean = false;
  add(){
    if(this.clicked == false){
      this.clicked=true;
    }else
      this.clicked=false;
  }
  
}
