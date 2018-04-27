import { Component, OnInit } from '@angular/core';
// con esto se puede llamar cualquier script que se eneucntra fuera del angular en un archivo javascript

declare function init_pluggins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { 

    init_pluggins();
  }

  ngOnInit() {
  }

}
