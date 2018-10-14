import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { LoginGuardGuard } from '../services/services.index';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../services/services.index';
import { VerificaTokenGuard } from '../services/guards/verifica-token.guard';


// el parametro data sirve para enviar un objeto como parametro esto puede ser muy util 
// para crear el camino de migas de pan 

const pagesRoutes: Routes =
//  [
//     {   path: '',
//     component: PagesComponent,
//     canActivate: [LoginGuardGuard],
//     children: 
    [
        // el verificaTokenGuard se necesita poner en todas las paginas que necesiten autenticacio
        { path: 'dasboard', 
          component: DasboardComponent, 
          canActivate: [VerificaTokenGuard],
          data: { titulo: 'DasBoard' } 
        },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress' }  },
        { path: 'graficas', component: Graficas1Component, data: { titulo: 'Graficas' }  },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' }  },
        { path: 'observables', component: RjxsComponent, data: { titulo: 'Observables' }  },
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Configuracion de tema' }  },
        { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil de Usuario' }},
        { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador' }},
        // Mantenimietos
        { 
            path: 'usuarios', 
            component: UsuariosComponent, 
            canActivate: [ AdminGuard],
            data: {titulo: 'Mantenimiento de usuarios' }},
        { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales' }},
        { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de medicos' }},
        { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar Medico' }},
        { path: '', redirectTo: '/dasboard', pathMatch: 'full' }
   // ] }
];

// exportar este modulo de rutas para que pueda ser incorporado en otro lugar
// se utiliza el forchild por que este es un router dentro de otro router
// el PAGES_ROUTES van a ser parte del pagesModule

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
