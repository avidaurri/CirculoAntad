
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
            $(".btn-logind").click();
        }
    });



    $(".btn-logind").click(function () {
        if (validarCamposLogin()) {
            console.log("campos validados")
            var Login = $("#loginentrar").val().trim();
            console.log(Login)

            var Password = $("#inputpassword").val().trim();
            console.log(Password)
            if (Login != "" && Password != "") {
                var datos = {
                    "usuario": Login,
                    "password": Password
                };
                $(this).hide();
                $(".mensajelogin").html("Autenticando.....");
                $('#backd').loading('start');
                $('div.loading-overlay-content').html('Autenticando.....')


                $.ajax({
                    type: "POST",
                    url: "/Login/Autorizar",
                    data: datos,
                    success: function (resultado) {
                        console.log("res ", resultado)
                       //console.log(resultado.MensajeClvEdoCuenta);
                        if (resultado.seLogeo) {


                            usuario = resultado.usuario
                            agencia = resultado.agencia
                            folioAgencia = resultado.folioAgencia
                            mensajeLogin = resultado.mensajeLogin


                            var datosD = {
                                "usuario": usuario,
                                "agencia": agencia,
                                "folioAgencia": folioAgencia,
                                "mensajeLogin": mensajeLogin,

                            };
                            $('div.loading-overlay-content').html('Iniciando ....')
                            $.ajax({
                                type: "POST",
                                url: "/Login/CrearSession",
                                data: datosD,
                                success: function (resultado) {
                                   // console.log("resultado ", resultado)
                                    if (resultado == "OK") {
                                        $('div.loading-overlay-content').html( mensajeLogin)
                                        $('#back').loading('start');
                                        $(".btn-login").show();
                                        $("#loginentrar").val('') 
                                        $("#inputpassword").val('') 
                                        setTimeout(function () {
                                            window.location.href = "/Home/Tablero";
                                        }, 1000);
                                        
                                    }

                                },
                                error: function () {
                                    $('#back').loading('stop');
                                    $(".btn-logind").show();
                                    // console.log("se mira")
                                    $(".mensajelogin").html("Usuario y/o password incorrectos");
                                    $(".login-box-body").effect("shake");
                                    $("#loginentrar").focus();
                                }

                            })
                        }else {
                            $('#backd').loading('stop');
                            console.log("diferente");
                            $(".btn-logind").show();
                            $(".mensajelogin").html(resultado.mensajeLogin)
                            $(".login-box").effect("shake");
                            $("#loginentrar").focus();
                        }


                    },
                    error: function () {
                        $('#back').loading('stop');
                        $(".btn-logind").show();
                       // console.log("se mira")
                        $(".mensajelogin").html("Usuario y/o password incorrectos");
                        $(".login-box").effect("shake");
                        $("#loginentrar").focus();
                    }

                })

            } else {
                $(".mensajelogin").html("Escribe el login y la contraseña");
                $(".login-box").effect("shake");

            }

            setTimeout(function () { $(".mensajelogin").html(""); }, 5000);

        } else {
            console.log("campos no validados")
        }


    })

    function validarCamposLogin() {

        var login = $("#loginentrar").val().trim();
        if (login != "") {

            var expresion = /^[0-9a-zA-ZáéíóúàèìòùÀÈÌÒÙÁÉÍÓÚñÑüÜ.,_\s]+$/;

            if (!expresion.test(login)) {

                $(".mensajelogin").html("Login no valido");
                $(".login-box").effect("shake");
                return false;

            } else {

                if (login.length > 20) {

                    $(".mensajelogin").html("Login no valido");
                    $(".login-box").effect("shake");
                    return false;
                }

            }

        } else if ($('#loginentrar').val() === '') {

            $(".mensajelogin").html("Escribe el login");
            $(".login-box").effect("shake");
            return false;

        }

        var password = $("#inputpassword").val().trim();

        if (password != "") {
            if (password.length > 20) {

                $(".mensajelogin").html("Password no valido");
                $(".login-box").effect("shake");
                return false;
            }

        } else if ($('#inputpassword').val() === '') {

            $(".mensajelogin").html("Escribe el password");
            $(".login-box").effect("shake");
            return false;

        }
        
        $(".mensajelogin").html("");
        return true;

    }
    
})
