import { Injectable } from '@angular/core';
import { Card } from '../interfaces/card.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class CardsService {
  lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In viverra tincidunt mattis. Nulla rhoncus tempor turpis, ac sollicitudin neque finibus ac. 
  Donec scelerisque neque vel sagittis tristique. Suspendisse elementum sapien porttitor luctus tincidunt. Aenean tincidunt suscipit laoreet. Pellentesque tincidunt facilisis erat. 
  Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam dui ex, dictum ac tristique in, sagittis quis mauris. 
  Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aenean luctus nulla sit amet ante finibus, quis commodo leo faucibus. 
  Etiam suscipit diam arcu, vel tempor dui aliquam vitae. Morbi vitae imperdiet neque. Integer fringilla varius nisl tristique feugiat. 
  Praesent dolor odio, accumsan at pulvinar sed, maximus ac felis. Sed mi ante, pretium vel bibendum eu, efficitur ut nisi. Suspendisse ultricies dui eu nibh scelerisque gravida.
  Maecenas vel ornare odio. Nunc maximus tortor quis eros convallis accumsan. Integer non varius ipsum. Etiam commodo sit amet felis nec lobortis. 
  Morbi pulvinar lorem tellus, non porta risus luctus vel. Aliquam in interdum lectus, et cursus nunc. Nunc id nibh vestibulum, lacinia dui et, ultricies dui. 
  Aliquam tellus massa, porttitor nec mauris vitae, posuere cursus ipsum. Aenean dapibus tortor massa, at lacinia diam venenatis hendrerit. 
  Morbi sit amet sapien ac risus lobortis placerat. Fusce feugiat tellus eget turpis feugiat aliquam. Nunc libero felis, iaculis non bibendum sed, porttitor ut tellus. 
  Duis congue sapien vel quam elementum fermentum. Nulla eu sagittis mauris, eu tincidunt arcu. Cras tincidunt mauris tortor, eu cursus velit hendrerit vel. 
  Aenean bibendum interdum felis quis accumsan. Nullam ultrices enim ac urna pretium, ac pellentesque nisl pharetra. Donec id magna ut libero posuere mattis. 
  Maecenas ultricies ornare felis, a congue lorem sollicitudin non. Nulla vitae magna vitae erat iaculis cursus. Proin pellentesque, orci faucibus condimentum commodo, quam velit porttitor quam, 
  ut luctus leo justo suscipit ligula. Morbi molestie ipsum sed leo aliquam, in consequat est venenatis. Quisque efficitur mauris nunc, at sodales massa ultrices ut. 
  Proin feugiat viverra nisl id cursus. In vel scelerisque purus. Duis at velit at lacus fermentum vestibulum. Sed elit leo, porttitor quis sollicitudin ac, iaculis a elit.  
  Sed scelerisque viverra lacus, a molestie ex lacinia ac. Nunc nibh eros, accumsan id ullamcorper eget, consequat vitae neque. Curabitur sagittis dapibus aliquet. 
  Curabitur ultrices molestie mauris vehicula gravida. Curabitur quis dapibus lectus. Praesent ac congue nibh. Sed vestibulum ex sed metus gravida, in molestie quam placerat. 
  Maecenas elementum a eros vehicula porttitor. Proin ac viverra velit, eu volutpat odio. Proin vel elementum tortor, ac porttitor libero. Donec aliquet finibus odio, in euismod nisi congue congue. 
  Quisque vitae nunc erat. Duis non arcu mauris. Praesent eget congue felis, at vestibulum justo. Proin rutrum scelerisque lectus, eu faucibus nunc condimentum vitae`;
  numberCards = 16;
  statusPhoto: boolean;
  cards: Card[] = [];

  private cardsSource = new Subject<Card[]>();
  public cards$ = this.cardsSource.asObservable();

  constructor(private http: HttpClient) { }

  async getAllCards() {
    const promise: any = await new Promise((resolve) => {

      resolve(this.makeData());
    })
    return promise;
  }

  private makeData() {
    const data: Card[] = [];

    for (let i = 1; i < 4000; i++) {
      const element: Card = {
        id: i.toString(),
        photo: `https://picsum.photos/id/${i}/500/500`,
        text: this.textRandom()
      };

      this.cards.push(element);
    }
  }

  private textRandom() {
    let start = null;
    do {
      start = Math.floor(Math.random() * this.lorem.length);
    } while ((start + 80) > this.lorem.length);
    const text = this.lorem.substring(start, (start + 80))

    return text;
  }

  getCards(): Observable<Card[]> {
    return new Observable<Card[]>(observer => {
      observer.next(this.cards);
    });
  }

}
