const API_KEY = "29c8b7c3";

const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");

fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${movieId}`)
    .then(res => res.json())
    .then(movie => {
        const ratingsHTML = movie.Ratings.length > 0
            ? movie.Ratings.map(rating =>
                `<li>${rating.Source} : ${rating.Value}</li>`
              ).join("")
            : "<li>Aucune note disponible</li>";

        document.getElementById("movieDetails").innerHTML = `
        <div id="affiche">    
        <h1>${movie.Title}</h1>
            <img src="${movie.Poster}" alt="${movie.Title}">
            </div>
            <div id="description">
            <p><span>Genre :</span> ${movie.Genre}</p>
            <p><span>Acteurs :</span> ${movie.Actors}</p>

            <p><span>Résumé :</span><br>${movie.Plot}</p>

            <p><span>Date de sortie DVD :</span> ${formatDateFR(movie.DVD)}</p>

            <p> <span>Notes du film :</span></p>
            <ul>
                ${ratingsHTML}
            </ul></div>
        `;
    });

function formatDateFR(dateString) {
    if (dateString === "N/A") return "Non disponible";
    return new Date(dateString).toLocaleDateString("fr-FR");
}
