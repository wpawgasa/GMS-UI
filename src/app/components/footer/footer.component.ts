import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../../environments/environment';

@Component({
    selector   : 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls  : ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
    public appName: string = AppConfig.name;
    public appVersion: string = AppConfig.version;
    constructor() {
    }

    ngOnInit() {
    }

}
