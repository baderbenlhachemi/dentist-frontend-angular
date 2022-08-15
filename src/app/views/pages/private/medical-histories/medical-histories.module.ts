import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MedicalHistoriesComponent } from './medical-histories.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoriesComponent,
  },
];

@NgModule({
  declarations: [MedicalHistoriesComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class MedicalHistoriesModule {}
