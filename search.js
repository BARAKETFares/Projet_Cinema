const API_KEY = "29c8b7c3";
let page = 1;
let currentSearch = "";

const input = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");

input.addEventListener("input", () => {
    currentSearch = input.value;
    page = 1;
    resultsDiv.innerHTML = "";

    if (currentSearch.length > 2) {
        searchMovies();
    }
});
function searchMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${currentSearch}&page=${page}`)
        .then(res => res.json())
        .then(data => {
            if (!data.Search) return;

            data.Search.forEach(movie => {
                resultsDiv.innerHTML += `
                    <div class="card" >
                        <img src="${movie.Poster}">
                        <h3>${movie.Title}</h3>
                        <a href="#" onclick="openMovie('${movie.imdbID}')">En savoir plus</a>
                        
                    </div>
                `;
            })
        });
}

document.getElementById("loadMore").addEventListener("click", () => {
    if (currentSearch.length > 2) {
        page++;
        searchMovies();
    }
});

function openMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}
