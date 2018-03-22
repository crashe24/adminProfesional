import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DasboardComponent } from './dasboard/dasboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';


const pagesRoutes: Routes = [
    {   path: '',
    component: PagesComponent,
    children: [
        { path: 'dasboard', component: DasboardComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graficas', component: Graficas1Component },
        { path: '', redirectTo: '/dasboard', pathMatch: 'full' }
    ] }
];

// exportar este modulo de rutas para que pueda ser incorporado en otro lugar
// se utiliza el forchild por que este es un router dentro de otro router
// el PAGES_ROUTES van a ser parte del pagesModule

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
