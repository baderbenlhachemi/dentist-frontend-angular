import { EditComponent } from './edit/edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncomesComponent } from './incomes.component';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddComponent } from './add/add.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
const routes: Routes = [
  {
    path: '',
    component: IncomesComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'edit/:id',
    component: EditComponent,
  },
];

@NgModule({
  declarations: [IncomesComponent,AddComponent,EditComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
    NgbDatepickerModule,

  ],
})
export class IncomesModule {}
