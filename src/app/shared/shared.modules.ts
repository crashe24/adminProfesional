import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from '../pipes/pipes.module';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';

@NgModule({
    imports: [ RouterModule, CommonModule, PipesModule],
   declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent,
    ModalUploadComponent
   ],
   exports: [HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent,
    ModalUploadComponent],
   providers: [],
   bootstrap: []

})

export class SharedModule {}
