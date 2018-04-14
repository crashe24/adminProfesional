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
import { FormsModule } from '@angular/forms';
// import { GraficoDonaComponent } from './components/grafico-dona/grafico-dona.component';



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
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
