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



// libreria de graficas
import { ChartsModule } from 'ng2-charts';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// Routes


@NgModule({
    declarations: [
        DasboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent,
        IncrementadorComponent, // este posiblemente luego lo vamos a retirar de aqui
        GraficoDonaComponent,
        AccountSettingsComponent
    ],
    imports: [ SharedModule, PAGES_ROUTES, FormsModule, ChartsModule, BrowserModule],
    exports: [ DasboardComponent,
              ProgressComponent,
              Graficas1Component
    ],
              
    providers: [],
    bootstrap: []
})

export class PagesModules { }
