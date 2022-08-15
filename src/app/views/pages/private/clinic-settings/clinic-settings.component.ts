import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClinicSettingsService } from 'src/app/core/service/clinic-settings/clinic-settings.service';

@Component({
  selector: 'app-clinic-settings',
  templateUrl: './clinic-settings.component.html',
  styleUrls: ['./clinic-settings.component.scss'],
})
export class ClinicSettingsComponent implements OnInit {
  clinicId: number;

  clinicSettings = {
    name: '',
    description: '',
    logo: '',
    address: '',
    primaryPhone: '',
    secondaryPhone: '',
    email: '',
    websiteUrl: '',
    facebookUrl: '',
    twitterUrl: '',
    instagramUrl: '',
    youtubeUrl: '',
    linkedinUrl: '',
  };

  clinicSettingsForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    //logo: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    primaryPhone: new FormControl('', [Validators.required]),
    secondaryPhone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    websiteUrl: new FormControl('', [Validators.required]),
    facebookUrl: new FormControl('', []),
    twitterUrl: new FormControl('', []),
    instagramUrl: new FormControl('', []),
    youtubeUrl: new FormControl('', []),
    linkedinUrl: new FormControl('', []),
  });

  submitted: boolean;
  success = {
    message: '',
    medicationName: '',
  };

  constructor(private clinicSettingsService: ClinicSettingsService) {}

  ngOnInit(): void {
    this.clinicId = 1;

    this.clinicSettingsService.get(this.clinicId).subscribe({
      next: (data) => {
        this.clinicSettings = data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateClinicSettings() {
    this.clinicSettingsForm.patchValue({
      name: this.clinicSettings.name,
      description: this.clinicSettings.description,
      logo: this.clinicSettings.logo,
      address: this.clinicSettings.address,
      primaryPhone: this.clinicSettings.primaryPhone,
      secondaryPhone: this.clinicSettings.secondaryPhone,
      email: this.clinicSettings.email,
      websiteUrl: this.clinicSettings.websiteUrl,
      facebookUrl: this.clinicSettings.facebookUrl,
      twitterUrl: this.clinicSettings.twitterUrl,
      instagramUrl: this.clinicSettings.instagramUrl,
      youtubeUrl: this.clinicSettings.youtubeUrl,
      linkedinUrl: this.clinicSettings.linkedinUrl,
    });

    if (!this.clinicSettingsForm.valid) {
      this.submitted = false;
      return;
    }

    const data = this.clinicSettingsForm.value;

    this.clinicSettingsService.update(this.clinicId, data).subscribe({
      next: (data: any) => {
        this.submitted = true;

        this.success.message = 'Clinic settings updated successfully';
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
