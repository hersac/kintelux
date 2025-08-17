import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { Chart, registerables } from 'chart.js';
import { GlobalStore } from '../../store';

// Registrar todos los componentes de Chart.js
Chart.register(...registerables);

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styles: [
    `
      .welcome-section {
        margin-top: var(--app-spacing-lg);
      }
      .charts-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 20px;
        margin-top: 20px;
      }
      .chart-box {
        background: white;
        border-radius: 10px;
        padding: 15px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      .chart-title {
        font-weight: bold;
        margin-bottom: 10px;
        text-align: center;
      }
    `,
  ],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule],
})
export class InicioPage implements OnInit, AfterViewInit {
  private store = inject(GlobalStore);

  @ViewChild('clientesChart') clientesChartRef!: ElementRef;
  @ViewChild('ventasChart') ventasChartRef!: ElementRef;
  @ViewChild('inventarioChart') inventarioChartRef!: ElementRef;

  clientesChart: any;
  ventasChart: any;
  inventarioChart: any;

  constructor() {}

  ngOnInit() {
    this.store.establecerTituloSeccion('Inicio');
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.crearGraficaClientes();
      this.crearGraficaVentas();
      this.crearGraficaInventario();
    }, 100);
  }

  crearGraficaClientes() {
    // Datos de ejemplo para gráfica circular de mejores clientes
    const data = {
      labels: ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Otros'],
      datasets: [
        {
          data: [30, 25, 20, 15, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };

    this.clientesChart = new Chart(this.clientesChartRef.nativeElement, {
      type: 'pie',
      data: data,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Compras por Cliente (%)',
          },
        },
      },
    });
  }

  crearGraficaVentas() {
    // Datos de ejemplo para gráfica de barras de mayores ventas por ítem
    const data = {
      labels: [
        'Producto A',
        'Producto B',
        'Producto C',
        'Producto D',
        'Producto E',
      ],
      datasets: [
        {
          label: 'Ventas Totales',
          data: [12500, 19000, 15000, 9500, 22000],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    this.ventasChart = new Chart(this.ventasChartRef.nativeElement, {
      type: 'bar',
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Ventas ($)',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Productos',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Mayores Ventas por Producto',
          },
        },
      },
    });
  }

  crearGraficaInventario() {
    // Datos de ejemplo para gráfica lineal de balance de inventario
    const labels = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
    ];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Entradas',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1,
        },
        {
          label: 'Salidas',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          borderColor: 'rgb(255, 99, 132)',
          tension: 0.1,
        },
      ],
    };

    this.inventarioChart = new Chart(this.inventarioChartRef.nativeElement, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Cantidad',
            },
          },
          x: {
            title: {
              display: true,
              text: 'Mes',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Balance de Inventario',
          },
        },
      },
    });
  }
}
