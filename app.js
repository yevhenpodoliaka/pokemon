import { ApiServisePokemon } from "./api-servise.js";
import { createMarkupCard, createMarkup } from "./markup.js";
import refs from "./refs.js";

const goPokemon = new ApiServisePokemon();

refs.catalog.addEventListener("click", onOpenModal);
refs.btnCloseModal.addEventListener("click", onCloseModal);
refs.modal.addEventListener('click',addInFavoriteList)
refs.btnNext.addEventListener("click", onBtnNextClick);
refs.btnBack.addEventListener("click", onBtnBackClick);
refs.btnFavorites.addEventListener('click',openFavoritesList)
refs.btnBackToCatalog.addEventListener("click", closeFavoritesList);

// ----first page----------------------------------
createMarkupList(goPokemon.url).then(uppendMarkup);

// catalog list--------------------------------------

async function createMarkupList(url) {
  try {
     const promises = await goPokemon.getPokemonList(url);
     const arr = await Promise.all(promises);
     const markup = await createMarkup(arr);
     return markup;
  } catch (error) {
    console.log(error.message);
  }
 
}

function uppendMarkup(string) {
  refs.catalog.innerHTML = string;
}
// ----button change page
function onBtnNextClick() {
  if (goPokemon.nextUrl === null) {
    alert("it`s last page");
    return;
  }
  createMarkupList(goPokemon.nextUrl).then(uppendMarkup);
}

function onBtnBackClick() {
  if (goPokemon.prevUrl === null) {
    alert("it`s 1st page");
    return;
  }
  createMarkupList(goPokemon.prevUrl).then(uppendMarkup);
}


// favorite list----------------------------
async function openFavoritesList() {
  showFaworitesList();
    const favoriteList = JSON.parse(localStorage.getItem("favorite-list"));
    if (!favoriteList) {
      return alert("Favorite list is NULL");
    }
  try {
     const pokemonList = await goPokemon.getFavoritesPokemon();
   
     pokemonList.forEach((pokemon) => {
    
       goPokemon
         .getPokemon(pokemon.name)
         .then(createMarkupCard)
         .then(uppendFavoriteList);
     });
    
  } catch (error) {
    console.log(error.message);
  }
 
}
function closeFavoritesList() {
  showFaworitesList()
  refs.favoriteContainer.innerHTML = '';
}

function addInFavoriteList(e) {
  if (!e.target.classList.contains("btn-add-favorites__backdrop")) {
    return;
  }
  goPokemon.favoriteList.push(e.target.id);
  localStorage.setItem("favorite-list", JSON.stringify(goPokemon.favoriteList));
  refs.btnAddFavorites.disabled = true;
}

function showFaworitesList() {
  refs.btnBack.classList.toggle("visually-hidden");
  refs.btnNext.classList.toggle("visually-hidden");
  refs.container.classList.toggle("visually-hidden");
  refs.favoriteContainer.classList.toggle("visually-hidden");
  refs.btnFavorites.classList.toggle("visually-hidden");
  refs.btnBackToCatalog.classList.toggle("visually-hidden");
}

function uppendFavoriteList(string) {
  refs.favoriteContainer.insertAdjacentHTML("beforeend", string);
}



// modal--------------------------------
function onOpenModal(e) {
  if (e.target.nodeName === "LI" || e.target.nodeName === "IMG") {
   const pokemon = e.target.dataset.name;
   goPokemon.getPokemon(pokemon).then(createMarkupCard).then(uppendMarkupModal);
   refs.backdrop.classList.remove("visually-hidden");
   refs.btnAddFavorites.getAttribute("id");
   refs.btnAddFavorites.setAttribute("id", pokemon);
   const favoriteList = JSON.parse(localStorage.getItem("favorite-list"));
   if (favoriteList && favoriteList.includes(pokemon)) {
     refs.btnAddFavorites.disabled = true;
   }
  }

  
  
}

function uppendMarkupModal(string) {
  refs.innerBackdrop.insertAdjacentHTML("beforeend", string);
}

function onCloseModal() {
  refs.innerBackdrop.innerHTML = "";
  refs.backdrop.classList.add("visually-hidden");
  refs.btnAddFavorites.removeAttribute("id");
  refs.btnAddFavorites.disabled = false;
}
