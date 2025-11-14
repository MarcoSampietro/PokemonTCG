import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardsService, CardFilters } from '../services/cards';
import { PokemonCard } from '../models/pokemon-card';
import { PokemonSet } from '../models/pokemon-set';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './cards-list.html',
  styleUrls: ['./cards-list.css']
})
export class CardsListComponent implements OnInit {
  cards: PokemonCard[] = [];
  sets: PokemonSet[] = [];
  types: string[] = [];
  rarities: string[] = [];

  searchTerm = '';
  selectedSetId = '';
  selectedType = '';
  selectedRarity = '';

  loading = false;
  errorMessage = '';

  page = 1;
  pageSize = 20;
  totalCount = 0;

  constructor(private cardsService: CardsService) {}

  ngOnInit(): void {
    this.loadFilters();
    this.loadCards();
  }

  loadFilters(): void {
    this.cardsService.getSets().subscribe({
      next: res => this.sets = res.data,
      error: () => {}
    });

    this.cardsService.getTypes().subscribe({
      next: res => this.types = res.data,
      error: () => {}
    });

    this.cardsService.getRarities().subscribe({
      next: res => this.rarities = res.data,
      error: () => {}
    });
  }

  loadCards(): void {
    this.loading = true;
    this.errorMessage = '';

    const filters: CardFilters = {
      name: this.searchTerm || undefined,
      type: this.selectedType || undefined,
      rarity: this.selectedRarity || undefined,
      setId: this.selectedSetId || undefined,
      page: this.page,
      pageSize: this.pageSize
    };

    this.cardsService.getCards(filters).subscribe({
      next: res => {
        this.cards = res.data;
        this.totalCount = res.totalCount;
        this.loading = false;
      },
      error: err => {
        console.error(err);
        this.errorMessage = 'Errore nel caricamento delle carte.';
        this.loading = false;
      }
    });
  }

  onSearchChange(): void {
    this.page = 1;
    this.loadCards();
  }

  onFilterChange(): void {
    this.page = 1;
    this.loadCards();
  }

  goToPage(delta: number): void {
    const newPage = this.page + delta;
    const maxPage = Math.ceil(this.totalCount / this.pageSize);
    if (newPage >= 1 && newPage <= maxPage) {
      this.page = newPage;
      this.loadCards();
    }
  }
}
