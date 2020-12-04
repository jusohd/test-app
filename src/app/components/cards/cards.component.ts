import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../interfaces/card.interface';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  cards: Card[] = [];
  cards$: Card[];
  isLoading$: boolean;
  amountCards = 16;

  constructor(private _cards: CardsService) { }

  ngOnInit(): void {

    this.cards = this._cards.gatAllCards();
    this.isLoading$ = false;
    this.cards$ = this.cards.slice(0, this.amountCards);
  }

  onScroll() {
    this.isLoading$ = true;
    this._cards.getCards(this.cards, this.amountCards).then((response) => {
      this.cards$ = response.cards;
      this.amountCards = response.amount;
      this.isLoading$ = false;
    }).catch((error) => {
    });
  }

  @HostListener('scroll', ['$event'])
  scrollHandler(event) {
    const scrollHeigh = event.srcElement.scrollHeight;
    const heigh = event.srcElement.offsetHeight;
    const scrollOffset = event.srcElement.scrollTop;

    if (heigh === (scrollHeigh - scrollOffset)) {
      this.onScroll();
    }
  }
}

