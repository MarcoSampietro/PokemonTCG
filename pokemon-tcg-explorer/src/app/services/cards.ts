import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PokemonCard, PokemonListResponse } from '../models/pokemon-card';
import { PokemonSetListResponse } from '../models/pokemon-set';
import { environment } from '../../environment';

export interface CardFilters {
  name?: string;
  type?: string;
  rarity?: string;
  setId?: string;
  page?: number;
  pageSize?: number;
}

@Injectable({ providedIn: 'root' })
export class CardsService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (environment.pokemonApiKey) {
      headers = headers.set('X-Api-Key', environment.pokemonApiKey);
    }
    return headers;
  }

  getCards(filters: CardFilters): Observable<PokemonListResponse> {
    let params = new HttpParams()
      .set('pageSize', (filters.pageSize ?? 20).toString())
      .set('page', (filters.page ?? 1).toString())
      .set('orderBy', 'name');

    const qParts: string[] = [];

    if (filters.name) {
      qParts.push(`name:${filters.name}*`);
    }
    if (filters.type) {
      qParts.push(`types:${filters.type}`);
    }
    if (filters.rarity) {
      qParts.push(`rarity:"${filters.rarity}"`);
    }
    if (filters.setId) {
      qParts.push(`set.id:${filters.setId}`);
    }

    if (qParts.length > 0) {
      params = params.set('q', qParts.join(' '));
    }

    return this.http.get<PokemonListResponse>(`${this.baseUrl}/cards`, {
      headers: this.getHeaders(),
      params
    });
  }

  getCardById(id: string): Observable<{ data: PokemonCard }> {
    return this.http.get<{ data: PokemonCard }>(
      `${this.baseUrl}/cards/${id}`,
      { headers: this.getHeaders() }
    );
  }

  getSets(): Observable<PokemonSetListResponse> {
    return this.http.get<PokemonSetListResponse>(
      `${this.baseUrl}/sets`,
      { headers: this.getHeaders() }
    );
  }

  getTypes(): Observable<{ data: string[] }> {
    return this.http.get<{ data: string[] }>(
      `${this.baseUrl}/types`,
      { headers: this.getHeaders() }
    );
  }

  getRarities(): Observable<{ data: string[] }> {
    return this.http.get<{ data: string[] }>(
      `${this.baseUrl}/rarities`,
      { headers: this.getHeaders() }
    );
  }
}
