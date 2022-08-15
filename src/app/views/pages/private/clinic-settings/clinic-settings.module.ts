import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClinicSettingsComponent } from './clinic-settings.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: ClinicSettingsComponent,
  },
];

@NgModule({
  declarations: [ClinicSettingsComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    RouterModule.forChild(routes),
    FormsModule,
    TranslateModule,
  ],
})
export class ClinicSettingsModule {}
