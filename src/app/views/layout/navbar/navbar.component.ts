import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/core/service/storage.service';
import { AuthService } from '../../pages/private/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  user: any;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    public translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.user = this.storageService.getUser();

    this.changeLanguageDropdown(this.translate.currentLang);
  }

  switchLanguage(language: string) {
    this.changeLanguageDropdown(language);
    this.translate.use(language);
  }

  changeLanguageDropdown(language: string) {
    let flagImage = this.document.getElementById(
      'flagImage'
    ) as HTMLImageElement;
    let languageText = this.document.getElementById(
      'languageText'
    ) as HTMLSpanElement;
    switch (language) {
      case 'en':
        flagImage.src = 'assets/images/flags/us.svg';
        languageText.innerHTML = 'English';
        break;
      case 'fr':
        flagImage.src = 'assets/images/flags/fr.svg';
        languageText.innerHTML = 'Français';
        break;
      case 'ar':
        flagImage.src = 'assets/images/flags/ma.svg';
        languageText.innerHTML = 'عربي';
        break;
      default:
        flagImage.src = 'assets/images/flags/us.svg';
        languageText.innerHTML = 'English';
        break;
    }
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    this.authService.logout().subscribe({
      next: (res) => {
        console.log(res);
        this.storageService.clean();
      },
      error: (err) => {
        console.log(err);
      },
    });

    localStorage.removeItem('isLoggedin');

    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/admin/login']);
    }
  }
}
