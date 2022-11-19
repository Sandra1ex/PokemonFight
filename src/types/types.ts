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
  stats: {
    '0': {
      base_stat: number
    },
    '1': {
      base_stat: number
    }
  }
}
