import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/inicio/inicio.page').then(m => m.InicioPage),
    pathMatch: 'full',
  },
  {
    path: 'maestros',
    children: [
      {
        path: 'terceros',
        loadComponent: () =>
          import('./views/maestros/terceros/terceros.page').then(
            m => m.TercerosPage,
          ),
      },
      {
        path: 'proveedores',
        loadComponent: () =>
          import('./views/maestros/proveedores/proveedores.page').then(
            m => m.ProveedoresPage,
          ),
      },
      {
        path: 'clientes',
        loadComponent: () =>
          import('./views/maestros/clientes/clientes.page').then(
            m => m.ClientesPage,
          ),
      },
      {
        path: 'items',
        loadComponent: () =>
          import('./views/maestros/items/items.page').then(m => m.ItemsPage),
      },
      {
        path: 'productos',
        loadComponent: () =>
          import('./views/maestros/productos/productos.page').then(
            m => m.ProductosPage,
          ),
      },
    ],
  },
  {
    path: 'compras',
    loadComponent: () =>
      import('./views/compras/compras.page').then(m => m.ComprasPage),
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./views/ventas/ventas.page').then(m => m.VentasPage),
  },
  {
    path: 'inventario',
    children: [
      {
        path: 'movimientos-inventario',
        loadComponent: () =>
          import(
            './views/inventario/movimiento-inventario/movimiento-inventario.page'
          ).then(m => m.MovimientoInventarioPage),
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./views/inventario/reportes/reportes.page').then(
            m => m.ReportesPage,
          ),
      },
      {
        path: 'estadisticas',
        loadComponent: () =>
          import('./views/inventario/estadisticas/estadisticas.page').then(
            m => m.EstadisticasPage,
          ),
      },
    ],
  },
  {
    path: 'clientes',
    loadComponent: () => import('./views/maestros/clientes/clientes.page').then( m => m.ClientesPage)
  },
];
