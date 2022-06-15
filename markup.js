function createMarkupCard({ sprites, name, weight, height }) {
  return `<div class="modal__card"  id="${name}">
    <img src="${sprites.other.dream_world.front_default}" alt="${name}" class="card__img" width="150" height="150 >
    <div class="card__description">
        <p class="name">name :${name}</p>
        <p class="weight">weight :${weight}</p>
        <p class="height">height :${height}</p>
    </div>
</div>`;
}

function createMarkup(arr) {
  return arr
    .map(
      ({ sprites, name }) => `<li class="card" data-name="${name}">
    <img src="${sprites.other.dream_world.front_default}" alt="${name}" data-name="${name}" class="card__img" width="150" height="150">
    <div class="card__description">
        <p class="name">${name}</p>
    </div>
</li>`
    )
    .join("");
}

export { createMarkupCard, createMarkup };
