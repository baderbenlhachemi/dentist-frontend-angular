import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true,
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  {
    label: 'Dashboard',
    icon: 'fa-house-blank',
    link: '/admin/dashboard',
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  {
    label: 'Clinic',
    isTitle: true,
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  {
    label: 'Staffs',
    icon: 'fa-clipboard-user',
    subItems: [
      {
        label: 'List all',
        link: '/admin/staffs',
      },
      {
        label: 'Add new',
        link: '/admin/staffs/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Patients',
    icon: 'fa-hospital-user',
    subItems: [
      {
        label: 'List all',
        link: '/admin/patients',
      },
      {
        label: 'Add new',
        link: '/admin/patients/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  {
    label: 'Appointments',
    icon: 'fa-calendar-check',
    subItems: [
      {
        label: 'View calendar',
        link: '/admin/appointments/calendar',
      },
      {
        label: 'List all',
        link: '/admin/appointments',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  {
    label: 'Consultations',
    icon: 'fa-user-doctor-message',
    subItems: [
      {
        label: 'List all',
        link: '/admin/consultations',
      },
      {
        label: 'Add new',
        link: '/admin/consultations/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Acts',
    icon: 'fa-user-doctor-message',
    subItems: [
      {
        label: 'List all',
        link: '/admin/acts',
      },
      {
        label: 'Add new',
        link: '/admin/acts/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Medical Histories',
    icon: 'fa-files-medical',
    subItems: [
      {
        label: 'List all',
        link: '/admin/medical-histories',
      },
      {
        label: 'Add new',
        link: '/admin/medical-histories/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  // {
  //   label: 'Prescriptions',
  //   icon: 'fa-file-prescription',
  //   subItems: [
  //     {
  //       label: 'List all',
  //       link: '/admin/prescriptions',
  //     }
  //   ],
  // },
  {
    label: 'Medications',
    icon: 'fa-solid fa-briefcase-medical',
    subItems: [
      {
        label: 'List all',
        link: '/admin/medications',
      },
      {
        label: 'Add new',
        link: '/admin/medications/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Finance',
    isTitle: true,
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  },
  // {
  //   label: 'Invoices',
  //   icon: 'fa-file-invoice-dollar',
  //   subItems: [
  //     {
  //       label: 'List all',
  //       link: '/admin/invoices',
  //     },
  //     {
  //       label: 'Create',
  //       link: '/admin/invoices/create',
  //     },
  //   ],
  //   roles: ['ROLE_ADMIN', 'ROLE_DOCTOR', 'ROLE_SECRETARY'],
  // },
  {
    label: 'Incomes',
    icon: 'fa-down-to-bracket',
    subItems: [
      {
        label: 'List all',
        link: '/admin/incomes',
      },
      {
        label: 'Add new',
        link: '/admin/incomes/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Charges',
    icon: 'fa-up-from-bracket',
    subItems: [
      {
        label: 'List all',
        link: '/admin/charges',
      },
      {
        label: 'Add new',
        link: '/admin/charges/add',
      },
    ],
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Settings',
    isTitle: true,
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Clinic Settings',
    icon: 'fa-house-chimney-medical',
    link: '/admin/settings/clinic',
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
  {
    label: 'Website Settings',
    icon: 'fa-gear',
    link: '/admin/settings/website',
    roles: ['ROLE_ADMIN', 'ROLE_DOCTOR'],
  },
];
