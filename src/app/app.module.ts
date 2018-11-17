import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import '../polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FlexLayoutModule } from '@angular/flex-layout';

import { ElectronService } from './providers/electron.service';
import { SplashScreenService } from './providers/splashscreen.service';
import { ConfigService } from './providers/config.service';

import { WebviewDirective } from './directives/webview.directive';

import { AppComponent } from './app.component';
import { ContentComponent } from './components/contents/content.component';
import { TopBarComponent } from './components/topbar/topbar.component';
import { FooterComponent } from './components/footer/footer.component';

import { ContentModule } from './components/contents/content.module';


import { MatSidenavModule, MatToolbarModule, MatIconModule } from '@angular/material';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ContentComponent,
    TopBarComponent,
    FooterComponent,
    WebviewDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ContentModule,
    AppRoutingModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    NgbTooltipModule
  ],
  providers: [
    ElectronService,
    SplashScreenService,
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
