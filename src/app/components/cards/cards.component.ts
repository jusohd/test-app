import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from "../../interfaces/card.interface";

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  tweets$: Observable<Card[]>;
  isLoading$: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {
  }

  onScroll() {
    this.getCards();
  }

  private getCards() {
    if (condition) {
      
    }
  }

}
