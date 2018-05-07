import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta, MetaDefinition } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrums',
  templateUrl: './breadcrums.component.html',
  styles: []
})
export class BreadcrumsComponent implements OnInit {

  // para cambiar el metatag se debe realizar lo siguiente 
  label: string = '';
// router.events es un observable
// necesitados crear dos filtros uno para ver que sea instancia de ActivactionEnd
// y el otro filtro para obtener solo el firschild nulo

  constructor( private router: Router,
               public _title: Title,
               public meta: Meta
              ) { 
   
    this.obtenerData().subscribe( (data) => {
      console.log(data);
      this.label = data.titulo;
      this._title.setTitle(this.label);
      const metaTag: MetaDefinition = { 
            name: 'description',
            content: this.label
      };
      this.meta.updateTag( metaTag );
    });
  }

  ngOnInit() {
  }

  obtenerData() {
    return this.router.events
    .filter( evento => evento instanceof ActivationEnd)
    .filter ( (evento: ActivationEnd) => evento.snapshot.firstChild === null )
    .map ( (evento: ActivationEnd) => evento.snapshot.data );

  }

}
