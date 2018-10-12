import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.modules';
import { PAGES_ROUTES } from './pages.routes';
import { FormsModule } from '@angular/forms';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';


// importacion del modulo de pipes 
import { PipesModule } from '../pipes/pipes.module';



// libreria de graficas
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RjxsComponent } from './rjxs/rjxs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from '../pages/medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';

// busqueda 
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
    declarations: [
        DasboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent, // este posiblemente luego lo vamos a retirar de aqui
        GraficoDonaComponent,
        AccountSettingsComponent,
        PromesasComponent,
        RjxsComponent,
        ProfileComponent, 
        UsuariosComponent, 
        ModalUploadComponent, HospitalesComponent, MedicosComponent, MedicoComponent, BusquedaComponent
    ],
    imports: [ SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, BrowserModule,
            PipesModule, CommonModule],
    exports: [ DasboardComponent,
              ProgressComponent,
              Graficas1Component
    ],
              
    providers: [],
    bootstrap: []
})


export class PagesModules { } 
