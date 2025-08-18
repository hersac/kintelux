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
import { DescripcionTerceroComponenent } from './contenidos/descripcion-tercero/descripcion-tercero.component';
import { RegistrarTerceroComponent } from './formularios/registrar-tercero/registrar-tercero.component';
import { TablaTercerosComponent } from './tablas/tabla-terceros/tabla-terceros.component';

@Component({
  selector: 'app-terceros',
  templateUrl: './terceros.page.html',
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
    TablaTercerosComponent,
    RegistrarTerceroComponent,
    DescripcionTerceroComponenent,
  ],
})
export class TercerosPage implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarEdicion: boolean = false;
  terceroSeleccionado: any = null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mostrarEdicion = false;
      this.terceroSeleccionado = null;
    }
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  onTerceroSeleccionado(tercero: any) {
    this.terceroSeleccionado = tercero;
    this.mostrarEdicion = true;
    this.mostrarFormulario = false;
  }

  ocultarEdicion() {
    this.mostrarEdicion = false;
    this.terceroSeleccionado = null;
  }
}
