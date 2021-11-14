import { Component, Input, OnInit } from '@angular/core';
declare function cardFunctions():any;
@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.css']
})
export class CardActionsComponent implements OnInit {
  @Input() title:string;
  constructor() { }

  ngOnInit(): void {
    cardFunctions();
  }

}
