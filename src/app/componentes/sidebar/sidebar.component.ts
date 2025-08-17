import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonAccordion,
  IonAccordionGroup,
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
  peopleOutline,
  personOutline,
  pricetagOutline,
  settingsOutline,
  swapHorizontalOutline,
} from 'ionicons/icons';

interface MenuOption {
  icono: string;
  tituloOpcion: string;
  subOpciones?: MenuOption[];
  ruta?: string;
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
  ],
})
export class SidebarComponent implements OnInit {
  constructor() {
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
          tituloOpcion: 'Reportes',
          ruta: '/inventario/reportes',
        },
        {
          icono: 'bar-chart-outline',
          tituloOpcion: 'Estadísticas',
          ruta: '/inventario/estadisticas',
        },
      ],
    },
  ];

  ngOnInit() {}
}
