import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline } from 'ionicons/icons';
import { DescripcionItemComponent } from './contenidos/descripcion-item/descripcion-item.component';
import { RegistrarItemComponent } from './formularios/registrar-item/registrar-item.component';
import { TablaItemsComponent } from './tablas/tabla-items/tabla-items.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.page.html',
  styles: [
    `
      .icon-primary {
        color: var(--ion-color-primary);
      }
    `,
  ],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    CommonModule,
    TablaItemsComponent,
    RegistrarItemComponent,
    DescripcionItemComponent,
  ],
})
export class ItemsPage implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarEdicion: boolean = false;
  itemSeleccionado: any = null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mostrarEdicion = false;
      this.itemSeleccionado = null;
    }
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  onItemSeleccionado(item: any) {
    this.itemSeleccionado = item;
    this.mostrarEdicion = true;
    this.mostrarFormulario = false;
  }

  ocultarEdicion() {
    this.mostrarEdicion = false;
    this.itemSeleccionado = null;
  }
}
