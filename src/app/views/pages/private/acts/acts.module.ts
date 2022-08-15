import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActsComponent } from './acts.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AddComponent } from './add/add.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  {
    path: '',
    component: ActsComponent,
  },
  {
    path:'add',
    component: AddComponent
  },
  {
    path:'edit/:id',
    component: EditComponent
  },
  {
    path:'details/:id',
    component: DetailsComponent
  }
];

@NgModule({
  declarations: [ActsComponent, AddComponent, DetailsComponent, EditComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class ActsModule {}
