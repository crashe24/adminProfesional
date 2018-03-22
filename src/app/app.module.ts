import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// rutas
import { APP_ROUTES } from './app.routes';


// modulos
import { PagesModules } from './pages/pages.modules';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
