$(document).ready(function () {

    getAccounts();

    $('#accederCuenta').on('submit', function (event) {
        event.preventDefault();

        usuario = $('#inputNickAndEmail').val();
        password = $('#inputPassword').val();

        if (voidText(usuario) || voidText(password)) {
            return alert('completa los campos');
        }

        existAccount(usuario, password) != 0 ? alert('bienvenido ' + usuario) : alert('no existe este usuario');
    });
});