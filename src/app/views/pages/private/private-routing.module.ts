import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { BaseComponent } from '../../layout/base/base.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: BaseComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ROLE_SUPER_ADMIN',
            'ROLE_ADMIN',
            'ROLE_DOCTOR',
            'ROLE_SECRETARY',
          ],
        },
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'staffs',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./staffs/staffs.module').then((m) => m.StaffsModule),
      },
      {
        path: 'patients',
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ROLE_SUPER_ADMIN',
            'ROLE_ADMIN',
            'ROLE_DOCTOR',
            'ROLE_SECRETARY',
          ],
        },
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'appointments',
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ROLE_SUPER_ADMIN',
            'ROLE_ADMIN',
            'ROLE_DOCTOR',
            'ROLE_SECRETARY',
          ],
        },
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'consultations',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./consultations/consultations.module').then(
            (m) => m.ConsultationsModule
          ),
      },
      {
        path: 'acts',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./acts/acts.module').then((m) => m.ActsModule),
      },
      {
        path: 'medical-histories',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./medical-histories/medical-histories.module').then(
            (m) => m.MedicalHistoriesModule
          ),
      },
      {
        path: 'prescriptions',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./prescriptions/prescriptions.module').then(
            (m) => m.PrescriptionsModule
          ),
      },
      {
        path: 'medications',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./medications/medications.module').then(
            (m) => m.MedicationsModule
          ),
      },
      {
        path: 'invoices',
        canActivate: [AuthGuard],
        data: {
          roles: [
            'ROLE_SUPER_ADMIN',
            'ROLE_ADMIN',
            'ROLE_DOCTOR',
            'ROLE_SECRETARY',
          ],
        },
        loadChildren: () =>
          import('./invoices/invoices.module').then((m) => m.InvoicesModule),
      },
      {
        path: 'incomes',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./incomes/incomes.module').then((m) => m.IncomesModule),
      },
      {
        path: 'charges',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./charges/charges.module').then((m) => m.ChargesModule),
      },
      {
        path: 'settings/clinic',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./clinic-settings/clinic-settings.module').then(
            (m) => m.ClinicSettingsModule
          ),
      },
      {
        path: 'settings/website',
        canActivate: [AuthGuard],
        data: {
          roles: ['ROLE_SUPER_ADMIN', 'ROLE_ADMIN', 'ROLE_DOCTOR'],
        },
        loadChildren: () =>
          import('./website-settings/website-settings.module').then(
            (m) => m.WebsiteSettingsModule
          ),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivateRoutingModule {}
