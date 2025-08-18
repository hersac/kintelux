import { Location } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  logOutOutline,
  menuOutline,
  notificationsOutline,
  personCircleOutline,
  searchOutline,
} from 'ionicons/icons';
import { filter } from 'rxjs/operators';
import { AuthService } from '../../auth/auth.service';
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
  private location = inject(Location);
  private router = inject(Router);
  private authService = inject(AuthService);

  tituloSeccion: Signal<string | null> = this.useStore?.tituloSeccion;
  canGoBack: boolean = false;

  constructor() {
    addIcons({
      searchOutline,
      notificationsOutline,
      personCircleOutline,
      arrowBackOutline,
      menuOutline,
      logOutOutline,
    });
  }

  ngOnInit() {
    // Listen to router events to update canGoBack status
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Check if we can go back in history
        this.canGoBack =
          this.router.getCurrentNavigation()?.previousNavigation !== null;
      });
  }

  goBack() {
    this.location.back();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
