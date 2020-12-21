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
  id: string;
  texto: string;
  cards: Card[] = [];
  isLoading: boolean;
  obsCards$: Subscription;

  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.cardsService.getAllCards().then(() => {
      const crds = this.getCards();
    });
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy() {
    this.obsCards$.unsubscribe();
  }

  getCards() {
    this.obsCards$ = this.cardsService.getCards().subscribe(data => {
      this.cards = data;
      this.isLoading = false;
    });
  }

  filterCards() {
    this.isLoading = true;
    const id = this.id;
    const text = this.texto;

    this.cardsService.getCards().subscribe(data => {
      this.cards = data.filter((card: Card) => ((id ? card.id.includes(id) : true) && (text ? card.text.includes(text) : true)));
      this.isLoading = false;
    });
  }

}

