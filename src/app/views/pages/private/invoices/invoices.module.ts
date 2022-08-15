import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoicesComponent } from '../invoices/invoices.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  {
    path: '',
    component: InvoicesComponent,
  },
  {
    path: 'create',
    component: CreateComponent,
  },
];

@NgModule({
  declarations: [InvoicesComponent, CreateComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class InvoicesModule {}
