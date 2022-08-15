import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { BaseComponent } from '../../layout/public/base/base.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PatientComponent } from './patient/patient.component';

const routes: Routes = [
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
        loadChildren: () =>
          import('./landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
      {
        path: 'patient',
        component: PatientComponent,
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_PATIENT'],
        },
        loadChildren: () =>
          import('./patient/patient.module').then((m) => m.PatientModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
