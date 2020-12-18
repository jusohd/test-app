import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CdkScrollableModule, ScrollingModule } from '@angular/cdk/scrolling';
import { By } from '@angular/platform-browser';

import { CardsComponent } from './cards.component';

describe('CardsComponent', () => {
  let component: CardsComponent;
  let fixture: ComponentFixture<CardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsComponent],
      imports: [FormsModule, ScrollingModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Init: Should call getAllCards', fakeAsync(() => {
    component.ngOnInit();
    tick(500)
    expect(component.cards.length).toBeGreaterThan(0);
  }));
  
  it('should have cdk-virtual-scroll-viewport', () => {
    component.filterCards();
    fixture.detectChanges();
    const element = fixture.debugElement.query(By.css('#scroll')).nativeElement;
    expect(element).not.toBeNull();
  });

  it('should be an array containing 4000 elements and isLoading == false', () => {
    component.getCards();
    expect(component.cards.length).toBeGreaterThanOrEqual(4000);
    expect(component.isLoading$).toBeFalse();
  });

  it('should be an array containing x elements matching id', () => {
    component.getCards();
    const cardsLength = component.cards.length;
    fixture.componentInstance.id = '999';
    fixture.detectChanges();

    component.filterCards();
    expect(component.cards.length).toBeLessThan(cardsLength);
  });

  it('should be an array containing x elements matching text', () => {
    component.getCards();
    const cardsLength = component.cards.length;
    fixture.componentInstance.texto = 'donec';
    fixture.detectChanges();

    component.filterCards();
    expect(component.cards.length).toBeLessThan(cardsLength);
  });

});
