import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';


import { SettingsService, SidebarService, SharedService, UsuarioService, 
  SubirArchivoService, LoginGuardGuard, AdminGuard, VerificaTokenGuard,
HospitalService, MedicoService } from './services.index';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [SettingsService, SidebarService, SharedService, UsuarioService, 
    SubirArchivoService, LoginGuardGuard, AdminGuard, VerificaTokenGuard,
    ModalUploadService,
    HospitalService, MedicoService],
  declarations: []
})
export class ServiceModule { }
