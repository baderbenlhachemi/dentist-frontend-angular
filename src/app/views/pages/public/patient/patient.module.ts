import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientComponent } from './patient.component';
import { ProfileComponent } from './profile/profile.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { ConsultationsComponent } from './consultations/consultations.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { BookComponent } from './appointments/book/book.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'appointments',
        component: AppointmentsComponent,
      },
      {
        path: 'appointments/book',
        component: BookComponent,
      },
      {
        path: 'consultations',
        component: ConsultationsComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    PatientComponent,
    ProfileComponent,
    AppointmentsComponent,
    ConsultationsComponent,
    BookComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgbDatepickerModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class PatientModule {}
