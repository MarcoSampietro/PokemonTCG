export interface PokemonCardImages {
  small: string;
  large: string;
}

export interface PokemonSetImages {
  symbol: string;
  logo: string;
}

export interface PokemonSetInfo {
  id: string;
  name: string;
  releaseDate?: string;
  total?: number;
  images?: PokemonSetImages;
}

export interface PokemonAttack {
  name: string;
  cost?: string[];
  damage?: string;
  text?: string;
}

export interface PokemonPrices {
  market?: number;
  averageSellPrice?: number;
  low?: number;
}

export interface PokemonTcgPlayer {
  url?: string;
  prices?: {
    holofoil?: PokemonPrices;
    reverseHolofoil?: PokemonPrices;
    normal?: PokemonPrices;
    [key: string]: PokemonPrices | undefined;
  };
}

export interface PokemonCardmarket {
  url?: string;
  prices?: {
    averageSellPrice?: number;
    lowPrice?: number;
    trendPrice?: number;
    [key: string]: number | undefined;
  };
}

export interface PokemonCard {
  id: string;
  name: string;
  hp?: string;
  types?: string[];
  supertype?: string;
  subtypes?: string[];
  rarity?: string;
  images?: PokemonCardImages;
  set?: PokemonSetInfo;
  attacks?: PokemonAttack[];
  tcgplayer?: PokemonTcgPlayer;
  cardmarket?: PokemonCardmarket;
}

export interface PokemonListResponse {
  data: PokemonCard[];
  page: number;
  pageSize: number;
  totalCount: number;
}
