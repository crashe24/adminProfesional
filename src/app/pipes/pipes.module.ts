import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { VacioPipe } from './vacio.pipe';

@NgModule({
  declarations: [ImagenPipe, VacioPipe],
  exports: [ImagenPipe, VacioPipe]
})
export class PipesModule { }
