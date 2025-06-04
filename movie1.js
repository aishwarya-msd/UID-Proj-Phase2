const API_KEY = '8ff0a9d8';
const movieList = document.getElementById('movie-list');
const searchInput = document.getElementById('search');
const searchBtn = document.getElementById('search-btn');
const toggleThemeBtn = document.getElementById('toggle-theme');
const languageSelect = document.getElementById('language-select');

let darkMode = false;
let currentLanguage = '';

function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle('dark', darkMode);
}

toggleThemeBtn.addEventListener('click', toggleTheme);

languageSelect.addEventListener('change', () => {
  currentLanguage = languageSelect.value;
  if (searchInput.value.trim() !== '') {
    searchMovies(searchInput.value.trim());
  }
});

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query.length === 0) {
    alert('Please enter a movie name.');
    return;
  }
  searchMovies(query);
});

searchInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    searchBtn.click();
  }
});

async function searchMovies(query) {
  movieList.innerHTML = '<p>Loading...</p>';
  try {
    const res = await fetch(https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(query)});
    const data = await res.json();

    if (data.Response === "False") {
      movieList.innerHTML = <p>${data.Error}</p>;
      return;
    }

    let movies = data.Search;

    if (currentLanguage) {
      movies = await filterByLanguage(movies, currentLanguage);
    }

    renderMovies(movies);

  } catch (error) {
    movieList.innerHTML = '<p>Error fetching data.</p>';
    console.error(error);
  }
}

async function filterByLanguage(movies, language) {
  const detailedMovies = [];
  for (const movie of movies) {
    const res = await fetch(https://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID});
    const details = await res.json();
    if (details.Language && details.Language.toLowerCase().includes(language.toLowerCase())) {
      detailedMovies.push(details);
    }
  }
  return detailedMovies;
}

function renderMovies(movies) {
  if (movies.length === 0) {
    movieList.innerHTML = '<p>No movies found matching language filter.</p>';
    return;
  }

  movieList.innerHTML = '';
  movies.forEach(movie => {
    const card = document.createElement('div');
    card.classList.add('movie-card');

    const poster = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Image';
    card.innerHTML = `
      <img class="movie-poster" src="${poster}" alt="${movie.Title} Poster" />
      <div class="movie-info">
        <h3>${movie.Title} (${movie.Year})</h3>
        <p><strong>Genre:</strong> ${movie.Genre || 'N/A'}</p>
        <p><strong>Language:</strong> ${movie.Language || 'N/A'}</p>
        <p>${movie.Plot ? movie.Plot.substring(0, 120) + '...' : ''}</p>
        <div class="movie-actions">
          <button onclick="showDetails('${movie.imdbID}')">Details</button>
          <button onclick="addFavorite('${movie.imdbID}', '${movie.Title}')">❤ Favorite</button>
        </div>
      </div>
    `;
    movieList.appendChild(card);
  });
}

async function showDetails(imdbID) {
  const res = await fetch(https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full);
  const movie = await res.json();

  alert(`
Title: ${movie.Title}
Year: ${movie.Year}
Rated: ${movie.Rated}
Released: ${movie.Released}
Genre: ${movie.Genre}
Director: ${movie.Director}
Actors: ${movie.Actors}
Language: ${movie.Language}
Plot: ${movie.Plot}
IMDB Rating: ${movie.imdbRating}
  `);
}

function addFavorite(id, title) {
  let favs = JSON.parse(localStorage.getItem('favorites')) || [];
  if (favs.find(f => f.id === id)) {
    alert('Already in favorites!');
    return;
  }
  favs.push({ id, title });
  localStorage.setItem('favorites', JSON.stringify(favs));
  alert(Added "${title}" to favorites!);
}

window.onload = () => {
  searchInput.value = 'Avengers';
  searchBtn.click();
};
