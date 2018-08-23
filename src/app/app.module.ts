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
// import { IncrementadorComponent } from './components/incrementador/incrementador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';

// modulo de los servicios 
import { ServiceModule } from './services/service.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
    
    
    
    
    
   // IncrementadorComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModules, 
    FormsModule,
    ReactiveFormsModule,
    ServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
