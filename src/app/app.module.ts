import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
    FormsModule,
    ScrollingModule
  ],
  providers: [
    CardsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
