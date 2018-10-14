import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


// rutas
import { APP_ROUTES } from './app.routes';


// modulos se carga de forma dinamica
// import { PagesModules } from './pages/pages.modules';

// componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// modulo de los servicios 
import { ServiceModule } from './services/service.module';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.modules';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
   // IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
   // PagesModules, es el que se carga con el lazy load
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    SharedModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
