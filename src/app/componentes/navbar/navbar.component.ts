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
import { ThemeService } from '../../services/theme.service';
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

      :host-context(.dark) ion-toolbar {
        --background: #1a1a1a;
        --color: #ffffff;
      }

      ion-button {
        --color: var(--ion-color-kintelux-primary-contrast);
      }

      ion-icon {
        color: var(--ion-color-kintelux-primary-contrast);
      }

      :host-context(.dark) ion-icon {
        color: #ffffff;
      }

      ion-menu-button {
        color: var(--ion-color-kintelux-primary-contrast);
      }

      :host-context(.dark) ion-menu-button {
        color: #ffffff;
      }

      ion-title {
        text-align: center;
        color: var(--ion-color-kintelux-primary-contrast);
      }

      :host-context(.dark) ion-title {
        color: #ffffff;
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
  private themeService = inject(ThemeService);

  tituloSeccion: Signal<string | null> = this.useStore?.tituloSeccion;
  canGoBack: boolean = false;
  isDarkTheme: boolean = false;

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

    // Subscribe to theme changes
    this.themeService.darkMode$.subscribe(isDark => {
      this.isDarkTheme = isDark;
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
