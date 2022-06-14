import { ApiServisePokemon } from "./api-servise.js";
import { createMarkupCard, createMarkup } from "./markup.js";
import refs from "./refs.js";

const goPokemon = new ApiServisePokemon();

refs.container.addEventListener("click", onOpenModal);
refs.btnCloseModal.addEventListener("click", onCloseModal);
refs.btnNext.addEventListener("click", onBtnNextClick);
refs.btnBack.addEventListener("click", onBtnBackClick);

function onBtnNextClick() {
  if (goPokemon.nextUrl === null) {
    alert("it`s last page");
    return;
  }
  console.log("next");
  createMarkupList(goPokemon.nextUrl).then(uppendMarkup);
}

function onBtnBackClick() {
  if (goPokemon.Prevurl === null) {
    alert("it`s 1st page");
    return;
  }
  console.log("back");
  createMarkupList(goPokemon.Prevurl).then(uppendMarkup);
}

function uppendMarkup(string) {
  refs.container.innerHTML = string;
}

function uppendMarkupModal(string) {
  refs.innerBackdrop.insertAdjacentHTML("beforeend", string);
}

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

createMarkupList(goPokemon.url).then(uppendMarkup);

function onCloseModal() {
  refs.innerBackdrop.innerHTML = "";
  refs.backdrop.classList.add("is-hidden");
}

function onOpenModal(e) {
  if (e.target.nodeName !== "LI") {
    return;
  }
  const pokemon = e.target.dataset.name;
  console.log(pokemon);
  goPokemon.getPokemon(pokemon).then(createMarkupCard).then(uppendMarkupModal);
  refs.backdrop.classList.remove("is-hidden");
}
