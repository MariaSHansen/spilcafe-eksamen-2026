"use strict";

document.addEventListener("DOMContentLoaded", initApp);

let allGames = [];

function initApp() {
  document
    .querySelector("#search-input")
    .addEventListener("input", applyFiltersAndSort);

  document
    .querySelector("#genre-select")
    .addEventListener("change", applyFiltersAndSort);

  document
    .querySelector("#sort-select")
    .addEventListener("change", applyFiltersAndSort);

  getGames();
}

async function getGames() {
  try {
    const response = await fetch("./app.json");
    const data = await response.json();

    console.log("DATA:", data);

    allGames = data;

    populateGenreSelect();
    applyFiltersAndSort();
  } catch (error) {
    console.error("FEJL:", error);
  }
}

function populateGenreSelect() {
  const genreSelect = document.querySelector("#genre-select");
  const genres = new Set();

  for (const game of allGames) {
    const gameGenres = Array.isArray(game.genre)
      ? game.genre
      : [game.genre];

    for (const genre of gameGenres) {
      genres.add(genre);
    }
  }

  const genreArray = Array.from(genres);

  genreArray.sort((a, b) => a.localeCompare(b));

  for (const genre of genreArray) {
    genreSelect.insertAdjacentHTML(
      "beforeend",
      `<option value="${genre}">${genre}</option>`,
    );
  }
}

function applyFiltersAndSort() {
  const searchValue = document
    .querySelector("#search-input")
    .value.trim()
    .toLowerCase();

  const selectedGenre = document.querySelector("#genre-select").value;
  const sortOption = document.querySelector("#sort-select").value;

  let filteredGames = allGames.filter(function (game) {
    const matchesTitle = game.title.toLowerCase().includes(searchValue);

    const gameGenres = Array.isArray(game.genre)
      ? game.genre
      : [game.genre];

    const matchesGenre =
      selectedGenre === "all" || gameGenres.includes(selectedGenre);

    return matchesTitle && matchesGenre;
  });

  if (sortOption === "title") {
    filteredGames.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "year") {
    filteredGames.sort((a, b) => b.year - a.year);
  } else if (sortOption === "rating") {
    filteredGames.sort((a, b) => b.rating - a.rating);
  }

  showGames(filteredGames);
}

function showGames(games) {
  const gameList = document.querySelector("#game-list");
  const gameCount = document.querySelector("#game-count");

  gameList.innerHTML = "";
  gameCount.textContent = `Viser ${games.length} ud af ${allGames.length} spil`;

  if (games.length === 0) {
    gameList.innerHTML =
      '<p class="empty">Ingen spil matcher din søgning eller genre.</p>';
    return;
  }

  for (const game of games) {
    showGame(game);
  }
}

function showGame(game) {
  const genres = Array.isArray(game.genre)
    ? game.genre.join(", ")
    : game.genre;

  const gameCard = `
    <article class="game-card" tabindex="0">
      <img src="${game.image}" alt=${game.title}" class="game-poster" />
      <div class="game-info">

        <div class="game-title-row">
          <h2>${game.title}</h2>

          <button class="favorite-btn"
          aria-label="Gem ${game.title} som favorit" >

         <i class="fa-regular fa-clock"></i>
         </button>
        </div>

      <div class="game-chip">
        <i class="fa-regular fa-clock"></i>
        <span>${game.playtime} min</span>
      </div>

      <div class="bottom-row">
        <div class="game-chip">
        <i class="fa-solid fa-users"></i>
        <span>${game.players.min}-${game.players.max}</span>
      </div>

      <div class="game-chip">
        <i class="fa-solid fa-location-dot"></i>
       <span>${game.shelf}</span>
      </div>
      
    </div>

      
        <p class="genre">${genres}</p>
        <p class="director-line"><strong> 2-4 personer </strong> ${game.players.min}-${game.players.max}</p>
        <p class="director-line"><strong>Spilletid:</strong> ${game.playtime} min</p>
        <p class="game-location"><strong>Placering:</strong> ${game.shelf}</p>
        <p class="game-age"><strong>Anbefalet alder:</strong> ${game.age} år</p>
        <p class="game-availability"><strong>Tilgængelig:</strong> ${game.available ? "Ja" : "Nej"}</p>

      </div>
    </article>
  `;

  const gameList = document.querySelector("#game-list");
  gameList.insertAdjacentHTML("beforeend", gameCard);

  const newCard = gameList.lastElementChild;

  newCard.addEventListener("click", function () {
    showGameDialog(game);
  });
}

function showGameDialog(game) {
  const dialog = document.querySelector("#game-dialog");
  const dialogContent = document.querySelector("#dialog-content");

  const genres = Array.isArray(game.genre)
    ? game.genre.join(", ")
    : game.genre;

  const actors = Array.isArray(game.actors)
    ? game.actors.join(", ")
    : game.actors;

  dialog.showModal();
}
