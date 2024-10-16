const SECRET_KEY = "6bbb24dcee455a115bf0b1ff7adf9275";
const MOVIE_LIST_KEY = "https://api.themoviedb.org/3/movie/popular";
const MOVIE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

let currentPage = 1
let totalPages = 46536

async function fetchMovieList(page = 1) {
    const movieUrl = `${MOVIE_LIST_KEY}?api_key=${SECRET_KEY}&page=${page}`;
    try {
        const response = await fetch(movieUrl); // Make the GET request
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json(); // Parse the JSON data
        console.log(data);

        totalPages = data.total_pages;

        // Clear the current movie list
        document.getElementById('movie-list').innerHTML = '';

        // Loop through each movie and display it using the displayMovie function
        data.results.forEach(movie => {
            displayMovie(movie);
        });

        //updates page when next or previous button is clicked
        updatePaginationButtons();
    } catch (error) {
        console.error('Error fetching movie lists:', error);
    }
}

function displayMovie(movie) {
    const posterUrl = `${MOVIE_IMAGE_URL}${movie.poster_path}`;
    
    const movieContainer = document.createElement('div');
    movieContainer.innerHTML = `
        <img src="${posterUrl}" alt="${movie.title} Poster">
        <h2>${movie.title}</h2>
    `;
    
    document.getElementById('movie-list').appendChild(movieContainer); // Append the movie content to the #movie-list container
}

function updatePaginationButtons() {
    const prevButton = document.querySelector('.previous-button');
    const nextButton = document.querySelector('.next-button');

    //disable the previous page on the first page
    prevButton.disabled = currentPage === 1;

    //disable the lastpage next button 
    nextButton.disabled = currentPage === totalPages;
}

document.addEventListener("DOMContentLoaded", () => {
    fetchMovieList(currentPage);

    // Event listener for the "Previous" button
    document.querySelector('.previous-button').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--; // Go to the previous page
            fetchMovieList(currentPage); // Fetch movies for the new page
        }
    });

    // Event listener for the "Next" button
    document.querySelector('.next-button').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++; // Go to the next page
            console.log(`Next page: ${currentPage}`)
            fetchMovieList(currentPage); // Fetch movies for the new page
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