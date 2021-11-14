import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nopage-found',
  templateUrl: './nopage-found.component.html',
  styleUrls: ['./nopage-found.component.css']
})
export class NopageFoundComponent implements OnInit {
  year = new Date().getFullYear();
  constructor() { }

  ngOnInit(): void {
  }

}
