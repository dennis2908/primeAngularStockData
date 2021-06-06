import { Component, ElementRef, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { FilterService } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { AppConfigService } from './service/appconfigservice';
import { Subscription } from 'rxjs';
import { AppConfig } from './domain/appconfig';

declare let gtag: Function;

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-sidebar" [ngClass]="{'active': active}">
            <a [routerLink]="['/']" class="logo">
                <img alt="logo" width='100px' height='60px' [src]="'assets/showcase/images/4PEqN-Zw.png'" />
            </a>
            <div class="layout-sidebar-filter p-fluid p-input-filled">
                <p-autoComplete [group]="true" [(ngModel)]="selectedRoute" [minLength]="2" [suggestions]="filteredRoutes" scrollHeight="300px" (onSelect)="onSelect($event)" placeholder="Search by name..." (completeMethod)="filterGroupedRoute($event)" field="label">
                </p-autoComplete>
            </div>
            <div class="layout-menu">
			    <div class="menu-category"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-building" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
</svg> Data Stock</div>
                <div class="menu-items">
                   <a [routerLink]="['/salesitem']" routerLinkActive="router-link-exact-active"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers" viewBox="0 0 16 16">
					  <path d="M8.235 1.559a.5.5 0 0 0-.47 0l-7.5 4a.5.5 0 0 0 0 .882L3.188 8 .264 9.559a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882L12.813 8l2.922-1.559a.5.5 0 0 0 0-.882l-7.5-4zm3.515 7.008L14.438 10 8 13.433 1.562 10 4.25 8.567l3.515 1.874a.5.5 0 0 0 .47 0l3.515-1.874zM8 9.433 1.562 6 8 2.567 14.438 6 8 9.433z"/>
					</svg> Sales Item</a>
					<a [routerLink]="['/datauser/reprekeyword']" routerLinkActive="router-link-exact-active"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-filter-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
</svg> Sales By Keyword</a>
					<a [routerLink]="['/datauser/reprefilter']" routerLinkActive="router-link-exact-active"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16">
  <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/>
  <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8zm0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zM4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
</svg> Sales By Column </a>
                </div>
				<div class="menu-category"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
  <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z"/>
</svg> Chart & Bar</div>
				<div class="menu-items">
				 <a [routerLink]="['/chart/doughnut']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Doughnut Chart </a>
				 <a [routerLink]="['/chart/multiaxis']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Multi Axis </a>
				  <a [routerLink]="['/chart/line']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Line Chart </a>
				  <a [routerLink]="['/chart/linechartstyle']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Line Chart Syle</a>	
				  <a [routerLink]="['/chart/polararea']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Polar Chart</a>	
				  <a [routerLink]="['/chart/radar']" routerLinkActive="router-link-exact-active"> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
					  <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
					</svg> Radar Chart</a>	
				</div>
				
				<div class="menu-category">General</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/setup']" routerLinkActive="router-link-exact-active">Get Started</a>
                    <a [routerLink]=" ['/i18n']" routerLinkActive="router-link-exact-active">Locale</a>
                    <a href="https://github.com/primefaces/primeng/wiki/Migration-Guide" target="_blank">Migration Guide</a>

                </div>

                <div class="menu-category">Support</div>
                <div class="menu-items">
                    <a href="https://forum.primefaces.org/viewforum.php?f=35" target="_blank">Forum</a>
                    <a href="https://discord.gg/gzKFYnpmCY" target="_blank">Discord Chat</a>
                    <a [routerLink]="['/lts']" routerLinkActive="router-link-exact-active">Long Term Support</a>
                    <a [routerLink]="['/support']" routerLinkActive="router-link-exact-active">PRO Support</a>
                </div>

                <div class="menu-category">Resources</div>
                <div class="menu-items">
                    <a href="https://www.youtube.com/channel/UCTgmp69aBOlLnPEqlUyetWw" target="_blank">PrimeTV</a>
                    <a href="https://github.com/primefaces/primeng" target="_blank">Source Code</a>
                    <a href="https://www.primefaces.org/store">Store</a>
                    <a href="https://twitter.com/prime_ng?lang=en">Twitter</a>
                </div>

                <div class="menu-category">Theming</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/theming']" routerLinkActive="router-link-exact-active">Guide</a>
                    <a href="https://www.primefaces.org/designer/primeng">Theme Designer</a>
                    <a href="https://www.primefaces.org/designer-ng">Visual Editor</a>
                    <a [routerLink]="['/colors']" routerLinkActive="router-link-exact-active">Colors <span class="p-tag">New</span></a>
                    <a href="https://www.primefaces.org/designer/api/primeng/11.1.0">SASS API</a>
                </div>

                <div class="menu-category">PrimeFlex</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/primeflex']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Setup</a>
                    <a [routerLink]=" ['/primeflex/display']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Display</a>
                    <a [routerLink]=" ['/primeflex/elevation']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Elevation</a>
                    <a [routerLink]=" ['/primeflex/flexbox']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">FlexBox</a>
                    <a [routerLink]=" ['/primeflex/formlayout']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Form Layout</a>
                    <a [routerLink]=" ['/primeflex/grid']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Grid System</a>
                    <a [routerLink]=" ['/primeflex/spacing']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Spacing</a>
                    <a [routerLink]=" ['/primeflex/text']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Text</a>
                </div>

                <div class="menu-category">PrimeIcons</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/icons']" routerLinkActive="router-link-exact-active">Icons v4.1</a>
                </div>

                <div class="menu-category">Form</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/autocomplete']" routerLinkActive="router-link-exact-active">AutoComplete</a>
                    <a [routerLink]=" ['/calendar']" routerLinkActive="router-link-exact-active">Calendar</a>
                    <a [routerLink]=" ['/cascadeselect']" routerLinkActive="router-link-exact-active">CascadeSelect</a>
                    <a [routerLink]=" ['/checkbox']" routerLinkActive="router-link-exact-active">Checkbox</a>
                    <a [routerLink]=" ['/chips']" routerLinkActive="router-link-exact-active">Chips</a>
                    <a [routerLink]=" ['/colorpicker']" routerLinkActive="router-link-exact-active">ColorPicker</a>
                    <a [routerLink]=" ['/dropdown']" routerLinkActive="router-link-exact-active">Dropdown</a>
                    <a [routerLink]=" ['/editor']" routerLinkActive="router-link-exact-active">Editor</a>
                    <a [routerLink]=" ['/floatlabel']" routerLinkActive="router-link-exact-active">FloatLabel</a>
                    <a [routerLink]=" ['/inputgroup']" routerLinkActive="router-link-exact-active">InputGroup</a>
                    <a [routerLink]=" ['/inputmask']" routerLinkActive="router-link-exact-active">InputMask</a>
                    <a [routerLink]=" ['/inputswitch']" routerLinkActive="router-link-exact-active">InputSwitch</a>
                    <a [routerLink]=" ['/inputtext']" routerLinkActive="router-link-exact-active">InputText</a>
                    <a [routerLink]=" ['/inputtextarea']" routerLinkActive="router-link-exact-active">InputTextArea</a>
                    <a [routerLink]=" ['/inputnumber']" routerLinkActive="router-link-exact-active">InputNumber</a>
                    <a [routerLink]=" ['/invalid']" routerLinkActive="router-link-exact-active">InvalidState</a>
                    <a [routerLink]=" ['/knob']" routerLinkActive="router-link-exact-active">Knob</a>
                    <a [routerLink]=" ['/keyfilter']" routerLinkActive="router-link-exact-active">KeyFilter</a>
                    <a [routerLink]=" ['/listbox']" routerLinkActive="router-link-exact-active">Listbox</a>
                    <a [routerLink]=" ['/multiselect']" routerLinkActive="router-link-exact-active">MultiSelect</a>
                    <a [routerLink]=" ['/password']" routerLinkActive="router-link-exact-active">Password <span class="p-tag">New</span></a>
                    <a [routerLink]=" ['/radiobutton']" routerLinkActive="router-link-exact-active">RadioButton</a>
                    <a [routerLink]=" ['/rating']" routerLinkActive="router-link-exact-active">Rating</a>
                    <a [routerLink]=" ['/slider']" routerLinkActive="router-link-exact-active">Slider</a>
                    <a [routerLink]=" ['/selectbutton']" routerLinkActive="router-link-exact-active">SelectButton</a>
                    <a [routerLink]=" ['/togglebutton']" routerLinkActive="router-link-exact-active">ToggleButton</a>
                    <a [routerLink]=" ['/tristatecheckbox']" routerLinkActive="router-link-exact-active">TriCheckbox</a>
                </div>

                <div class="menu-category">Button</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/button']" routerLinkActive="router-link-exact-active">Button</a>
                    <a [routerLink]=" ['/splitbutton']" routerLinkActive="router-link-exact-active">SplitButton</a>
                </div>

                <div class="menu-category">Data</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/dataview']" routerLinkActive="router-link-exact-active">DataView</a>
                    <a [routerLink]=" ['/fullcalendar']" routerLinkActive="router-link-exact-active">FullCalendar</a>
                    <a [routerLink]=" ['/gmap']" routerLinkActive="router-link-exact-active">GMap</a>
                    <a [routerLink]=" ['/orderlist']" routerLinkActive="router-link-exact-active">OrderList</a>
                    <a [routerLink]=" ['/organizationchart']" routerLinkActive="router-link-exact-active">Org Chart</a>
                    <a [routerLink]=" ['/paginator']" routerLinkActive="router-link-exact-active">Paginator</a>
                    <a [routerLink]=" ['/picklist']" routerLinkActive="router-link-exact-active">PickList</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/table')">Table</a>
                        <div [@submenu]="isSubmenuActive('/table') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/table']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/table/basic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Basic</a></li>
                                <li><a [routerLink]=" ['/table/dynamic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Dynamic</a></li>
                                <li><a [routerLink]=" ['/table/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/table/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                                <li><a [routerLink]=" ['/table/gridlines']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Gridlines</a></li>
                                <li><a [routerLink]=" ['/table/striped']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Striped</a></li>
                                <li><a [routerLink]=" ['/table/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/table/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/table/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/table/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter </a></li>
                                <li><a [routerLink]=" ['/table/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/table/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/table/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/table/virtualscroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">VirtualScroll</a></li>
                                <li><a [routerLink]=" ['/table/flexscroll']" target="_blank" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">FlexScroll</a></li>
                                <li><a [routerLink]=" ['/table/rowexpansion']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowExpand</a></li>
                                <li><a [routerLink]=" ['/table/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/table/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/table/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/table/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/table/rowgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">RowGroup</a></li>
                                <li><a [routerLink]=" ['/table/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/table/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/table/export']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Export</a></li>
                                <li><a [routerLink]=" ['/table/state']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">State</a></li>
                                <li><a [routerLink]=" ['/table/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/table/sticky']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sticky</a></li>
                                <li><a [routerLink]=" ['/table/crud']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Crud</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/timeline']" routerLinkActive="router-link-exact-active">Timeline</a>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/tree')">Tree</a>
                        <div [@submenu]="isSubmenuActive('/tree') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/tree']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/tree/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/tree/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/tree/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/tree/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/tree/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/tree/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/tree/dragdrop']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">DragDrop</a></li>
                                <li><a [routerLink]=" ['/tree/horizontal']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Horizontal</a></li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/treetable')">TreeTable</a>
                        <div [@submenu]="isSubmenuActive('/treetable') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/treetable']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/treetable/templating']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Templating</a></li>
                                <li><a [routerLink]=" ['/treetable/page']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Page</a></li>
                                <li><a [routerLink]=" ['/treetable/sort']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Sort</a></li>
                                <li><a [routerLink]=" ['/treetable/selection']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Selection</a></li>
                                <li><a [routerLink]=" ['/treetable/colgroup']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ColGroup</a></li>
                                <li><a [routerLink]=" ['/treetable/lazy']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Lazy</a></li>
                                <li><a [routerLink]=" ['/treetable/edit']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Edit</a></li>
                                <li><a [routerLink]=" ['/treetable/scroll']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Scroll</a></li>
                                <li><a [routerLink]=" ['/treetable/colresize']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Resize</a></li>
                                <li><a [routerLink]=" ['/treetable/reorder']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Reorder</a></li>
                                <li><a [routerLink]=" ['/treetable/coltoggle']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Toggle</a></li>
                                <li><a [routerLink]=" ['/treetable/style']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Style</a></li>
                                <li><a [routerLink]=" ['/treetable/contextmenu']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ContextMenu</a></li>
                                <li><a [routerLink]=" ['/treetable/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/treetable/filter']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Filter</a></li>
                                <li><a [routerLink]=" ['/treetable/size']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Size</a></li>
                            </ul>
                        </div>
                    </div>

                    <a [routerLink]=" ['/virtualscroller']" routerLinkActive="router-link-exact-active">VirtualScroller</a>
                </div>

                <div class="menu-category">Panel</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/accordion']" routerLinkActive="router-link-exact-active">Accordion</a>
                    <a [routerLink]=" ['/card']" routerLinkActive="router-link-exact-active">Card</a>
                    <a [routerLink]=" ['/divider']" routerLinkActive="router-link-exact-active">Divider</a>
                    <a [routerLink]=" ['/fieldset']" routerLinkActive="router-link-exact-active">Fieldset</a>
                    <a [routerLink]=" ['/panel']" routerLinkActive="router-link-exact-active">Panel</a>
                    <a [routerLink]=" ['/splitter']" routerLinkActive="router-link-exact-active">Splitter</a>
                    <a [routerLink]=" ['/scrollpanel']" routerLinkActive="router-link-exact-active">ScrollPanel</a>
                    <a [routerLink]=" ['/tabview']" routerLinkActive="router-link-exact-active">TabView</a>
                    <a [routerLink]=" ['/toolbar']" routerLinkActive="router-link-exact-active">Toolbar</a>
                </div>

                <div class="menu-category">Overlay</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/confirmdialog']" routerLinkActive="router-link-exact-active">ConfirmDialog</a>
                    <a [routerLink]=" ['/confirmpopup']" routerLinkActive="router-link-exact-active">ConfirmPopup</a>
                    <a [routerLink]=" ['/dialog']" routerLinkActive="router-link-exact-active">Dialog</a>
                    <a [routerLink]=" ['/dynamicdialog']" routerLinkActive="router-link-exact-active">DynamicDialog</a>
                    <a [routerLink]=" ['/overlaypanel']" routerLinkActive="router-link-exact-active">OverlayPanel</a>
                    <a [routerLink]=" ['/sidebar']" routerLinkActive="router-link-exact-active">Sidebar</a>
                    <a [routerLink]=" ['/tooltip']" routerLinkActive="router-link-exact-active">Tooltip</a>
                </div>

                <div class="menu-category">File</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/fileupload']" routerLinkActive="router-link-exact-active">Upload</a>
                </div>

                <div class="menu-category">Menu</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/menumodel']" routerLinkActive="router-link-exact-active">MenuModel</a>
                    <a [routerLink]=" ['/breadcrumb']" routerLinkActive="router-link-exact-active">Breadcrumb</a>
                    <a [routerLink]=" ['/contextmenu']" routerLinkActive="router-link-exact-active">ContextMenu</a>
                    <a [routerLink]=" ['/megamenu']" routerLinkActive="router-link-exact-active">MegaMenu</a>
                    <a [routerLink]=" ['/menu']" routerLinkActive="router-link-exact-active">Menu</a>
                    <a [routerLink]=" ['/menubar']" routerLinkActive="router-link-exact-active">Menubar</a>
                    <a [routerLink]=" ['/panelmenu']" routerLinkActive="router-link-exact-active">PanelMenu</a>
                    <a [routerLink]=" ['/slidemenu']" routerLinkActive="router-link-exact-active">SlideMenu</a>
                    <a [routerLink]=" ['/steps']" routerLinkActive="router-link-exact-active">Steps</a>
                    <a [routerLink]=" ['/tabmenu']" routerLinkActive="router-link-exact-active">TabMenu</a>
                    <a [routerLink]=" ['/tieredmenu']" routerLinkActive="router-link-exact-active">TieredMenu</a>
                </div>

                <div class="menu-category">Chart</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/chart']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">ChartModel</a>
                    <a [routerLink]=" ['/chart/bar']" routerLinkActive="router-link-exact-active">Bar</a>
                    <a [routerLink]=" ['/chart/doughnut']" routerLinkActive="router-link-exact-active">Doughnut</a>
                    <a [routerLink]=" ['/chart/line']" routerLinkActive="router-link-exact-active">Line</a>
                    <a [routerLink]=" ['/chart/polararea']" routerLinkActive="router-link-exact-active">PolarArea</a>
                    <a [routerLink]=" ['/chart/pie']" routerLinkActive="router-link-exact-active">Pie</a>
                    <a [routerLink]=" ['/chart/radar']" routerLinkActive="router-link-exact-active">Radar</a>
                    <a [routerLink]=" ['/chart/combo']" routerLinkActive="router-link-exact-active">Combo</a>
                </div>

                <div class="menu-category">Messages</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/messages']" routerLinkActive="router-link-exact-active">Messages</a>
                    <a [routerLink]=" ['/toast']" routerLinkActive="router-link-exact-active">Toast</a>
                </div>

                <div class="menu-category">Media</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/carousel']" routerLinkActive="router-link-exact-active">Carousel</a>
                    <div>
                        <a tabindex="0" (click)="toggleSubmenu($event, '/galleria')">Galleria</a>
                        <div [@submenu]="isSubmenuActive('/galleria') ? 'visible': 'hidden'" (@submenu.done)="onAnimationDone()">
                            <ul>
                                <li><a [routerLink]=" ['/galleria']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Documentation</a></li>
                                <li><a [routerLink]=" ['/galleria/programmatic']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Programmatic</a></li>
                                <li><a [routerLink]=" ['/galleria/indicator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Indicator</a></li>
                                <li><a [routerLink]=" ['/galleria/thumbnail']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Thumbnail</a></li>
                                <li><a [routerLink]=" ['/galleria/navigator']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Navigator</a></li>
                                <li><a [routerLink]=" ['/galleria/responsive']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Responsive</a></li>
                                <li><a [routerLink]=" ['/galleria/fullscreen']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Fullscreen</a></li>
                                <li><a [routerLink]=" ['/galleria/autoplay']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">AutoPlay</a></li>
                                <li><a [routerLink]=" ['/galleria/caption']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Caption</a></li>
                                <li><a [routerLink]=" ['/galleria/advanced']" routerLinkActive="router-link-exact-active" [routerLinkActiveOptions]="{exact:true}">Advanced</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="menu-category">DragDrop</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/dragdrop']" routerLinkActive="router-link-exact-active">Drag&amp;Drop</a>
                </div>
                
                <div class="menu-category">Misc</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/avatar']" routerLinkActive="router-link-exact-active">Avatar</a>
                    <a [routerLink]=" ['/badge']" routerLinkActive="router-link-exact-active">Badge</a>
                    <a [routerLink]=" ['/blockui']" routerLinkActive="router-link-exact-active">BlockUI</a>
                    <a [routerLink]=" ['/captcha']" routerLinkActive="router-link-exact-active">Captcha</a>
                    <a [routerLink]=" ['/chip']" routerLinkActive="router-link-exact-active">Chip</a>
                    <a [routerLink]=" ['/inplace']" routerLinkActive="router-link-exact-active">Inplace</a>
                    <a [routerLink]=" ['/progressbar']" routerLinkActive="router-link-exact-active">ProgressBar</a>
                    <a [routerLink]=" ['/progressspinner']" routerLinkActive="router-link-exact-active">ProgressSpinner</a>
                    <a [routerLink]=" ['/scrolltop']" routerLinkActive="router-link-exact-active">ScrollTop</a>
                    <a [routerLink]=" ['/skeleton']" routerLinkActive="router-link-exact-active">Skeleton</a>
                    <a [routerLink]=" ['/tag']" routerLinkActive="router-link-exact-active">Tag <span class="p-tag">Tag</span></a>
                    <a [routerLink]=" ['/terminal']" routerLinkActive="router-link-exact-active">Terminal</a>
                </div>

                <div class="menu-category">Directives</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/defer']" routerLinkActive="router-link-exact-active">Defer</a>
                    <a [routerLink]=" ['/focustrap']" routerLinkActive="router-link-exact-active">FocusTrap</a>
                    <a [routerLink]=" ['/ripple']" routerLinkActive="router-link-exact-active">Ripple</a>
                </div>

                <div class="menu-category">Utilities</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/filterservice']" routerLinkActive="router-link-exact-active">FilterService</a>
                </div>
                <div class="menu-category">Utilities</div>
                <div class="menu-items">
                    <a [routerLink]=" ['/filterservice']" routerLinkActive="router-link-exact-active">FilterService</a>
                </div>
            </div>
        </div>
    `,
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0',
                overflow: 'hidden',
                opacity: 0,
            })),
            state('visible', style({
                height: '*',
                opacity: 1
            })),
            transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        ])
    ]
})
export class AppMenuComponent {

    @Input() active: boolean;

    activeSubmenus: {[key: string]: boolean} = {};

    filteredRoutes: any[];

    selectedRoute: any;

    submenuRouting: boolean;

    routes = [
        {
            label: 'General', value: 'general', 
            items: [
                {label: 'Setup', value: '/setup'},
                {label: 'Locale', value: '/i18n'}
            ]
        },
        {
            label: 'Support', value: 'support', 
            items: [
                {label: 'Long Term Support', value: '/lts'},
                {label: 'PRO Support', value: '/support'}
            ]
        },
        {
            label: 'Theming', value: 'theming', 
            items: [
                {label: 'Guide', value: '/theming'},
                {label: 'Colors', value: '/colors'}
            ]
        },
        {
            label: 'PrimeFlex', value: 'primeflex', 
            items: [
                {label: 'Setup', value: '/primeflex'},
                {label: 'Display', value: '/primeflex/display'},
                {label: 'Elevation', value: '/primeflex/elevation'},
                {label: 'FlexBox', value: '/primeflex/flexbox'},
                {label: 'Form Layout', value: '/primeflex/formlayout'},
                {label: 'Spacing', value: '/primeflex/spacing'},
                {label: 'Text', value: '/primeflex/text'}
            ]
        },
        {
            label: 'PrimeIcons', value: 'primeicons', 
            items: [
                {label: 'Icons v4.1', value: '/icons'}
            ]
        },
        {
            label: 'Form', value: 'form', 
            items: [
                {label: 'AutoComplete', value: '/autocomplete'},
                {label: 'Calendar', value: '/calendar'},
                {label: 'CascadeSelect', value: '/cascadeselect'},
                {label: 'Checkbox', value: '/checkbox'},
                {label: 'Chips', value: '/chips'},
                {label: 'ColorPicker', value: '/colorpicker'},
                {label: 'Dropdown', value: '/dropdown'},
                {label: 'Editor', value: '/editor'},
                {label: 'FloatLabel', value: '/floatlabel'},
                {label: 'InputGroup', value: '/inputgroup'},
                {label: 'InputMask', value: '/inputmask'},
                {label: 'InputNumber', value: '/inputnumber'},
                {label: 'InputSwitch', value: '/inputswitch'},
                {label: 'InputText', value: '/inputtext'},
                {label: 'InputTextArea', value: '/inputtextarea'},
                {label: 'InvalidState', value: '/invalid'},
                {label: 'Knob', value: '/knob'},
                {label: 'KeyFilter', value: '/keyfilter'},
                {label: 'Listbox', value: '/listbox'},
                {label: 'MultiSelect', value: '/multiselect'},
                {label: 'Password', value: '/password'},
                {label: 'RadioButton', value: '/radiobutton'},
                {label: 'Rating', value: '/rating'},
                {label: 'Slider', value: '/slider'},
                {label: 'SelectButton', value: '/selectbutton'},
                {label: 'ToggleButton', value: '/togglebutton'},
                {label: 'TriCheckbox', value: '/tristatecheckbox'}
            ]
        },
        {
            label: 'Button', value: 'button', 
            items: [
                {label: 'Button', value: '/button'},
                {label: 'SplitButton', value: '/splitbutton'}
            ]
        },
        {
            label: 'Data', value: 'data', 
            items: [
                {label: 'DataView', value: '/dataview'},
                {label: 'FullCalendar', value: '/fullcalendar'},
                {label: 'GMap', value: '/gmap'},
                {label: 'OrderList', value: '/orderlist'},
                {label: 'Org Chart', value: '/organizationchart'},
                {label: 'Paginator', value: '/paginator'},
                {label: 'PickList', value: '/picklist'},
                {label: 'Timeline', value: '/timeline'},
                {label: 'VirtualScroller', value: '/virtualscroller'},
            ]
        },

        {
            label: 'Table', value: 'table', 
            items: [
                {label: 'Documentation', value: '/table'},
                {label: 'Basic', value: '/table/basic'},
                {label: 'Dynamic', value: '/table/dynamic'},
                {label: 'Templating', value: '/table/templating'},
                {label: 'Size', value: '/table/size'},
                {label: 'Gridlines', value: '/table/gridlines'},
                {label: 'Striped', value: '/table/striped'},
                {label: 'ColGroup', value: '/table/colgroup'},
                {label: 'Page', value: '/table/page'},
                {label: 'Sort', value: '/table/sort'},
                {label: 'Filter', value: '/table/filter'},
                {label: 'Selection', value: '/table/selection'},
                {label: 'Scroll', value: '/table/scroll'},
                {label: 'VirtualScroll', value: '/table/virtualscroll'},
                {label: 'FlexScroll', value: '/table/flexscroll'},
                {label: 'RowExpand', value: '/table/rowexpansion'},
                {label: 'Lazy', value: '/table/lazy'},
                {label: 'Edit', value: '/table/edit'},
                {label: 'Toggle', value: '/table/coltoggle'},
                {label: 'Resize', value: '/table/colresize'},
                {label: 'Reorder', value: '/table/reorder'},
                {label: 'RowGroup', value: '/table/rowgroup'},
                {label: 'ContextMenu', value: '/table/contextmenu'},
                {label: 'Responsive', value: '/table/responsive'},
                {label: 'Export', value: '/table/export'},
                {label: 'State', value: '/table/state'},
                {label: 'Style', value: '/table/style'},
                {label: 'Sticky', value: '/table/sticky'},
                {label: 'Crud', value: '/table/crud'},
            ]
        },
        {
            label: 'Tree', value: 'tree', 
            items: [
                {label: 'Documentation', value: '/tree'},
                {label: 'Templating', value: '/tree/templating'},
                {label: 'Selection', value: '/tree/selection'},
                {label: 'Filter', value: '/tree/filter'},
                {label: 'Lazy', value: '/tree/lazy'},
                {label: 'Scroll', value: '/tree/scroll'},
                {label: 'ContextMenu', value: '/tree/contextmenu'},
                {label: 'DragDrop', value: '/tree/dragdrop'},
                {label: 'Horizontal', value: '/tree/horizontal'}
            ]
        },
        {
            label: 'TreeTable', value: 'treetable', 
            items: [
                {label: 'Documentation', value: '/treetable'},
                {label: 'Templating', value: '/treetable/templating'},
                {label: 'Page', value: '/treetable/page'},
                {label: 'Sort', value: '/treetable/sort'},
                {label: 'Selection', value: '/treetable/selection'},
                {label: 'ColGroup', value: '/treetable/colgroup'},
                {label: 'Lazy', value: '/treetable/lazy'},
                {label: 'Edit', value: '/treetable/edit'},
                {label: 'Scroll', value: '/treetable/scroll'},
                {label: 'Resize', value: '/treetable/colresize'},
                {label: 'Reorder', value: '/treetable/reorder'},
                {label: 'Toggle', value: '/treetable/coltoggle'},
                {label: 'Style', value: '/treetable/style'},
                {label: 'ContextMenu', value: '/treetable/contextmenu'},
                {label: 'Responsive', value: '/treetable/responsive'},
                {label: 'Filter', value: '/treetable/filter'},
                {label: 'Size', value: '/treetable/size'}
            ]
        },
        {
            label: 'Panel', value: 'panel', 
            items: [
                {label: 'Accordion', value: '/accordion'},
                {label: 'Card', value: '/card'},
                {label: 'Divider', value: '/divider'},
                {label: 'Fieldset', value: '/fieldset'},
                {label: 'Panel', value: '/panel'},
                {label: 'Splitter', value: '/splitter'},
                {label: 'ScrollPanel', value: '/scrollpanel'},
                {label: 'TabView', value: '/tabview'},
                {label: 'Toolbar', value: '/toolbar'}
            ]
        },
        {
            label: 'Overlay', value: 'overlay', 
            items: [
                {label: 'ConfirmDialog', value: '/confirmdialog'},
                {label: 'ConfirmPopup', value: '/confirmpopup'},
                {label: 'Dialog', value: '/dialog'},
                {label: 'DynamicDialog', value: '/dynamicdialog'},
                {label: 'OverlayPanel', value: '/overlaypanel'},
                {label: 'Sidebar', value: '/sidebar'},
                {label: 'Tooltip', value: '/tooltip'}
            ]
        },
        {
            label: 'File', value: 'fileupload', 
            items: [
                {label: 'Upload', value: '/fileupload'}
            ]
        },
        {
            label: 'Menu', value: 'menu', 
            items: [
                {label: 'MenuModel', value: '/menumodel'},
                {label: 'Breadcrumb', value: '/breadcrumb'},
                {label: 'ContextMenu', value: '/contextmenu'},
                {label: 'MegaMenu', value: '/megamenu'},
                {label: 'Menu', value: '/menu'},
                {label: 'Menubar', value: '/menubar'},
                {label: 'PanelMenu', value: '/panelmenu'},
                {label: 'SlideMenu', value: '/slidemenu'},
                {label: 'Steps', value: '/steps'},
                {label: 'TabMenu', value: '/tabmenu'},
                {label: 'TieredMenu', value: '/tieredmenu'}
            ]
        },
        {
            label: 'Chart', value: 'chart', 
            items: [
                {label: 'ChartModel', value: '/chart'},
                {label: 'Bar', value: '/chart/bar'},
                {label: 'Doughnut', value: '/chart/doughnut'},
                {label: 'Line', value: '/chart/line'},
                {label: 'PolarArea', value: '/chart/polararea'},
                {label: 'Pie', value: '/chart/pie'},
                {label: 'Radar', value: '/chart/radar'},
                {label: 'Combo', value: '/chart/combo'}
            ]
        },
        {
            label: 'Messages', value: 'messages', 
            items: [
                {label: 'Messages', value: '/messages'},
                {label: 'Toast', value: '/toast'}
            ]
        },
        {
            label: 'Media', value: 'media', 
            items: [
                {label: 'Carousel', value: '/carousel'}
            ]
        },
        {
            label: 'Galleria', value: 'galleria', 
            items: [
                {label: 'Documentation', value: '/galleria'},
                {label: 'Programmatic', value: '/galleria/programmatic'},
                {label: 'Indicator', value: '/galleria/indicator'},
                {label: 'Thumbnail', value: '/galleria/thumbnail'},
                {label: 'Navigator', value: '/galleria/navigator'},
                {label: 'Responsive', value: '/galleria/responsive'},
                {label: 'Fullscreen', value: '/galleria/fullscreen'},
                {label: 'AutoPlay', value: '/galleria/autoplay'},
                {label: 'Caption', value: '/galleria/caption'},
                {label: 'Advanced', value: '/galleria/advanced'}
            ]
        },
        {
            label: 'DragDrop', value: 'dragdrop', 
            items: [
                {label: 'DragDrop', value: '/dragdrop'}
            ]
        },
        {
            label: 'Misc', value: 'misc', 
            items: [
                {label: 'Avatar', value: '/avatar'},
                {label: 'Badge', value: '/badge'},
                {label: 'BlockUI', value: '/blockui'},
                {label: 'Captcha', value: '/captcha'},
                {label: 'Chip', value: '/chip'},
                {label: 'Inplace', value: '/inplace'},
                {label: 'ProgressBar', value: '/progressbar'},
                {label: 'ProgressSpinner', value: '/progressspinner'},
                {label: 'ScrollTop', value: '/scrolltop'},
                {label: 'Skeleton', value: '/skeleton'},
                {label: 'Tag', value: '/tag'},
                {label: 'Terminal', value: '/terminal'}
            ]
        },
        {
            label: 'Directives', value: 'directives', 
            items: [
                {label: 'Defer', value: '/defer'},
                {label: 'FocusTrap', value: '/focustrap'},
                {label: 'Ripple', value: '/ripple'}
            ]
        },
        {
            label: 'Utilities', value: 'utilities', 
            items: [
                {label: 'FilterService', value: '/filterservice'}
            ]
        },
    ];

    scrollable = true;

    config: AppConfig;

    subscription: Subscription;

    constructor(private el: ElementRef,private router: Router, private filterService: FilterService, private configService: AppConfigService) {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
        router.events.subscribe((routerEvent) => {
                if (routerEvent instanceof NavigationStart && (routerEvent.navigationTrigger ==="popstate" || this.scrollable)){
                    let routeUrl = routerEvent.url;

                    if (this.isSubmenu(routeUrl) && !this.isSubmenuActive('/'+routeUrl.split('/')[1])){
                        this.submenuRouting = true;
                    }

                    if (routerEvent.navigationTrigger ==="popstate") {
                        this.scrollable = true;
                    }
                }
    
                if (routerEvent instanceof NavigationEnd && !this.submenuRouting && this.scrollable){
                    setTimeout(() => {
                        this.scrollToSelectedRoute();
                    },1);
                }
        });
    }

    filterGroupedRoute(event) {
        let query = event.query;
        let filteredGroups = [];

        for (let optgroup of this.routes) {
            let filteredSubOptions = this.filterService.filter(optgroup.items, ['value'], query, "contains");
            if (filteredSubOptions && filteredSubOptions.length) {
                filteredGroups.push({
                    label: optgroup.label,
                    value: optgroup.value,
                    items: filteredSubOptions
                });
            }
        }

        this.filteredRoutes = filteredGroups;
    }

    onSelect(event) {
        if (this.router.url !== event.value) {
            this.scrollable = true;
            this.router.navigate([event.value]);
        }

        this.selectedRoute = null;
    }

    onAnimationDone() {
        if (this.submenuRouting) {
            this.scrollToSelectedRoute();
            this.submenuRouting = false;
        }
    }

    scrollToSelectedRoute() {
        let routeEl = DomHandler.findSingle(this.el.nativeElement, '.router-link-exact-active');

        if (routeEl) 
            routeEl.scrollIntoView({inline: 'start'});

        this.scrollable = false;
    }

    toggleSubmenu(event: Event, name: string) {
        this.activeSubmenus[name] = this.activeSubmenus[name] ? false: true;
        event.preventDefault();
    }

    isSubmenu(route) {
        return route.includes('table') || route.includes('treetable') || route.includes('tree') || route.includes('galleria');
    }

    isSubmenuActive(name: string) {
        if (this.activeSubmenus.hasOwnProperty(name)) {
            return this.activeSubmenus[name];
        }
        else if (this.router.isActive(name, false)) {
            this.activeSubmenus[name] = true;
            return true;
        }

        return false;
    }
}