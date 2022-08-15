import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PatientService } from 'src/app/core/service/patient.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
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
    //photo: new FormControl('', [Validators.required]),
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
    generatedPassword: '',
  };

  previewFile: string = 'assets/images/profiles/patients/default.png';

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {}

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

  savePatient() {
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

    this.patientService.create(data).subscribe({
      next: (data: any) => {
        console.log(data);

        this.submitted = true;

        this.success.message = 'Patient created successfully';
        this.success.patientId = data.id;
        this.success.patientName = data.lastName + ' ' + data.firstName;
        this.success.generatedPassword = data.generatedPassword;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newPatient() {
    this.submitted = false;
    this.patient = {
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
  }
}
