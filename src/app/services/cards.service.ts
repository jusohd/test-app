import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../interfaces/card.interface';

@Injectable({
  providedIn: 'root'
})


export class CardsService {
  lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras eu neque id arcu tincidunt tristique. Nullam luctus orci ut neque scelerisque, eu posuere risus rhoncus. Nam varius, nulla ut molestie aliquet, dolor risus varius lectus, a semper velit quam sed elit. Nam commodo ligula ultricies consequat cursus';
  numberCards = 16;

  constructor() { }

  gatAllCards() {
    return this.madeData();
  }

  private madeData() {
    const data: Card[] = [];

    for (let i = 1; i < 4000; i++) {
      const element: Card = {
        id: i.toString(),
        // photo: `https://i.picsum.photos/id/Ç${i}/500/500`,
        photo: 'stormtrooper.jpg',
        text: this.lorem
      };

      data.push(element);
    }
    console.log(data);
    return data;
  }

  async getCards(cards: Card[], amountCards: number) {
    const promise: any = await new Promise((resolve, reject) => {
      if (!amountCards) {
        const error = {
          code: 0,
          title: 'Error',
          text: `Undefined card's amount`
        };
        reject(error);

      } else {
        const amount = amountCards + this.numberCards;

        if (amount > cards.length) {
          resolve(cards)
        } else {
          const data = {
            cards: cards.slice(0, amount),
            amount: amount
          };
          resolve(data);
        }
      }

    });

    return promise;

  }
}
