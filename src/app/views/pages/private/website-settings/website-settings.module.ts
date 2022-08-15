import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebsiteSettingsComponent } from './website-settings.component';
import { RouterModule, Routes } from '@angular/router';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [
  {
    path: '',
    component: WebsiteSettingsComponent,
  },
];

@NgModule({
  declarations: [WebsiteSettingsComponent],
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule.forChild(routes),
    TranslateModule,
  ],
})
export class WebsiteSettingsModule {}
