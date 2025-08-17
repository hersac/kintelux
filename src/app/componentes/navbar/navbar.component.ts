import { Component, inject, OnInit, Signal } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  menuOutline,
  notificationsOutline,
  personCircleOutline,
  searchOutline,
} from 'ionicons/icons';
import { GlobalStore } from '../../store';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
    `
      ion-toolbar {
        --background: var(--ion-color-kintelux-primary);
        --color: var(--ion-color-kintelux-primary-contrast);
      }

      ion-button {
        --color: var(--ion-color-kintelux-primary-contrast);
      }

      ion-icon {
        color: var(--ion-color-kintelux-primary-contrast);
      }

      ion-menu-button {
        color: var(--ion-color-kintelux-primary-contrast);
      }

      ion-title {
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonButtons,
    IonMenuButton,
  ],
})
export class NavbarComponent implements OnInit {
  private useStore = inject(GlobalStore);
  tituloSeccion: Signal<string | null> = this.useStore?.tituloSeccion;

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      personCircleOutline,
      arrowBackOutline,
      menuOutline,
    });
  }

  ngOnInit() {}
}
