const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById('favorites-list');
    const addToBookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];

    function displayBookmarkedMovies() {
        favoritesList.innerHTML = '';
        if (addToBookmarkedMovies.length === 0) {
            favoritesList.innerHTML = '<p>No favorites added yet.</p>';
            return;
        }

        addToBookmarkedMovies.forEach(movie => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-item');

            const posterUrl = `${MOVIE_IMAGE_URL}${movie.poster_path}`;
            movieContainer.innerHTML = `
                <img src="${posterUrl}" alt="${movie.title} Poster">
                <h2>${movie.title}</h2>
            `;

            favoritesList.appendChild(movieContainer);
        });
    }

    displayBookmarkedMovies();
});
