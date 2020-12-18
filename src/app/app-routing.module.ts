import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';

export const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
