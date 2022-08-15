import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrescriptionsComponent } from './prescriptions.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: 'consultation/:id',
    component: PrescriptionsComponent,
  },
  {
    path: 'medication_rule/:id',
    component: AddComponent
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
  },
];

@NgModule({
  declarations: [PrescriptionsComponent, AddComponent, EditComponent, DetailsComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class PrescriptionsModule {}
