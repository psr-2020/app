cuentas = [];

function getAccounts() {
    $.get("http://localhost:3000/cuentas", function (data) {
        cuentas = data.response;
    });
}

function existAccount(nick, email) {
    return cuentas.filter(function (i) {
        if (i.nickname == nick || i.email == email)
            return 1;
    });
}