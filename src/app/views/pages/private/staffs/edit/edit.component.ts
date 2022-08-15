import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { StaffService } from 'src/app/core/service/staff.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
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
  };

  staffForm = new FormGroup({
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
    staffId: 0,
    staffName: '',
  };

  previewFile: string = 'assets/images/profiles/staffs/default.png';

  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Get staff by id
    this.staffService.get(id).subscribe((staff) => {
      this.staff = staff;
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

  updateStaff() {
    // Get id from url
    const id = Number(this.route.snapshot.paramMap.get('id')) as number;

    // Change date from Json to yyyy-MM-dd
    const birthday = JSON.parse(JSON.stringify(this.staff.birthday));

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
    });

    if (!this.staffForm.valid) {
      console.log('Form is not valid');
      return;
    }

    const data = this.staffForm.value;

    this.staffService.update(id, data).subscribe({
      next: (data: any) => {
        this.submitted = true;
        this.success.message = 'Staff updated successfully';
        this.success.staffId = data.id;
        this.success.staffName = data.firstName + ' ' + data.lastName;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
