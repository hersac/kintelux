import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonTitle,
  IonToolbar,
  ToastController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowDownCircleOutline,
  arrowUpCircleOutline,
  chevronDownOutline,
  chevronUpOutline,
  filterOutline,
  searchOutline,
} from 'ionicons/icons';

// Definimos la interfaz para los movimientos de inventario
interface MovimientoInventario {
  id: number;
  fecha: string;
  tipoDocumento: string;
  numeroDocumento: string;
  tipoMovimiento: 'entrada' | 'salida';
  codigoItem: string;
  nombreItem: string;
  cantidad: number;
  valorUnitario: number;
  valorTotal: number;
  terceroId: string;
  terceroNombre: string;
  centroOperacion: string;
}

// Definimos la interfaz para los filtros
interface FiltrosInventario {
  fechaInicio: string;
  fechaFin: string;
  codigoItem: string;
  proveedorId: string;
  clienteId: string;
  tipoMovimiento: 'todos' | 'entrada' | 'salida';
}

@Component({
  selector: 'app-movimiento-inventario',
  templateUrl: './movimiento-inventario.page.html',
  styleUrls: ['./movimiento-inventario.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonIcon,
    IonText,
  ],
})
export class MovimientoInventarioPage implements OnInit {
  // Lista de movimientos de inventario
  movimientos: MovimientoInventario[] = [];

  // Objeto para almacenar los filtros
  filtros: FiltrosInventario = {
    fechaInicio: '',
    fechaFin: '',
    codigoItem: '',
    proveedorId: '',
    clienteId: '',
    tipoMovimiento: 'todos',
  };

  // Flag para indicar si ya se aplicaron filtros
  filtrosAplicados = false;

  // Control para el acordeón de filtros
  filtrosExpandidos = true;

  // Datos para los selectores
  items = [
    { codigo: 'IT001', nombre: 'Laptop HP Pavilion' },
    { codigo: 'IT002', nombre: 'Monitor Dell 24"' },
    { codigo: 'IT003', nombre: 'Teclado Mecánico Logitech' },
    { codigo: 'IT004', nombre: 'Mouse Inalámbrico Microsoft' },
    { codigo: 'IT005', nombre: 'Impresora HP LaserJet' },
  ];

  proveedores = [
    { id: 'P001', nombre: 'Tecnologías del Sur S.A.S' },
    { id: 'P002', nombre: 'Distribuidora Oriental Ltda.' },
    { id: 'P003', nombre: 'Importaciones del Norte S.A.' },
  ];

  clientes = [
    { id: 'C001', nombre: 'Comercial del Este S.A.S' },
    { id: 'C002', nombre: 'Supermercados Centro Ltda.' },
    { id: 'C003', nombre: 'Tiendas del Oeste S.A.' },
  ];

  constructor(private toastController: ToastController) {
    addIcons({
      arrowUpCircleOutline,
      arrowDownCircleOutline,
      filterOutline,
      searchOutline,
      chevronDownOutline,
      chevronUpOutline,
    });
  }

  // Método para alternar la visibilidad de los filtros
  toggleFiltros() {
    this.filtrosExpandidos = !this.filtrosExpandidos;
  }

  ngOnInit() {
    // Inicializar fechas
    this.filtros.fechaInicio = this.obtenerFechaInicioMes();
    this.filtros.fechaFin = this.obtenerFechaActual();

    // Cargar todos los datos al iniciar
    this.cargarTodosLosMovimientos();
    this.filtrosAplicados = true;
  }

  // Método para cargar todos los movimientos sin filtros
  cargarTodosLosMovimientos() {
    this.movimientos = this.generarDatosEjemplo();
  }

  // Método para aplicar los filtros
  aplicarFiltros() {
    console.log('Filtros aplicados:', this.filtros);
    this.filtrosAplicados = true;
    this.filtrarMovimientos();

    this.presentToast('Filtros aplicados correctamente');
  }

  // Método para limpiar los filtros
  limpiarFiltros() {
    this.filtros = {
      fechaInicio: this.obtenerFechaInicioMes(),
      fechaFin: this.obtenerFechaActual(),
      codigoItem: '',
      proveedorId: '',
      clienteId: '',
      tipoMovimiento: 'todos',
    };

    // Cargar todos los datos al limpiar filtros
    this.cargarTodosLosMovimientos();

    this.presentToast('Filtros restablecidos');
  }

  // Método para crear entrada manual
  crearEntradaManual() {
    // Aquí iría la lógica para abrir un modal o navegar a la pantalla de entrada manual
    console.log('Crear entrada manual');
    this.presentToast('Redirigiendo a creación de entrada manual');
  }

  // Método para crear salida manual
  crearSalidaManual() {
    // Aquí iría la lógica para abrir un modal o navegar a la pantalla de salida manual
    console.log('Crear salida manual');
    this.presentToast('Redirigiendo a creación de salida manual');
  }

  // Método para calcular el total de los movimientos
  calcularTotalMovimientos(): number {
    return this.movimientos.reduce((total, movimiento) => {
      return total + movimiento.valorTotal;
    }, 0);
  }

