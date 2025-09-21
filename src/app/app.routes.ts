import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
    title: 'Modo Ride - Patinetes e Bicicletas Elétricas | Mobilidade Urbana Sustentável'
  },
  {
    path: 'patinetes-eletricos',
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent),
    data: { category: 'patinetes', title: 'Patinetes Elétricos | Scooters de Alta Qualidade - Modo Ride' }
  },
  {
    path: 'bicicletas-eletricas', 
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent),
    data: { category: 'bicicletas-eletricas', title: 'Bicicletas Elétricas | E-bikes Inovadoras - Modo Ride' }
  },
  {
    path: 'bicicletas',
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent),
    data: { category: 'bicicletas', title: 'Bicicletas Convencionais | Bikes de Qualidade - Modo Ride' }
  },
  {
    path: 'acessorios',
    loadComponent: () => import('./pages/catalog/catalog.component').then(m => m.CatalogComponent),
    data: { category: 'acessorios', title: 'Acessórios para Mobilidade Urbana | Capacetes e Peças - Modo Ride' }
  },
  // Manter rota antiga para compatibilidade
  {
    path: 'catalogo',
    redirectTo: '/patinetes-eletricos',
    pathMatch: 'full'
  },
  {
    path: 'sobre-nos',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent),
    title: 'Sobre a Modo Ride | Nossa História e Missão na Mobilidade Urbana'
  },
  // Manter rota antiga para compatibilidade  
  {
    path: 'sobre',
    redirectTo: '/sobre-nos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: ''
  }];
