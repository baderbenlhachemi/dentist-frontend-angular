import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffService } from 'src/app/core/service/staff.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  staff = {
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
    role: '',
  };

  staffForm = new FormGroup({
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
    roles: new FormControl('', [Validators.required]),
  });

  uploadForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required]),
  });

  submitted: boolean = false;

  success = {
    message: '',
    staffId: 0,
    staffName: '',
    generatedPassword: '',
  };

  previewFile: string = 'assets/images/profiles/staffs/default.png';

  constructor(private staffService: StaffService) {}

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

  saveStaff() {
    // Change date from Json to yyyy-MM-dd
    const birthday = JSON.parse(JSON.stringify(this.staff.birthday));

    let roles;

    if (this.staff.role === '1') {
      roles = [
        {
          id: 2,
          name: 'ROLE_ADMIN',
        },
        {
          id: 3,
          name: 'ROLE_DOCTOR',
        },
      ];
    } else if (this.staff.role === '2') {
      roles = [
        {
          id: 3,
          name: 'ROLE_DOCTOR',
        },
      ];
    } else {
      roles = [
        {
          id: 4,
          name: 'ROLE_SECRETARY',
        },
      ];
    }

    this.staffForm.patchValue({
      photo: this.uploadForm.value,
      firstName: this.staff.firstName,
      lastName: this.staff.lastName,
      gender: this.staff.gender,
      cin: this.staff.cin,
      email: this.staff.email,
      username: this.staff.email,
      birthday: birthday.year + '-' + birthday.month + '-' + birthday.day,
      address: this.staff.address,
      phoneNumber: this.staff.phoneNumber,
      roles: roles,
    });

    if (!this.staffForm.valid) {
      console.log('Form is not valid');
      return;
    }

    const data = this.staffForm.value;

    this.staffService.create(data).subscribe({
      next: (data: any) => {
        console.log(data);

        this.submitted = true;

        this.success.message = 'Staff created successfully';
        this.success.staffId = data.id;
        this.success.staffName = data.lastName + ' ' + data.firstName;
        this.success.generatedPassword = data.generatedPassword;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newStaff() {
    this.submitted = false;
    this.staff = {
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
      role: '',
    };
  }
}
