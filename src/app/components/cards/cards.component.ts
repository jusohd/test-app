import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { logging } from 'protractor';
import { Observable } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../interfaces/card.interface';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  @ViewChild('idSearch') idSearch: ElementRef;
  @ViewChild('textSearch') textSearch: ElementRef;
  cards: Card[] = [];
  cards$: Card[];
  isLoading$: boolean;
  amountCards = 16;

  constructor(private _cards: CardsService) { }

  ngOnInit(): void {
    this.isLoading$ = false;
    this._cards.getAllCards().then((response) => {
      this.cards = response;
      this.cards$ = this.cards.slice(0, this.amountCards);
    });
  }

  getCards(callback) {
    this._cards.getCards(this.cards, this.amountCards).then((response) => {
      callback(response);
    }).catch((error) => {
    });
  }

  onScroll() {
    this.isLoading$ = true;
    this.getCards((response) => {
      this.cards$ = response.cards;
      this.amountCards = response.amount;
      this.isLoading$ = false;
    });
  }


  filteringCards(callback) {
    if (this.idSearch.nativeElement.value === '' && this.textSearch.nativeElement.value === '') {
      this.getCards((response) => {
        this.cards$ = response.cards;
        this.amountCards = response.amount;
      });
    } else {
      const id = this.idSearch.nativeElement.value;
      const text = this.textSearch.nativeElement.value;

      this._cards.getAllCards().then(async (response) => {        
        let cards;
        if (id) {
          cards = response.filter(card => card.id.includes(id));
        }
        if (text) {
          cards = response.filter(card => card.text.includes(text));
        }
        callback(cards);
      });
    }
  }

  filterCards() {
    this.isLoading$ = true;
    this.filteringCards((response) => {
      this.cards = response;
      this.getCards((response) => {
        this.cards$ = response.cards;
        this.amountCards = response.amount;
        this.isLoading$ = false;
      });
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

