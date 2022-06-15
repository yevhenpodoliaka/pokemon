const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export class ApiServisePokemon {
  constructor() {
    this.url = BASE_URL;
    this.nextUrl = null;
    this.prevUrl = null;
    this.favoriteList = JSON.parse(localStorage.getItem("favorite-list")) ?? [];
  }

  async getPokemon(init) {
    console.log(this);
    const pokemon = await fetch(`${BASE_URL}/${init}`).then((r) => r.json());
    return pokemon;
  }

  async getPokemonList(url) {
    const response = await fetch(url).then((r) => r.json());

    this.nextUrl = response.next;
    this.prevUrl = response.previous;

    const results = await response.results;

    const arrPromises = results.map(
      async (data) => await fetch(`${data.url}`).then((r) => r.json())
    );

    return arrPromises;
  }

  async getFavoritesPokemon() {
    const arrPromises = await this.favoriteList.map((pokemon) => {
      return this.getPokemon(pokemon);
    });
    const arrFavorites = await Promise.all(arrPromises);
    return arrFavorites;
  }
}
