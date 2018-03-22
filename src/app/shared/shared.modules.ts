import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { BreadcrumsComponent } from './breadcrums/breadcrums.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';

@NgModule({
   declarations: [
    HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent
   ],
   exports: [HeaderComponent,
    SidebarComponent,
    BreadcrumsComponent,
    NopagefoundComponent],
   providers: [],
   bootstrap: []

})

export class SharedModule {}
