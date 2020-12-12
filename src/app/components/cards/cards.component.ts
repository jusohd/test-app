import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CardsService } from 'src/app/services/cards.service';
import { Card } from '../../interfaces/card.interface';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})

export class CardsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('idSearch') idSearch: NgModel;
  @ViewChild('textSearch') textSearch: NgModel;
  id: String;
  texto: String;
  cards: Card[] = [];
  isLoading$: boolean;
  public obsCards: Subscription;

  constructor(private _cards: CardsService) {
  }

  ngOnInit(): void {
    this.isLoading$ = true;
    this._cards.getAllCards().then(() => {
      const crds = this.getCards();
    });
  }

  ngAfterViewInit(): void {
    this.idSearch.valueChanges.pipe(debounceTime(1000)).subscribe(evt => {
      if (evt !== undefined) {
        this.isLoading$ = true;
        this.filterCards();
      }
    });

    this.textSearch.valueChanges.pipe(debounceTime(1000)).subscribe(evt => {
      if (evt !== undefined) {
        this.isLoading$ = true;
        this.filterCards();
      }
    });
  }

  ngOnDestroy() {
    this.obsCards.unsubscribe();
  }

  getCards() {
    this.obsCards = this._cards.getCards().subscribe(data => {
      this.cards = data;
      this.isLoading$ = false;
    });
  }

  filterCards() {
    const id = this.idSearch.value;
    const text = this.textSearch.value;

    this._cards.getCards().subscribe(data => {
      this.cards = data.filter((card: Card) => ((id ? card.id.includes(id) : true) && (text ? card.text.includes(text) : true)));
      this.isLoading$ = false;
    });
  }

}

