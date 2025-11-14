export interface PokemonSetImages {
  symbol: string;
  logo: string;
}

export interface PokemonSet {
  id: string;
  name: string;
  releaseDate?: string;
  total?: number;
  images?: PokemonSetImages;
}

export interface PokemonSetListResponse {
  data: PokemonSet[];
}
