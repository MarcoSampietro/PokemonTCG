import { Routes } from '@angular/router';
import { CardsListComponent } from './cards-list/cards-list';
import { CardDetailComponent } from './card-detail/card-detail';
import { FavoritesComponent } from './favorites/favorites';

export const routes: Routes = [
  { path: '', redirectTo: 'cards', pathMatch: 'full' },
  { path: 'cards', component: CardsListComponent },
  { path: 'cards/:id', component: CardDetailComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '**', redirectTo: 'cards' }
];
