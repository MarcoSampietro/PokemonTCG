import { Injectable } from '@angular/core';
import { PokemonCard } from '../models/pokemon-card';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly STORAGE_KEY = 'pokemon-favorites';

  private readStorage(): PokemonCard[] {
    const raw = localStorage.getItem(this.STORAGE_KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as PokemonCard[];
    } catch {
      return [];
    }
  }

  private writeStorage(cards: PokemonCard[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cards));
  }

  getFavorites(): PokemonCard[] {
    return this.readStorage();
  }

  isFavorite(cardId: string): boolean {
    return this.readStorage().some(c => c.id === cardId);
  }

  addFavorite(card: PokemonCard): void {
    const cards = this.readStorage();
    if (!cards.some(c => c.id === card.id)) {
      cards.push(card);
      this.writeStorage(cards);
    }
  }

  removeFavorite(cardId: string): void {
    const cards = this.readStorage().filter(c => c.id !== cardId);
    this.writeStorage(cards);
  }

  toggleFavorite(card: PokemonCard): void {
    if (this.isFavorite(card.id)) {
      this.removeFavorite(card.id);
    } else {
      this.addFavorite(card);
    }
  }
}
