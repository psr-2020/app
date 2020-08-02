$(document).ready(function () {
    getAccounts();

    $('#crearCuenta').on('submit', function (event) {
        event.preventDefault();

        // Guarda los datos en un array
        let datos = [];
        datos.push($("#inputNombre").val());    //0
        datos.push($("#inputApellido").val());  //1
        datos.push($("#inputPassword").val());  //2
        datos.push($("#InputNick").val());      //3
        datos.push($("#inputEmail").val());     //4

        // Verifica que todos los campos no sean nulos
        
        for (var i = 0; i < 5; i++) {
            if (voidText(datos[i]))
                return alert("Rellena todos los campos")
        }

        // Verifica la existencia de la cuenta mediante el nickname y email
        if (existAccount(datos[3], datos[4]) == 0) {
            $.ajax({
                url: 'http://localhost:3000/accounts',
                type: 'POST',
                data: {
                    id: Object.keys(cuentas).length + 1,
                    name: datos[0],
                    surname: datos[1],
                    password: datos[2],
                    nickname: datos[3],
                    email: datos[4],
                },
                success: resultado => {
                    alert("Te has registrado correctamente")
                    location.reload();
                }
            });
        } else
            alert("ya existe esa cuenta");
    });
});