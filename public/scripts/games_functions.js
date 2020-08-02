var games = [];

function getGames() {
    $.get("http://localhost:3000/games", function (informacion) {
        games = informacion.respuesta;
    });
};
