import { Component, HostBinding, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { appAnimations } from '../../animation';
// import { ConfigService } from '../../providers/config.service';
import { Subscription } from 'rxjs';
// import { filter } from 'rxjs/operators';


@Component({
    selector   : 'app-content',
    templateUrl: './content.component.html',
    styleUrls  : ['./content.component.scss'],
    animations : appAnimations
})
export class ContentComponent implements OnInit, OnDestroy {
    onSettingsChanged: Subscription;
    // settings: any;

    @HostBinding('@routerTransitionUp') routeAnimationUp = false;
    @HostBinding('@routerTransitionDown') routeAnimationDown = false;
    @HostBinding('@routerTransitionRight') routeAnimationRight = false;
    @HostBinding('@routerTransitionLeft') routeAnimationLeft = false;
    @HostBinding('@routerTransitionFade') routeAnimationFade = false;
    @Input() settings: any;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute
        // private config: ConfigService
    ) {
        // this.router.events
        //     .pipe(filter((event) => event instanceof NavigationEnd))
        //     .subscribe(() => {
        //         switch ( this.settings.routerAnimation ) {
        //             case 'fadeIn':
        //                 this.routeAnimationFade = !this.routeAnimationFade;
        //                 break;
        //             case 'slideUp':
        //                 this.routeAnimationUp = !this.routeAnimationUp;
        //                 break;
        //             case 'slideDown':
        //                 this.routeAnimationDown = !this.routeAnimationDown;
        //                 break;
        //             case 'slideRight':
        //                 this.routeAnimationRight = !this.routeAnimationRight;
        //                 break;
        //             case 'slideLeft':
        //                 this.routeAnimationLeft = !this.routeAnimationLeft;
        //                 break;
        //         }
        //     });

        // this.onSettingsChanged =
        //     this.config.onSettingsChanged
        //         .subscribe(
        //             (newSettings) => {
        //                 this.settings = newSettings;
        //             }
        //         );
    }

    ngOnInit() {
        // console.log('#####');
        // console.log(this.router.url);
        // if ( this.router.url !== '/main' && this.router.url !== '/main/dashboard') {
        //    this.getModule();
        // }
    }

    ngOnDestroy() {
        // this.onSettingsChanged.unsubscribe();
    }

    // getModule() {
    //     this.contentService.getModuleByPath(this.router.url).subscribe(
    //         module => {
    //             console.log(module);
    //         }
    //     );
    // }
}
