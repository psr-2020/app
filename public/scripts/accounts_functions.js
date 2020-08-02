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

var cuentas = [];

function getAccounts() {
    $.get("http://localhost:3000/accounts", data => {
        cuentas = data.response;
    });
}

function existAccount(nick, email) {
    return cuentas.filter(i => {
        if (i.nickname == nick || i.email == email)
            return 1;
    });
}