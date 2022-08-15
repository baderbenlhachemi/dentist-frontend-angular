import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationsComponent } from './consultations.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CertificateComponent } from './certificate/certificate.component';

const routes: Routes = [
  {
    path: '',
    component: ConsultationsComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
  {
    path: 'certification_medicale/:id',
    component: CertificateComponent,
  },
];

@NgModule({
  declarations: [
    ConsultationsComponent,
    AddComponent,
    DetailsComponent,
    EditComponent,
    CertificateComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbNavModule,
    NgSelectModule,
  ],
})
export class ConsultationsModule {}
