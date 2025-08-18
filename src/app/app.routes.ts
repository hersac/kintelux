import { Routes } from '@angular/router';
import { authGuardGuard } from './auth/auth-guard-guard';
import { loginGuard } from './auth/login-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./views/inicio/inicio.page').then(m => m.InicioPage),
    pathMatch: 'full',
    canActivate: [authGuardGuard],
  },
  {
    path: 'maestros',
    canActivate: [authGuardGuard],
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
    canActivate: [authGuardGuard],
  },
  {
    path: 'ventas',
    loadComponent: () =>
      import('./views/ventas/ventas.page').then(m => m.VentasPage),
    canActivate: [authGuardGuard],
  },
  {
    path: 'inventario',
    canActivate: [authGuardGuard],
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
    path: 'login',
    loadComponent: () =>
      import('./views/autenticacion/login/login.page').then(m => m.LoginPage),
    canActivate: [loginGuard],
  },
  // Redirect any unknown paths to login
  {
    path: '**',
    redirectTo: 'login',
  },
];
