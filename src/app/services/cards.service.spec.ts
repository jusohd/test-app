import { ArrayType } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { Card } from '../interfaces/card.interface';

import { CardsService } from './cards.service';

describe('CardsService', () => {
  let service: CardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
/*
  it('should return a object', ()=>{
    const res = service.getAllCards();
    expect(typeof res).toBe('object');
  });

  it('should contain 4000 elements', () => {
    service.getAllCards();
    const array = service.cards;
    expect(array.length).toBeGreaterThanOrEqual(4000);
  });

  it('should return a observable', ()=>{
    const res = service.getCards();
    expect(typeof res).toBe('object');
  });
*/

});
