import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CardsService } from '../services/cards';
import { PokemonCard } from '../models/pokemon-card';
import { FavoritesService } from '../services/favorites';

@Component({
  selector: 'app-card-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './card-detail.html',
  styleUrls: ['./card-detail.css']
})
export class CardDetailComponent implements OnInit {
  card?: PokemonCard;
  loading = false;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private cardsService: CardsService,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'Carta non trovata.';
      return;
    }

    this.loadCard(id);
  }

  loadCard(id: string): void {
    this.loading = true;
    this.cardsService.getCardById(id).subscribe({
      next: res => {
        this.card = res.data;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Errore nel caricamento della carta.';
        this.loading = false;
      }
    });
  }

  isFavorite(): boolean {
    return this.card ? this.favoritesService.isFavorite(this.card.id) : false;
  }

  toggleFavorite(): void {
    if (!this.card) return;
    this.favoritesService.toggleFavorite(this.card);
  }

  getCardmarketUrl(): string | null {
    return this.card?.cardmarket?.url ?? null;
  }

  getMainPrice(): number | null {
    const prices = this.card?.cardmarket?.prices;
    if (!prices) return null;
    return (
      prices.trendPrice ??
      prices.averageSellPrice ??
      prices.lowPrice ??
      null
    );
  }
}
