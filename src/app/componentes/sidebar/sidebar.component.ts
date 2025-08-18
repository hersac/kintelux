import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  barChartOutline,
  briefcaseOutline,
  cartOutline,
  cashOutline,
  clipboardOutline,
  cubeOutline,
  documentTextOutline,
  homeOutline,
  logOutOutline,
  moonOutline,
  peopleOutline,
  personOutline,
  pricetagOutline,
  settingsOutline,
  sunnyOutline,
  swapHorizontalOutline,
} from 'ionicons/icons';
import { AuthService } from '../../auth/auth.service';

interface MenuOption {
  icono: string;
  tituloOpcion: string;
  subOpciones?: MenuOption[];
  ruta?: string;
  deshabilitado?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
    `
      .menu-item {
        cursor: pointer;
      }
      .submenu-item {
        padding-left: 16px;
      }
      ion-item[disabled] {
        opacity: 0.6;
        cursor: not-allowed;
      }
      .bottom-options {
        position: absolute;
        bottom: 0;
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 16px;
        border-top: 1px solid var(--ion-color-light);
      }
      .bottom-option-btn {
        --padding-start: 12px;
        --padding-end: 12px;
      }
    `,
  ],
  standalone: true,
  imports: [
    IonMenu,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonAccordion,
    IonAccordionGroup,
    RouterLink,
    IonButton,
  ],
})
export class SidebarComponent implements OnInit {
  isDarkTheme: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    addIcons({
      briefcaseOutline,
      cubeOutline,
      homeOutline,
      peopleOutline,
      personOutline,
      pricetagOutline,
      settingsOutline,
      cartOutline,
      cashOutline,
      clipboardOutline,
      swapHorizontalOutline,
      documentTextOutline,
      barChartOutline,
      logOutOutline,
      moonOutline,
      sunnyOutline,
    });
  }
  menuOptions: MenuOption[] = [
    {
      icono: 'home-outline',
      tituloOpcion: 'Inicio',
      ruta: '/',
    },
    {
      icono: 'settings-outline',
      tituloOpcion: 'Maestros',
      subOpciones: [
        {
          icono: 'people-outline',
          tituloOpcion: 'Terceros',
          ruta: '/maestros/terceros',
        },
        {
          icono: 'briefcase-outline',
          tituloOpcion: 'Proveedores',
          ruta: '/maestros/proveedores',
        },
        {
          icono: 'person-outline',
          tituloOpcion: 'Clientes',
          ruta: '/maestros/clientes',
        },
        {
          icono: 'cube-outline',
          tituloOpcion: 'Items',
          ruta: '/maestros/items',
        },
        {
          icono: 'pricetag-outline',
          tituloOpcion: 'Productos',
          ruta: '/maestros/productos',
        },
      ],
    },
    {
      icono: 'cart-outline',
      tituloOpcion: 'Compras',
      ruta: '/compras',
    },
    {
      icono: 'cash-outline',
      tituloOpcion: 'Ventas',
      ruta: '/ventas',
    },
    {
      icono: 'clipboard-outline',
      tituloOpcion: 'Inventario',
      subOpciones: [
        {
          icono: 'swap-horizontal-outline',
          tituloOpcion: 'Movimientos de Inventario',
          ruta: '/inventario/movimientos-inventario',
        },
        {
          icono: 'document-text-outline',
          tituloOpcion: 'Reportes (En construcción)',
          ruta: '/inventario/reportes',
          deshabilitado: true,
        },
        {
          icono: 'bar-chart-outline',
          tituloOpcion: 'Estadísticas (En construcción)',
          ruta: '/inventario/estadisticas',
          deshabilitado: true,
        },
      ],
    },
  ];

  ngOnInit() {
    // Check if dark theme was previously set
    const prefersDark = localStorage.getItem('darkTheme') === 'true';
    this.isDarkTheme = prefersDark;
    this.applyTheme(prefersDark);
  }

  openConfiguration() {
    // Navigate to configuration page or open configuration modal
    // This can be replaced with actual implementation once you have a configuration page
    console.log('Opening configuration');
    // Example: this.router.navigate(['/configuration']);
  }

  toggleDarkTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.applyTheme(this.isDarkTheme);
    localStorage.setItem('darkTheme', this.isDarkTheme.toString());
  }

  private applyTheme(dark: boolean) {
    document.body.classList.toggle('dark', dark);
  }
}
