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
import { DescripcionProveedorComponent } from './contenidos/descripcion-proveedor/descripcion-proveedor.component';
import { RegistrarProveedorComponent } from './formularios/registrar-proveedor/registrar-proveedor.component';
import { TablaProveedoresComponent } from './tablas/tabla-proveedores/tabla-proveedores.component';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.page.html',
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
    TablaProveedoresComponent,
    RegistrarProveedorComponent,
    DescripcionProveedorComponent,
  ],
})
export class ProveedoresPage implements OnInit {
  mostrarFormulario: boolean = false;
  mostrarEdicion: boolean = false;
  proveedorSeleccionado: any = null;

  constructor() {
    addIcons({ addCircleOutline });
  }

  ngOnInit() {}

  toggleFormulario() {
    this.mostrarFormulario = !this.mostrarFormulario;
    if (this.mostrarFormulario) {
      this.mostrarEdicion = false;
      this.proveedorSeleccionado = null;
    }
  }

  ocultarFormulario() {
    this.mostrarFormulario = false;
  }

  onProveedorSeleccionado(proveedor: any) {
    this.proveedorSeleccionado = proveedor;
    this.mostrarEdicion = true;
    this.mostrarFormulario = false;
  }

  ocultarEdicion() {
    this.mostrarEdicion = false;
    this.proveedorSeleccionado = null;
  }
}
