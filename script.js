// ======================
// MOVIE DATA
// ======================

const movies = [
{
    title: "The Batman",
    year: "2022",
    genre: "Action, Crime",
    poster: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    description: "Batman investigates corruption in Gotham City.",
    trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
},
{
    title: "Interstellar",
    year: "2014",
    genre: "Sci-Fi, Adventure",
    poster: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    description: "A team travels through a wormhole to save humanity.",
    trailer: "https://www.youtube.com/watch?v=zSWdZVtXT7E"
},
{
    title: "Inception",
    year: "2010",
    genre: "Sci-Fi, Action",
    poster: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
    description: "A thief steals secrets through dream-sharing technology.",
    trailer: "https://www.youtube.com/watch?v=YoHD9XEInc0"
},
{
    title: "Joker",
    year: "2019",
    genre: "Drama, Thriller",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
    description: "The origin story of Gotham's most infamous villain.",
    trailer: "https://www.youtube.com/watch?v=zAGVQLHvwOY"
},
{
    title: "Avatar",
    year: "2009",
    genre: "Sci-Fi, Fantasy",
    poster: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    description: "A marine explores the alien world of Pandora.",
    trailer: "https://www.youtube.com/watch?v=5PSNL1qE6VY"
},
{
    title: "Oppenheimer",
    year: "2023",
    genre: "Biography, Drama",
    poster: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
    description: "Story of physicist J. Robert Oppenheimer.",
    trailer: "https://www.youtube.com/watch?v=uYPbbksJxIg"
}
];

// ======================
// DOM ELEMENTS
// ======================

const moviesContainer =
document.getElementById("moviesContainer");

const searchInput =
document.getElementById("searchInput");

const searchBtn =
document.getElementById("searchBtn");

const darkModeBtn =
document.getElementById("darkModeBtn");

const watchlistBtn =
document.getElementById("watchlistBtn");

const showWatchlist =
document.getElementById("showWatchlist");

// ======================
// RENDER MOVIES
// ======================

function renderMovies(movieArray){

    moviesContainer.innerHTML = "";

    movieArray.forEach(movie => {

        const card =
        document.createElement("div");

        card.classList.add("movie-card");

        card.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">

            <div class="movie-info">

                <h3>${movie.title}</h3>

                <p>${movie.year}</p>

                <p>${movie.genre}</p>

                <div class="card-buttons">

                    <button class="details-btn">
                        Details
                    </button>

                    <button class="trailer-btn">
                        Trailer
                    </button>

                    <button class="watch-btn">
                        Watchlist
                    </button>

                </div>

            </div>
        `;

        card.querySelector(".details-btn")
        .addEventListener("click", () => {
            openMovieModal(movie);
        });

        card.querySelector(".trailer-btn")
        .addEventListener("click", () => {
            window.open(movie.trailer, "_blank");
        });

        card.querySelector(".watch-btn")
        .addEventListener("click", () => {
            addToWatchlist(movie);
        });

        moviesContainer.appendChild(card);

    });

}

renderMovies(movies);

// ======================
// SEARCH
// ======================

function searchMovies(){

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    movies.filter(movie =>
        movie.title
        .toLowerCase()
        .includes(value)
    );

    renderMovies(filtered);

}

searchBtn.addEventListener(
    "click",
    searchMovies
);

searchInput.addEventListener(
    "keyup",
    function(e){

        if(e.key === "Enter"){
            searchMovies();
        }

    }
);

// ======================
// MOVIE MODAL
// ======================

const movieModal =
document.getElementById("movieModal");

const moviePoster =
document.getElementById("moviePoster");

const movieTitle =
document.getElementById("movieTitle");

const movieYear =
document.getElementById("movieYear");

const movieGenre =
document.getElementById("movieGenre");

const movieDescription =
document.getElementById("movieDescription");

const watchTrailer =
document.getElementById("watchTrailer");

const addToWatchlistBtn =
document.getElementById("addToWatchlist");

const closeMovie =
document.getElementById("closeMovie");

function openMovieModal(movie){

    moviePoster.src = movie.poster;

    movieTitle.textContent =
    movie.title;

    movieYear.textContent =
    "Year: " + movie.year;

    movieGenre.textContent =
    "Genre: " + movie.genre;

    movieDescription.textContent =
    movie.description;

    watchTrailer.onclick = () => {

        window.open(
            movie.trailer,
            "_blank"
        );

    };

    addToWatchlistBtn.onclick = () => {

        addToWatchlist(movie);

    };

    movieModal.style.display =
    "flex";

}

closeMovie.addEventListener(
    "click",
    () => {
        movieModal.style.display =
        "none";
    }
);

window.addEventListener(
    "click",
    function(e){

        if(e.target === movieModal){

            movieModal.style.display =
            "none";

        }

    }
);

// ======================
// DARK MODE
// ======================

darkModeBtn.addEventListener(
    "click",
    () => {

        document.body.classList.toggle(
            "dark-mode"
        );

    }
);

// ======================
// WATCHLIST
// ======================

let watchlist =
JSON.parse(
localStorage.getItem("watchlist")
) || [];

function addToWatchlist(movie){

    const exists =
    watchlist.find(item =>
        item.title === movie.title
    );

    if(exists){

        alert(
            "Movie already exists in Watchlist"
        );

        return;
    }

    watchlist.push(movie);

    localStorage.setItem(
        "watchlist",
        JSON.stringify(watchlist)
    );

    alert(
        movie.title +
        " added to Watchlist"
    );

}

// ======================
// DISPLAY WATCHLIST
// ======================

function displayWatchlist(){

    if(watchlist.length === 0){

        alert(
            "Your Watchlist is Empty"
        );

        return;
    }

    renderMovies(watchlist);

}

watchlistBtn.addEventListener(
    "click",
    displayWatchlist
);

showWatchlist.addEventListener(
    "click",
    displayWatchlist
);

// ======================
// LOGO CLICK = HOME
// ======================

document
.querySelector(".logo")
.addEventListener(
"click",
() => {

    renderMovies(movies);

    searchInput.value = "";

}
);