  // Método para filtrar los movimientos según los filtros aplicados
  private filtrarMovimientos() {
    // En una aplicación real, esto haría una llamada a un servicio para obtener los datos filtrados
    // Para este ejemplo, simplemente filtramos los datos generados

    // Simulamos una consulta a la base de datos
    setTimeout(() => {
      this.movimientos = this.generarDatosEjemplo().filter(movimiento => {
        const fechaMovimiento = new Date(movimiento.fecha);
        const fechaInicio = new Date(this.filtros.fechaInicio);
        const fechaFin = new Date(this.filtros.fechaFin);

        // Filtro por fechas
        if (fechaMovimiento < fechaInicio || fechaMovimiento > fechaFin) {
          return false;
        }

        // Filtro por tipo de movimiento
        if (
          this.filtros.tipoMovimiento !== 'todos' &&
          movimiento.tipoMovimiento !== this.filtros.tipoMovimiento
        ) {
          return false;
        }

        // Filtro por código de item
        if (
          this.filtros.codigoItem &&
          movimiento.codigoItem !== this.filtros.codigoItem
        ) {
          return false;
        }

        // Filtro por proveedor (solo para entradas)
        if (
          this.filtros.proveedorId &&
          movimiento.tipoMovimiento === 'entrada' &&
          movimiento.terceroId !== this.filtros.proveedorId
        ) {
          return false;
        }

        // Filtro por cliente (solo para salidas)
        if (
          this.filtros.clienteId &&
          movimiento.tipoMovimiento === 'salida' &&
          movimiento.terceroId !== this.filtros.clienteId
        ) {
          return false;
        }

        return true;
      });
    }, 500);
  }

  // Método para formatear la moneda
  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(valor);
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

  // Método para obtener la fecha actual formateada
  private obtenerFechaActual(): string {
    const fecha = new Date();
    return fecha.toISOString().split('T')[0];
  }

  // Método para obtener la fecha de inicio del mes actual
  private obtenerFechaInicioMes(): string {
    const fecha = new Date();
    fecha.setDate(1);
    return fecha.toISOString().split('T')[0];
  }

  // Método para generar datos de ejemplo
  private generarDatosEjemplo(): MovimientoInventario[] {
    const movimientosDemo: MovimientoInventario[] = [
      {
        id: 1,
        fecha: '2025-08-10',
        tipoDocumento: 'FCO',
        numeroDocumento: '001',
        tipoMovimiento: 'entrada',
        codigoItem: 'IT001',
        nombreItem: 'Laptop HP Pavilion',
        cantidad: 5,
        valorUnitario: 2500000,
        valorTotal: 12500000,
        terceroId: 'P001',
        terceroNombre: 'Tecnologías del Sur S.A.S',
        centroOperacion: 'Principal Bogotá',
      },
      {
        id: 2,
        fecha: '2025-08-12',
        tipoDocumento: 'FVE',
        numeroDocumento: '001',
        tipoMovimiento: 'salida',
        codigoItem: 'IT001',
        nombreItem: 'Laptop HP Pavilion',
        cantidad: 2,
        valorUnitario: 3200000,
        valorTotal: 6400000,
        terceroId: 'C001',
        terceroNombre: 'Comercial del Este S.A.S',
        centroOperacion: 'Principal Bogotá',
      },
      {
        id: 3,
        fecha: '2025-08-14',
        tipoDocumento: 'FCO',
        numeroDocumento: '002',
        tipoMovimiento: 'entrada',
        codigoItem: 'IT002',
        nombreItem: 'Monitor Dell 24"',
        cantidad: 10,
        valorUnitario: 850000,
        valorTotal: 8500000,
        terceroId: 'P002',
        terceroNombre: 'Distribuidora Oriental Ltda.',
        centroOperacion: 'Sucursal Medellín',
      },
      {
        id: 4,
        fecha: '2025-08-15',
        tipoDocumento: 'FVE',
        numeroDocumento: '002',
        tipoMovimiento: 'salida',
        codigoItem: 'IT002',
        nombreItem: 'Monitor Dell 24"',
        cantidad: 4,
        valorUnitario: 1100000,
        valorTotal: 4400000,
        terceroId: 'C002',
        terceroNombre: 'Supermercados Centro Ltda.',
        centroOperacion: 'Principal Bogotá',
      },
      {
        id: 5,
        fecha: '2025-08-16',
        tipoDocumento: 'FCO',
        numeroDocumento: '003',
        tipoMovimiento: 'entrada',
        codigoItem: 'IT003',
        nombreItem: 'Teclado Mecánico Logitech',
        cantidad: 15,
        valorUnitario: 320000,
        valorTotal: 4800000,
        terceroId: 'P003',
        terceroNombre: 'Importaciones del Norte S.A.',
        centroOperacion: 'Sucursal Cali',
      },
      {
        id: 6,
        fecha: '2025-08-17',
        tipoDocumento: 'FVE',
        numeroDocumento: '003',
        tipoMovimiento: 'salida',
        codigoItem: 'IT003',
        nombreItem: 'Teclado Mecánico Logitech',
        cantidad: 7,
        valorUnitario: 420000,
        valorTotal: 2940000,
        terceroId: 'C003',
        terceroNombre: 'Tiendas del Oeste S.A.',
        centroOperacion: 'Sucursal Cali',
      },
    ];

    return movimientosDemo;
  }
}
