import { NgModule } from '@angular/core';

import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.modules';
import { PAGES_ROUTES } from './pages.routes';

// Routes


@NgModule({
    declarations: [
        DasboardComponent,
        ProgressComponent,
        Graficas1Component,
        PagesComponent
    ],
    imports: [ SharedModule, PAGES_ROUTES],
    exports: [ DasboardComponent,
              ProgressComponent,
              Graficas1Component],
    providers: [],
    bootstrap: []
})

export class PagesModules { }
