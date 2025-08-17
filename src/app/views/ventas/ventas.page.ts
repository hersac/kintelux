import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { EncabezadoVentaComponent } from './componentes/encabezado-venta/encabezado-venta.component';
import { ModalAgregarProductoComponent } from './componentes/modal-agregar-producto/modal-agregar-producto.component';
import {
  MovimientosVentaComponent,
  ProductoMovimiento,
} from './componentes/movimientos-venta/movimientos-venta.component';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.page.html',
  styles: [''],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    EncabezadoVentaComponent,
    MovimientosVentaComponent,
    ModalAgregarProductoComponent,
  ],
})
export class VentasPage implements OnInit {
  @ViewChild(ModalAgregarProductoComponent)
  modalProducto!: ModalAgregarProductoComponent;
  @ViewChild(MovimientosVentaComponent)
  movimientosVenta!: MovimientosVentaComponent;
  @ViewChild(EncabezadoVentaComponent)
  encabezadoVenta!: EncabezadoVentaComponent;

  encabezadoValido = false;

  constructor(private toastController: ToastController) {}

  ngOnInit() {}

  abrirModalProducto() {
    this.modalProducto.abrirModal();
  }

  onProductoAgregado(producto: ProductoMovimiento) {
    this.movimientosVenta.addProductoToList(producto);
  }

  onEncabezadoValidChange(esValido: boolean) {
    this.encabezadoValido = esValido;
  }

  async guardarVenta() {
    if (!this.encabezadoValido) {
      this.presentToast(
        'Por favor, complete todos los campos del encabezado.',
        'danger',
      );
      return;
    }

    if (this.movimientosVenta.productosVenta.length === 0) {
      this.presentToast(
        'Debe agregar al menos un producto a la venta.',
        'danger',
      );
      return;
    }

    // Aquí iría la lógica para guardar la venta
    console.log('Guardando venta...');
    console.log('Encabezado válido:', this.encabezadoValido);
    console.log('Productos:', this.movimientosVenta.productosVenta);
    console.log('Total:', this.movimientosVenta.totalVenta);

    // Simulamos el guardado con un timeout
    await this.presentToast('Guardando venta...', 'primary');

    setTimeout(() => {
      // Reiniciar formularios y listas
      this.reiniciarVista();

      // Mostrar mensaje de éxito
      this.presentToast('Venta guardada correctamente', 'success');
    }, 1500);
  }

  // Método para reiniciar toda la vista
  reiniciarVista() {
    // Reiniciar el encabezado
    this.encabezadoVenta.reiniciarFormulario();

    // Reiniciar los movimientos
    this.movimientosVenta.reiniciarMovimientos();

    // Reiniciar el estado de validación
    this.encabezadoValido = false;
  }

  // Método para mostrar mensajes toast
  async presentToast(mensaje: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'top',
    });
    toast.present();
  }
}
