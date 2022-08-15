import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'planetDentist';

  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'fr', 'ar']);
    translate.setDefaultLang('en');

    const navigatorLang = navigator.language;

    translate.use(navigatorLang.match(/en|fr|ar/) ? navigatorLang : 'en');
  }
}
