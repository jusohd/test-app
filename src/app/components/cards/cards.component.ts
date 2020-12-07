import { AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { logging } from 'protractor';
import { Observable } from 'rxjs';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../interfaces/card.interface';
import { NgModel } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, AfterViewInit {
  @ViewChild('idSearch') idSearch: NgModel;
  @ViewChild('textSearch') textSearch: NgModel;
  id: String;
  texto: String;
  cards: Card[] = [];
  cards$: Card[];
  isLoading$: boolean;
  amountCards = 12;

  constructor(private _cards: CardsService) { }

  ngOnInit(): void {
    this.isLoading$ = false;
    this._cards.getAllCards().then((response) => {
      this.cards = response;
      this.cards$ = this.cards.slice(0, this.amountCards);
    });
  }

  ngAfterViewInit(): void {
    this.idSearch.valueChanges.pipe(debounceTime(300)).subscribe(evt => {
      if (evt) {
        this.filterCards();
      }
    });

    this.textSearch.valueChanges.pipe(debounceTime(300)).subscribe(evt => {
      if (evt) {
        this.filterCards();
      }
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
    if (this.idSearch.value === '' && this.textSearch.value === '') {
      this.amountCards = 12;
      this.getCards((response) => {
        this.cards$ = response.cards;
      });
    } else {
      const id = this.idSearch.value;
      const text = this.textSearch.value;

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
      this.amountCards = 12;
      this.getCards((response) => {
        this.cards$ = response.cards;
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

