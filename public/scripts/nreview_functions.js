gameSelected = Object;
nameGame = "";
opinion = "";

function addItemGame(game){
    $("#itemGame").append(
        '<a class="dropdown-item" href="">' + game.nombre + '</a>'
    );
}

// pass
function sendError(text){
    $(".container").append(
        '<p class="display-4 text-white text-center">' + text + '</p>'
    );
}

function sendReview(){
    if(opinion == 0)
        return alert("No has escrito ninguna opinión!");
    if(nameGame == 0)
        return alert("No has elegido ningún juego!");

}

getGames();

$(document).ready(function(){

    games.forEach(game => {
        addItemGame(game);
    });

    $(".text-area").attr("maxlength", 500)

    $('.text-area').bind('input propertychange', function() {
        chars = $(this).val().length;
        opinion = $(this).val();
        $('#maxChars').text(chars + '/500');
        if(chars == 500)
            $('#maxChars').append('<a class = "font-italic text-danger"> Llegaste al máximo de carácteres! </a>'); 
    });

    $('#listGames').find('a').click(function(e){
        e.preventDefault();
        nameGame = $(this).text();
        $('#btnGameSelected').text(nameGame);
        gameSelected = games.filter(function(game){
            return game.nombre == nameGame;
        });
    })
});