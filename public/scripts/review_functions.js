class Review{
    constructor(id, game, author, day, month, year, text) {
        this.id = id;
        this.game = game;
        this.author = author;
        this.text = text;
    }
}

reviews = [];
tipoBusqueda = "";

function mostrarCarga(){
    $("#Contenido").append(
        '<div id = "cargaCirculos" class="text-center">' +
        '<span class="circulo circulo-1"></span>' +
        '<span class="circulo circulo-2"></span>' +
        '<span class="circulo circulo-3"></span>' +
        '<span class="circulo circulo-4"></span>' +
        '<span class="circulo circulo-5"></span>' +
        '<span class="circulo circulo-6"></span>' +
        '<span class="circulo circulo-7"></span>' +
        '<span class="circulo circulo-8"></span>' +
        '<hr><hr><hr>' +
        '</div>'
    );
}

function eliminarCarga(){
    $("#cargaCirculos").remove();
}

function mostrarNotFound(text) {
    $("#Contenido").append(
        '<div id="contenido">' +
        '<div class="container" style="margin-top: 3%;">' +
        '<h1 class="display-3 text-muted text-center">Oops!</h1>' +
        '<p class="lead text-white text-center">' + text + '</p>' +
        '</div>' +
        '</div>' +
        '<hr><hr>'
    );
}

function addReview(review) {
    $("#Contenido").append(
        '<div class="row d-flex justify-content-center">' +
        '<img  class="col-md-4" src="' + games[review.idJuego].imagen + '" width="450" alt="" srcset="">' +
        '<div class="col-md-8 bg-secundary">' +
        '<h2 class="text-white text-left ">' + games[review.idJuego].nombre + '</h2>' +
        '<h5 class="text-dark text-left">' + review.autor + ', ' + review.day + '/' + review.month + '/' + review.year + '</h5>' +
        '<p class = "lead text-white">' + review.descripcion + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-4 text-center">' +
        '<br>' +
        '<button type="button" onclick="likeReview(' + review.id + ')" class="btn btn-outline-secondary">' +
        '<span class="badge badge-success" id="like' + review.id + '">' + review.likes + '</span>' + '<span class="text-white"> Positivos </span> </button>' +
        '&nbsp;&nbsp;' +
        '<button type="button" onclick="dislikeReview(' + review.id + ')"class="btn btn-outline-secondary">' +
        '<span class="badge badge-danger" id="dislike' + review.id + '">' + review.dislikes + '</span>' + '<span class="text-white"> Negativos </span> </button>' +
        '</div>' +
        '</div>' +
        '<hr>'
    );
};

function reviewFilter(type, text) {

    if (type == "Autores") {
        return reviews.filter(function (review) {
            autor = review.autor.toLowerCase();
            return autor.indexOf(text) !== -1;
        });
    }

    if (type == "Nombre de juego") {
        return reviews.filter(function (review) {
            nombreJuego = games[review.idJuego].nombre.toLowerCase()
            return nombreJuego.indexOf(text) !== -1;
        });
    }
}

function likeReview(idReview) {
    $.ajax({
        url: 'http://localhost:3000/reviews/like/' + idReview,
        type: 'PUT',
        success: function (result) {
            reviews = result.respuesta; 
            $("#like" + idReview).text(reviews[idReview].likes);
        }
    });
}

function dislikeReview(idReview) {
    $.ajax({
        url: 'http://localhost:3000/reviews/dislike/' + idReview,
        type: 'PUT',
        success: function (result) {
            reviews = result.respuesta;
            $("#dislike" + idReview).text(reviews[idReview].dislikes);
        }
    });
}

function hayReviewsPopulares() {
    return reviews.filter(function (review) {
        return review.likes > 0 && review.dislikes > 0
    });
}

function getReviews() {
    mostrarCarga();
    $.ajax({   
        url: "http://localhost:3000/reviews",
        type: "GET",
        error: function () {
            eliminarCarga();
            mostrarNotFound("El sistema se encuentra desactivado.")
        },
        success: function (informacion) {
            eliminarCarga();

            reviews = informacion.respuesta;

            var tipoReview = document.title;

            if (tipoReview == "Reseñas Populares") {
                if (hayReviewsPopulares() != 0) {
                    reviews.forEach(function (review) {
                        if (review.likes > 0 || review.dislikes > 0)
                            addReview(review);
                    });
                } else
                    mostrarNotFound("No se encontraron reseñas populares.");
            }

            if (tipoReview == "Reseñas Recientes") {
                reviews.forEach(function (review) {
                    addReview(review);
                });
            }

        }
    });
}


$(document).ready(function () {

    getGames();
    getReviews();

    $("#busqueda").change(function () {

        textoEnBusqueda = $("#busqueda").val().toLowerCase();
        $("#Contenido").html("<hr>");

        if (/^ *$/.test(textoEnBusqueda) || /^ *$/.test(tipoBusqueda)) {
            return getReviews();
        }

        reviewsEncontrados = reviewFilter(tipoBusqueda, textoEnBusqueda);

        if (reviewsEncontrados.length == 0)
            mostrarNotFound("No se encontrarón reseñas.");
        else {
            reviewsEncontrados.forEach(function (review) {
                addReview(review);
            });
        }
    });


    $('.input-group-prepend').find('a').click(function (e) {
        e.preventDefault();

        tipoBusqueda = $(this).text();
        $('#dpBuscar').text(tipoBusqueda);
    });

});
