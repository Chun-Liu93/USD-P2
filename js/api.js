const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";
const GENRES_URL = "https://api.themoviedb.org/3/genre/movie/list";

let currentPage = 1;
let totalPages = 46536;
let genresMap = {};
let bookmarkedMovies = JSON.parse(localStorage.getItem('bookmarkedMovies')) || [];

//genre colors
const genreColors = {
    'Action': 'generate-action',
    'Adventure': 'generate-adventure',
    'Animation': 'generate-animation',
    'Comedy': 'generate-comedy',
    'Crime': 'generate-crime',
    'Documentary': 'generate-documentary',
    'Drama': 'generate-drama',
    'Family': 'generate-family',
    'Fantasy': 'generate-fantasy',
    'History': 'generate-history',
    'Horror': 'generate-horror',
    'Music': 'generate-music',
    'Mystery': 'generate-mystery',
    'Romance': 'generate-romance',
    'Science Fiction': 'generate-scifi',
    'TV-Movie': 'generate-tv-movie',
    'Thriller': "generate-thriller",
    'War': 'generate-war',
    'Western': 'generate-western'
}

async function fetchGenres() {
    const genreUrl = `${GENRES_URL}?api_key=${SECRET_KEY}`;
    try {
        const response = await fetch(genreUrl);
        if (!response.ok) {
            throw new Error('Network response not ok');
        }
        const data = await response.json();
        return data.genres;
    } catch (error) {
        console.error('Error fetching genres', error);
        return [];
    }
}

async function fetchMovieList(page = 1) {
    const movieUrl = `${MOVIE_LIST_KEY}?api_key=${SECRET_KEY}&page=${page}`;
    try {
        const response = await fetch(movieUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json(); 
        console.log(data);

        totalPages = data.total_pages;
        document.getElementById('movie-list').innerHTML = '';

        data.results.forEach(movie => {
            displayMovie(movie);
        });

        updatePaginationButtons();
    } catch (error) {
        console.error('Error fetching movie lists:', error);
    }
}

function displayMovie(movie) {
    const posterUrl = `${MOVIE_IMAGE_URL}${movie.poster_path}`;
    
    const movieContainer = document.createElement('div');
    movieContainer.classList.add('movie-item');
    
    movieContainer.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title} Poster">
        <h2>${movie.title}</h2>
    `;
    
    document.getElementById('movie-list').appendChild(movieContainer);

    movieContainer.addEventListener('click', () => {
        openMovieModal(movie);
    });
}

function openMovieModal(movie) {
    const modal = document.getElementById('movie-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalPoster = document.getElementById('modal-poster');
    const modalDescription = document.getElementById('modal-description');
    const modalGenre = document.getElementById('modal-genre_ids');
    const modalRating = document.getElementById('modal-vote_average');
    
    modalTitle.textContent = movie.title;
    modalPoster.src = `${MOVIE_IMAGE_URL}${movie.poster_path}`;
    modalDescription.textContent = movie.overview;

    const genres = movie.genre_ids.map(id => genresMap[id] || id);
    modalGenre.innerHTML = '';  // Clear previous content
    

    genres.forEach(genre => {
        const genreSpan = document.createElement('span');
        genreSpan.textContent = genre;
        const genreClass = genreColors[genre] || 'default-genre'; // Assign class based on genre name
        genreSpan.classList.add(genreClass);
        modalGenre.appendChild(genreSpan);
    });

    modalRating.textContent = `Rating: ${movie.vote_average}`; // Set rating in modal
    modal.style.display = 'flex';


    const bookmarkedButton = document.querySelector('.bookmark-button');
    bookmarkedButton.onclick = function() {
        addToBookmarkedMovies(movie);
    }

    document.querySelector('.close-button').onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
}

function updatePaginationButtons() {
    const prevButton = document.querySelector('.previous-button');
    const nextButton = document.querySelector('.next-button');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function addToBookmarkedMovies(movie) {
    const isBookmarked = bookmarkedMovies.some(m => m.id === movie.id);
    if (!isBookmarked) {
        addToBookmarkedMovies.push(movie);
        localStorage.setItem('bookmarkedMovies', JSON.stringify(addToBookmarkedMovies));
        alert(`${movie.title} has been bookmarked!`);
    } else {
        alert(`${movie.title} is already in your favorites.`);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const modal = document.getElementById('movie-modal');
    modal.style.display = 'none'; // Ensure modal is hidden on load

    // Fetch genres first
    const genres = await fetchGenres();
    genresMap = Object.fromEntries(genres.map(genre => [genre.id, genre.name]));

    // Now fetch the movie list
    fetchMovieList(currentPage);

    // Event listener for the "Previous" button
    document.querySelector('.previous-button').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            fetchMovieList(currentPage);
        }
    });

    // Event listener for the "Next" button
    document.querySelector('.next-button').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            fetchMovieList(currentPage);
        }
    });
});





//PRACTICE
// async function getMovie (page = 1) {
//     const url = `${MOVIE_LIST_KEY}?api_key=${SECRET_KEY}&page=${page}`;
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error('asdasd');
//         }

//         const data = await response.json();
//         console.log(data);

//         data.results.forEach
//     }
// }