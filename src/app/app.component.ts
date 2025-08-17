import { Component } from '@angular/core';
import {
  IonApp,
  IonContent,
  IonFooter,
  IonIcon,
  IonRouterOutlet,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  locationOutline,
  mailOutline,
  phonePortraitOutline,
} from 'ionicons/icons';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { SidebarComponent } from './componentes/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonIcon,
    IonToolbar,
    IonApp,
    IonRouterOutlet,
    IonContent,
    NavbarComponent,
    SidebarComponent,
    IonFooter,
  ],
})
export class AppComponent {
  constructor() {
    addIcons({
      callOutline,
      mailOutline,
      locationOutline,
      phonePortraitOutline,
    });
  }
}
