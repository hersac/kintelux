import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonFooter,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonToolbar,
    IonTitle,
    IonApp,
    IonRouterOutlet,
    IonContent,
    NavbarComponent,
    SidebarComponent,
    IonFooter,
  ],
})
export class AppComponent {}
