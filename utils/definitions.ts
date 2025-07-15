
export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: {
    front_default: string;
    other: {
      home?: {
        front_default: string;
        front_shiny?: string;
      };
      showdown?: {
        front_default: string;
        front_shiny?: string;
      };
    }
  };
  types: [
    {
      type: {
        name: string;
        url: string;
      };
    }
  ];
  cries?: {
    latest?: string;
    legacy?: string;
  };
  abilities?: [
    { ability: { name: string } }
  ];
  stats?: [
    {
      base_stat: number;
      stat: { name: string };
    }
  ]
}

export interface PokemonList {
  name: string;
  url: string;
}
