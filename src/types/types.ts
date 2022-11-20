export interface Poke {
  name: string;
  url: string;
}
export interface Data {
  results: Poke[],
}

export interface Pok {
  sprites: {
    front_default: string
  },
  price?: string,
  priceOrder: number,
  attack: number,
  hp: number,
  name: string,
  armor: number,
  description: string,
}
