import { Component, OnInit } from '@angular/core';
import { ClinicSettingsService } from 'src/app/core/service/clinic-settings/clinic-settings.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
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
}
