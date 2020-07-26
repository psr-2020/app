class Account{
    constructor(id, name, surname, password, nickname, email){
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.password = password;
        this.nickname = nickname;
        this.email = email;
    }
}

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