
import { RouterModule, Routes } from '@angular/router';
// Principal
import { PagesComponent } from './pages/pages.component';

// rutas normales
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';




const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '', component: PagesComponent,
        canActivate : [ LoginGuardGuard],
        loadChildren: './pages/pages.modules#PagesModules'
    }, 
    { path: 'register', component: RegisterComponent },
    { path: '**', component: NopagefoundComponent  }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, {useHash: true});
