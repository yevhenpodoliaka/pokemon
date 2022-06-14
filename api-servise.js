const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

export class ApiServisePokemon {
  constructor() {
    this.url = BASE_URL;
    this.nextUrl = null;
    this.prevUrl = null;
    this.favoriteList = []??JSON.parse(localStorage.getItem("favorite-list"));
  
  }

  async getPokemon(init) {
    console.log(this);
      const response = await fetch(`${BASE_URL}/${init}`);
      const pokemon = response.json();
      return pokemon;
 
  }

  async getPokemonList(url) {
       const response = await fetch(url);
       const responseJson = await response.json();
       // console.log("response json   ", responseJson);
       this.nextUrl = responseJson.next;
       this.prevUrl = responseJson.previous;
       // console.log(this);
       const results = await responseJson.results;
       // console.log('results   ', results);
       const arr = results.map(async (data) => {
         const response = await fetch(`${data.url}`);
         const result = await response.json();
         // console.log("result  ", result);
         return result;
       });
       // console.log('arr   ',arr);
       return arr;
  
   
  }

  async getFavoritesPokemon() {
    const favoriteList = JSON.parse(localStorage.getItem("favorite-list"));
    // console.log(favoriteList);
    const arrPromises = await favoriteList.map(pokemon => {
    return  this.getPokemon(pokemon);
    })
    const arrFavorites = await Promise.all(arrPromises);
    return (arrFavorites);
  }

}
