import { Injectable } from '@angular/core';

@Injectable()
export class SidebarService {
  
  menu: any = [
    {
      titulo: 'Principal',
      icono: 'mdi mdi-gauge',
      submenu : [
        {
          titulo: 'Dashboard',
          url: '/dasboard'
        },
        {
          titulo: 'ProgressBar' ,
          url: '/progress'
        },
        {
          titulo: 'Graficas' ,
          url: '/graficas'
        },
        {
          titulo: 'Promesas' ,
          url: '/promesas'
        },
        {
          titulo: 'Observables' ,
          url: '/observables'
        }
      ]
    }
  ];
  
  constructor() { }

}
