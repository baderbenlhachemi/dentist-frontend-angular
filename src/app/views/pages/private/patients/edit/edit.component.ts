import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  patient = {
    photo: '',
    firstName: '',
    lastName: '',
    gender: '',
    cin: '',
    email: '',
    username: '',
    password: '',
    birthday: '',
    address: '',
    phoneNumber: '',
  };

  patientForm = new FormGroup({
    photo: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    cin: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    birthday: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
  });

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required]),
  });

  submitted: boolean = false;

  success = {
    message: '',
    patientId: 0,
    patientName: '',
  };

  previewFile: string = 'assets/images/profiles/patients/default.png';

  constructor(
    private patientService: PatientService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Get patient by id
    this.patientService.get(id).subscribe((patient) => {
      this.patient = patient;
    });
  }

  onImageChange(e: any) {
    const reader = new FileReader();

    if (e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.previewFile = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result,
        });
      };
    }
  }

  updatePatient() {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Change date from Json to yyyy-MM-dd
    const birthday = JSON.parse(JSON.stringify(this.patient.birthday));

    this.patientForm.patchValue({
      photo: this.uploadForm.value,
      firstName: this.patient.firstName,
      lastName: this.patient.lastName,
      gender: this.patient.gender,
      cin: this.patient.cin,
      email: this.patient.email,
      username: this.patient.email,
      birthday: birthday.year + '-' + birthday.month + '-' + birthday.day,
      address: this.patient.address,
      phoneNumber: this.patient.phoneNumber,
    });

    if (!this.patientForm.valid) {
      console.log('Form is not valid');
      return;
    }

    const data = this.patientForm.value;

    this.patientService.update(id, data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Patient updated successfully';
        this.success.patientId = data.id;
        this.success.patientName = data.firstName + ' ' + data.lastName;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
