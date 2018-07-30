import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { LoginGuardGuard } from '../services/services.index';

// el parametro data sirve para enviar un objeto como parametro esto puede ser muy util 
// para crear el camino de migas de pan 

const pagesRoutes: Routes = [
    {   path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children: [
        { path: 'dasboard', component: DasboardComponent, data: { titulo: 'DasBoard' } },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }  },
        { path: 'graficas', component: Graficas1Component, data: { titulo: 'Graficas' }  },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
        { path: 'observables', component: RjxsComponent, data: { titulo: 'Observables' }  },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion de tema' }  },
        { path: '', redirectTo: '/dasboard', pathMatch: 'full' }
    ] }
];

// exportar este modulo de rutas para que pueda ser incorporado en otro lugar
// se utiliza el forchild por que este es un router dentro de otro router
// el PAGES_ROUTES van a ser parte del pagesModule

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
