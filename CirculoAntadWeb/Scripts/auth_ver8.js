
$(document).ready(function () {

   // $('#formlogin').disableAutoFill();


    $("#loginentrar").focus();
    $("#loginentrar").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $("#inputpassword").focus();
        }
    });

    $("#inputpassword").keypress(function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $(".btn-login").click();
        }
    });



    $(".btn-login").click(function () {
        if (validarCamposLogin()) {
            var Login = $("#loginentrar").val();
            var Password = $("#inputpassword").val();
            if (Login != "" && Password != "") {
                var datos = {
                    "Login": Login,
                    "Password": Password
                };
                $(this).hide();
                $(".mensajelogin").html("Autenticando.....");
                $('#back').loading('start');

                if (Login == 'marca' && Password == '123' || Login == 'cadena' && Password == '123') {

                    if (Login == 'marca') {
                        clvEmp = '15000'
                        edad = '20'
                        genero = 'FEMENINO'
                        clvGen='1'
                        nombre = 'Alexa Perez Perez'
                        usuario = 'alexa'
                        password = '123'
                        foto = ''
                        clvPuesto = '5'
                        puesto = 'Marca'
                        mensajeLogin = ''
                        seLogeo = ''
                    } else if (Login == 'cadena') {
                        clvEmp = '16000'
                        edad = '20'
                        genero = 'FEMENINO'
                        clvGen = '1'
                        nombre = 'Maria Olvera Ruiz'
                        usuario = 'maria'
                        password = '123'
                        foto = ''
                        clvPuesto = '6'
                        puesto = 'Marca'
                        mensajeLogin = ''
                        seLogeo = ''
                    }


                    var datosD = {
                        "clvEmp": clvEmp,
                        "edad": edad,
                        "genero": genero,
                        "clvGen": clvGen,
                        "nombre": nombre,
                        "usuario": usuario,
                        "password": password,
                        "foto": foto,
                        "clvPuesto": clvPuesto,
                        "puesto": puesto,
                        "mensajeLogin": mensajeLogin,
                        "seLogeo": seLogeo,

                    };

                    $.ajax({
                        type: "POST",
                        url: "/Login/CrearSession",
                        data: datosD,
                        success: function (resultado) {
                            if (resultado == "OK") {
                                $('#back').loading('start');
                                $("#loginentrar").val("");
                               // alert ("ir a menu")
                                window.location.href = "/Home/MisTickets";
                            }

                        },
                        error: function () {
                            $('#back').loading('stop');
                            $(".btn-login").show();
                            // console.log("se mira")
                            $(".mensajelogin").html("Usuario y/o password incorrectos");
                            $(".login-box-body").effect("shake");
                            $("#loginentrar").focus();
                        }

                    })

                } else{
                    $('#back').loading('stop');
                    //console.log("diferente");
                    $(".btn-login").show();
                    $(".mensajelogin").html("Usuario y/o Contraseña incorrecto")
                    $(".login-box-body").effect("shake");
                    $("#loginentrar").focus();
                }

                /*$.ajax({
                    type: "POST",
                    url: "/Login/Autorizar",
                    data: datos,
                    success: function (resultado) {
                       //console.log(resultado.MensajeClvEdoCuenta);
                        if (resultado.MensajeClvEdoCuenta != "OK") {
                            $('#back').loading('stop');
                            //console.log("diferente");
                            $(".btn-login").show();
                            $(".mensajelogin").html(resultado.MensajeClvEdoCuenta)
                            $(".login-box-body").effect("shake");
                            $("#loginentrar").focus();

                        } else {

                            ClvCuenta = resultado.ClvCuenta
                            Login = resultado.Login
                            Administrador = resultado.Administrador
                            ClvEdoCuenta = resultado.ClvEdoCuenta
                            ClvTipoUsuario = resultado.ClvTipoUsuario
                            ClvUsuario = resultado.ClvUsuario
                            NombreUsuario = resultado.NombreUsuario
                            Avatar = resultado.Avatar
                            EmailUsuario = resultado.EmailUsuario
                            TelefonoUsuario = resultado.TelefonoUsuario
                            VisualizarHistorico = resultado.VisualizarHistorico
                            EditarHistorico = resultado.EditarHistorico
                            CambiarContrasena = resultado.CambiarContrasena
                            var datosD = {
                                "ClvCuenta": ClvCuenta,
                                "ClvUsuario": ClvUsuario,
                                "Login": Login,
                                "Administrador": Administrador,
                                "ClvEdoCuenta": ClvEdoCuenta,
                                "ClvTipoUsuario": ClvTipoUsuario,
                                "NombreUsuario": NombreUsuario,
                                "Avatar": Avatar,
                                "EmailUsuario": EmailUsuario,
                                "TelefonoUsuario": TelefonoUsuario,
                                "VisualizarHistorico": VisualizarHistorico,
                                "EditarHistorico": EditarHistorico,
                                "CambiarContrasena": CambiarContrasena,

                            };

                            $.ajax({
                                type: "POST",
                                url: "/Login/CrearSession",
                                data: datosD,
                                success: function (resultado) {
                                    if (resultado == "OK") {
                                        $('#back').loading('start');
                                        $("#loginentrar").val("");
                                        window.location.href = "/Home/MisTickets";
                                    }

                                },
                                error: function () {
                                    $('#back').loading('stop');
                                    $(".btn-login").show();
                                   // console.log("se mira")
                                    $(".mensajelogin").html("Usuario y/o password incorrectos");
                                    $(".login-box-body").effect("shake");
                                    $("#loginentrar").focus();
                                }

                            })
                        }

                    },
                    error: function () {
                        $('#back').loading('stop');
                        $(".btn-login").show();
                       // console.log("se mira")
                        $(".mensajelogin").html("Usuario y/o password incorrectos");
                        $(".login-box-body").effect("shake");
                        $("#loginentrar").focus();
                    }

                })*/

            } else {
                $(".mensajelogin").html("Escribe el login y la contraseña");
                $(".login-box-body").effect("shake");

            }

            setTimeout(function () { $(".mensajelogin").html(""); }, 5000);

        }


    })

    function validarCamposLogin() {

        var login = $("#loginentrar").val();
        if (login != "") {

            var expresion = /^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ.,_\s]+$/;

            if (!expresion.test(login)) {

                $(".mensajelogin").html("Login no valido");
                $(".login-box-body").effect("shake");
                return false;

            } else {

                if (login.length > 20) {

                    $(".mensajelogin").html("Login no valido");
                    $(".login-box-body").effect("shake");
                    return false;
                }

            }

        } else if ($('#loginentrar').val() === '') {

            $(".mensajelogin").html("Escribe el login");
            $(".login-box-body").effect("shake");
            return false;

        }

        var password = $("#inputpassword").val();

        if (password != "") {
            if (password.length > 20) {

                $(".mensajelogin").html("Password no valido");
                $(".login-box-body").effect("shake");
                return false;
            }

        } else if ($('#inputpassword').val() === '') {

            $(".mensajelogin").html("Escribe el password");
            $(".login-box-body").effect("shake");
            return false;

        }
        
        $(".mensajelogin").html("");
        return true;

    }
    
})
