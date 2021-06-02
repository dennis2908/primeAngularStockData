import { Component, EventEmitter, Output, ViewChild, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, AnimationEvent } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';
import { AppConfigService } from './service/appconfigservice';
import { VersionService } from './service/versionservice';
import { AppConfig } from './domain/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-topbar',
    template: `
        <div class="layout-topbar">
            <ul #topbarMenu class="topbar-menu">
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 0)">Themes</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 0" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)">
                        <li class="topbar-submenu-header">THEMING</li>
                        <li><a [routerLink]="['/theming']"><i class="pi pi-fw pi-file"></i><span>Guide</span></a></li>
                        <li><a href="https://www.primefaces.org/designer/primeng"><i class="pi pi-fw pi-palette"></i><span>Designer</span></a></li>
                        <li><a href="https://www.primefaces.org/designer-ng"><i class="pi pi-fw pi-desktop"></i><span>Visual Editor</span></a></li>
                        <li><a [routerLink]="['/icons']"><i class="pi pi-fw pi-info-circle"></i><span>Icons</span></a></li>
                        <li><a href="https://www.figma.com/community/file/890589747170608208"><i class="pi pi-fw pi-pencil"></i><span>Figma UI Kit</span></a></li>

                        <li class="topbar-submenu-header">BOOTSTRAP</li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-light-blue', false)"><img src="assets/showcase/images/themes/bootstrap4-light-blue.svg" alt="Blue Light" /><span>Blue Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-light-purple', false)"><img src="assets/showcase/images/themes/bootstrap4-light-purple.svg" alt="Purple Light" /><span>Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-dark-blue', true)"><img src="assets/showcase/images/themes/bootstrap4-dark-blue.svg" alt="Blue Dark" /><span>Blue Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'bootstrap4-dark-purple', true)"><img src="assets/showcase/images/themes/bootstrap4-dark-purple.svg" alt="Purple Dark" /><span>Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">MATERIAL DESIGN</li>
                        <li><a (click)="changeTheme($event, 'md-light-indigo', false)"><img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Indigo Light" /><span>Indigo Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-light-deeppurple', false)"><img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Deep Purple Light" /><span>Deep Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-dark-indigo', true)"><img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Indigo Dark" /><span>Indigo Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'md-dark-deeppurple', true)"><img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Deep Purple Dark" /><span>Deep Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">MATERIAL DESIGN COMPACT</li>
                        <li><a (click)="changeTheme($event, 'mdc-light-indigo', false)"><img src="assets/showcase/images/themes/md-light-indigo.svg" alt="Indigo Light" /><span>Indigo Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-light-deeppurple', false)"><img src="assets/showcase/images/themes/md-light-deeppurple.svg" alt="Deep Purple Light" /><span>Deep Purple Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-dark-indigo', true)"><img src="assets/showcase/images/themes/md-dark-indigo.svg" alt="Indigo Dark" /><span>Indigo Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'mdc-dark-deeppurple', true)"><img src="assets/showcase/images/themes/md-dark-deeppurple.svg" alt="Deep Purple Dark" /><span>Deep Purple Dark</span></a></li>

                        <li class="topbar-submenu-header">FLUENT UI</li>
                        <li><a (click)="changeTheme($event, 'fluent-light', false)"><img src="assets/showcase/images/themes/fluent-light.png" alt="Fluent Light" /><span>Fluent Light</span></a></li>

                        <li class="topbar-submenu-header">PRIMEONE</li>
                        <li><a (click)="changeTheme($event, 'saga-blue', false)"><img src="assets/showcase/images/themes/saga-blue.png" alt="Saga Blue" /><span>Saga Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-green', false)"><img src="assets/showcase/images/themes/saga-green.png" alt="Saga Green" /><span>Saga Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-orange', false)"><img src="assets/showcase/images/themes/saga-orange.png" alt="Saga Orange" /><span>Saga Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'saga-purple', false)"><img src="assets/showcase/images/themes/saga-purple.png" alt="Saga Purple" /><span>Saga Purple</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-blue', true)"><img src="assets/showcase/images/themes/vela-blue.png" alt="Vela Blue" /><span>Vela Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-green', true)"><img src="assets/showcase/images/themes/vela-green.png" alt="Vela Green" /><span>Vela Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-orange', true)"><img src="assets/showcase/images/themes/vela-orange.png" alt="Vela Orange" /><span>Vela Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'vela-purple', true)"><img src="assets/showcase/images/themes/vela-purple.png" alt="Vela Purple" /><span>Vela Purple</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-blue', true)"><img src="assets/showcase/images/themes/arya-blue.png" alt="Arya Blue" /><span>Arya Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-green', true)"><img src="assets/showcase/images/themes/arya-green.png" alt="Arya Green" /><span>Arya Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-orange', true)"><img src="assets/showcase/images/themes/arya-orange.png" alt="Arya Orange" /><span>Arya Orange</span></a></li>
                        <li><a (click)="changeTheme($event, 'arya-purple', true)"><img src="assets/showcase/images/themes/arya-purple.png" alt="Arya Purple" /><span>Arya Purple</span></a></li>

                        <li class="topbar-submenu-header">PREMIUM</li>
                        <li><a (click)="changeTheme($event, 'soho-light', false)"><img src="assets/showcase/images/themes/soho-light.png" alt="Soho Light" /><span>Soho Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'soho-dark', true)"><img src="assets/showcase/images/themes/soho-dark.png" alt="Soho Dark" /><span>Soho Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'viva-light', false)"><img src="assets/showcase/images/themes/viva-light.svg" alt="Viva Light" /><span>Viva Light</span></a></li>
                        <li><a (click)="changeTheme($event, 'viva-dark', true)"><img src="assets/showcase/images/themes/viva-dark.svg" alt="Viva Dark" /><span>Viva Dark</span></a></li>
                        <li><a (click)="changeTheme($event, 'mira', false)"><img src="assets/showcase/images/themes/mira.jpg" alt="Mira" /><span>Mira</span></a></li>
                        <li><a (click)="changeTheme($event, 'nano', false)"><img src="assets/showcase/images/themes/nano.jpg" alt="Nano" /><span>Nano</span></a></li>

                        <li class="topbar-submenu-header">LEGACY</li>
                        <li><a (click)="changeTheme($event, 'nova', false)"><img src="assets/showcase/images/themes/nova.png" alt="Nova" /><span>Nova</span></a></li>
                        <li><a (click)="changeTheme($event, 'nova-alt', false)"><img src="assets/showcase/images/themes/nova-alt.png" alt="Nova Alt" /><span>Nova Alt</span></a></li>
                        <li><a (click)="changeTheme($event, 'nova-accent', false)"><img src="assets/showcase/images/themes/nova-accent.png" alt="Nova Accent" /><span>Nova Accent</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-amber', true)"><img src="assets/showcase/images/themes/luna-amber.png" alt="Luna Amber" /><span>Luna Amber</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-blue', true)"><img src="assets/showcase/images/themes/luna-blue.png" alt="Luna Blue" /><span>Luna Blue</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-green', true)"><img src="assets/showcase/images/themes/luna-green.png" alt="Luna Green" /><span>Luna Green</span></a></li>
                        <li><a (click)="changeTheme($event, 'luna-pink', true)"><img src="assets/showcase/images/themes/luna-pink.png" alt="Luna Pink" /><span>Luna Pink</span></a></li>
                        <li><a (click)="changeTheme($event, 'rhea', false)"><img src="assets/showcase/images/themes/rhea.png" alt="Rhea" /><span>Rhea</span></a></li>
                    </ul>
                </li>
                <li class="topbar-submenu">
                    <a tabindex="0" (click)="toggleMenu($event, 2)">Resources</a>
                    <ul [@overlayMenuAnimation]="'visible'" *ngIf="activeMenuIndex === 2" (@overlayMenuAnimation.start)="onOverlayMenuEnter($event)">

                        <li><a href="https://www.primetek.com.tr" target="_blank"><span>About PrimeTek</span></a></li>
                        <li><a href="https://www.primefaces.org/store" target="_blank"><span>PrimeStore</span></a></li>
                        <li><a href="https://www.primefaces.org/category/primeng/" target="_blank"><span>Blog</span></a></li>
                        <li><a href="https://forum.primefaces.org/viewforum.php?f=35"><span>Forum</span></a></li>
                        <li><a href="https://discord.gg/gzKFYnpmCY"><span>Discord Chat</span></a></li>
                        <li><a [routerLink]="['/lts']"><span>LTS</span></a></li>
                        <li><a href="https://www.primefaces.org/newsletter" target="_blank"><span>Newsletter</span></a></li>
                        <li><a href="https://github.com/primefaces/primeng" target="_blank"><span>Source Code</span></a></li>
                        <li><a [routerLink]="['/support']"><span>Support</span></a></li>
                        <li><a href="https://twitter.com/prime_ng?lang=en" target="_blank"><span>Twitter</span></a></li>
                        <li><a href="https://www.primefaces.org/whouses" target="_blank"><span>Who Uses</span></a></li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    animations: [
        trigger('overlayMenuAnimation', [
            transition(':enter', [
                style({opacity: 0, transform: 'scaleY(0.8)'}),
                animate('.12s cubic-bezier(0, 0, 0.2, 1)', style({ opacity: 1, transform: '*' })),
              ]),
              transition(':leave', [
                animate('.1s linear', style({ opacity: 0 }))
              ])
        ])
    ]
})
export class AppTopBarComponent implements OnInit, OnDestroy {

    @Output() menuButtonClick: EventEmitter<any> = new EventEmitter();

    @ViewChild('topbarMenu') topbarMenu: ElementRef;

    activeMenuIndex: number;

    outsideClickListener: any;

    config: AppConfig;

    subscription: Subscription;

    logoMap = {
        'bootstrap4-light-blue': 'bootstrap4-light-blue.svg',
        'bootstrap4-light-purple': 'bootstrap4-light-purple.svg',
        'bootstrap4-dark-blue': 'bootstrap4-dark-blue.svg',
        'bootstrap4-dark-purple': 'bootstrap4-dark-purple.svg',
        'md-light-indigo': 'md-light-indigo.svg',
        'md-light-deeppurple': 'md-light-deeppurple.svg',
        'md-dark-indigo': 'md-dark-indigo.svg',
        'md-dark-deeppurple': 'md-dark-deeppurple.svg',
        'mdc-light-indigo': 'md-light-indigo.svg',
        'mdc-light-deeppurple': 'md-light-deeppurple.svg',
        'mdc-dark-indigo': 'md-dark-indigo.svg',
        'mdc-dark-deeppurple': 'md-dark-deeppurple.svg',
        'saga-blue': 'saga-blue.png',
        'saga-green': 'saga-green.png',
        'saga-orange': 'saga-orange.png',
        'saga-purple': 'saga-purple.png',
        'vela-blue': 'vela-blue.png',
        'vela-green': 'vela-green.png',
        'vela-orange': 'vela-orange.png',
        'vela-purple': 'vela-purple.png',
        'arya-blue': 'arya-blue.png',
        'arya-green': 'arya-green.png',
        'arya-orange': 'arya-orange.png',
        'arya-purple': 'arya-purple.png',
        'nova': 'nova.png',
        'nova-alt': 'nova-alt.png',
        'nova-accent': 'nova-accent.png',
        'nova-vue': 'nova-vue.png',
        'luna-blue': 'luna-blue.png',
        'luna-green': 'luna-green.png',
        'luna-pink': 'luna-pink.png',
        'luna-amber': 'luna-amber.png',
        'rhea': 'rhea.png',
        'fluent-light': 'fluent-light.png',
        'soho-light': 'soho-light.png',
        'soho-dark': 'soho-dark.png',
        'viva-light': 'viva-light.svg',
        'viva-dark': 'viva-dark.svg',
        'mira': 'mira.jpg',
        'nano': 'nano.jpg',
    };

    versions: any[];

    constructor(private router: Router, private versionService: VersionService, private configService: AppConfigService) {}

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
        this.versionService.getVersions().then(data => this.versions = data);

        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.activeMenuIndex = null;
             }
        });
    }

    onMenuButtonClick(event: Event) {
        this.menuButtonClick.emit();
        event.preventDefault();
    }

    changeTheme(event: Event, theme: string, dark: boolean) {
        let themeElement = document.getElementById('theme-link');
        themeElement.setAttribute('href', themeElement.getAttribute('href').replace(this.config.theme, theme));
        this.configService.updateConfig({...this.config, ...{theme, dark}});
        this.activeMenuIndex = null;
        event.preventDefault();
    }

    bindOutsideClickListener() {
        if (!this.outsideClickListener) {
            this.outsideClickListener = (event) => {
                if (this.isOutsideTopbarMenuClicked(event)) {
                    this.activeMenuIndex =  null;
                }
            };

            document.addEventListener('click', this.outsideClickListener);
        }
    }

    unbindOutsideClickListener() {
        if (this.outsideClickListener) {
            document.removeEventListener('click', this.outsideClickListener);
            this.outsideClickListener = null;
        }
    }

    toggleMenu(event: Event, index: number) {
        this.activeMenuIndex = this.activeMenuIndex === index ? null : index;
        event.preventDefault();
    }

    isOutsideTopbarMenuClicked(event): boolean {
        return !(this.topbarMenu.nativeElement.isSameNode(event.target) || this.topbarMenu.nativeElement.contains(event.target));
    }

    onOverlayMenuEnter(event: AnimationEvent) {
        switch(event.toState) {
            case 'visible':
                this.bindOutsideClickListener();
            break;

            case 'void':
                this.unbindOutsideClickListener();
            break;
        }
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}