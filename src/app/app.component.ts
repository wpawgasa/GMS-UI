import { HostBinding, Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { SplashScreenService } from './providers/splashscreen.service';
import { ConfigService } from './providers/config.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  onSettingsChanged: Subscription;
  appSettings: any;

  constructor(public electronService: ElectronService,
    private splashScreenService: SplashScreenService,
    private configService: ConfigService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private translate: TranslateService) {

    this.matIconRegistry.addSvgIcon(
      'apleaf',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/images/leaf.svg')
    );
    this.onSettingsChanged =
      this.configService.onSettingsChanged
        .subscribe(
            (newSettings) => {
                this.appSettings = newSettings;
            }
        );

    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }
  ngOnInit() {
    this.translate.setDefaultLang('en');
    // this.currentLanguage = 'th';

    // Use a language
    this.translate.use('en');
  }
}
