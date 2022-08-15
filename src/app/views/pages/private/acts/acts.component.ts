import { Component, OnInit, TemplateRef, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActService } from '../../../../core/service/act/act.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-acts',
  templateUrl: './acts.component.html',
  styleUrls: ['./acts.component.scss'],
})
export class ActsComponent implements OnInit, OnDestroy {
  acts: any[];
  deleted: boolean = false;

  success = {
    message: '',
  };

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(private actService: ActService, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.actService.getAll().subscribe((data: any) => {
      this.acts = data;
      this.dtTrigger.next(data);
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  deleteModal(content: TemplateRef<any>, id: number) {}
}
