import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardComponent } from './components/card/card.component';
import { CardsService } from './services/cards.service';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
