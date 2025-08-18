import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
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
import { AuthService } from './auth/auth.service';
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
    CommonModule,
  ],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {
    addIcons({
      callOutline,
      mailOutline,
      locationOutline,
      phonePortraitOutline,
    });
  }

  ngOnInit() {
    // Subscribe to the authentication state changes
    this.authService.isAuthenticated$.subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
    });
  }
}
