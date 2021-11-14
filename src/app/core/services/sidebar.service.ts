import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  menu: any [] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu:[
        { title: 'Activity', url: '/' },
        { title: 'Properties', url: '/dashboard/properties' },
      ]
    },
  ];

  constructor() { }
}
