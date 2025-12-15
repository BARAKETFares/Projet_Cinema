const API_KEY = "29c8b7c3";
let page = 1;

function loadMovies() {
    fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=marvel&page=${page}`)
        .then(res => res.json())
        .then(data => {
            const moviesDiv = document.getElementById("movies");
            data.Search.forEach(movie => {
                moviesDiv.innerHTML += `
                    <div class="card">
                        <img src="${movie.Poster}">
                        <h3>${movie.Title}</h3>
                        <h4>${movie.Year}</h4>
                        <a  href="#" onclick="openMovie('${movie.imdbID}')">En savoir plus</a>
                        
                    </div>
                `;
            })
        });
}

function openMovie(id) {
    window.location.href = `movie.html?id=${id}`;
}

document.getElementById("loadMore").addEventListener("click", () => {
    page++;
    loadMovies();
});

loadMovies();
