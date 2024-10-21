const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

document.addEventListener("DOMContentLoaded", () => {
    const favoritesList = document.getElementById('favorites-list');

    // Retrieve bookmarked movies from localStorage, or use an empty array
    const bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];

    // Function to display bookmarked movies on the "Favorites" page
    function displayBookmarkedMovies() {
        favoritesList.innerHTML = '';  // Clear the list before appending

        if (bookmarkedMovies.length === 0) {
            favoritesList.innerHTML = '<p>No favorites added yet.</p>';
            return;
        }

        bookmarkedMovies.forEach(movie => {
            const movieContainer = document.createElement('div');
            movieContainer.classList.add('movie-item');

            const posterUrl = `${MOVIE_IMAGE_URL}${movie.poster_path}`;
            movieContainer.innerHTML = `
                <div class="favorite-movie-list">
                    <img class="favorite-movie-poster" src="${posterUrl}" alt="${movie.title} Poster">
                    <h2 class="favorite-movie-title">${movie.title}</h2>
                </div>
            `;

            favoritesList.appendChild(movieContainer);
        });
    }

    // Call the function to display the movies when the page is loaded
    displayBookmarkedMovies();
});

function addToBookmarkedMovies(movie) {
    // Debug: log the movie object to see if it's being passed correctly
    console.log('Adding movie to bookmarks:', movie);

    // Retrieve bookmarkedMovies from localStorage or use an empty array
    const bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];

    // Check if the movie is already in the favorites list
    const isBookmarked = bookmarkedMovies.some(m => m.id === movie.id);
    if (!isBookmarked) {
        bookmarkedMovies.push(movie);  // Add the movie to the array
        localStorage.setItem('bookmarkedMovies', JSON.stringify(bookmarkedMovies));  // Update localStorage

        // Debug: log the updated array of bookmarked movies
        console.log('Updated bookmarkedMovies:', bookmarkedMovies);

        alert(`${movie.title} has been bookmarked!`);
    } else {
        alert(`${movie.title} is already in your favorites.`);
    }
}
