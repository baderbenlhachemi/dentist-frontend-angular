import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  CalendarOptions,
  DateSelectArg,
  EventApi,
  EventClickArg,
} from '@fullcalendar/angular';
import { Draggable } from '@fullcalendar/interaction';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppointmentService } from 'src/app/core/service/appointment.service';
import { PatientService } from 'src/app/core/service/patient.service';
import { StaffService } from 'src/app/core/service/staff.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  // Add Appointment Modal
  @ViewChild('addAppointmentModal') addAppointmentModal: TemplateRef<any>;

  // Full Calendar Options
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,today,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'dayGridMonth',
    //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventStartEditable: false,
    eventDurationEditable: false,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };

  currentEvents: EventApi[] = [];

  // Pending appointments
  pendingAppointments: any[];

  // Accepted appointments
  acceptedAppointments: any[];

  // Completed appointments
  completedAppointments: any[];

  // Events
  acceptedEvents: any[];
  completedEvent: any;
  events: any[];

  page: number = 1;

  doctors: any[];
  patients: any[];

  doctor = {
    id: '',
  };

  hours = [
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
    '19:30',
    '20:00',
  ];

  addAppointment = {
    selectedDate: '',
    selectedHour: '',
    note: '',
    isUrgent: false,
    patient: {
      id: '',
    },
    doctor: {
      id: '',
    },
  };

  appointmentData = new FormGroup({
    id: new FormControl('', Validators.required),
    note: new FormControl('', Validators.required),
    status: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    patient: new FormControl('', Validators.required),
    doctor: new FormControl('', Validators.required),
  });

  constructor(
    private appoitmentService: AppointmentService,
    private staffService: StaffService,
    private patientService: PatientService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Get pending appointments
    console.log('Getting pending appointments');
    this.appoitmentService.getPendingAppointments().subscribe((data) => {
      console.log(data);
      this.pendingAppointments = data;
    });

    // Get Accepted appointments
    console.log('Getting accepted appointments');
    this.appoitmentService.getAcceptedAppointments().subscribe((data) => {
      console.log(data);
      this.acceptedAppointments = data;

      // Map accepted appointments to events
      this.acceptedEvents = this.acceptedAppointments.map((appointment) => {
        return {
          id: appointment.id,
          title:
            appointment.patient.lastName + ' ' + appointment.patient.firstName,
          start: new Date(appointment.date),
          color: '#ff0000',
          backgroundColor: 'rgba(0,204,204,.25)',
          borderColor: '#00cccc',
        };
      });

      // Add accepted events to events
      this.events = [...this.acceptedEvents];

      // Add events to calendar
      this.calendarOptions.events = this.events;
    });

    // Get Completed appointments
    console.log('Getting completed appointments');
    this.appoitmentService.getCompletedAppointments().subscribe((data) => {
      console.log(data);
      this.completedAppointments = data;

      // Map completed appointments to events
      this.completedEvent = this.completedAppointments.map((appointment) => {
        return {
          id: appointment.id,
          title:
            appointment.patient.lastName + ' ' + appointment.patient.firstName,
          start: new Date(appointment.date),
          color: '#00ff00',
          backgroundColor: 'rgba(0,204,204,.25)',
          borderColor: '#00cccc',
        };
      });

      // Add completed appointments to events
      this.events = [...this.events, ...this.completedEvent];

      // Add events to calendar
      this.calendarOptions.events = this.events;
    });

    // Get doctors
    console.log('Getting doctors');
    this.staffService.getAll().subscribe((data) => {
      // Get doctors
      this.doctors = data.filter((staff: any) =>
        // roles name is doctor
        staff.roles.some((role: any) => role.name === 'ROLE_DOCTOR')
      );

      // Create full name
      this.doctors.map((doctor) => {
        doctor.fullName = doctor.lastName + ' ' + doctor.firstName;
      });
    });

    // Get patients
    console.log('Getting patients');
    this.patientService.getAll().subscribe((data) => {
      // Get patients
      this.patients = data;
      // Create full name
      this.patients.map((patient) => {
        patient.fullName = patient.lastName + ' ' + patient.firstName;
      });
    });

    // For external-events dragging
    /*
    new Draggable(this.externalEvents.nativeElement, {
      itemSelector: '.fc-event',
      eventData: function (eventEl) {
        return {
          title: eventEl.innerText,
          backgroundColor: eventEl.getAttribute('bgColor'),
          borderColor: eventEl.getAttribute('bdColor'),
        };
      },
    });
    */
  }

  acceptAppointment(content: TemplateRef<any>, appointment: any) {
    this.modalService
      .open(content, { size: 'lg' })
      .result.then((result) => {
        switch (result) {
          case 'accept':
            // Check if doctor is selected
            if (this.doctor.id === '') {
              alert('Please select a doctor');
              return;
            }

            // Update appointment
            this.appointmentData.patchValue({
              id: appointment.id,
              note: appointment.note,
              status: 'ACCEPTED',
              date: appointment.date,
              patient: appointment.patient,
              doctor: {
                id: this.doctor.id,
              },
            });

            // Update appointment
            const data = this.appointmentData.value;

            console.log(data);

            // Update appointment
            this.appoitmentService.update(appointment.id, data).subscribe({
              next: (data) => {
                console.log(data);
                // Update calendar
                this.ngOnInit();
              },
            });

            break;
        }
      })
      .catch((res) => {});
    console.log('Accepting appointment');
  }

  rejectAppointment(content: TemplateRef<any>, appointment: any) {
    this.modalService.open(content, { size: 'lg' }).result.then((result) => {
      switch (result) {
        case 'reject':
          // Update appointment
          this.appointmentData.patchValue({
            id: appointment.id,
            note: appointment.note,
            status: 'REJECTED',
            date: appointment.date,
            patient: appointment.patient,
            doctor: null,
          });

          // Update appointment
          const data = this.appointmentData.value;

          console.log(data);

          // Update appointment
          this.appoitmentService.update(appointment.id, data).subscribe({
            next: (data) => {
              console.log(data);
              // Update calendar
              this.ngOnInit();
            },
          });

          break;
      }
    });
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const calendarApi = selectInfo.view.calendar;

    console.log(selectInfo);

    // Open modal
    this.modalService
      .open(this.addAppointmentModal, { size: 'lg' })
      .result.then((result) => {
        switch (result) {
          case 'add':
            // Add appointment
            this.appointmentData.patchValue({
              id: null,
              date:
                selectInfo.startStr + 'T' + this.addAppointment.selectedHour,
              patient: this.patients.find(
                (patient) => patient.id === this.addAppointment.patient.id
              ),
              doctor: this.doctors.find(
                (doctor) => doctor.id === this.addAppointment.doctor.id
              ),
              status: 'ACCEPTED',
              note: this.addAppointment.note,
              isUrgent: this.addAppointment.isUrgent ? true : false,
            });

            if (!this.appointmentData.valid) {
              alert('Please fill all the required fields');
              return;
            }

            const data = this.appointmentData.value;

            this.appoitmentService.create(data).subscribe({
              next: (data) => {
                console.log(data);
                // Update calendar
                this.ngOnInit();

                // Reset form
                this.appointmentData.reset();

                // Close modal
                this.modalService.dismissAll();
              },
            });

            break;
        }
      });

    calendarApi.unselect(); // clear date selection
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (
      confirm(
        `Are you sure you want to delete the event '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }
}
