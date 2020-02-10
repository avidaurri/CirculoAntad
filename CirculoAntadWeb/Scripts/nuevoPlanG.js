var listaRequisitosCampania = [];
var listaRequisi = [];
var listaClavePuesto = [];
var listaCantidadClavePuesto = [];

$.get("/Home/ObtenerProyectos", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2proyecto').append(" <option value=" + item.folio_proyecto + " class='opcionDeSelect'>" + item.descripcion + "</option>")

    });

});

$.get("/Home/ObtenerCentrosTrabajo", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2centrotrabajo').append(" <option value=" + item.folio_centro_trabajo + " class='opcionDeSelect'>" + item.descripcion + "</option>")
        $('#select2centrotrabajosolo').append(" <option value=" + item.folio_centro_trabajo + " class='opcionDeSelect'>" + item.descripcion + "</option>")
    });

});
/*
$.get("/Home/ObtenerEmpleados", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2empleado').append(" <option value=" + item.clv_emp + " class='opcionDeSelect'>" + item.nombre + "</option>")
        $('#select2empleadosolo').append(" <option value=" + item.clv_emp + " class='opcionDeSelect'>" + item.nombre + "</option>")
    });

});*/


$.get("/Home/ObtenerActividades", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2actividades').append(" <option value=" + item.clv_actividad + " class='opcionDeSelect'>" + item.descripcion + "</option>")

    });

});

$.get("/Home/ObtenerMarcas", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2marca').append(" <option value=" + item.clv_cli + " class='opcionDeSelect'>" + item.nombre + "</option>")

    });

});

obtenerEstados()

function obtenerEstados() {

    var datosssa = {
        "nombre": "prueba"
    };

    $.ajax({
        type: "POST",
        url: "/Home/ObtenerEstados", //si
        data: datosssa,
        success: function () {


        }

    })
}

/*$.get("/Home/ObtenerEstados", function (data, statusText) { //si
    $('#estadofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")
    $.each(data, function (i, item) {
        console.log("rere ", item.nombre)
        $('#estadofiltro').append(" <option value=" + item.nombre + " class='opcionDeSelect'>" + item.nombre + "</option>")

    });

});*/


$.get("/Home/ObtenerCalificaciones", function (data, statusText) { //si
    $('#calificacionfiltro').append(" <option value='' class='opcionDeSelect'>Todas</option>")
    $.each(data, function (i, item) {

        $('#calificacionfiltro').append(" <option value=" + item.calificacion + " class='opcionDeSelect'>" + item.calificacion + "</option>")

    });

});

function agregarAgrupacionCentrosTrabajo() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableagrupacioncentrotrabajotem tbody").empty();
    $(".tableagrupacioncentrotrabajosolo tbody").empty();


    var folio_proyecto = $("#select2proyecto").val()
    //console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerAgrupacionCentrosTrabajo", //si
        data: datosss,
        success: function (Agrupador) {
            //console.log("Agrupador", Agrupador.length)

            if (Agrupador.length > 0) {

                for (i = 0; i < Agrupador.length; i++) {

                    // console.log("Agrupador i ", Agrupador[i].descripcion)

                    renglonagru = '<tr>' +
                        '<td> <label >' + Agrupador[i].descripcion + '</label></td>' +
                        ' <td><label >' + Agrupador[i].tipo + '</label></td>' +
                        ' <td><label ><button class="btn btn-sm btn-outline-primary agregargrupocentrotem" grupocentrotrabajo="' + Agrupador[i].clv_agrupador_centro_trabajo + '">Agregar</button> </label></td>' +
                        ' <td><label ><button class="btn btn-sm btn-outline-warning verdetallegrupocentrotrabajo" grupocentrotrabajo="' + Agrupador[i].clv_agrupador_centro_trabajo + '" nomcentrotrabajo="' + Agrupador[i].descripcion + '">Ver detalle</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacioncentrotrabajotem tbody").append(renglonagru)


                    renglonagrusolo = '<tr>' +
                        '<td> <label >' + Agrupador[i].descripcion + '</label></td>' +
                        ' <td><label >' + Agrupador[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregargrupocentrosolo" grupocentrotrabajosolo="' + Agrupador[i].clv_agrupador_centro_trabajo + '">Agregar</button> </label></td>' +
                        ' <td><label ><button class="btn btn-sm btn-outline-warning verdetallegrupocentrotrabajo" grupocentrotrabajo="' + Agrupador[i].clv_agrupador_centro_trabajo + '" nomcentrotrabajo="' + Agrupador[i].descripcion + '">Ver detalle</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacioncentrotrabajosolo tbody").append(renglonagrusolo)


                }

            }


            $('#backd').loading('stop');
        }

    })

}
//agregarGrupoCentroTrabajoTem


$(".mandarDatos").on("click", function () {

    // mandarDatos()
    swal({

        type: "success",
        title: "¡El Plan se guardo correctamente!",
        showConfirmButton: true,
        confirmButtonText: "Cerrar"

    }).then(function (result) {

        if (result.value) {

            window.location = "MisPlanes";

        }

    });
})

function mandarDatos() {

    var arrayNombres = new Array();
    var arrayApellido = new Array();
    var arrayCiudad = new Array();

    arrayNombres[0] = "nombre1";
    arrayNombres[1] = "nombre2";
    arrayNombres[2] = "nombre3";

    arrayApellido[0] = "ape1 ";
    arrayApellido[1] = "ape2";
    arrayApellido[2] = "ape3";

    arrayCiudad[0] = "ciudad1";
    arrayCiudad[1] = "ciudad2";
    arrayCiudad[2] = "ciudad3";

    var listadatos = [];
    var objeto = {};

    /*datos.push({
        "nombre": "alej",
        "apellido": "alej",
        "ciudad": "alej"
    });*/

    for (var i = 0; i < arrayNombres.length; i++) {

        var nombre = arrayNombres[i];

        listadatos.push({
            "nombre": arrayNombres[i],
            "apellido": arrayApellido[i],
            "ciudad": arrayCiudad[i]
        });
    }

    objeto.listadatos = listadatos;
    //console.log(JSON.stringify(objeto));
    objj = JSON.stringify(objeto)
    $.ajax({
        type: "POST",
        url: "/Home/ObtenerDatosEjemplo", //si
        data: objeto,
        success: function (Empleado) {
            //console.log("empleados", Empleado)


        }

    })


}

function agregarAgrupacionEmpleado() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableagrupacionempleadotem tbody").empty();
    $(".tableagrupacionempleadosolo tbody").empty();

    var folio_proyecto = $("#select2proyecto").val()
    //console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerAgrupacionEmpleado", //si
        data: datosss,
        success: function (Empleado) {
            //console.log("empleados", Empleado)

            if (Empleado.length > 0) {

                for (i = 0; i < Empleado.length; i++) {

                    //console.log("Agrupador i ", Empleado[i].descripcion)

                    renglonemp = '<tr>' +
                        '<td> <label >' + Empleado[i].descripcion + '</label></td>' +
                        ' <td><label >' + Empleado[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregargrupoempleadotem" grupoempleado="' + Empleado[i].clv_agrupador_empleado + '">Agregar</button> </label></td>' +
                        ' <td><label ><button class="btn btn-sm btn-outline-warning verdetalleempleado" grupoempleadosolo="' + Empleado[i].clv_agrupador_empleado + '" nomemple="' + Empleado[i].descripcion + '">Ver detalle</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacionempleadotem tbody").append(renglonemp)

                    renglonempsologrupo = '<tr>' +
                        '<td> <label >' + Empleado[i].descripcion + '</label></td>' +
                        ' <td><label >' + Empleado[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregarempleadosolo" grupoempleadosolo="' + Empleado[i].clv_agrupador_empleado + '">Agregar</button> </label></td>' +
                        ' <td><label ><button class="btn btn-sm btn-outline-warning verdetalleempleado" grupoempleadosolo="' + Empleado[i].clv_agrupador_empleado + '" nomemple="' + Empleado[i].descripcion + '">Ver detalle</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacionempleadosolo tbody").append(renglonempsologrupo)


                }

            }


            $('#backd').loading('stop');
        }

    })

}


function agregarrequisitoscampania() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableresumenempleado tbody").empty();


    var folio_proyecto = $("#select2proyecto").val()
    //console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };

    listaRequisitosCampania.length = 0
    listaRequisi.length = 0
    $.ajax({
        type: "POST",
        url: "/Home/ObtenerRequisitosCampania", //si
        data: datosss,
        success: function (Empleado) {
            // console.log("requisitos", Empleado)

            if (Empleado.length > 0) {

                for (i = 0; i < Empleado.length; i++) {

                    /*listaClavePuesto.push(Empleado[i].clv_puesto)
                    listaCantidadClavePuesto.push(Empleado[i].cantidad)*/
                    //var listaRequisitosCampania = [];
                    listaRequisitosCampania.push({
                        "clv_puesto": Empleado[i].clv_puesto,
                        "cantidad": Empleado[i].cantidad
                    });

                    listaRequisi.push({
                        "clv_puesto": Empleado[i].clv_puesto,
                        "cantidad": Empleado[i].cantidad
                    });

                    //console.log("Agrupador i ", Empleado[i].descripcion)
                    banderactividad++
                    Empleado[i].clv_actividad
                    rengloacti = '<tr> <td> <label class="labelresumenempleado">' + Empleado[i].puesto + '</label></td>' +
                        '<td><small class="labelg labelresumenempleado">' + Empleado[i].cantidad + '</small></td> </tr>'

                    $(".tableresumenempleado tbody").append(rengloacti)

                }


            } else if (Empleado.length == 0) {

                $(".tableresumenempleado tbody").empty();


            }

            $('#backd').loading('stop');
            $(function () {
                $('[data-toggle="popover"]').popover()
            })
        }

    })

}
agregarRequisitosEmpleado

function agregarRequisitosEmpleado() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableresumenempleadorequisitos tbody").empty();


    var folio_proyecto = $("#select2proyecto").val()
    //console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerRequisitosEmpleado", //si
        data: datosss,
        success: function (Empleado) {
            console.log("requisitos empleado", Empleado)

            if (Empleado.length > 0) {

                for (i = 0; i < Empleado.length; i++) {

                    rengloacti = '<tr> <td><small class="labelg ">' + Empleado[i].puesto + '</small></td>' +
                        '<td><small class="labelg ">' + Empleado[i].nombreRequisito + '</small></td> ' +
                        '<td> <small class="labelg ">' + Empleado[i].valor + '</small></td ></tr > '

                    $(".tableresumenempleadorequisitos tbody").append(rengloacti)

                }


            } else if (Empleado.length == 0) {

                $(".tableresumenempleadorequisitos tbody").empty();


            }


        }

    })

}

function agregarActividades() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableactividades tbody").empty();


    var folio_proyecto = $("#select2proyecto").val()
    //console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerActividadesProyecto", //si
        data: datosss,
        success: function (Empleado) {
            //  console.log("actividades", Empleado)
            // console.log("cantidad0", $(".tableactividades .unaactividad").length)
            //  console.log("Empleado.length ", Empleado.length )
            if (Empleado.length > 0) {

                for (i = 0; i < Empleado.length; i++) {

                    //console.log("Agrupador i ", Empleado[i].descripcion)
                    banderactividad++
                    rengloacti = '<tr class="unaactividad" id="unaactividad' + banderactividad + '">' +
                        '<td> <label class="labelformu" clv_actividad="' + Empleado[i].clv_actividad + '">' + Empleado[i].descripcion + '</label></td >' +
                        '<td><button type="button" class="btn btn-verdescripcionmision btn-sm" data-toggle="popover"  title="Descripción de la Misión" ' +
                        'data-placement="left" data-content="' + Empleado[i].descripcion + '" > <i class="fa fa-eye" ></i> </button ></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminaactividad" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        ' </tr>'
                    //  console.log("añadir")
                    $(".tableactividades tbody").append(rengloacti)


                    $('#select2actividad').append(" <option value=" + Empleado[i].clv_actividad + " class='opcionDeSelect'>" + Empleado[i].descripcion + "</option>")
                    //   console.log("cantidad77", $(".tableactividades .unaactividad").length)
                }
                //  console.log("cantidad1", $(".tableactividades .unaactividad").length)
            } else if (Empleado.length == 0) {

                // console.log("borrar combo ");
                $('#select2actividad').empty();
                $('#select2actividad').append("<option value=''>Selecciona una mision</option>")


            }

            $(".eliminaactividad").on('click', function () {

                // console.log("idasasasa", id);


                // console.log("cantidad", $(".tableactividades .unaactividad").length)
                if ($(".tableactividades .unaactividad ").length == 1) {
                    // $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
                    var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                } else {
                    //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                    var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                }
            })

            $('#backd').loading('stop');
            $(function () {
                $('[data-toggle="popover"]').popover()
            })
        }

    })

}



$('#select2proyecto').on('select2:select', function (e) {

    var data = e.params.data;

    $(".campaniaseleccionadaresumen").html(data.text)
    if (data.text != "") {
        // console.log("borra msn")
        $(".mensajevalidaciocampania").html("")
    }


    if (data.text != "" || data.text.trim() != "") {
        agregarActividades()
        agregarRequisitosEmpleado()
        agregarAgrupacionCentrosTrabajo()
        agregarAgrupacionEmpleado()
        agregarrequisitoscampania();
    }



});

//agregarAgrupacionCentrosTrabajo()
//agregarAgrupacionEmpleado()



$('#backd').loading('start');
$('div.loading-overlay-content').html('Espere un momento')

var banderaTemp = 1;
var banderaCentroTrabajoTemp = 1;
var banderaEmpleadoCentroTrabajoTemp = 1;
var banderacentrotrabajo = 1
var banderaempleado = 1
var banderactividad = 1
iniciarTim();

function iniciarTim() {
    $('.reservationtime').daterangepicker(
        {
            timePicker: true,
            locale: {
                "format": 'DD/MM/YYYY HH:MM ',
                "applyLabel": "Aceptar",
                "cancelLabel": "Cancelar",
                "daysOfWeek": [
                    "Do",
                    "Lu",
                    "Ma",
                    "Mi",
                    "Ju",
                    "Vi",
                    "Sa"
                ],
                "monthNames": [
                    "Enero",
                    "Febrero",
                    "Marzo",
                    "Abril",
                    "Mayo",
                    "Junio",
                    "Julio",
                    "Agosto",
                    "Septiembre",
                    "Octubre",
                    "Noviembre",
                    "Diciembre"
                ],
            }

        }


    )


    $(".eliminarTem").on('click', function (e) {
        $('#backd').loading('start');
        $('div.loading-overlay-content').html('Eliminando elemento')

        e.stopPropagation();
        aidi = $(this).attr("id").substring(11);
        //console.log(" borrar   #untemporizador"+aidi);
        $("#carousel-example-generic .right").click();
        //$("#untemporizador"+aidi).remove()
		/*$(this).parent().remove()
		verificarCantidadTempo()*/
        setTimeout(function () {
            $("#untemporizador" + aidi).remove()

            verificarCantidadTempo()
            $('#backd').loading('stop');
        }, 3000);
    })


    function verificarCantidadTempo() {
        var count = $(".untemporizador").length
        //console.log("quedan", count);
        if (count == 0) {
            $(".tabtemporalidades .box-body").empty()

            $(".elcarouizq").css("border", "none");
            $(".elcarouder").css("border", "none");
            $(".elcarou").css("border", "none");

        } else if (count == 1) {
            $(".elcarouizq").css("border", "none");
            $(".elcarouder").css("border", "none");
            $(".irfre").css("display", "none");
            $(".iratras").css("display", "none");
        }

    }

    // $('#backd').loading('stop');
}


verificarCatalogos();
//var currentTab=5;//5

function verificarCatalogos() {

    setTimeout(function () {
        respuesta = 0;
        currentTab = respuesta;
        showTab(currentTab);
        $('#backd').loading('stop');
    }, 3000);
}



function link(desbloqueado) {

    showTab(desbloqueado);
    var x = document.getElementsByClassName("tab");//--> x(6)
    x[currentTab].style.display = "none";
    currentTab = desbloqueado;


    switch (currentTab) {
        case 0:
            $("#baraprogresoconfigurar .progress-bar").css("width", "0%")
            $("#baraprogresoconfigurar .progress-bar").html("0% Completado")

            break;
        case 1:
            $("#baraprogresoconfigurar .progress-bar").css("width", "25%")
            $("#baraprogresoconfigurar .progress-bar").html("25% Completado")

            break;

        case 2:
            $("#baraprogresoconfigurar .progress-bar").css("width", "50%")
            $("#baraprogresoconfigurar .progress-bar").html("50% Completado")

            break;

        case 3:
            $("#baraprogresoconfigurar .progress-bar").css("width", "75%")
            $("#baraprogresoconfigurar .progress-bar").html("75% Completado")

            break;

        case 4:
            $("#baraprogresoconfigurar .progress-bar").css("width", "100%")
            $("#baraprogresoconfigurar .progress-bar").html("100% Completado")

            break;


    }

}



function showTab(n) {
    /*console.log(" vista desbloquedo n",n);// 0  **/
    var x = document.getElementsByClassName("tab");// x=6
    x[n].style.display = "block";
    /* console.log("x[n]", x[n]);//  plaza  ***/

    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Guardar Plan";
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
    }

    fixStepIndicator(n)


    var ope = currentTab * 20
    $("#baraprogresoconfigurar .progress-bar").css("width", ope + "%")
    $("#baraprogresoconfigurar .progress-bar").html(" " + ope + "% " + " Completado")
    ajustarAlturaTab()




}




function nextPrev(n) {


    /*var x = document.getElementsByClassName("tab");//--> x(6)
    x[currentTab].style.display = "none";//vista bloquedo
    currentTab = parseInt(currentTab) + parseInt(n);// vista desbloquedo = vista bloqueado + 1 

    // console.log("currentTab", currentTab);


    //if(validarCambioTab(currentTab)){

    if (currentTab >= x.length) {// si esta al final de la vista enviardatos porfas

        document.getElementById("regForm").submit();
        return false;
    }

    showTab(currentTab);// vista desbloqueado = vista bloqueado + 1    
    */

    //console.log("n", n);

    var x = document.getElementsByClassName("tab");//--> x(6)
    x[currentTab].style.display = "none";//vista bloquedo
    currentTab = parseInt(currentTab) + parseInt(n);// vista desbloquedo = vista bloqueado + 1  ***/

    console.log("currentTab", currentTab);
    console.log(" x.length", x.length);



    /* if (currentTab >= x.length) {// si esta al final de la vista enviardatos porfas

        document.getElementById("regForm").submit();
        return false;
    }*/

    /*if (currentTab == 1) {

        validarCamposbasicos(currentTab)
    } else  if (currentTab == 2) {

        validarTemporalidad(currentTab)
    } else if (currentTab == 3) {

        validarCentroTrabajoManual(currentTab)
    } else if (currentTab == 4) {

        validarEmpleadoManual(currentTab)
    } else if (currentTab == 5) {

        showTab(currentTab);			
    }else if (currentTab >= x.length) {

        guardarPlanTrabajo()
    }*/
    //showTab(currentTab)

    if (currentTab == 5) {
        showTab(currentTab);
        validarTodo(currentTab, "showtab")
        //validarTodoMensaje(currentTab)
    } else if (currentTab >= x.length) {

        guardarPlanTrabajo()
    } else if (currentTab == 0) {
        //desglosarresumen(currentTab)
        showTab(currentTab);
    } else {
        //desglosarresumen(currentTab)
        validarTabUno(currentTab, "showtab")
    }

}

function desglosarresumen(currentTab, opcion) {

    var arraynombre_temporalidad = new Array();//
    var arrayfecha_temporalidad = new Array(); //
    var arraydias_temporalidad = new Array(); //
    var arraynombrecentrotrabajo = new Array();//
    var arraynombreempleado = new Array();//
    var arraynombremision = new Array();


    $(".contentrevi").html("");
    /*var inicfre = '<div class="row renglonrevisionproyecto">'+
        '<div class="col-md-8">'+
            '<h5 class="titulorenta">Revisión de la configuración del proyecto</h5>'+
       ' </div>'+
       ' <div class="col-md-8 table-wrapper-scroll-y my-custom-scrollbar" > '+
       ' <table class="table tableavisaryvrear " > '+
           ' <thead> '+
           ' <tr> '+
       ' <th> <label>Temporalidad </label> </th> '+
       ' <th> <label>Fecha </label> </th > '+
       ' <th> <label>Días </label> </th > '+
       ' <th> <label>Centro de trabajo</label></th > '+
       ' <th> <label>Empleado</label></th > '+
       ' <th> <label>Misión</label></th > '+
                    '</tr> '+
                '</thead> '+
                   ' <tbody> '+
                '</tbody> '+
           ' </table> '+
        '</div> '+
        '</div>'
    $(".contentrevi").append(inicfre)*/
    /*$('#backd').loading('start');
    $('div.loading-overlay-content').html('desglosando resumen')*/
    var banderarevi = 1;
    var cantidadccsolo = $(".renglonCentroTrabajo .uncentrotrabajo").length;
    var cantidadempleadossolo = $(".renglonempleado .unempleado").length;
    $("#carousel-example-generic .untemporizador ").each(function () {
        arraynombre_temporalidad.length = 0;
        arrayfecha_temporalidad.length = 0;
        arraydias_temporalidad.length = 0;
        arraynombrecentrotrabajo.length = 0;
        arraynombreempleado.length = 0;
        arraynombremision.length = 0;
        idtem = $(this).attr("id").substring(14);
        fecha = $("#tempInputDiaFinalInicial" + idtem).val()
        fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
        fecha_final = cambiarformatofecha(fecha.substring(20, 30));
        descripcion = $("#untemporizador" + idtem + " #tempInputDesc" + idtem).val()
        fechat = fecha_inicial + " - " + fecha_final
        bandera = 1
        diast = ""
        cantidadcc = 0;
        cantidademp = 0;
        $("#carousel-example-generic #untemporizador" + idtem + " .checkbox-inline input").each(function () {
            $(this).val()
            if ($(this).prop('checked')) {
                if (bandera == 1) {
                    diast = diast + "Lu, "
                } else if (bandera == 2) {
                    diast = diast + "Ma, "
                } else if (bandera == 3) {
                    diast = diast + "Mie, "
                } else if (bandera == 4) {
                    diast = diast + "Ju, "
                } else if (bandera == 5) {
                    diast = diast + "Vi, "
                } else if (bandera == 6) {
                    diast = diast + "Sa, "
                } else if (bandera == 7) {
                    diast = diast + "Do, "
                }
            }
            bandera++
        })
        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {

            cantidadcc = cantidadccsolo
            cantidademp = cantidadempleadossolo
        } else {

            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {
                idcentrotra = $(this).attr("id").substring(27);
                if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {
                    cantidademp = cantidadempleadossolo
                } else {
                    $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {


                        cantidademp++
                    })
                }

                cantidadcc++
            })

        }

        tablainterior = '';
        tablainteriord = '';
        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


            $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                idcentrotra = $(this).attr("id").substring(15);
                foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                    nombreempleado = $("#unempleado" + consec_empleado + " td label.labelformu").html()
                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");
                        nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                        arraynombre_temporalidad.push(descripcion);
                        arrayfecha_temporalidad.push(fechat);
                        arraydias_temporalidad.push(diast);
                        arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                        arraynombreempleado.push(nombreempleado);
                        arraynombremision.push(nombremision);



                    })


                })

            })

        }
        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



            idcentrotra = $(this).attr("id").substring(27);
            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


            if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                    nombreempleado = $("#unempleado" + consec_empleado + " td label.labelformu").html()

                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");
                        nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                        arraynombre_temporalidad.push(descripcion);
                        arrayfecha_temporalidad.push(fechat);
                        arraydias_temporalidad.push(diast);
                        arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                        arraynombreempleado.push(nombreempleado);
                        arraynombremision.push(nombremision);

                    })


                })
            }




        })


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

            nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

            $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                consec_empleado = $(this).attr("id").substring(34);
                clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")

                nombreempleado = $(this).children("td").children("label.labelformu").html()


                $(".renglonactividades .unaactividad").each(function () {

                    consec_actividad = $(this).attr("id").substring(12);
                    clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");

                    nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                    arraynombre_temporalidad.push(descripcion);
                    arrayfecha_temporalidad.push(fechat);
                    arraydias_temporalidad.push(diast);
                    arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                    arraynombreempleado.push(nombreempleado);
                    arraynombremision.push(nombremision);

                })


            })

        })

        for (var i = 0; i < arraynombremision.length; i++) {

            tablainteriord = '<tr> <td> <label>' + arraynombre_temporalidad[i] + '</label> </td > ' +
                '<td><label>' + arrayfecha_temporalidad[i] + '</label> </td>' +
                '<td><label>' + arraydias_temporalidad[i] + '</label> </td>' +
                '<td><label>' + arraynombrecentrotrabajo[i] + '</label></td>' +
                '<td><label>' + arraynombreempleado[i] + '</label></td>' +
                '<td><label>' + arraynombremision[i] + '</label></td> </tr>'

            tablainterior = tablainterior + tablainteriord

            //$(".tableavisaryvrear tbody").append(renglonresumen)
        }

        var izqui = ' <table class="table tableespecifi " > ' +
            ' <thead> ' +
            ' <tr> ' +
            ' <th> <label>Temporalidad </label> </th> ' +
            ' <th> <label>Fecha </label> </th > ' +
            ' <th> <label>Días </label> </th > ' +
            ' <th> <label>Centro de trabajo</label></th > ' +
            ' <th> <label>Empleado</label></th > ' +
            ' <th> <label>Misión</label></th > ' +
            '</tr> ' +
            '</thead> ' +
            ' <tbody> '

        var dere = '</tbody> ' +
            ' </table> '
        tablainterior = izqui + tablainterior + dere

        varincru = '<div class="row">' +
            ' <div class="col-md-8" >' +
            ' <table class="table  tableavisaryvrearuno table-wrapper-scroll-y">' +
            '<tr>' +
            '<th><label>Temporalidad : ' + descripcion + '</label> </th>' +
            ' <th><label>Fecha Inicial : ' + fecha_inicial + '</label> </th>' +
            '<th><label>Fecha Final : ' + fecha_final + '  </label> </th>' +
            '<th><label>  ' + cantidadcc + ' Centro de trabajo</label></th>' +
            '<th><label> ' + cantidademp + ' Empleado</label></th>' +
            '<th><a class="verdetal" data-toggle="collapse" data-target="#demo' + banderarevi + '">Ver Detalles</a></th>' +
            '</tr>' +
            '</table>' +
            '</div>' +
            '</div> ' +
            '<div class="row collapse" id="demo' + banderarevi + '" > ' +
            '<div class="col-md-8" my-custom-scrollbar> ' + tablainterior +
            ' </div> ' +
            '</div>';

        $(".tab .contentrevi").append(varincru)

        banderarevi++
    })


    console.log("desglosando resumen")
    $(".tableavisaryvrear tbody").html("")

    /*arraynombre_temporalidad.length = 0;
    arrayfecha_temporalidad.length = 0;
    arraydias_temporalidad.length = 0;
    arraynombrecentrotrabajo.length = 0;
    arraynombreempleado.length = 0;
    arraynombremision.length = 0;


    // lista empleados temporalidades vacias rojas-empleados actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        fecha = $("#tempInputDiaFinalInicial" + idtem).val()
        fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
        fecha_final = cambiarformatofecha(fecha.substring(20, 30));
        descripcion = $("#untemporizador" + idtem + " #tempInputDesc" + idtem).val()
        fechat = fecha_inicial + " - " + fecha_final
        bandera = 1
        diast=""
        $("#carousel-example-generic #untemporizador" + idtem + " .checkbox-inline input").each(function () {
            $(this).val()
            if ($(this).prop('checked')) {
                if (bandera == 1) {
                    diast = diast+"Lu, "
                } else if (bandera == 2) {
                    diast = diast + "Ma, "
                } else if (bandera == 3) {
                    diast = diast + "Mie, "
                } else if (bandera == 4) {
                    diast = diast + "Ju, "
                } else if (bandera == 5) {
                    diast = diast + "Vi, "
                } else if (bandera == 6) {
                    diast = diast + "Sa, "
                } else if (bandera == 7) {
                    diast = diast + "Do, "
                }
            }
            bandera++
        })

        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


            $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                idcentrotra = $(this).attr("id").substring(15);
                foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                    nombreempleado = $("#unempleado" + consec_empleado + " td label.labelformu").html()
                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");
                        nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                        arraynombre_temporalidad.push(descripcion);
                        arrayfecha_temporalidad.push(fechat);
                        arraydias_temporalidad.push(diast);
                        arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                        arraynombreempleado.push(nombreempleado);
                        arraynombremision.push(nombremision);



                    })


                })

            })

        }

    })

    for (var i = 0; i < arraynombremision.length; i++) {

        renglonresumen = '<tr> <td> <label>' + arraynombre_temporalidad[i]+'</label> </td > '+
            '<td><label>' + arrayfecha_temporalidad[i] +'</label> </td>'+
            '<td><label>' + arraydias_temporalidad[i] +'</label> </td>'+
            '<td><label>' + arraynombrecentrotrabajo[i] +'</label></td>'+
            '<td><label>' + arraynombreempleado[i] +'</label></td>'+
            '<td><label>' + arraynombremision[i] +'</label></td> </tr>'

        $(".tableavisaryvrear tbody").append(renglonresumen)
    }


    arraynombre_temporalidad.length = 0;
    arrayfecha_temporalidad.length = 0;
    arraydias_temporalidad.length = 0;
    arraynombrecentrotrabajo.length = 0;
    arraynombreempleado.length = 0;
    arraynombremision.length = 0;



    // list empleados de los centros de consumo que no tienen empleados verde oscuro actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        fecha = $("#tempInputDiaFinalInicial" + idtem).val()
        fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
        fecha_final = cambiarformatofecha(fecha.substring(20, 30));
        descripcion = $("#untemporizador" + idtem + " #tempInputDesc" + idtem).val()
        fechat = fecha_inicial + " - " + fecha_final
        bandera = 1
        diast = ""

        $("#carousel-example-generic #untemporizador" + idtem + " .checkbox-inline input").each(function () {
            $(this).val()
            if ($(this).prop('checked')) {
                if (bandera == 1) {
                    diast = diast + "Lu, "
                } else if (bandera == 2) {
                    diast = diast + "Ma, "
                } else if (bandera == 3) {
                    diast = diast + "Mie, "
                } else if (bandera == 4) {
                    diast = diast + "Ju, "
                } else if (bandera == 5) {
                    diast = diast + "Vi, "
                } else if (bandera == 6) {
                    diast = diast + "Sa, "
                } else if (bandera == 7) {
                    diast = diast + "Do, "
                }
            }
            bandera++
        })

        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



            idcentrotra = $(this).attr("id").substring(27);
            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


            if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                    nombreempleado = $("#unempleado" + consec_empleado + " td label.labelformu").html()

                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");
                        nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                        arraynombre_temporalidad.push(descripcion);
                        arrayfecha_temporalidad.push(fechat);
                        arraydias_temporalidad.push(diast);
                        arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                        arraynombreempleado.push(nombreempleado);
                        arraynombremision.push(nombremision);

                    })


                })
            }




        })

    })

    for (var i = 0; i < arraynombremision.length; i++) {

        renglonresumen = '<tr> <td> <label>' + arraynombre_temporalidad[i] + '</label> </td > ' +
            '<td><label>' + arrayfecha_temporalidad[i] + '</label> </td>' +
            '<td><label>' + arraydias_temporalidad[i] + '</label> </td>' +
            '<td><label>' + arraynombrecentrotrabajo[i] + '</label></td>' +
            '<td><label>' + arraynombreempleado[i] + '</label></td>' +
            '<td><label>' + arraynombremision[i] + '</label></td> </tr>'

        $(".tableavisaryvrear tbody").append(renglonresumen)
    }

    arraynombre_temporalidad.length = 0;
    arrayfecha_temporalidad.length = 0;
    arraydias_temporalidad.length = 0;
    arraynombrecentrotrabajo.length = 0;
    arraynombreempleado.length = 0;
    arraynombremision.length = 0;



    //lista empleados actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        fecha = $("#tempInputDiaFinalInicial" + idtem).val()
        fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
        fecha_final = cambiarformatofecha(fecha.substring(20, 30));
        descripcion = $("#untemporizador" + idtem + " #tempInputDesc" + idtem).val()
        fechat = fecha_inicial + " - " + fecha_final
        bandera = 1
        diast = ""

        $("#carousel-example-generic #untemporizador" + idtem + " .checkbox-inline input").each(function () {
            $(this).val()
            if ($(this).prop('checked')) {
                if (bandera == 1) {
                    diast = diast + "Lu, "
                } else if (bandera == 2) {
                    diast = diast + "Ma, "
                } else if (bandera == 3) {
                    diast = diast + "Mie, "
                } else if (bandera == 4) {
                    diast = diast + "Ju, "
                } else if (bandera == 5) {
                    diast = diast + "Vi, "
                } else if (bandera == 6) {
                    diast = diast + "Sa, "
                } else if (bandera == 7) {
                    diast = diast + "Do, "
                }
            }
            bandera++
        })


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

            nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

            $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                consec_empleado = $(this).attr("id").substring(34);
                clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")

                nombreempleado = $(this).children("td").children("label.labelformu").html()


                $(".renglonactividades .unaactividad").each(function () {

                    consec_actividad = $(this).attr("id").substring(12);
                    clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");

                    nombremision = $("#unaactividad" + consec_actividad + " td label.labelformu").html()

                    arraynombre_temporalidad.push(descripcion);
                    arrayfecha_temporalidad.push(fechat);
                    arraydias_temporalidad.push(diast);
                    arraynombrecentrotrabajo.push(nombreCentroTrabajo);
                    arraynombreempleado.push(nombreempleado);
                    arraynombremision.push(nombremision);

                })


            })

        })

    })

    for (var i = 0; i < arraynombremision.length; i++) {

        renglonresumen = '<tr> <td> <label>' + arraynombre_temporalidad[i] + '</label> </td > ' +
            '<td><label>' + arrayfecha_temporalidad[i] + '</label> </td>' +
            '<td><label>' + arraydias_temporalidad[i] + '</label> </td>' +
            '<td><label>' + arraynombrecentrotrabajo[i] + '</label></td>' +
            '<td><label>' + arraynombreempleado[i] + '</label></td>' +
            '<td><label>' + arraynombremision[i] + '</label></td> </tr>'

        $(".tableavisaryvrear tbody").append(renglonresumen)
    }*/
    //tableespecifi
    $(".my-custom-scrollbar").height($(window).height() - 320)





}

function validarTodo(currentTab, opcion) {
    console.log("opcion validar todo ", opcion)
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Validando configuración')

    setTimeout(function () {

        validarCamposbasicos(currentTab, opcion);
        $('#backd').loading('stop');

    }, 4000);

}



function guardarPlanTrabajo() {

    var objeto = {};

    var folio_proyecto = $("#select2proyecto").val()
    var descripcion = $("#inputdescplantrabajo").val()
    var fecha_ini = $(".fechainicioseleccionadoresumen").html()
    var fecha_fin = $(".fechafinseleccionadoresumen").html()

    objeto.folio_proyecto = folio_proyecto
    objeto.descripcion = descripcion
    objeto.fecha_ini = cambiarformatofechaDos(fecha_ini)
    objeto.fecha_fin = cambiarformatofechaDos(fecha_fin)

    var arrayconsec_temporalidad = new Array();
    var arrayclv_emp = new Array();
    var arrayfolio_centro_trabajo = new Array();
    var arrayconsec_empleado = new Array();
    var arrayconsec_centro_trabajo = new Array();
    var arrayconsec_actividad = new Array();
    var arrayclv_actividad = new Array();
    var arrayorigen = new Array();

    var listaEmpleados = [];
    var listaCentroTrabajo = [];
    var listaTemporalidad = [];
    var listaActividades = [];


    // lista empleados temporalidades vacias rojas-empleados actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        // console.log("#untemporizador", id);

        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {
            // console.log("agregar " + idtem)

            $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                idcentrotra = $(this).attr("id").substring(15);
                foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");

                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");

                        arrayconsec_actividad.push(consec_actividad);
                        arrayclv_actividad.push(clv_actividad);
                        arrayconsec_temporalidad.push(idtem);
                        arrayclv_emp.push(clvemp);
                        arrayfolio_centro_trabajo.push(foliotrabajo);
                        arrayconsec_centro_trabajo.push(idcentrotra);
                        arrayconsec_empleado.push(consec_empleado);

                    })


                })

            })

        }

    })

    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaActividades.push({
            "consec_actividad": arrayconsec_actividad[i],
            "clv_actividad": arrayclv_actividad[i],
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i]
        });
    }

    arrayconsec_actividad.length = 0;
    arrayclv_actividad.length = 0;
    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;

    // list empleados de los centros de consumo que no tienen empleados verde oscuro actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        // console.log("#untemporizador ale", id);


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);
            // console.log(".uncentrotrabajotemporizador ale", idcentrotra);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            // console.log("foliotrabajo ale", foliotrabajo);

            if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {
                // console.log("#untemporizador alejandro", id);
                // console.log(".uncentrotrabajotemporizador alejandro", idcentrotra);
                //  console.log("foliotrabajo alejandro", foliotrabajo);
                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);
                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");

                    $(".renglonactividades .unaactividad").each(function () {

                        consec_actividad = $(this).attr("id").substring(12);
                        clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");

                        arrayconsec_actividad.push(consec_actividad);
                        arrayclv_actividad.push(clv_actividad);
                        arrayconsec_temporalidad.push(idtem);
                        arrayclv_emp.push(clvemp);
                        arrayfolio_centro_trabajo.push(foliotrabajo);
                        arrayconsec_centro_trabajo.push(idcentrotra);
                        arrayconsec_empleado.push(consec_empleado);

                    })


                })
            }




        })

    })

    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaActividades.push({
            "consec_actividad": arrayconsec_actividad[i],
            "clv_actividad": arrayclv_actividad[i],
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i]
        });
    }

    arrayconsec_actividad.length = 0;
    arrayclv_actividad.length = 0;
    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;
    //lista empleados actividades
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        //console.log("#untemporizador", id);


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);
            //console.log(".uncentrotrabajotemporizador", idcentrotra);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            //console.log("foliotrabajo", foliotrabajo);

            $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                consec_empleado = $(this).attr("id").substring(34);
                clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")
                //  console.log("clvemp", clvemp);

                $(".renglonactividades .unaactividad").each(function () {

                    consec_actividad = $(this).attr("id").substring(12);
                    clv_actividad = $("#unaactividad" + consec_actividad + " td label.labelformu").attr("clv_actividad");

                    arrayconsec_actividad.push(consec_actividad);
                    arrayclv_actividad.push(clv_actividad)
                    arrayconsec_temporalidad.push(idtem);
                    arrayclv_emp.push(clvemp);
                    arrayfolio_centro_trabajo.push(foliotrabajo);
                    arrayconsec_centro_trabajo.push(idcentrotra);
                    arrayconsec_empleado.push(consec_empleado);

                })


            })

        })

    })

    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaActividades.push({
            "consec_actividad": arrayconsec_actividad[i],
            "clv_actividad": arrayclv_actividad[i],
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i]
        });
    }

    objeto.listaActividades = listaActividades;

    arrayconsec_actividad.length = 0;
    arrayclv_actividad.length = 0;
    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;
    // lista empleados temporalidades vacias rojas-empleados AA
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        // console.log("#untemporizador", id);

        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {
            // console.log("agregar " + idtem)

            $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                idcentrotra = $(this).attr("id").substring(15);
                foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");

                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");

                    arrayconsec_temporalidad.push(idtem);
                    arrayclv_emp.push(clvemp);
                    arrayfolio_centro_trabajo.push(foliotrabajo);
                    arrayconsec_centro_trabajo.push(idcentrotra);
                    arrayconsec_empleado.push(consec_empleado);
                    arrayorigen.push("AA");
                })

            })

        }

    })



    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaEmpleados.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i],
            "origen": arrayorigen[i]
        });
    }




    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;

    // list empleados BB
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        // console.log("#untemporizador", id);


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);
            // console.log(".uncentrotrabajotemporizador", idcentrotra);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            // console.log("foliotrabajo", foliotrabajo);

            $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                consec_empleado = $(this).attr("id").substring(34);
                clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")
                // console.log("clvemp", clvemp);

                arrayconsec_temporalidad.push(idtem);
                arrayclv_emp.push(clvemp);
                arrayfolio_centro_trabajo.push(foliotrabajo);
                arrayconsec_centro_trabajo.push(idcentrotra);
                arrayconsec_empleado.push(consec_empleado);
                arrayorigen.push("BB");
            })

        })

    })

    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaEmpleados.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i],
            "origen": arrayorigen[i]
        });
    }



    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;

    // list empleados de los centros de consumo que no tienen empleados verde oscuro CC
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        //console.log("#untemporizador ale", id);


        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);
            // console.log(".uncentrotrabajotemporizador ale", idcentrotra);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            // console.log("foliotrabajo ale", foliotrabajo);

            if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {
                // console.log("#untemporizador alejandro", id);
                //  console.log(".uncentrotrabajotemporizador alejandro", idcentrotra);
                // console.log("foliotrabajo alejandro", foliotrabajo);
                $(".renglonempleado .unempleado").each(function () {

                    consec_empleado = $(this).attr("id").substring(10);

                    clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");

                    arrayconsec_temporalidad.push(idtem);
                    arrayclv_emp.push(clvemp);
                    arrayfolio_centro_trabajo.push(foliotrabajo);
                    arrayconsec_centro_trabajo.push(idcentrotra);
                    arrayconsec_empleado.push(consec_empleado);
                    arrayorigen.push("CC");
                })
            }




        })

    })

    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaEmpleados.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "clv_emp": arrayclv_emp[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "consec_empleado": arrayconsec_empleado[i],
            "origen": arrayorigen[i]
        });
    }



    objeto.listaEmpleados = listaEmpleados;


    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;



    // lista de centros de trabajo de las temporalidades vacias  azul DD
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        //console.log("#untemporizador", id);

        if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {
            // console.log("agregar " + idtem)

            $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                idcentrotra = $(this).attr("id").substring(15);
                foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");

                arrayconsec_temporalidad.push(idtem);
                arrayfolio_centro_trabajo.push(foliotrabajo);
                arrayconsec_centro_trabajo.push(idcentrotra);
                arrayorigen.push("DD");

            })

        }

    })



    for (var i = 0; i < arrayfolio_centro_trabajo.length; i++) {

        listaCentroTrabajo.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "origen": arrayorigen[i]
        });
    }

    arrayconsec_temporalidad.length = 0;
    arrayclv_emp.length = 0;
    arrayfolio_centro_trabajo.length = 0;
    arrayconsec_centro_trabajo.length = 0;
    arrayconsec_empleado.length = 0;
    arrayorigen.length = 0;

    // lista de empleados de los centros de trabajo que no tienen empleados. EE



    // list centros trabajo
    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        // console.log("#untemporizador", id);

        $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

            idcentrotra = $(this).attr("id").substring(27);
            // console.log(".uncentrotrabajotemporizador", idcentrotra);

            foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
            // console.log("foliotrabajo", foliotrabajo);

            arrayconsec_temporalidad.push(idtem);
            arrayfolio_centro_trabajo.push(foliotrabajo);
            arrayconsec_centro_trabajo.push(idcentrotra);
            arrayorigen.push("EE");
        })

    })


    for (var i = 0; i < arrayconsec_centro_trabajo.length; i++) {

        listaCentroTrabajo.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "folio_centro_trabajo": arrayfolio_centro_trabajo[i],
            "consec_centro_trabajo": arrayconsec_centro_trabajo[i],
            "origen": arrayorigen[i]
        });
    }



    objeto.listaCentroTrabajo = listaCentroTrabajo;


    arrayconsec_temporalidad.length = 0;
    var arrayfecha_inicial = new Array();
    var arrayfecha_final = new Array();
    var arraylun = new Array();
    var arraymar = new Array();
    var arraymie = new Array();
    var arrayjue = new Array();
    var arrayvie = new Array();
    var arraysab = new Array();
    var arraydom = new Array();
    var arraydescripcion = new Array();

    $("#carousel-example-generic .untemporizador ").each(function () {

        idtem = $(this).attr("id").substring(14);
        fecha = $("#tempInputDiaFinalInicial" + idtem).val()
        fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
        fecha_final = cambiarformatofecha(fecha.substring(20, 30));
        descripcion = $("#untemporizador" + idtem + " #tempInputDesc" + idtem).val()
        lun = 0
        mar = 0
        mie = 0
        jue = 0
        vie = 0
        sab = 0
        dom = 0
        bandera = 1

        $("#carousel-example-generic #untemporizador" + idtem + " .checkbox-inline input").each(function () {
            $(this).val()
            if ($(this).prop('checked')) {
                if (bandera == 1) {
                    lun = 1
                } else if (bandera == 2) {
                    mar = 1
                } else if (bandera == 3) {
                    mie = 1
                } else if (bandera == 4) {
                    jue = 1
                } else if (bandera == 5) {
                    vie = 1
                } else if (bandera == 6) {
                    sab = 1
                } else if (bandera == 7) {
                    dom = 1
                }
            }
            bandera++
        })


        arrayconsec_temporalidad.push(idtem);
        arrayfecha_inicial.push(fecha_inicial);
        arrayfecha_final.push(fecha_final);
        arraylun.push(lun);
        arraymar.push(mar);
        arraymie.push(mie);
        arrayjue.push(jue);
        arrayvie.push(vie);
        arraysab.push(sab);
        arraydom.push(dom);
        arraydescripcion.push(descripcion);

    })





    for (var i = 0; i < arraydescripcion.length; i++) {

        listaTemporalidad.push({
            "consec_temporalidad": arrayconsec_temporalidad[i],
            "fecha_inicial": arrayfecha_inicial[i],
            "fecha_final": arrayfecha_final[i],
            "lun": arraylun[i],
            "mar": arraymar[i],
            "mie": arraymie[i],
            "jue": arrayjue[i],
            "vie": arrayvie[i],
            "sab": arraysab[i],
            "dom": arraydom[i],
            "descripcion": arraydescripcion[i]
        });
    }

    objeto.listaTemporalidad = listaTemporalidad;

    var myJSON = JSON.stringify(objeto);
    // console.log("myJSON ", myJSON)
    $.ajax({
        type: "POST",
        url: "/Home/GuardarPlanTrabajo", //si
        data: objeto,
        success: function (Plan) {
            // console.log("Plan", Plan)

            swal({

                type: "success",
                title: "¡El plan de trabajo se guardo correctamente con el folio " + Plan.folio_trabajo,
                showConfirmButton: true,
                confirmButtonText: "Cerrar"

            }).then(function (result) {

                if (result.value) {

                    window.location = "MisPlanes";

                }

            });

            setTimeout(function () { window.location = "MisPlanes"; }, 5000);

            /*var confirma = Plan.guardado

            if (confirma == 1) {
                alert("se guardo correctamente")
            }*/
        }

    })

}


function cambiarformatofechaDos(fech) {
    //16/01/2020
    //2020-01-16
    ano = fech.substring(6);
    mes = fech.substring(3, 5)
    dia = fech.substring(0, 2)
    newf = ano + "-" + mes + "-" + dia
    return newf
}

function mostrarmensajeregres() {
    Swal.fire({
        title: 'Se encontraron errores de captura, fue dirigido a la sección correspondiente',
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    })

}

function mostrarmensajeregrescamp() {
    Swal.fire({
        title: 'Para continuar debe seleccionar una campaña y una marca',
        showClass: {
            popup: 'animated fadeInDown faster'
        },
        hideClass: {
            popup: 'animated fadeOutUp faster'
        }
    })

}

function validaractividadesManual(currentTab, opcion) {

    //ver si hay centro de trabajo manual
    var cantidad = $(".tableactividades .unaactividad").length
    // console.log("cantidad de centro de trabajo", cantidad);

    if (cantidad == 0) {
        //recorrer temporalidades

        if (bander == 1) {
            mostrarmensajeregres()
            $(".alertalateral").html("Debes seleccionar al menos una misión")
            $(".alertalateral").show('slow');
            link(4)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 3000);
            return
        }

    } else {
        // showTab(currentTab)
        //desglosarresumen(currentTab, opcion)
        validarStaff(currentTab, opcion)
    }
}

function validarStaff(currentTab, opcion) {
    var validado = 0;
    for (i = 0; i < listaRequisitosCampania.length; i++) {
        puesto = listaRequisitosCampania[i].clv_puesto
        console.log("puesto ", puesto)
        cantidad = listaRequisitosCampania[i].cantidad
        console.log("cantidad ", cantidad)
        contadorpuesto = 0
        malo1 = 0
        malo2 = 0
        malo3 = 0
        $("#carousel-example-generic .untemporizador ").each(function () {

            idtem = $(this).attr("id").substring(14);
            if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {

                //
                $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                    idcentrotra = $(this).attr("id").substring(27);

                    foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                    nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                    $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                        consec_empleado = $(this).attr("id").substring(34);
                        clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")

                        clvpue = $(this).children("td").children("label.labelformu").attr("clvpue")
                        console.log("clvpue1 ", clvpue)
                        console.log("puesto1 ", puesto)
                        if (clvpue == puesto) {
                            contadorpuesto++
                        }


                    })

                })

            }

            console.log("comparar " + cantidad + " y " + contadorpuesto)
            if (cantidad != contadorpuesto) {
                console.log("malo")
                malo1 = 1
            }



            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



                idcentrotra = $(this).attr("id").substring(27);
                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


                if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                    $(".renglonempleado .unempleado").each(function () {

                        consec_empleado = $(this).attr("id").substring(10);

                        clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                        clvpue = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvpue");
                        console.log("clvpue2 ", clvpue)
                        console.log("puesto2 ", puesto)
                        if (clvpue == puesto) {
                            contadorpuesto++
                        }


                    })
                }




            })
            console.log("comparar " + cantidad + " y " + contadorpuesto)
            if (cantidad != contadorpuesto) {
                console.log("malo")
                malo2 = 1
            }

            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                idcentrotra = $(this).attr("id").substring(27);

                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                    consec_empleado = $(this).attr("id").substring(34);
                    clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")

                    clvpue = $(this).children("td").children("label.labelformu").attr("clvpue")
                    console.log("clvpue3 ", clvpue)
                    console.log("puesto3 ", puesto)
                    if (clvpue == puesto) {
                        contadorpuesto++
                    }


                })

            })
            console.log("comparar " + cantidad + " y " + contadorpuesto)
            if (cantidad != contadorpuesto) {
                console.log("malo")
                malo3 = 1
            }


        })



    }

    console.log("malo 1, malo2, malo3 ", malo1 + " " + malo2 + " " + malo3)
    /* $("#carousel-example-generic .untemporizador ").each(function () {
        
 
         idtem = $(this).attr("id").substring(14);
         if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {
 
             //
             $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {
 
                 idcentrotra = $(this).attr("id").substring(15);
                 foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                 nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();
 
                 $(".renglonempleado .unempleado").each(function () {
 
                     consec_empleado = $(this).attr("id").substring(10);
 
                     clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                     clvpue = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvpue");
 
                     if (clvpue == puesto) {
                         contadorpuesto++
                     }
 
 
                 })
 
             })
 
         }
 
 
         if (cantidad != contadorpuesto) {
             console.log("malo")
         }
 
   
 
         $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {
 
 
 
             idcentrotra = $(this).attr("id").substring(27);
             foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
             nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()
 
 
             if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {
 
                 $(".renglonempleado .unempleado").each(function () {
 
                     consec_empleado = $(this).attr("id").substring(10);
 
                     clvemp = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                     clvpue = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvpue");
 
                     if (clvpue == puesto) {
                         contadorpuesto++
                     }
 
 
                 })
             }
 
 
 
 
         })
        
         if (cantidad != contadorpuesto) {
             console.log("malo")
         }
 
         $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {
 
             idcentrotra = $(this).attr("id").substring(27);
 
             foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
 
             nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()
 
             $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {
 
                 consec_empleado = $(this).attr("id").substring(34);
                 clvemp = $(this).children("td").children("label.labelformu").attr("clvemp")
 
                 clvpue = $(this).children("td").children("label.labelformu").attr("clvpue")
                 if (clvpue == puesto) {
                     contadorpuesto++
                 }
 
 
             })
 
         })
         if (cantidad != contadorpuesto) {
             console.log("malo")
         }
 
     })*/




    desglosarresumen(currentTab, opcion)
}


function validarEmpleadoManual(currentTab, opcion) {

    //ver si hay centro de trabajo manual
    var cantidad = 0


    //recorrer temporalidades
    bander = 0;
    cant = 0;
    $("#carousel-example-generic .untemporizador ").each(function () {

        id = $(this).attr("id").substring(14);
        //console.log("#untemporizador", id);

        cantidad = $("#carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo").length
        //console.log("cantidadDDD", cantidad);

        if (cantidad != 0) {
            $("#carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                idd = $(this).attr("id").substring(27);
                //console.log("#uncentrotrabajotemporizador", id);

                //console.log("#carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo #uncentrotrabajotemporizador" + idd + " .unempleadocentrotrabajotemporizado")
                if ($("#carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo #uncentrotrabajotemporizador" + idd + " .unempleadocentrotrabajotemporizado").length == 0) {
                    bander = 1
                }



            })
        } else {
            bander = 1
        }



    })
    //console.log("bander", bander);
    if (bander == 1) { //hay centro de trabajo sin empleado


        var cant = $(".renglonCentroTrabajo").length
        // console.log("cant", cant);

        var cantinf = $(".renglonempleado .unempleado").length
        // console.log("cantinf", cantinf);

        if (cant > 0 && cantinf == 0) {
            mostrarmensajeregres()
            $(".alertalateral").html("Debes seleccionar al menos un empleado, ya que tienes temporalidades con centros de trabajo sin empleados")
            $(".alertalateral").show('slow');
            link(3)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 6000);
            return
        } else if (cant == 0 && cantinf == 0) {
            mostrarmensajeregres()
            $(".alertalateral").html("Debes seleccionar al menos un empleado, ya que tienes temporalidades con centros de trabajo sin empleados")
            $(".alertalateral").show('slow');
            link(3)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 6000);
            return
        }


    }


    validaractividadesManual(currentTab, opcion)

    //showTab(currentTab)
}
function validarCentroTrabajoManual(currentTab, opcion) {

    //ver si hay centro de trabajo manual
    var cantidad = $(".renglonCentroTrabajo .uncentrotrabajo").length
    //console.log("cantidad de centro de trabajo", cantidad);

    if (cantidad == 0) {
        //recorrer temporalidades
        bander = 0
        $("#carousel-example-generic .untemporizador ").each(function () {

            id = $(this).attr("id").substring(14);
            // console.log("#untemporizador", id);

            // console.log("mari #carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador")
            if ($("#carousel-example-generic #untemporizador" + id + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {
                // console.log("jojo")
                bander = 1
            }

        })

        if (bander == 1) {
            mostrarmensajeregres()
            $(".alertalateral").html("Debes seleccionar al menos un centro de trabajo, ya que tienes temporalidades sin centros de trabajo")
            $(".alertalateral").show('slow');
            link(2)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 3000);
            return
        }

    }


    validarEmpleadoManual(currentTab, opcion)
    //showTab(currentTab)
}

function validarTemporalidad(currentTab, opcion) {

    //validar basicos
    //$("#inputdescplantrabajo").effect( "Pulsate", {times:4}, 500 );
    if ($("#carousel-example-generic").length == 0) {
        mostrarmensajeregres()
        $(".alertalateral").html("Debes seleccionar al menos una temporalidad")
        $(".alertalateral").show('slow');
        link(1)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        // $("#agregarTemp").effect("shake");
        return
    } else {
        //validar todas las descripciones de las temporalidades
        var valor;
        bandenombretempo = 0
        $(".tempInputDescc").each(function () {
            valor = $(this).val()
            valors = $(this).val().trim();

            if (valor == "" || valors == "") {
                bandenombretempo = 1

            }
        })

        if (bandenombretempo == 1) {
            mostrarmensajeregres()
            $(".alertalateral").html("Escribe el nombre a la temporalidad")
            $(".alertalateral").show('slow');
            link(1)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 3000);
            return
        }

        //validar los dias de todas las configuraciones
        bandere = 0

        $("#carousel-example-generic .untemporizador ").each(function () {

            id = $(this).attr("id").substring(14);
            // console.log("#untemporizador", id);
            bander = 0
            $("#carousel-example-generic #untemporizador" + id + " .checkbox-inline input").each(function () {
                $(this).val()
                if ($(this).prop('checked')) {
                    console.log("si y sale")
                    bander = 1
                    return
                }
            })
            // console.log("bander", bander);
            if (bander == 0) {
                bandere = 1
                return
            }
            // console.log("bandere", bandere);
        })

        if (bandere == 1) {
            $(".alertalateral").html("Seleccione al menos un día de las temporalidades")
            $(".alertalateral").show('slow');
            link(1)
            setTimeout(function () {
                $(".alertalateral").html("")
                $(".alertalateral").hide('fast');
            }, 3000);
            return
        }

    }

    //extraer fecha incial y fecha final
    var fechaminima = moment("2050-01-01");

    var fechamaxima = moment("1900-01-01");

    $("#carousel-example-generic .untemporizador ").each(function () {

        id = $(this).attr("id").substring(14);

        fecha = $("#tempInputDiaFinalInicial" + id).val()
        // console.log("fecha", fecha);

        fechaInicio = cambiarformatofecha(fecha.substring(0, 10));
        // console.log("fechaInicio", fechaInicio);
        fechaFin = cambiarformatofecha(fecha.substring(20, 30));
        //  console.log("fechaFin", fechaFin);
        fechaInicio = moment(fechaInicio)
        fechaFin = moment(fechaFin)
        if (fechaInicio < fechaminima) {
            fechaminima = fechaInicio
        }
        if (fechaFin > fechamaxima) {
            fechamaxima = fechaFin
        }

        //var dateB = moment(fechaInicio);
        //var dateC = moment(fechaFin);


    })
    //console.log("fechaminima", fechaminima);
    //console.log("fechamaxima", fechamaxima);
    $(".fechainicioseleccionadoresumen").html(fechaminima.format('DD/MM/YYYY'))
    $(".fechafinseleccionadoresumen").html(fechamaxima.format('DD/MM/YYYY'))

    validarCentroTrabajoManual(currentTab, opcion)
    //showTab(currentTab)
}

function cambiarformatofecha(fech) {
    //15/01/2020
    //fech=fecha.replace(/\//g, "-")
    //15-01-2020/
    ano = fech.substring(6);
    mes = fech.substring(3, 5)
    dia = fech.substring(0, 2)
    newf = ano + "-" + mes + "-" + dia
    return newf
}

function validarTabUno(currentTab, opcion) {

    if (opcion == "showtab") {
        showTab(currentTab)
    } else if (opcion == "link") {
        link(currentTab)
    }
    //console.log("validar tab uno")
    var marca = $("#select2marca").val()
    //console.log("marca", marca);
    var marcas = $("#select2marca").val().trim();
    if (marca == "" || marcas == "") {
        mostrarmensajeregrescamp()
        $(".mensajevalidacionmarca").html("Selecciona una marca")
        $(".alertalateral").html("Selecciona una marca")
        $(".alertalateral").show('slow');

        link(0)

        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        //$("#select2marca").effect("shake");
        return
    }
    var campania = $("#select2proyecto").val()
    //console.log("campania", campania);
    var campanias = $("#select2proyecto").val().trim();
    if (campania == "" || campanias == "") {
        mostrarmensajeregres()
        $(".mensajevalidaciocampania").html("Selecciona una campaña")
        $(".alertalateral").html("Selecciona una campaña")
        $(".alertalateral").show('slow');
        link(0)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        return
    }
    /*var nombreplan = $("#inputdescplantrabajo").val()
    var nombreplansines = $("#inputdescplantrabajo").val().trim();

    if (nombreplansines == "" || nombreplan == "") {
        mostrarmensajeregres()
        $(".mensajevalidacionnombreplan").html("Escribe el nombre del proyecto")
        $(".alertalateral").html("Escribe el nombre del proyecto")
        $(".alertalateral").show('slow');
        link(0)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        return
    }*/
    //validarTemporalidad(currentTab, opcion)


}

function validarCamposbasicos(currentTab, opcion) {

    var marca = $("#select2marca").val()
    // console.log("marca", marca);
    var marcas = $("#select2marca").val().trim();
    if (marca == "" || marcas == "") {
        mostrarmensajeregres()
        $(".mensajevalidacionmarca").html("Selecciona una marca")
        $(".alertalateral").html("Selecciona una marca")
        $(".alertalateral").show('slow');
        link(0)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        //$("#select2marca").effect("shake");
        return
    }
    var campania = $("#select2proyecto").val()
    //console.log("campania", campania);
    var campanias = $("#select2proyecto").val().trim();
    if (campania == "" || campanias == "") {
        mostrarmensajeregres()
        $(".mensajevalidaciocampania").html("Selecciona una campaña")
        $(".alertalateral").html("Selecciona una campaña")
        $(".alertalateral").show('slow');
        link(0)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        return
    }
    var nombreplan = $("#inputdescplantrabajo").val()
    var nombreplansines = $("#inputdescplantrabajo").val().trim();

    if (nombreplansines == "" || nombreplan == "") {
        mostrarmensajeregres()
        $(".mensajevalidacionnombreplan").html("Escribe el nombre del proyecto")
        $(".alertalateral").html("Escribe el nombre del proyecto")
        $(".alertalateral").show('slow');
        link(0)
        setTimeout(function () {
            $(".alertalateral").html("")
            $(".alertalateral").hide('fast');
        }, 3000);
        return
    }
    validarTemporalidad(currentTab, opcion)
    //showTab(currentTab)
}

function regree(n) {
    var x = document.getElementsByClassName("tab");//--> x(6)
    x[currentTab].style.display = "none";//vista bloquedo
    currentTab = parseInt(currentTab) + parseInt(n);// vista desbloquedo = vista bloqueado + 1  ***/

    //console.log("currentTab", currentTab);



    if (currentTab >= x.length) {// si esta al final de la vista enviardatos porfas

        document.getElementById("regForm").submit();
        return false;
    }

    showTab(currentTab);// vista desbloqueado = vista bloqueado + 1    
    var ope = currentTab * 20
    $("#baraprogresoconfigurar .progress-bar").css("width", ope + "%")
    $("#baraprogresoconfigurar .progress-bar").html(" " + ope + "% " + " Completado")
    ajustarAlturaTab()



}

$(".step").on("click", function () {

    var pagina = $(this).attr("id")
    var esactivo = $(this).attr("class")

    if (esactivo != 'step active') {

        if (pagina == 1) {
            link(0)
            $(".tableavisaryvrear tbody").html("")
        } else if (pagina == 2) {
            //link(1)
            validarTabUno(1, "link")
            $(".tableavisaryvrear tbody").html("")
        } else if (pagina == 3) {
            //link(2)
            validarTabUno(2, "link")
            $(".tableavisaryvrear tbody").html("")
        } else if (pagina == 4) {
            //link(3)
            validarTabUno(3, "link")
            $(".tableavisaryvrear tbody").html("")
        } else if (pagina == 5) {
            //link(4)
            validarTabUno(4, "link")
            $(".tableavisaryvrear tbody").html("")
        } else if (pagina == 6) {
            link(5)
            validarTodo(5, "link")
            // link(5)
        }

    }

})

function ajustarAlturaTab() {

    var altura = $(window).height();
    $(".fefe").css("min-height", altura - 100);
}

function fixStepIndicator(n) {

    var x = document.getElementsByClassName("step");

    for (var i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }

    x[n].className += " active";

}

/*----- comienza script plantilla--------*/

function validarFormulario() {
    return true;
}



$(".guardarConfiguracion").on("click", function () {
    //console.log(ok());
    var item;

    $(".tab").each(function () {

        if ($(this).is(":visible")) {
            item = $(this).attr("nombreTab");
        }
    })



    switch (item) {

        case "Plazas":

            break;

        case "Marca":

            break;

        case "Ocs":

            break;

        case "Clasificacion":

            break;

        case "centroConsumo":

            break;

        case "Colores":


            break;
    }
})

/************** validaciones ***********************/





$("#agregarTemp").on('click', function () {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Agregando elemento')

    if ($("#carousel-example-generic").length > 0) {
        banderaTemp++
        //console.log("banderaTemp", banderaTemp);
        var temMa = '<div class="item untemporizador" id="untemporizador' + banderaTemp + '">' +
            '<button class="btn btn-danger eliminarTem btn-sm" id="eliminarTem' + banderaTemp + '" >Eliminar Temporalidad </button> ' +
            '<div class="container-fluid contenedorprincipla">' +
            '<div class="row">' +
            '<div class="col-md-5">' +
            '<div class="form-group">' +
            '<label for="tempInputDesc1">Nombre:</label>' +
            '<input type="text" class="form-control tempInputDescc" id="tempInputDesc' + banderaTemp + '">' +
            '</div>              ' +
            '</div>' +
            '<div class="col-md-7">' +
            '<div class="form-group">' +
            '<label>Día inicial y final:</label>' +
            '<div class="input-group">' +
            '<div class="input-group-addon">' +
            '<i class="fa fa-clock-o"></i>' +
            '</div>' +
            '<input type="text" class="form-control pull-right reservationtime" id="tempInputDiaFinalInicial' + banderaTemp + '">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12">' +
            '<label>Días :&nbsp; </label>' +
            '<label class="checkbox-inline chklunes' + banderaTemp + ' "><input type="checkbox" value="1">Lunes</label>' +
            '<label class="checkbox-inline chkmartes' + banderaTemp + '"><input type="checkbox" value="1">Martes</label>' +
            '<label class="checkbox-inline chkmiercoles' + banderaTemp + '"><input type="checkbox" value="1">Miercoles</label>' +
            '<label class="checkbox-inline chkjueves' + banderaTemp + '"><input type="checkbox" value="1">Jueves</label>' +
            '<label class="checkbox-inline chkviernes' + banderaTemp + '"><input type="checkbox" value="1">Viernes</label>' +
            '<label class="checkbox-inline chksabado' + banderaTemp + '"><input type="checkbox" value="1">Sabado</label>' +
            '<label class="checkbox-inline chkdomingo' + banderaTemp + '"><input type="checkbox" value="1">Domingo</label>' +
            '</div>  ' +
            '<div class="col-md-4">' +
            '<button class="btn btn-outline-primary btn-sm agregarCentroTrabajoTem" id="agregarCentroTrabajoTem' + banderaTemp + '">Agregar Centro de trabajo</button>' +
            '</div>' +
            '<div class="col-md-5">' +
            '<button class="btn btn-outline-primary btn-sm agregarGrupoCentroTrabajoTem" id="agregarGrupoCentroTrabajoTem' + banderaTemp + '">Agregar Grupo de Centros de trabajo</button>' +
            '</div>' +
            '<div class="col-md-3"> ' +
            '<button class="btn btn-sm btn-success btn-excelcen" ><i class="fa fa-file-excel-o" ></i> Importar Centros</button>' +
            '</div>' +
            '</div>' +
            '</div>  ' +
            '</div>'
        var temadd = '<li data-target="#carousel-example-generic" data-slide-to="' + banderaTemp + '" class=""></li>'

        $("#carousel-example-generic .carousel-inner").append(temMa).hide().show('fast');
        $("ol.carousel-indicators").append(temadd).hide().show('fast');
        iniciarTim();
        $(".irfre").css("display", "block");
        $(".iratras").css("display", "block");

        $(".elcarouizq").css("border-right", "1px dotted  gray");
        $(".elcarouizq").css("border-top", "1px dotted  gray");
        $(".elcarouizq").css("border-bottom", "1px dotted  gray");


        $(".elcarouder").css("border-left", "1px dotted  gray");
        $(".elcarouder").css("border-top", "1px dotted  gray");
        $(".elcarouder").css("border-bottom", "1px dotted  gray");
        $('#carousel-example-generic').carousel({
            pause: true,
            interval: false
        });
        //iniciarIniciarCentroTrabajoTem()
    } else {
        var temMa = '<div id="carousel-example-generic" class="carousel slide" data-interval="false" data-ride="carousel">' +
            '<ol class="carousel-indicators">' +
            '<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>' +
            '</ol>                 ' +
            '<div class="carousel-inner"> ' +
            '<div class="item untemporizador active" id="untemporizador1">' +
            '<button class="btn btn-danger eliminarTem btn-sm" id="eliminarTem1" >Eliminar Temporalidad </button> ' +
            '<div class="container-fluid contenedorprincipla">' +
            '<div class="row">' +
            '<div class="col-md-5">' +
            '<div class="form-group">' +
            '<label for="tempInputDesc1">Nombre:</label>' +
            '<input type="text" class="form-control tempInputDescc" id="tempInputDesc1">' +
            '</div>              ' +
            '</div>' +
            '<div class="col-md-7">' +
            '<div class="form-group">' +
            '<label>Día inicial y final:</label>' +
            '<div class="input-group">' +
            '<div class="input-group-addon">' +
            '<i class="fa fa-clock-o"></i>' +
            '</div>' +
            '<input type="text" class="form-control pull-right reservationtime" id="tempInputDiaFinalInicial1">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="col-md-12">' +
            '<label>Días :</label>' +
            '<label class="checkbox-inline chklunes1 "><input type="checkbox" value="1">Lunes</label>' +
            '<label class="checkbox-inline chkmartes1"><input type="checkbox" value="1">Martes</label>' +
            '<label class="checkbox-inline chkmiercoles1"><input type="checkbox" value="1">Miercoles</label>' +
            '<label class="checkbox-inline chkjueves1"><input type="checkbox" value="1">Jueves</label>' +
            '<label class="checkbox-inline chkviernes1"><input type="checkbox" value="1">Viernes</label>' +
            '<label class="checkbox-inline chksabado1"><input type="checkbox" value="1">Sabado</label>' +
            '<label class="checkbox-inline chkdomingo1"><input type="checkbox" value="1">Domingo</label>' +
            '</div>  ' +
            '<div class="col-md-4">' +
            '<button class="btn btn-outline-primary btn-sm agregarCentroTrabajoTem" id="agregarCentroTrabajoTem1">Agregar Centro de trabajo</button>' +
            '</div>' +
            '<div class="col-md-5">' +
            '<button class="btn btn-outline-primary btn-sm agregarGrupoCentroTrabajoTem" id="agregarGrupoCentroTrabajoTem1">Agregar Grupo de Centros de trabajo</button>' +
            '</div>' +
            '<div class="col-md-3"> ' +
            '<button class="btn btn-sm btn-success btn-excelcen" ><i class="fa fa-file-excel-o" ></i> Importar Centros</button>' +
            '</div>' +
            '</div>' +
            '</div>  ' +
            '</div>' +
            '</div>  ' +
            '<a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">' +
            '<span class="fa fa-angle-left"></span>' +
            '</a>' +
            '<a class="right carousel-control" href="#carousel-example-generic" data-slide="next">' +
            '<span class="fa fa-angle-right"></span>' +
            '</a>' +
            '<button class="btn btn-info iratras btn-sm" > <i class="fa fa-angle-left"></i></button> ' +
            '<button class="btn btn-info irfre btn-sm" > <i class="fa fa-angle-right"></i></button>' +
            '</div>'
        $(".tabtemporalidades .box-body").append(temMa).hide().show('fast');
        iniciarTim();
        $(".elcarou").css("border", "1px dotted  gray");
        $('#carousel-example-generic').carousel({
            pause: true,
            interval: false
        });
        //iniciarIniciarCentroTrabajoTem()
    }


    $(".irfre ").on('click', function () {

        $("#carousel-example-generic .right").click();

    })


    $(".iratras ").on('click', function () {
        $("#carousel-example-generic .left").click();
    })


	/*$(".agregarCentroTrabajoTem").on('click',function(){

		$('#modalagregarcentrotrabajo').modal({
	        show: 'true',
	        backdrop: 'static',
	        keyboard: false
	    });		



	})*/



    $(".agregarCentroTrabajoTem").unbind();

    $(".agregarCentroTrabajoTem").on('click', function () {

        $('#modalagregarcentrotrabajo').modal({
            show: 'true',
            backdrop: 'static',
            keyboard: false
        });
        $(".tablacentrotrabajo tbody").empty()

        folioCentroT = ''
        nombreCentroT = ''
        //buscar el numero de temporizador
        padre = $(this).parent().parent().parent().parent().attr("id").substring(14);

        if ($("#untemporizador" + padre + " .rengloncentrotrabajotempo").length > 0) {


            var parentaccordion = $(this).parent().parent().parent().children(".rengloncentrotrabajotempo").children(".frfr").children(".panel-group").attr("id").substring(9)
            //console.log("parentaccordion", parentaccordion);


            //banderaCentroTrabajoTemp++

        } else {

            var parentaccordion = banderaTemp
            //console.log("parentaccordion", parentaccordion);
        }

        $("#select2centrotrabajo").unbind();

        $('#select2centrotrabajo').on('select2:select', function (e) {

            var data = e.params.data;
            folioCentroT = data.id
            nombreCentroT = data.text

            var renglotabacentrotrabajo = '<tr>' +
                '<td><label class="labelformu centrotrabajomodal" foliocetrotrabajo="' + folioCentroT + '">' + nombreCentroT + '</label></td>' +
                '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajomodal"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                '</tr>'

            if (verificartablacentrotrabajo(data) == 0) {

                //console.log("a agregar");

                $(".tablacentrotrabajo tbody").append(renglotabacentrotrabajo)

            }
            $(".eliminarcentrotrabajomodal").unbind();
            $(".eliminarcentrotrabajomodal").on("click", function () {
                // console.log("eliminar jej")
                $(this).parent().parent().hide("slow", function () { $(this).remove(); })


            })

        });

        $("#agregarcentrosdetrabajomodal").unbind();

        $('#agregarcentrosdetrabajomodal').on('click', function () {

            $('#modalagregarcentrotrabajo').modal('hide');

            $(".tablacentrotrabajo tbody tr label").each(function () {


                folio = $(this).attr("foliocetrotrabajo")
                //console.log("folio ccaca", folio);
                nombreCentroT = $(this).html()
                //console.log("nombreCentroT", nombreCentroT);



                if ($("#untemporizador" + padre + " .rengloncentrotrabajotempo").length > 0) {


                    if (verificarexistecentrotrabajoTem(folio, padre, parentaccordion, banderaCentroTrabajoTemp) == 0) {

                        //console.log(" no es primera")
                        banderaCentroTrabajoTemp++

                        var centrotravajoTem = '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador' + banderaCentroTrabajoTemp + '">' +
                            '<div class="panel-heading">' +
                            '<h4 class="panel-title">' +
                            '<a data-toggle="collapse" data-parent="#accordion' + parentaccordion + '" href="#collapse' + banderaCentroTrabajoTemp + '" folioCentroTrabajo="' + folio + '">' +
                            '' + nombreCentroT + '</a>' +
                            '</h4>' +
                            '<button type="button" class="btn btn-sm btn-danger eliminarcentrotrabajoTemporalidad" id="eliminarcentrotrabajoTemporalidad' + banderaCentroTrabajoTemp + '" >' +
                            '<i class="fa fa-times"></i>' +
                            '</button>' +
                            '</div>' +
                            '<div id="collapse' + banderaCentroTrabajoTemp + '" class="panel-collapse collapse">' +
                            '<div class="panel-body container-fluid contenedorempleadocentrotrabajotem">' +
                            '<div class="row">' +
                            '<div class="col-md-4"> ' +
                            '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Empleado</button>' +
                            '</div>' +
                            '<div class="col-md-4"> ' +
                            '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Grupo de Empleados</button>' +
                            '</div>' +
                            '<div class="col-md-4"> ' +
                            '<button class="btn btn-sm btn-success btn-excelemp" ><i class="fa fa-file-excel-o" ></i> Importar Empleados</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div> '
                        // console.log("#untemporizador"+padre+" .rengloncentrotrabajotempo #accordion"+parentaccordion)
                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion).append(centrotravajoTem).hide().show('fast');

                    }

                } else {
                    banderaCentroTrabajoTemp++
                    //console.log("si es primera")
                    var centrotravajoTem = '<div class="row rengloncentrotrabajotempo" id="rengloncentrotrabajotempo1">' +
                        '<h5 class="titulorent">Centros de trabajo</h5>' +
                        '<div class="col-md-12 frfr">' +
                        '<div class="panel-group" id="accordion' + banderaTemp + '">' +

                        '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador' + banderaCentroTrabajoTemp + '">' +
                        '<div class="panel-heading">' +
                        '<h6 class="panel-title">' +
                        '<a data-toggle="collapse" data-parent="#accordion' + banderaTemp + '" href="#collapse1" folioCentroTrabajo="' + folio + '">' +
                        '' + nombreCentroT + '</a>' +
                        '</h6>' +
                        '<button type="button" class="btn btn-sm btn-danger eliminarcentrotrabajoTemporalidad" id="eliminarcentrotrabajoTemporalidad1" >' +
                        '<i class="fa fa-times"></i>' +
                        '</button>' +
                        '</div>' +
                        '<div id="collapse1" class="panel-collapse ">' +
                        '<div class="panel-body container-fluid contenedorempleadocentrotrabajotem">' +
                        '<div class="row">' +
                        '<div class="col-md-4"> ' +
                        '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem1">Agregar Empleado</button>' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem1">Agregar Grupo de Empleados</button>' +
                        '</div>' +
                        '<div class="col-md-4"> ' +
                        '<button class="btn btn-sm btn-success btn-excelemp" ><i class="fa fa-file-excel-o" ></i> Importar Empleados</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div> '
                    $("#untemporizador" + padre + " .contenedorprincipla").append(centrotravajoTem).hide().show('fast');
                }






            })



            $(".eliminarcentrotrabajoTemporalidad").on('click', function (e) {
                e.stopPropagation();
                $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                /* var padreacco = $(this).parent().parent().parent().attr("id").substring(9)
                 var padretem = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14)
                 $("#untemporizador" + padretem + " #accordion" + padreacco + " #uncentrotrabajotemporizador" + ideliminarcentrotrabajotemp).hide("slow", function () { $(this).remove(); })
                 */
            })

            //////////////// uno inicio
            /*$(".agregarEmpleadoCentroTrabajoTem").unbind();
            $(".agregarEmpleadoCentroTrabajoTem").on('click', function () {

                $('#modalagregarempleado').modal({
                    show: 'true',
                    backdrop: 'static',
                    keyboard: false
                });
                $(".tablaempleado tbody").empty()

                clvemp = ''
                nombreempleado = ''
                //buscar el numero de temporizador
                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                    banderaEmpleadoCentroTrabajoTemp++


                } else {

                    var parentaccordion = banderaTemp

                }


                $("#select2empleado").unbind();

                $('#select2empleado').on('select2:select', function (e) {

                    var data = e.params.data;
                    clvemp = data.id
                    nombreempleado = data.text

                    var renglonempleado = '<tr>' +
                        '<td><label class="labelformu empleadomodal" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminarempleadomodal" id="eliminarempleado"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'


                    if (verificartablaempleado(data) == 0) {

                        //console.log("a agregar");

                        $(".tablaempleado tbody").append(renglonempleado)

                    }

                    $(".eliminarempleadomodal").unbind();
                    $(".eliminarempleadomodal").on("click", function () {
                        console.log("eliminar jej")
                        $(this).parent().parent().hide("slow", function () { $(this).remove(); })


                    })

                });


                $("#agregarempleadomodal").unbind();

                $('#agregarempleadomodal').on('click', function () {

                    $('#modalagregarempleado').modal('hide');

                    $(".tablaempleado tbody tr label").each(function () {

                        clvemp = $(this).attr("clvemp")
                        console.log("clvemp1", clvemp);
                        //console.log("folio ccaca", folio);
                        nombreempleado = $(this).html()
                        //console.log("nombreempleado1", nombreempleado);
                        //console.log("nombreempleado", nombreempleado);

                        if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {

                            if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse) == 0) {

                                console.log(" no es primera")
                                banderaEmpleadoCentroTrabajoTemp++

                                var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                    '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                    '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                    '</tr>'

                                $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');

                            }

                        } else {
                            banderaEmpleadoCentroTrabajoTemp++
                            console.log("si es primera")
                            var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                '<h5 class="titulorent">Empleados</h5> ' +
                                '<div class="col-md-10 frfr">' +
                                '<table class="table table-condensed tableespeci">' +
                                '<tbody>' +
                                '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '</div>'


                            $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');
                        }


                    })




                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                        e.stopPropagation();
                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                        //console.log(" borrar   centro trabajo"+ideliminarempleadocentrotrabajotemp);
                        //console.log("#uncentrotrabajotemporizador"+ideliminarempleadocentrotrabajotemp)
                        //console.log("#eliminarempleadocentrotrabajoTem"+ideliminarempleadocentrotrabajotemp)
                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })

                    })


                });

                function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse) {
                    //console.log("folio", folio);

                    var bande = 0;
                    console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                        //classcaro=$(this).attr("class")
                        foliod = $(this).attr("clvemp")
                        //console.log("$(this)", $(this));
                        console.log("clvemp2", folio);
                        console.log("clvempd2", foliod);

                        if (bande == 0) {

                            if (folio == foliod) {

                                //console.log("repetido")
                                bande = 1
                            }

                        }


                    })

                    console.log("bande", bande);
                    return bande

                }

                function verificartablaempleado(data) {

                    var bande = 0;

                    $(".tablaempleado tbody tr label").each(function () {
                        //classcaro=$(this).attr("class")
                        folio = $(this).attr("clvemp")
                        //console.log("folio", folio);
                        //console.log("data.id", data.id);

                        if (bande == 0) {

                            if (folio == data.id) {

                                //console.log("repetido")
                                bande = 1
                            }

                        }


                    })


                    return bande
                }

            })*/
            //////////////// uno fin


            $(".agregarEmpleadoCentroTrabajoTem").unbind();
            $(".agregarEmpleadoCentroTrabajoTem").on('click', function () {

                $('#modalagregarempleado').modal({
                    show: 'true',
                    backdrop: 'static',
                    keyboard: false
                });
                var idcentrotra = $(this).attr("id").substring(31);
                //$(".tablaempleado tbody").empty()
                //tablaMisEmpleados.ajax.reload();

                clvemp = ''
                nombreempleado = ''
                //buscar el numero de temporizador
                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                    banderaEmpleadoCentroTrabajoTemp++


                } else {

                    var parentaccordion = banderaTemp

                }

                $('#generofiltro').empty();
                $('#calificacionfiltro').empty();
                $('#puestofiltro').empty();
                $('#municipiofiltro').empty();

                $('#generofiltro').append('<option value="">Todos</option> <option value = "1" > Masculino</option> <option value="3">Femenino</option>')
                // $('#calificacionfiltro').append('<option value="">Todos</option> <option value="1">1</option> <option value="2">2</option> <option value="3">3</option> <option value="4">4</option> <option value="5">5</option> <option value="6">6</option> <option value="7">7</option> <option value="8">8</option> <option value="9">9</option> <option value="10">10</option>')
                $('#puestofiltro').append('<option value="">Todos</option> <option value = "1" > Promotor</option> <option value="2">Supervisor</option>')

                var filtrogenero = $("#generofiltro").val();
                var filtrocalificacion = $("#calificacionfiltro").val();
                var filtropuesto = $("#puestofiltro").val();


                // llenar la tabla inicio
                var tablaMisEmpleados = $("#misempletable").DataTable({

                    "ajax": {

                        "url": "/Home/ObtenerEmpleadosdata", //si
                        "type": "POST",
                        "datatype": "json",
                        "data": {

                            "filtrogenero": function () { return $("#generofiltro").val() },
                            "filtrocalificacion": function () { return $("#calificacionfiltro").val() },
                            "filtropuesto": function () { return $("#puestofiltro").val() },
                            "folioproyecto": function () { return $("#select2proyecto").val() },
                            "filtroestado": function () { return $("#estadofiltro").val() },
                            "filtromunicipio": function () { return $("#municipiofiltro").val() }
                        }
                    },
                    "columns": [

                        { "data": "clv_emp" },
                        { "data": "nombre" },
                        { "data": "genero", 'searchable': false },
                        { "data": "calificacionnumero", 'searchable': false },
                        { "data": "puesto", 'searchable': false },
                        { "data": "estado", 'searchable': false },
                        { "data": "municipio", 'searchable': false },
                        { "data": { clv_emp: "clv_emp", nombre: "nombre", puesto: "puesto", clv_puesto: "clv_puesto", cumplerequisitos: "cumplerequisitos", mensajeValidacion: "mensajeValidacion", calificacion_empleado: "calificacion_empleado" } }

                    ],
                    "columnDefs": [

                        {

                            'searchable': true,
                            'orderable': true,

                            "render": function (data, type, row) {
                                $(function () {
                                    $('[data-toggle="popover"]').popover()
                                })
                                if (data.cumplerequisitos == 1) {
                                    return "<label class='checkbox-inline '  ><input class='chkemple' type='checkbox' value='1' nombreempleado='" + data.nombre + "' clvemp='" + data.clv_emp + "' puestoemp='" + data.puesto + "' clvpuesto='" + data.clv_puesto + "' calificacion_empleado='" + data.calificacion_empleado + "'></label>";
                                } else if (data.cumplerequisitos == 0) {

                                    return '<small class="mensajenovalidado">No cumple con requisitos</small> <br> <button type="button" class="btn btn-block  btn-sm btndetallenocumple" data-toggle="popover"  title="Detalle de validación" ' +
                                        'data-placement="left" data-content="' + data.mensajeValidacion + '" > Ver detalles </button >'
                                    // return '<small class="mensajenovalidado">' + data.mensajeValidacion + '</small>'
                                }

                            },
                            "targets": 7
                        }

                    ],
                    "language": {

                        "sProcessing": "Procesando...",
                        "sLengthMenu": "Mostrar _MENU_ registros",
                        "sZeroRecords": "No se encontraron resultados",
                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                        "sInfoPostFix": "",
                        "sSearch": "Buscar Nombre o No de empleado",
                        "sUrl": "",
                        "sInfoThousands": ",",
                        "sLoadingRecords": "Cargando...",
                        "oPaginate": {
                            "sFirst": "Primero",
                            "sLast": "Último",
                            "sNext": "Siguiente",
                            "sPrevious": "Anterior"
                        },
                        "oAria": {
                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                        }

                    },
                    "autoWidth": true,
                    "sScrollY": ($(window).height() - 400),
                    scrollX: true,
                    scrollCollapse: true,
                    dom: 'Bfrti',
                    //"lengthMenu": [[10, 25, 50], [10, 25, 50]],
                    "lengthMenu": [[-1], ["TODOS"]],
                    "fnInitComplete": function (oSettings, json) {
                        console.log("stop stopppppp");

                        $('#backd').loading('stop');
                        $(function () {
                            $('[data-toggle="popover"]').popover()
                        })

                    }

                });
                // llenar la tabla fin

                $("#misempletable_paginate .paginate_button ").on("click", function () {
                    $(function () {
                        $('[data-toggle="popover"]').popover()
                    })
                })



                $("#generofiltro").unbind();
                $("#generofiltro").on("change", function () {
                    tablaMisEmpleados.ajax.reload();

                })
                $("#calificacionfiltro").unbind();
                $("#calificacionfiltro").on("change", function () {
                    tablaMisEmpleados.ajax.reload();

                })
                $("#puestofiltro").unbind();
                $("#puestofiltro").on("change", function () {
                    tablaMisEmpleados.ajax.reload();

                })

                $("#estadofiltro").unbind();
                $("#estadofiltro").on("change", function () {
                    $('#municipiofiltro').empty();
                    $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")
                    tablaMisEmpleados.ajax.reload();

                    if ($(this).val() != "") {
                        $('#backd').loading('start');
                        $('div.loading-overlay-content').html('Espere un momento')
                        var datosssa = {
                            "clv_estado": $(this).val()
                        };



                        $.ajax({
                            type: "POST",
                            url: "/Home/ObtenerMunicipios", //si
                            data: datosssa,
                            success: function (Agrupador) {
                                //console.log("Agrupador", Agrupador.length)
                                $('#municipiofiltro').empty();

                                if (Agrupador.length > 0) {
                                    $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")

                                    for (i = 0; i < Agrupador.length; i++) {

                                        $('#municipiofiltro').append(" <option value=" + Agrupador[i].clv_municipio + " class='opcionDeSelect'>" + Agrupador[i].nombre + "</option>")



                                    }

                                }

                                $('#backd').loading('stop');
                            }

                        })
                    } else {
                        $('#municipiofiltro').empty();
                    }

                })

                $("#municipiofiltro").unbind();
                $("#municipiofiltro").on("change", function () {
                    tablaMisEmpleados.ajax.reload();

                })

                $("#cerrarmodaltablaempleadote").unbind();
                $("#cerrarmodaltablaempleadote").on("click", function () {
                    $('#modalagregarempleado').modal('hide');
                    tablaMisEmpleados.destroy();
                    /*$('#modalagregarempleado').modal({
                        show: 'true',
                        backdrop: 'static',
                        keyboard: false
                    });*/
                })



                $("#agregarempleadomodal").unbind();

                $('#agregarempleadomodal').on('click', function () {

                    $('#modalagregarempleado').modal('hide');
                    tablaMisEmpleados.destroy();


                    $(".tablaempleado tbody tr label .chkemple").each(function () {

                        //$(this).val()
                        if ($(this).prop('checked')) {

                            clvemp = $(this).attr("clvemp")
                            console.log("se agregara en DOM con ", clvemp)
                            nombreempleado = $(this).attr("nombreempleado")
                            puestoemp = $(this).attr("puestoemp")
                            clvpuesto = $(this).attr("clvpuesto")
                            califi = $(this).attr("calificacion_empleado")
                            if (verificarcantidadrequisito(clvpuesto, parentaccordion, padrecollapse) == 1) {
                                fecha = $("#tempInputDiaFinalInicial" + padredeagregaremple).val()
                                fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                fecha_final = cambiarformatofecha(fecha.substring(20, 30));
                                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {

                                    //, fecha, fecha_inicial, fecha_final
                                    console.log(" antes de verificar ", clvemp)
                                    if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {

                                        //setTimeout(function () {


                                        console.log(" no es primeray llega con ", clvemp)
                                        banderaEmpleadoCentroTrabajoTemp++

                                        var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                            '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                            '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                            '</tr>'

                                        $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');


                                        //}, 3000);

                                    } else {
                                        Swal.fire({
                                            title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                            showClass: {
                                                popup: 'animated fadeInDown faster'
                                            },
                                            hideClass: {
                                                popup: 'animated fadeOutUp faster'
                                            }
                                        })
                                    }

                                } else {

                                    console.log("y llega con : ", clvemp)
                                    if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {
                                        banderaEmpleadoCentroTrabajoTemp++
                                        console.log("si es primera")
                                        var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                            '<h5 class="titulorent">Empleados</h5> ' +
                                            '<div class="col-md-10 frfr">' +
                                            '<table class="table table-condensed tableespeci">' +
                                            '<tbody>' +
                                            '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                            '<td><label class="labelformu" > ' + puestoemp + '</label></td>' +
                                            '<td class="colorcalificacion' + califi + '"><label class="labelformu" > </label></td>' +
                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                            '</tr>' +
                                            '</tbody>' +
                                            '</table>' +
                                            '</div>' +
                                            '</div>'


                                        $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');

                                    } else {
                                        Swal.fire({
                                            title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                            showClass: {
                                                popup: 'animated fadeInDown faster'
                                            },
                                            hideClass: {
                                                popup: 'animated fadeOutUp faster'
                                            }
                                        })
                                    }


                                }

                            } else {
                                Swal.fire({
                                    title: 'Has excedido el numero de empleados por centro de trabajo',
                                    showClass: {
                                        popup: 'animated fadeInDown faster'
                                    },
                                    hideClass: {
                                        popup: 'animated fadeOutUp faster'
                                    }
                                })
                            }







                        }





                    })




                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                        e.stopPropagation();
                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                        //console.log(" borrar   centro trabajo"+ideliminarempleadocentrotrabajotemp);
                        //console.log("#uncentrotrabajotemporizador"+ideliminarempleadocentrotrabajotemp)
                        //console.log("#eliminarempleadocentrotrabajoTem"+ideliminarempleadocentrotrabajotemp)
                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })

                    })


                });

                function verificarcantidadrequisito(folio, parentaccordion, padrecollapse) {
                    //console.log("ya estamos en la funcion")
                    //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                    vande = 0;
                    vende = 0;
                    //console.log("foliokk", folio)
                    for (i = 0; i < listaRequisitosCampania.length; i++) {
                        console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                        if (listaRequisitosCampania[i].clv_puesto == folio) {
                            vende = i
                        }
                        vande++
                    }
                    //console.log("bande ", vende)
                    limite = listaRequisitosCampania[vende].cantidad
                    //console.log("limite ", limite)

                    //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
                    contadorpuesto = 0;
                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {

                        //console.log("vida ", $(this).attr("clvpue"))
                        if ($(this).attr("clvpue") == folio) {
                            contadorpuesto++
                        }
                    })

                    if (contadorpuesto < limite) {
                        return 1;
                    } else {
                        return 0;
                    }



                }

                function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) {
                    console.log("clv emp a agregar", folio);

                    var bande = 0;
                    //console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                        //classcaro=$(this).attr("class")
                        foliod = $(this).attr("clvemp")
                        //console.log("$(this)", $(this));
                        //console.log("clvemp2", folio);
                        //console.log("clvempd2", foliod);

                        if (bande == 0) {

                            if (folio == foliod) {

                                //console.log("repetido")
                                bande = 1
                            }

                        }


                    })



                    if (bande == 0) {
                        // validar que clv_emp no exista en otro centro del temporidor

                        var listaTodosEmpleados = [];

                        ///////////////////////////////// alejandro


                        var arrayclvempleado = new Array();
                        var arrayidtem = new Array();
                        var arrayfechainicial = new Array();
                        var arrayfechafinal = new Array();

                        arrayclvempleado.length = 0
                        arrayidtem.length = 0
                        arrayfechainicial.length = 0
                        arrayfechafinal.length = 0

                        $("#carousel-example-generic .untemporizador ").each(function () {

                            idtem = $(this).attr("id").substring(14);
                            fecha = $("#tempInputDiaFinalInicial" + idtem).val()
                            fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                            fecha_final = cambiarformatofecha(fecha.substring(20, 30));



                            if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


                                $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                                    idcentrotra = $(this).attr("id").substring(15);
                                    foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                                    nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                                    $(".renglonempleado .unempleado").each(function () {

                                        consec_empleado = $(this).attr("id").substring(10);

                                        clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                        console.log("a agregar : ", clvempd)
                                        arrayclvempleado.push(clvempd);
                                        arrayidtem.push(idtem);
                                        arrayfechainicial.push(fecha_inicial);
                                        arrayfechafinal.push(fecha_final);

                                    })

                                })

                            }

                            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



                                idcentrotra = $(this).attr("id").substring(27);
                                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
                                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


                                if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                                    $(".renglonempleado .unempleado").each(function () {

                                        consec_empleado = $(this).attr("id").substring(10);

                                        clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                        console.log("a agregar : ", clvempd)
                                        arrayclvempleado.push(clvempd);
                                        arrayidtem.push(idtem);
                                        arrayfechainicial.push(fecha_inicial);
                                        arrayfechafinal.push(fecha_final);




                                    })
                                }




                            })


                            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                                idcentrotra = $(this).attr("id").substring(27);

                                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                                $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                                    consec_empleado = $(this).attr("id").substring(34);
                                    clvempd = $(this).children("td").children("label.labelformu").attr("clvemp")

                                    console.log("a agregar : ", clvempd)
                                    arrayclvempleado.push(clvempd);
                                    arrayidtem.push(idtem);
                                    arrayfechainicial.push(fecha_inicial);
                                    arrayfechafinal.push(fecha_final);




                                })

                            })
                            console.log("arrayclvempleado ", arrayclvempleado)
                            for (var i = 0; i < arrayclvempleado.length; i++) {

                                listaTodosEmpleados.push({
                                    "clv_puesto": arrayclvempleado[i],
                                    "idTem": arrayidtem[i],
                                    "fecha_inicial": arrayfechainicial[i],
                                    "fecha_final": arrayfechafinal[i]
                                });
                            }

                        })

                        //fecha, fecha_inicial, fecha_final
                        console.log("clv a monitoeas  ", folio)
                        // console.log("fecha ini padre  ", fecha_inicial)
                        // console.log("fecha fin padre  ", fecha_final)
                        console.log("listaTodosEmpleados ", listaTodosEmpleados)



                        var fechaminimapadre = moment(fecha_inicial);
                        var fechamaximapadre = moment(fecha_final);

                        vande = 0;
                        vende = 0;
                        //console.log("foliokk", folio)
                        for (z = 0; z < listaTodosEmpleados.length; z++) {
                            //console.log("listaTodosEmpleados[i].clv_puesto ", listaTodosEmpleados[i].clv_puesto)
                            if (listaTodosEmpleados[z].clv_puesto == folio) {
                                var fechaminimanuevo = moment(listaTodosEmpleados[z].fecha_inicial);
                                var fechamaximanuevo = moment(listaTodosEmpleados[z].fecha_final);

                                if ((fechaminimanuevo >= fechaminimapadre && fechaminimanuevo <= fechamaximapadre) ||
                                    (fechamaximanuevo <= fechamaximapadre && fechamaximanuevo >= fechaminimapadre) ||
                                    (fechaminimanuevo == fechaminimapadre && fechamaximanuevo == fechamaximapadre)) {
                                    bande = 1
                                }

                            }
                            vande++
                        }


                        ///////////////////////////////// alejandro

                    }

                    console.log("foliojeje", folio);
                    return bande

                }

                function verificartablaempleado(data) {

                    var bande = 0;

                    $(".tablaempleado tbody tr label").each(function () {
                        //classcaro=$(this).attr("class")
                        folio = $(this).attr("clvemp")
                        //console.log("folio", folio);
                        //console.log("data.id", data.id);

                        if (bande == 0) {

                            if (folio == data.id) {

                                //console.log("repetido")
                                bande = 1
                            }

                        }


                    })


                    return bande
                }

            })


            $(".agregarGrupoEmpleadoCentroTrabajoTem").unbind();
            $(".agregarGrupoEmpleadoCentroTrabajoTem").on('click', function () {

                $('#modalagregarempleadogrupo').modal({
                    show: 'true',
                    backdrop: 'static',
                    keyboard: false
                });

                clvemp = ''
                nombreempleado = ''
                //buscar el numero de temporizador
                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                    banderaEmpleadoCentroTrabajoTemp++


                } else {

                    var parentaccordion = banderaTemp

                }

                $(".agregargrupoempleadotem").unbind();

                $('.agregargrupoempleadotem').on('click', function () {
                    idgrupo = $(this).attr("grupoempleado")
                    console.log("id de grupo empleado", idgrupo)
                    $('#modalagregarempleadogrupo').modal('hide');

                    var folio_proyecto = $("#select2proyecto").val()
                    var datosss = {
                        "clv_agrupador_empleado": idgrupo,
                        "folio_proyecto": folio_proyecto
                    };


                    $.ajax({
                        type: "POST",
                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                        data: datosss,
                        success: function (Agrupador) {
                            console.log("Agrupador", Agrupador)
                            banderanoapto = 0;
                            if (Agrupador.length > 0) {

                                for (i = 0; i < Agrupador.length; i++) {


                                    clvemp = Agrupador[i].clv_emp
                                    nombreempleado = Agrupador[i].nombre
                                    puestoemp = Agrupador[i].puesto
                                    clvpuesto = Agrupador[i].clv_puesto
                                    cumplereq = Agrupador[i].cumplerequisitos

                                    if (cumplereq == 1) {
                                        if (verificarcantidadrequisito(clvpuesto, parentaccordion, padrecollapse) == 1) {
                                            console.log("se agregará")
                                            fecha = $("#tempInputDiaFinalInicial" + padredeagregaremple).val()
                                            fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                            fecha_final = cambiarformatofecha(fecha.substring(20, 30));
                                            if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {
                                                console.log("mas de uno")

                                                //, fecha, fecha_inicial, fecha_final
                                                if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {

                                                    //console.log(" no es primera")
                                                    banderaEmpleadoCentroTrabajoTemp++

                                                    var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                        '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                        '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                        '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                        '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                        '</tr>'

                                                    $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');

                                                } else {
                                                    Swal.fire({
                                                        title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                        showClass: {
                                                            popup: 'animated fadeInDown faster'
                                                        },
                                                        hideClass: {
                                                            popup: 'animated fadeOutUp faster'
                                                        }
                                                    })
                                                }

                                            } else {
                                                if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {
                                                    banderaEmpleadoCentroTrabajoTemp++
                                                    console.log("si es primera")
                                                    var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                        '<h5 class="titulorent">Empleados</h5> ' +
                                                        '<div class="col-md-10 frfr">' +
                                                        '<table class="table table-condensed tableespeci">' +
                                                        '<tbody>' +
                                                        '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                        '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                        '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                        '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                        '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                        '</tr>' +
                                                        '</tbody>' +
                                                        '</table>' +
                                                        '</div>' +
                                                        '</div>'


                                                    $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');

                                                } else {
                                                    Swal.fire({
                                                        title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                        showClass: {
                                                            popup: 'animated fadeInDown faster'
                                                        },
                                                        hideClass: {
                                                            popup: 'animated fadeOutUp faster'
                                                        }
                                                    })
                                                }

                                            }
                                        } else {
                                            //console.log("excedio")
                                            Swal.fire({
                                                title: 'Has excedido el numero de empleados por centro de trabajo',
                                                showClass: {
                                                    popup: 'animated fadeInDown faster'
                                                },
                                                hideClass: {
                                                    popup: 'animated fadeOutUp faster'
                                                }
                                            })
                                        }
                                    } else {
                                        if (banderanoapto == 0) {
                                            Swal.fire({
                                                title: 'Algunos empleados no se agregaron debido a que no cumplen con todos los requisitos',
                                                showClass: {
                                                    popup: 'animated fadeInDown faster'
                                                },
                                                hideClass: {
                                                    popup: 'animated fadeOutUp faster'
                                                }
                                            })
                                        }
                                        banderanoapto++
                                    }




                                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                                        e.stopPropagation();
                                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                                        //console.log(" borrar   centro trabajo"+ideliminarempleadocentrotrabajotemp);
                                        //console.log("#uncentrotrabajotemporizador"+ideliminarempleadocentrotrabajotemp)
                                        //console.log("#eliminarempleadocentrotrabajoTem"+ideliminarempleadocentrotrabajotemp)
                                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })
                                        /*$("#carousel-example-generic .right").click();

                                    setTimeout(function(){ 
                                	

                                        verificarCantidadTempo()
                                    }, 3000);*/
                                    })


                                }



                            }

                        }

                    })

                    function verificarcantidadrequisito(folio, parentaccordion, padrecollapse) {
                        console.log("ya estamos en la funcion")
                        //return 1;

                        //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                        vande = 0;
                        vende = 0;
                        //console.log("foliokk", folio)
                        for (y = 0; y < listaRequisitosCampania.length; y++) {
                            //console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                            if (listaRequisitosCampania[y].clv_puesto == folio) {
                                vende = y
                            }
                            vande++
                        }
                        //console.log("bande ", vende)
                        limite = listaRequisitosCampania[vende].cantidad
                        console.log("limite ", limite)
                        //return 1;

                        //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
                        contadorpuesto = 0;
                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {

                            //console.log("vida ", $(this).attr("clvpue"))
                            if ($(this).attr("clvpue") == folio) {
                                contadorpuesto++
                            }
                        })
                        //console.log("contadorpuesto  ", contadorpuesto )
                        if (contadorpuesto < limite) {
                            return 1;
                        } else {
                            return 0;
                        }



                    }

                    function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) {
                        console.log("clv emp a agregar", folio);

                        var bande = 0;
                        //console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                            //classcaro=$(this).attr("class")
                            foliod = $(this).attr("clvemp")
                            //console.log("$(this)", $(this));
                            //console.log("clvemp2", folio);
                            //console.log("clvempd2", foliod);

                            if (bande == 0) {

                                if (folio == foliod) {

                                    //console.log("repetido")
                                    bande = 1
                                }

                            }


                        })



                        if (bande == 0) {
                            // validar que clv_emp no exista en otro centro del temporidor

                            var listaTodosEmpleados = [];

                            ///////////////////////////////// alejandro


                            var arrayclvempleado = new Array();
                            var arrayidtem = new Array();
                            var arrayfechainicial = new Array();
                            var arrayfechafinal = new Array();

                            arrayclvempleado.length = 0
                            arrayidtem.length = 0
                            arrayfechainicial.length = 0
                            arrayfechafinal.length = 0

                            $("#carousel-example-generic .untemporizador ").each(function () {

                                idtem = $(this).attr("id").substring(14);
                                fecha = $("#tempInputDiaFinalInicial" + idtem).val()
                                fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                fecha_final = cambiarformatofecha(fecha.substring(20, 30));



                                if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


                                    $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                                        idcentrotra = $(this).attr("id").substring(15);
                                        foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                                        nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                                        $(".renglonempleado .unempleado").each(function () {

                                            consec_empleado = $(this).attr("id").substring(10);

                                            clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                            console.log("a agregar : ", clvempd)
                                            arrayclvempleado.push(clvempd);
                                            arrayidtem.push(idtem);
                                            arrayfechainicial.push(fecha_inicial);
                                            arrayfechafinal.push(fecha_final);

                                        })

                                    })

                                }

                                $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



                                    idcentrotra = $(this).attr("id").substring(27);
                                    foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
                                    nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


                                    if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                                        $(".renglonempleado .unempleado").each(function () {

                                            consec_empleado = $(this).attr("id").substring(10);

                                            clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                            console.log("a agregar : ", clvempd)
                                            arrayclvempleado.push(clvempd);
                                            arrayidtem.push(idtem);
                                            arrayfechainicial.push(fecha_inicial);
                                            arrayfechafinal.push(fecha_final);




                                        })
                                    }




                                })


                                $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                                    idcentrotra = $(this).attr("id").substring(27);

                                    foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                                    nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                                    $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                                        consec_empleado = $(this).attr("id").substring(34);
                                        clvempd = $(this).children("td").children("label.labelformu").attr("clvemp")

                                        console.log("a agregar : ", clvempd)
                                        arrayclvempleado.push(clvempd);
                                        arrayidtem.push(idtem);
                                        arrayfechainicial.push(fecha_inicial);
                                        arrayfechafinal.push(fecha_final);




                                    })

                                })
                                console.log("arrayclvempleado ", arrayclvempleado)
                                for (var i = 0; i < arrayclvempleado.length; i++) {

                                    listaTodosEmpleados.push({
                                        "clv_puesto": arrayclvempleado[i],
                                        "idTem": arrayidtem[i],
                                        "fecha_inicial": arrayfechainicial[i],
                                        "fecha_final": arrayfechafinal[i]
                                    });
                                }

                            })

                            //fecha, fecha_inicial, fecha_final
                            console.log("clv a monitoeas  ", folio)
                            // console.log("fecha ini padre  ", fecha_inicial)
                            // console.log("fecha fin padre  ", fecha_final)
                            console.log("listaTodosEmpleados ", listaTodosEmpleados)



                            var fechaminimapadre = moment(fecha_inicial);
                            var fechamaximapadre = moment(fecha_final);

                            vande = 0;
                            vende = 0;
                            //console.log("foliokk", folio)
                            for (z = 0; z < listaTodosEmpleados.length; z++) {
                                //console.log("listaTodosEmpleados[i].clv_puesto ", listaTodosEmpleados[i].clv_puesto)
                                if (listaTodosEmpleados[z].clv_puesto == folio) {
                                    var fechaminimanuevo = moment(listaTodosEmpleados[z].fecha_inicial);
                                    var fechamaximanuevo = moment(listaTodosEmpleados[z].fecha_final);

                                    if ((fechaminimanuevo >= fechaminimapadre && fechaminimanuevo <= fechamaximapadre) ||
                                        (fechamaximanuevo <= fechamaximapadre && fechamaximanuevo >= fechaminimapadre) ||
                                        (fechaminimanuevo == fechaminimapadre && fechamaximanuevo == fechamaximapadre)) {
                                        bande = 1
                                    }

                                }
                                vande++
                            }


                            ///////////////////////////////// alejandro

                        }

                        console.log("foliojeje", folio);
                        return bande

                    }

                    function verificartablaempleado(data) {

                        var bande = 0;

                        $(".tablaempleado tbody tr label").each(function () {
                            //classcaro=$(this).attr("class")
                            folio = $(this).attr("clvemp")
                            //console.log("folio", folio);
                            //console.log("data.id", data.id);

                            if (bande == 0) {

                                if (folio == data.id) {

                                    //console.log("repetido")
                                    bande = 1
                                }

                            }


                        })


                        return bande
                    }


                });

                $(".verdetalleempleado").unbind();
                $(".verdetalleempleado").on("click", function () {

                    $('#modaldetallegrupoempleado').modal({
                        show: 'true',
                        backdrop: 'static',
                        keyboard: false
                    });
                    $(".tablemodaldetallegrupoempleado tbody").empty()
                    $("#modaldetallegrupoempleado .nombreempleadogru").html("")



                    var idgrupo = $(this).attr("grupoempleadosolo")
                    var nombre = $(this).attr("nomemple")
                    var folio_proyecto = $("#select2proyecto").val()
                    var datosss = {
                        "clv_agrupador_empleado": idgrupo,
                        "folio_proyecto": folio_proyecto
                    };


                    $("#modaldetallegrupoempleado .nombreempleadogru").html(nombre)

                    $.ajax({
                        type: "POST",
                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                        data: datosss,
                        success: function (Agrupador) {

                            if (Agrupador.length > 0) {

                                for (i = 0; i < Agrupador.length; i++) {

                                    var emple = '<tr>' +
                                        ' <td> <label>' + Agrupador[i].clv_emp + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].nombre + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].genero + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].calificacionnumero + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].puesto + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].estado + '</label></td>' +
                                        ' <td> <label>' + Agrupador[i].municipio + '</label></td>' +
                                        '</tr>'

                                    $(".tablemodaldetallegrupoempleado tbody").append(emple)//.hide().show('fast');

                                }
                            }

                        }
                    })




                })



            })

            function verificarexistecentrotrabajoTem(folio, padre, parentaccordion, banderaCentroTrabajoTemp) {
                //console.log("folio", folio);

                var bande = 0;

                $("#untemporizador" + padre + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador .panel-heading  a").each(function () {
                    //classcaro=$(this).attr("class")
                    foliod = $(this).attr("folioCentroTrabajo")
                    //console.log("$(this)", $(this));
                    //console.log("folio", folio);
                    //console.log("foliod", foliod);

                    if (bande == 0) {

                        if (folio == foliod) {

                            //console.log("repetido")
                            bande = 1
                        }

                    }


                })

                //console.log("bande", bande);
                return bande

            }


        });



        function verificartablacentrotrabajo(data) {

            var bande = 0;

            $(".tablacentrotrabajo tbody tr label").each(function () {
                //classcaro=$(this).attr("class")
                folio = $(this).attr("foliocetrotrabajo")
                //console.log("folio", folio);
                //console.log("data.id", data.id);

                if (bande == 0) {

                    if (folio == data.id) {

                        //console.log("repetido")
                        bande = 1
                    }

                }


            })


            return bande
        }


    })



    /* =============================================  */

    $(".agregarGrupoCentroTrabajoTem").unbind();

    $(".agregarGrupoCentroTrabajoTem").on('click', function () {

        $('#modalagregarcentrotrabajogrupo').modal({
            show: 'true',
            backdrop: 'static',
            keyboard: false
        });
        //$(".tablacentrotrabajo tbody").empty()

        folioCentroT = ''
        nombreCentroT = ''
        //buscar el numero de temporizador
        padre = $(this).parent().parent().parent().parent().attr("id").substring(14);

        if ($("#untemporizador" + padre + " .rengloncentrotrabajotempo").length > 0) {

            var parentaccordion = $(this).parent().parent().parent().children(".rengloncentrotrabajotempo").children(".frfr").children(".panel-group").attr("id").substring(9)

        } else {

            var parentaccordion = banderaTemp

        }



        $(".agregargrupocentrotem").unbind();

        $('.agregargrupocentrotem').on('click', function () {
            idgrupo = $(this).attr("grupocentrotrabajo")
            $('#modalagregarcentrotrabajogrupo').modal('hide');

            console.log("idgrupo ", idgrupo)
            var datosss = {
                "clv_agrupador_centro_trabajo": idgrupo
            };


            $.ajax({
                type: "POST",
                url: "/Home/ObtenerCentrosTrabajoDeAgrupacion", //si
                data: datosss,
                success: function (Agrupador) {
                    console.log("agrupador : ", Agrupador)
                    console.log("Agrupador", Agrupador.length)
                    if (Agrupador.length > 0) {

                        for (i = 0; i < Agrupador.length; i++) {


                            folio = Agrupador[i].folio_centro_trabajo
                            nombreCentroT = Agrupador[i].descripcion

                            if ($("#untemporizador" + padre + " .rengloncentrotrabajotempo").length > 0) {


                                if (verificarexistecentrotrabajoTem(folio, padre, parentaccordion, banderaCentroTrabajoTemp) == 0) {

                                    //console.log(" no es primera")
                                    banderaCentroTrabajoTemp++

                                    var centrotravajoTem = '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador' + banderaCentroTrabajoTemp + '">' +
                                        '<div class="panel-heading">' +
                                        '<h4 class="panel-title">' +
                                        '<a data-toggle="collapse" data-parent="#accordion' + parentaccordion + '" href="#collapse' + banderaCentroTrabajoTemp + '" folioCentroTrabajo="' + folio + '">' +
                                        '' + nombreCentroT + '</a>' +
                                        '</h4>' +
                                        '<button type="button" class="btn btn-sm btn-danger eliminarcentrotrabajoTemporalidad" id="eliminarcentrotrabajoTemporalidad' + banderaCentroTrabajoTemp + '" >' +
                                        '<i class="fa fa-times"></i>' +
                                        '</button>' +
                                        '</div>' +
                                        '<div id="collapse' + banderaCentroTrabajoTemp + '" class="panel-collapse collapse">' +
                                        '<div class="panel-body container-fluid contenedorempleadocentrotrabajotem">' +
                                        '<div class="row">' +
                                        '<div class="col-md-4"> ' +
                                        '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Empleado</button>' +
                                        '</div>' +
                                        '<div class="col-md-4"> ' +
                                        '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Grupo de Empleados</button>' +
                                        '</div>' +
                                        '<div class="col-md-4"> ' +
                                        '<button class="btn btn-sm btn-success btn-excelemp" ><i class="fa fa-file-excel-o" ></i> Importar Empleados</button>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div> '
                                    // console.log("#untemporizador"+padre+" .rengloncentrotrabajotempo #accordion"+parentaccordion)
                                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion).append(centrotravajoTem).hide().show('fast');

                                }

                            } else {
                                banderaCentroTrabajoTemp++
                                //console.log("si es primera")
                                var centrotravajoTem = '<div class="row rengloncentrotrabajotempo" id="rengloncentrotrabajotempo1">' +
                                    '<h5 class="titulorent">Centros de trabajo</h5>' +
                                    '<div class="col-md-12 frfr">' +
                                    '<div class="panel-group" id="accordion' + banderaTemp + '">' +

                                    '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador' + banderaCentroTrabajoTemp + '">' +
                                    '<div class="panel-heading">' +
                                    '<h6 class="panel-title">' +
                                    '<a data-toggle="collapse" data-parent="#accordion' + banderaTemp + '" href="#collapse1" folioCentroTrabajo="' + folio + '">' +
                                    '' + nombreCentroT + '</a>' +
                                    '</h6>' +
                                    '<button type="button" class="btn btn-sm btn-danger eliminarcentrotrabajoTemporalidad" id="eliminarcentrotrabajoTemporalidad1" >' +
                                    '<i class="fa fa-times"></i>' +
                                    '</button>' +
                                    '</div>' +
                                    '<div id="collapse1" class="panel-collapse ">' +
                                    '<div class="panel-body container-fluid contenedorempleadocentrotrabajotem">' +
                                    '<div class="row">' +
                                    '<div class="col-md-4"> ' +
                                    '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem1">Agregar Empleado</button>' +
                                    '</div>' +
                                    '<div class="col-md-4"> ' +
                                    '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem1">Agregar Grupo de Empleados</button>' +
                                    '</div>' +
                                    '<div class="col-md-4"> ' +
                                    '<button class="btn btn-sm btn-success btn-excelemp" ><i class="fa fa-file-excel-o" ></i> Importar Empleados</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div> '
                                $("#untemporizador" + padre + " .contenedorprincipla").append(centrotravajoTem).hide().show('fast');
                            }

                            $(".eliminarcentrotrabajoTemporalidad").on('click', function (e) {
                                e.stopPropagation();
                                $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                                /*var padreacco = $(this).parent().parent().parent().attr("id").substring(9)
                                var padretem = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14)
                                $("#untemporizador" + padretem + " #accordion" + padreacco + " #uncentrotrabajotemporizador" + ideliminarcentrotrabajotemp).hide("slow", function () { $(this).remove(); })
                                */
                            })

                            //////////////// dos inicio
                            /*$(".agregarEmpleadoCentroTrabajoTem").unbind();

                            $(".agregarEmpleadoCentroTrabajoTem").on('click', function () {

                                $('#modalagregarempleado').modal({
                                    show: 'true',
                                    backdrop: 'static',
                                    keyboard: false
                                });
                                $(".tablaempleado tbody").empty()

                                clvemp = ''
                                nombreempleado = ''
                                //buscar el numero de temporizador
                                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                                    banderaEmpleadoCentroTrabajoTemp++


                                } else {

                                    var parentaccordion = banderaTemp

                                }


                                $("#select2empleado").unbind();

                                $('#select2empleado').on('select2:select', function (e) {

                                    var data = e.params.data;
                                    clvemp = data.id
                                    nombreempleado = data.text

                                    var renglonempleado = '<tr>' +
                                        '<td><label class="labelformu empleadomodal" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                        '<td><button class="btn btn-sm btn-danger eliminarempleadomodal" id="eliminarempleado"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                        '</tr>'


                                    if (verificartablaempleado(data) == 0) {

                                        //console.log("a agregar");
                                        $(".tablaempleado tbody").append(renglonempleado)

                                    }

                                    $(".eliminarempleadomodal").unbind();
                                    $(".eliminarempleadomodal").on("click", function () {
                                        console.log("eliminar jej")
                                        $(this).parent().parent().hide("slow", function () { $(this).remove(); })


                                    })

                                });


                                $("#agregarempleadomodal").unbind();

                                $('#agregarempleadomodal').on('click', function () {

                                    $('#modalagregarempleado').modal('hide');

                                    $(".tablaempleado tbody tr label").each(function () {

                                        clvemp = $(this).attr("clvemp")
                                        console.log("clvemp1", clvemp);
                                        nombreempleado = $(this).html()

                                        if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {

                                            if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse) == 0) {

                                                console.log(" no es primera")
                                                banderaEmpleadoCentroTrabajoTemp++

                                                var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                    '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                                    '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                    '</tr>'

                                                $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');

                                            }

                                        } else {
                                            banderaEmpleadoCentroTrabajoTemp++
                                            console.log("si es primera")
                                            var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                '<h5 class="titulorent">Empleados</h5> ' +
                                                '<div class="col-md-10 frfr">' +
                                                '<table class="table table-condensed tableespeci">' +
                                                '<tbody>' +
                                                '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                                '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                '</tr>' +
                                                '</tbody>' +
                                                '</table>' +
                                                '</div>' +
                                                '</div>'


                                            $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');
                                        }


                                    })


                                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                                        e.stopPropagation();
                                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })

                                    })


                                });

                                function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse) {

                                    var bande = 0;
                                    console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                                        //classcaro=$(this).attr("class")
                                        foliod = $(this).attr("clvemp")
                                        //console.log("$(this)", $(this));
                                        console.log("clvemp2", folio);
                                        console.log("clvempd2", foliod);

                                        if (bande == 0) {

                                            if (folio == foliod) {

                                                bande = 1
                                            }

                                        }


                                    })

                                    console.log("bande", bande);
                                    return bande

                                }

                                function verificartablaempleado(data) {

                                    var bande = 0;

                                    $(".tablaempleado tbody tr label").each(function () {
                                        folio = $(this).attr("clvemp")

                                        if (bande == 0) {

                                            if (folio == data.id) {

                                                bande = 1
                                            }

                                        }


                                    })


                                    return bande
                                }

                            })*/
                            //////////////// dos fin


                            $(".agregarEmpleadoCentroTrabajoTem").unbind();

                            $(".agregarEmpleadoCentroTrabajoTem").on('click', function () {

                                $('#modalagregarempleado').modal({
                                    show: 'true',
                                    backdrop: 'static',
                                    keyboard: false
                                });
                                //agregarEmpleadoCentroTrabajoTem3
                                var idcentrotra = $(this).attr("id").substring(31);


                                clvemp = ''
                                nombreempleado = ''
                                //buscar el numero de temporizador
                                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                                    banderaEmpleadoCentroTrabajoTemp++


                                } else {

                                    var parentaccordion = banderaTemp

                                }

                                $('#generofiltro').empty();
                                $('#calificacionfiltro').empty();
                                $('#puestofiltro').empty();
                                $('#municipiofiltro').empty();

                                $('#generofiltro').append('<option value="">Todos</option> <option value = "1" > Masculino</option> <option value="3">Femenino</option>')
                                // $('#calificacionfiltro').append('<option value="">Todos</option> <option value="1">Casado</option> <option value="2">Concubinato</option> <option value="3">Separado</option> <option value="4">Soltero</option>')
                                $('#puestofiltro').append('<option value="">Todos</option> <option value = "1" > Promotor</option> <option value="2">Supervisor</option>')

                                var filtrogenero = $("#generofiltro").val();
                                var filtrocalificacion = $("#calificacionfiltro").val();
                                var filtropuesto = $("#puestofiltro").val();

                                // llenar la tabla inicio
                                var tablaMisEmpleados = $("#misempletable").DataTable({

                                    "ajax": {

                                        "url": "/Home/ObtenerEmpleadosdata", //si
                                        "type": "POST",
                                        "datatype": "json",
                                        "data": {

                                            "filtrogenero": function () { return $("#generofiltro").val() },
                                            "filtrocalificacion": function () { return $("#calificacionfiltro").val() },
                                            "filtropuesto": function () { return $("#puestofiltro").val() },
                                            "folioproyecto": function () { return $("#select2proyecto").val() },
                                            "filtroestado": function () { return $("#estadofiltro").val() },
                                            "filtromunicipio": function () { return $("#municipiofiltro").val() }
                                        }
                                    },
                                    "columns": [

                                        { "data": "clv_emp" },
                                        { "data": "nombre" },
                                        { "data": "genero", 'searchable': false },
                                        { "data": "calificacionnumero", 'searchable': false },
                                        { "data": "puesto", 'searchable': false },
                                        { "data": "estado", 'searchable': false },
                                        { "data": "municipio", 'searchable': false },
                                        { "data": { clv_emp: "clv_emp", nombre: "nombre", puesto: "puesto", clv_puesto: "clv_puesto", cumplerequisitos: "cumplerequisitos", mensajeValidacion: "mensajeValidacion", calificacion_empleado: "calificacion_empleado" } }

                                    ],
                                    "columnDefs": [

                                        {

                                            'searchable': true,
                                            'orderable': true,

                                            "render": function (data, type, row) {
                                                $(function () {
                                                    $('[data-toggle="popover"]').popover()
                                                })
                                                //console.log("la vista es : " + data.PendientePorVisualizar)
                                                /*checkse = "";
                                                botones5 = "";*/
                                                if (data.cumplerequisitos == 1) {
                                                    return "<label class='checkbox-inline '  ><input class='chkemple' type='checkbox' value='1' nombreempleado='" + data.nombre + "' clvemp='" + data.clv_emp + "' puestoemp='" + data.puesto + "' clvpuesto='" + data.clv_puesto + "' calificacion_empleado='" + data.calificacion_empleado + "'></label>";
                                                } else if (data.cumplerequisitos == 0) {
                                                    return '<small class="mensajenovalidado">No cumple con requisitos</small> <br> <button type="button" class="btn btn-block  btn-sm btndetallenocumple" data-toggle="popover"  title="Detalle de validación" ' +
                                                        'data-placement="left" data-content="' + data.mensajeValidacion + '" > Ver detalles </button >'
                                                    // return '<small class="mensajenovalidado">' + data.mensajeValidacion + '</small>'
                                                }


                                                //return " <div class='btn-group grupoB'>" + botones4 + botones1 + botones2 + botones3 + botones5 + botones6 + " </div>";
                                            },
                                            "targets": 7
                                        }

                                    ],
                                    "language": {

                                        "sProcessing": "Procesando...",
                                        "sLengthMenu": "Mostrar _MENU_ registros",
                                        "sZeroRecords": "No se encontraron resultados",
                                        "sEmptyTable": "Ningún dato disponible en esta tabla",
                                        "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
                                        "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
                                        "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
                                        "sInfoPostFix": "",
                                        "sSearch": "Buscar Nombre o No de empleado",
                                        "sUrl": "",
                                        "sInfoThousands": ",",
                                        "sLoadingRecords": "Cargando...",
                                        "oPaginate": {
                                            "sFirst": "Primero",
                                            "sLast": "Último",
                                            "sNext": "Siguiente",
                                            "sPrevious": "Anterior"
                                        },
                                        "oAria": {
                                            "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                                            "sSortDescending": ": Activar para ordenar la columna de manera descendente"
                                        }

                                    },
                                    "autoWidth": true,
                                    "sScrollY": ($(window).height() - 400),
                                    scrollX: true,
                                    scrollCollapse: true,
                                    dom: 'Bfrti',
                                    //"lengthMenu": [[10, 25, 50], [10, 25, 50]],
                                    "lengthMenu": [[-1], ["TODOS"]],
                                    "fnInitComplete": function (oSettings, json) {
                                        console.log("stop stopppppp");
                                        $('#backd').loading('stop');
                                        $(function () {
                                            $('[data-toggle="popover"]').popover()
                                        })

                                    }

                                });
                                // llenar la tabla fin
                                $("#misempletable_paginate .paginate_button ").on("click", function () {
                                    $(function () {
                                        $('[data-toggle="popover"]').popover()
                                    })
                                })
                                $("#generofiltro").unbind();
                                $("#generofiltro").on("change", function () {
                                    tablaMisEmpleados.ajax.reload();

                                })
                                $("#calificacionfiltro").unbind();
                                $("#calificacionfiltro").on("change", function () {
                                    tablaMisEmpleados.ajax.reload();

                                })
                                $("#puestofiltro").unbind();
                                $("#puestofiltro").on("change", function () {
                                    tablaMisEmpleados.ajax.reload();

                                })
                                $("#estadofiltro").unbind();
                                $("#estadofiltro").on("change", function () {
                                    $('#municipiofiltro').empty();
                                    $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")

                                    tablaMisEmpleados.ajax.reload();

                                    if ($(this).val() != "") {
                                        $('#backd').loading('start');
                                        $('div.loading-overlay-content').html('Espere un momento')
                                        var datosssa = {
                                            "clv_estado": $(this).val()
                                        };



                                        $.ajax({
                                            type: "POST",
                                            url: "/Home/ObtenerMunicipios", //si
                                            data: datosssa,
                                            success: function (Agrupador) {
                                                //console.log("Agrupador", Agrupador.length)
                                                $('#municipiofiltro').empty();

                                                if (Agrupador.length > 0) {
                                                    $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")

                                                    for (i = 0; i < Agrupador.length; i++) {

                                                        $('#municipiofiltro').append(" <option value=" + Agrupador[i].clv_municipio + " class='opcionDeSelect'>" + Agrupador[i].nombre + "</option>")



                                                    }

                                                }

                                                $('#backd').loading('stop');
                                            }

                                        })
                                    } else {
                                        $('#municipiofiltro').empty();
                                    }

                                })
                                $("#municipiofiltro").unbind();
                                $("#municipiofiltro").on("change", function () {
                                    tablaMisEmpleados.ajax.reload();

                                })
                                $("#cerrarmodaltablaempleadote").unbind();
                                $("#cerrarmodaltablaempleadote").on("click", function () {
                                    $('#modalagregarempleado').modal('hide');
                                    tablaMisEmpleados.destroy();
                                    /*$('#modalagregarempleado').modal({
                                        show: 'true',
                                        backdrop: 'static',
                                        keyboard: false
                                    });*/
                                })




                                $("#agregarempleadomodal").unbind();

                                $('#agregarempleadomodal').on('click', function () {

                                    $('#modalagregarempleado').modal('hide');
                                    tablaMisEmpleados.destroy();

                                    $(".tablaempleado tbody tr label .chkemple").each(function () {

                                        if ($(this).prop('checked')) {

                                            clvemp = $(this).attr("clvemp")
                                            nombreempleado = $(this).attr("nombreempleado")
                                            puestoemp = $(this).attr("puestoemp")
                                            clvpuesto = $(this).attr("clvpuesto")
                                            califi = $(this).attr("calificacion_empleado")
                                            //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                                            //console.log("idcentrotra ", idcentrotra)

                                            if (verificarcantidadrequisito(clvpuesto, parentaccordion, padrecollapse) == 1) {
                                                console.log("adelante")
                                                fecha = $("#tempInputDiaFinalInicial" + padredeagregaremple).val()
                                                fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                                fecha_final = cambiarformatofecha(fecha.substring(20, 30));
                                                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {

                                                    //, fecha, fecha_inicial, fecha_final
                                                    if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {

                                                        //console.log(" no es primera")
                                                        banderaEmpleadoCentroTrabajoTemp++

                                                        var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                            '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                            '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                            '</tr>'

                                                        $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');

                                                    } else {
                                                        Swal.fire({
                                                            title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                            showClass: {
                                                                popup: 'animated fadeInDown faster'
                                                            },
                                                            hideClass: {
                                                                popup: 'animated fadeOutUp faster'
                                                            }
                                                        })
                                                    }

                                                } else {
                                                    if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {
                                                        banderaEmpleadoCentroTrabajoTemp++
                                                        console.log("si es primera")
                                                        var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                            '<h5 class="titulorent">Empleados</h5> ' +
                                                            '<div class="col-md-10 frfr">' +
                                                            '<table class="table table-condensed tableespeci">' +
                                                            '<tbody>' +
                                                            '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                            '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                            '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                            '</tr>' +
                                                            '</tbody>' +
                                                            '</table>' +
                                                            '</div>' +
                                                            '</div>'


                                                        $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');
                                                    } else {
                                                        Swal.fire({
                                                            title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                            showClass: {
                                                                popup: 'animated fadeInDown faster'
                                                            },
                                                            hideClass: {
                                                                popup: 'animated fadeOutUp faster'
                                                            }
                                                        })
                                                    }
                                                }

                                            } else {
                                                Swal.fire({
                                                    title: 'Has excedido el numero de empleados por centro de trabajo',
                                                    showClass: {
                                                        popup: 'animated fadeInDown faster'
                                                    },
                                                    hideClass: {
                                                        popup: 'animated fadeOutUp faster'
                                                    }
                                                })
                                            }





                                        }




                                    })


                                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                                        e.stopPropagation();
                                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })

                                    })


                                });

                                function verificarcantidadrequisito(folio, parentaccordion, padrecollapse) {
                                    //console.log("ya estamos en la funcion")
                                    //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                                    vande = 0;
                                    vende = 0;
                                    //console.log("foliokk", folio)
                                    for (i = 0; i < listaRequisitosCampania.length; i++) {
                                        console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                                        if (listaRequisitosCampania[i].clv_puesto == folio) {
                                            vende = i
                                        }
                                        vande++
                                    }
                                    //console.log("bande ", vende)
                                    limite = listaRequisitosCampania[vende].cantidad
                                    //console.log("limite ", limite)

                                    //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
                                    contadorpuesto = 0;
                                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {

                                        //console.log("vida ", $(this).attr("clvpue"))
                                        if ($(this).attr("clvpue") == folio) {
                                            contadorpuesto++
                                        }
                                    })

                                    if (contadorpuesto < limite) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }



                                }

                                function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) {

                                    console.log("clv emp a agregar", folio);

                                    var bande = 0;
                                    //console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                                        //classcaro=$(this).attr("class")
                                        foliod = $(this).attr("clvemp")
                                        //console.log("$(this)", $(this));
                                        //console.log("clvemp2", folio);
                                        //console.log("clvempd2", foliod);

                                        if (bande == 0) {

                                            if (folio == foliod) {

                                                //console.log("repetido")
                                                bande = 1
                                            }

                                        }


                                    })



                                    if (bande == 0) {
                                        // validar que clv_emp no exista en otro centro del temporidor

                                        var listaTodosEmpleados = [];

                                        ///////////////////////////////// alejandro


                                        var arrayclvempleado = new Array();
                                        var arrayidtem = new Array();
                                        var arrayfechainicial = new Array();
                                        var arrayfechafinal = new Array();

                                        arrayclvempleado.length = 0
                                        arrayidtem.length = 0
                                        arrayfechainicial.length = 0
                                        arrayfechafinal.length = 0

                                        $("#carousel-example-generic .untemporizador ").each(function () {

                                            idtem = $(this).attr("id").substring(14);
                                            fecha = $("#tempInputDiaFinalInicial" + idtem).val()
                                            fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                            fecha_final = cambiarformatofecha(fecha.substring(20, 30));



                                            if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


                                                $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                                                    idcentrotra = $(this).attr("id").substring(15);
                                                    foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                                                    nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                                                    $(".renglonempleado .unempleado").each(function () {

                                                        consec_empleado = $(this).attr("id").substring(10);

                                                        clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                                        console.log("a agregar : ", clvempd)
                                                        arrayclvempleado.push(clvempd);
                                                        arrayidtem.push(idtem);
                                                        arrayfechainicial.push(fecha_inicial);
                                                        arrayfechafinal.push(fecha_final);

                                                    })

                                                })

                                            }

                                            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



                                                idcentrotra = $(this).attr("id").substring(27);
                                                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
                                                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


                                                if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                                                    $(".renglonempleado .unempleado").each(function () {

                                                        consec_empleado = $(this).attr("id").substring(10);

                                                        clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                                        console.log("a agregar : ", clvempd)
                                                        arrayclvempleado.push(clvempd);
                                                        arrayidtem.push(idtem);
                                                        arrayfechainicial.push(fecha_inicial);
                                                        arrayfechafinal.push(fecha_final);




                                                    })
                                                }




                                            })


                                            $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                                                idcentrotra = $(this).attr("id").substring(27);

                                                foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                                                nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                                                $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                                                    consec_empleado = $(this).attr("id").substring(34);
                                                    clvempd = $(this).children("td").children("label.labelformu").attr("clvemp")

                                                    console.log("a agregar : ", clvempd)
                                                    arrayclvempleado.push(clvempd);
                                                    arrayidtem.push(idtem);
                                                    arrayfechainicial.push(fecha_inicial);
                                                    arrayfechafinal.push(fecha_final);




                                                })

                                            })
                                            console.log("arrayclvempleado ", arrayclvempleado)
                                            for (var i = 0; i < arrayclvempleado.length; i++) {

                                                listaTodosEmpleados.push({
                                                    "clv_puesto": arrayclvempleado[i],
                                                    "idTem": arrayidtem[i],
                                                    "fecha_inicial": arrayfechainicial[i],
                                                    "fecha_final": arrayfechafinal[i]
                                                });
                                            }

                                        })

                                        //fecha, fecha_inicial, fecha_final
                                        console.log("clv a monitoeas  ", folio)
                                        // console.log("fecha ini padre  ", fecha_inicial)
                                        // console.log("fecha fin padre  ", fecha_final)
                                        console.log("listaTodosEmpleados ", listaTodosEmpleados)



                                        var fechaminimapadre = moment(fecha_inicial);
                                        var fechamaximapadre = moment(fecha_final);

                                        vande = 0;
                                        vende = 0;
                                        //console.log("foliokk", folio)
                                        for (z = 0; z < listaTodosEmpleados.length; z++) {
                                            //console.log("listaTodosEmpleados[i].clv_puesto ", listaTodosEmpleados[i].clv_puesto)
                                            if (listaTodosEmpleados[z].clv_puesto == folio) {
                                                var fechaminimanuevo = moment(listaTodosEmpleados[z].fecha_inicial);
                                                var fechamaximanuevo = moment(listaTodosEmpleados[z].fecha_final);

                                                if ((fechaminimanuevo >= fechaminimapadre && fechaminimanuevo <= fechamaximapadre) ||
                                                    (fechamaximanuevo <= fechamaximapadre && fechamaximanuevo >= fechaminimapadre) ||
                                                    (fechaminimanuevo == fechaminimapadre && fechamaximanuevo == fechamaximapadre)) {
                                                    bande = 1
                                                }

                                            }
                                            vande++
                                        }


                                        ///////////////////////////////// alejandro

                                    }

                                    console.log("foliojeje", folio);
                                    return bande

                                }

                                function verificartablaempleado(data) {

                                    var bande = 0;

                                    $(".tablaempleado tbody tr label").each(function () {
                                        folio = $(this).attr("clvemp")

                                        if (bande == 0) {

                                            if (folio == data.id) {

                                                bande = 1
                                            }

                                        }


                                    })


                                    return bande
                                }

                            })

                            $(".agregarGrupoEmpleadoCentroTrabajoTem").unbind();
                            $(".agregarGrupoEmpleadoCentroTrabajoTem").on('click', function () {

                                $('#modalagregarempleadogrupo').modal({
                                    show: 'true',
                                    backdrop: 'static',
                                    keyboard: false
                                });

                                clvemp = ''
                                nombreempleado = ''
                                //buscar el numero de temporizador
                                padredeagregaremple = $(this).parent().parent().parent().parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14);

                                padreeuncentrotrabajotemporizador = $(this).parent().parent().parent().parent().parent().attr("id").substring(27);

                                padrecollapse = $(this).parent().parent().parent().parent().attr("id").substring(8);


                                if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {


                                    var parentaccordion = $(this).parent().parent().parent().parent().parent().parent().attr("id").substring(9)

                                    banderaEmpleadoCentroTrabajoTemp++


                                } else {

                                    var parentaccordion = banderaTemp

                                }

                                $(".agregargrupoempleadotem").unbind();

                                $('.agregargrupoempleadotem').on('click', function () {
                                    idgrupo = $(this).attr("grupoempleado")
                                    console.log("id de grupo empleado", idgrupo)
                                    $('#modalagregarempleadogrupo').modal('hide');


                                    var folio_proyecto = $("#select2proyecto").val()
                                    var datosss = {
                                        "clv_agrupador_empleado": idgrupo,
                                        "folio_proyecto": folio_proyecto
                                    };


                                    $.ajax({
                                        type: "POST",
                                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                                        data: datosss,
                                        success: function (Agrupador) {
                                            console.log("Agrupador", Agrupador)
                                            banderanoapto = 0;
                                            if (Agrupador.length > 0) {

                                                for (i = 0; i < Agrupador.length; i++) {


                                                    clvemp = Agrupador[i].clv_emp
                                                    nombreempleado = Agrupador[i].nombre
                                                    puestoemp = Agrupador[i].puesto
                                                    clvpuesto = Agrupador[i].clv_puesto
                                                    cumplereq = Agrupador[i].cumplerequisitos

                                                    if (cumplereq == 1) {
                                                        if (verificarcantidadrequisito(clvpuesto, parentaccordion, padrecollapse) == 1) {
                                                            fecha = $("#tempInputDiaFinalInicial" + padredeagregaremple).val()
                                                            fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                                            fecha_final = cambiarformatofecha(fecha.substring(20, 30));
                                                            if ($("#untemporizador" + padredeagregaremple + " #uncentrotrabajotemporizador" + padreeuncentrotrabajotemporizador + " .renglonempleadocentrotrabajotempo").length > 0) {

                                                                //, fecha, fecha_inicial, fecha_final
                                                                if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {

                                                                    console.log(" no es primera")
                                                                    banderaEmpleadoCentroTrabajoTemp++

                                                                    var empleadocentrotrabajotem = '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                                        '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                                        '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                                        '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                                        '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                                        '</tr>'

                                                                    $("#untemporizador" + padredeagregaremple + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .table tbody").append(empleadocentrotrabajotem).hide().show('fast');

                                                                } else {
                                                                    Swal.fire({
                                                                        title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                                        showClass: {
                                                                            popup: 'animated fadeInDown faster'
                                                                        },
                                                                        hideClass: {
                                                                            popup: 'animated fadeOutUp faster'
                                                                        }
                                                                    })
                                                                }

                                                            } else {
                                                                if (verificarexisteempleadoTem(clvemp, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) == 0) {
                                                                    banderaEmpleadoCentroTrabajoTemp++
                                                                    console.log("si es primera")
                                                                    var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                                        '<h5 class="titulorent">Empleados</h5> ' +
                                                                        '<div class="col-md-10 frfr">' +
                                                                        '<table class="table table-condensed tableespeci">' +
                                                                        '<tbody>' +
                                                                        '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                                                        '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                                                        '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                                                        '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                                                        '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem' + banderaEmpleadoCentroTrabajoTemp + '"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                                        '</tr>' +
                                                                        '</tbody>' +
                                                                        '</table>' +
                                                                        '</div>' +
                                                                        '</div>'


                                                                    $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');

                                                                } else {
                                                                    Swal.fire({
                                                                        title: 'El empleado ya existe en otro horario, el cual coincide con el actual',
                                                                        showClass: {
                                                                            popup: 'animated fadeInDown faster'
                                                                        },
                                                                        hideClass: {
                                                                            popup: 'animated fadeOutUp faster'
                                                                        }
                                                                    })
                                                                }

                                                            }

                                                        } else {
                                                            //console.log("excedio")
                                                            Swal.fire({
                                                                title: 'Has excedido el numero de empleados por centro de trabajo',
                                                                showClass: {
                                                                    popup: 'animated fadeInDown faster'
                                                                },
                                                                hideClass: {
                                                                    popup: 'animated fadeOutUp faster'
                                                                }
                                                            })
                                                        }
                                                    } else {
                                                        if (banderanoapto == 0) {
                                                            Swal.fire({
                                                                title: 'Algunos empleados no se agregaron debido a que no cumplen con todos los requisitos',
                                                                showClass: {
                                                                    popup: 'animated fadeInDown faster'
                                                                },
                                                                hideClass: {
                                                                    popup: 'animated fadeOutUp faster'
                                                                }
                                                            })
                                                        }
                                                        banderanoapto++
                                                    }




                                                    $(".eliminarempleadocentrotrabajoTem").on('click', function (e) {
                                                        e.stopPropagation();
                                                        ideliminarempleadocentrotrabajotemp = $(this).attr("id").substring(32);
                                                        //console.log(" borrar   centro trabajo"+ideliminarempleadocentrotrabajotemp);
                                                        //console.log("#uncentrotrabajotemporizador"+ideliminarempleadocentrotrabajotemp)
                                                        //console.log("#eliminarempleadocentrotrabajoTem"+ideliminarempleadocentrotrabajotemp)
                                                        $("#eliminarempleadocentrotrabajoTem" + ideliminarempleadocentrotrabajotemp).parent().parent().hide("slow", function () { $(this).remove(); })
                                                        /*$("#carousel-example-generic .right").click();
            
                                                    setTimeout(function(){ 
                                                	
            
                                                        verificarCantidadTempo()
                                                    }, 3000);*/
                                                    })


                                                }

                                            }

                                        }

                                    })
                                    function verificarcantidadrequisito(folio, parentaccordion, padrecollapse) {
                                        console.log("ya estamos en la funcion")
                                        //return 1;

                                        //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                                        vande = 0;
                                        vende = 0;
                                        //console.log("foliokk", folio)
                                        for (y = 0; y < listaRequisitosCampania.length; y++) {
                                            //console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                                            if (listaRequisitosCampania[y].clv_puesto == folio) {
                                                vende = y
                                            }
                                            vande++
                                        }
                                        //console.log("bande ", vende)
                                        limite = listaRequisitosCampania[vende].cantidad
                                        console.log("limite ", limite)
                                        //return 1;

                                        //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
                                        contadorpuesto = 0;
                                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {

                                            //console.log("vida ", $(this).attr("clvpue"))
                                            if ($(this).attr("clvpue") == folio) {
                                                contadorpuesto++
                                            }
                                        })
                                        //console.log("contadorpuesto  ", contadorpuesto )
                                        if (contadorpuesto < limite) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }



                                    }


                                    function verificarexisteempleadoTem(folio, padredeagregaremple, parentaccordion, padrecollapse, fecha, fecha_inicial, fecha_final) {

                                        var bande = 0;
                                        //console.log("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label")
                                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion + " #collapse" + padrecollapse + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado td label").each(function () {
                                            //classcaro=$(this).attr("class")
                                            foliod = $(this).attr("clvemp")
                                            //console.log("$(this)", $(this));
                                            //console.log("clvemp2", folio);
                                            //console.log("clvempd2", foliod);

                                            if (bande == 0) {

                                                if (folio == foliod) {

                                                    //console.log("repetido")
                                                    bande = 1
                                                }

                                            }


                                        })



                                        if (bande == 0) {
                                            // validar que clv_emp no exista en otro centro del temporidor

                                            var listaTodosEmpleados = [];

                                            ///////////////////////////////// alejandro


                                            var arrayclvempleado = new Array();
                                            var arrayidtem = new Array();
                                            var arrayfechainicial = new Array();
                                            var arrayfechafinal = new Array();

                                            arrayclvempleado.length = 0
                                            arrayidtem.length = 0
                                            arrayfechainicial.length = 0
                                            arrayfechafinal.length = 0

                                            $("#carousel-example-generic .untemporizador ").each(function () {

                                                idtem = $(this).attr("id").substring(14);
                                                fecha = $("#tempInputDiaFinalInicial" + idtem).val()
                                                fecha_inicial = cambiarformatofecha(fecha.substring(0, 10));
                                                fecha_final = cambiarformatofecha(fecha.substring(20, 30));



                                                if ($("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").length == 0) {


                                                    $(".renglonCentroTrabajo .uncentrotrabajo").each(function () {

                                                        idcentrotra = $(this).attr("id").substring(15);
                                                        foliotrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").attr("foliocentrotrabajo");
                                                        nombreCentroTrabajo = $("#uncentrotrabajo" + idcentrotra + " td label.labelformu").html();

                                                        $(".renglonempleado .unempleado").each(function () {

                                                            consec_empleado = $(this).attr("id").substring(10);

                                                            clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                                            console.log("a agregar : ", clvempd)
                                                            arrayclvempleado.push(clvempd);
                                                            arrayidtem.push(idtem);
                                                            arrayfechainicial.push(fecha_inicial);
                                                            arrayfechafinal.push(fecha_final);

                                                        })

                                                    })

                                                }

                                                $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {



                                                    idcentrotra = $(this).attr("id").substring(27);
                                                    foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")
                                                    nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()


                                                    if ($("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").length == 0) {

                                                        $(".renglonempleado .unempleado").each(function () {

                                                            consec_empleado = $(this).attr("id").substring(10);

                                                            clvempd = $("#unempleado" + consec_empleado + " td label.labelformu").attr("clvemp");
                                                            console.log("a agregar : ", clvempd)
                                                            arrayclvempleado.push(clvempd);
                                                            arrayidtem.push(idtem);
                                                            arrayfechainicial.push(fecha_inicial);
                                                            arrayfechafinal.push(fecha_final);




                                                        })
                                                    }




                                                })


                                                $("#untemporizador" + idtem + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador").each(function () {

                                                    idcentrotra = $(this).attr("id").substring(27);

                                                    foliotrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").attr("foliocentrotrabajo")

                                                    nombreCentroTrabajo = $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .panel-heading .panel-title a").html()

                                                    $("#untemporizador" + idtem + " #uncentrotrabajotemporizador" + idcentrotra + " .renglonempleadocentrotrabajotempo .unempleadocentrotrabajotemporizado").each(function () {

                                                        consec_empleado = $(this).attr("id").substring(34);
                                                        clvempd = $(this).children("td").children("label.labelformu").attr("clvemp")

                                                        console.log("a agregar : ", clvempd)
                                                        arrayclvempleado.push(clvempd);
                                                        arrayidtem.push(idtem);
                                                        arrayfechainicial.push(fecha_inicial);
                                                        arrayfechafinal.push(fecha_final);




                                                    })

                                                })
                                                console.log("arrayclvempleado ", arrayclvempleado)
                                                for (var i = 0; i < arrayclvempleado.length; i++) {

                                                    listaTodosEmpleados.push({
                                                        "clv_puesto": arrayclvempleado[i],
                                                        "idTem": arrayidtem[i],
                                                        "fecha_inicial": arrayfechainicial[i],
                                                        "fecha_final": arrayfechafinal[i]
                                                    });
                                                }

                                            })

                                            //fecha, fecha_inicial, fecha_final
                                            console.log("clv a monitoeas  ", folio)
                                            // console.log("fecha ini padre  ", fecha_inicial)
                                            // console.log("fecha fin padre  ", fecha_final)
                                            console.log("listaTodosEmpleados ", listaTodosEmpleados)



                                            var fechaminimapadre = moment(fecha_inicial);
                                            var fechamaximapadre = moment(fecha_final);

                                            vande = 0;
                                            vende = 0;
                                            //console.log("foliokk", folio)
                                            for (z = 0; z < listaTodosEmpleados.length; z++) {
                                                //console.log("listaTodosEmpleados[i].clv_puesto ", listaTodosEmpleados[i].clv_puesto)
                                                if (listaTodosEmpleados[z].clv_puesto == folio) {
                                                    var fechaminimanuevo = moment(listaTodosEmpleados[z].fecha_inicial);
                                                    var fechamaximanuevo = moment(listaTodosEmpleados[z].fecha_final);

                                                    if ((fechaminimanuevo >= fechaminimapadre && fechaminimanuevo <= fechamaximapadre) ||
                                                        (fechamaximanuevo <= fechamaximapadre && fechamaximanuevo >= fechaminimapadre) ||
                                                        (fechaminimanuevo == fechaminimapadre && fechamaximanuevo == fechamaximapadre)) {
                                                        bande = 1
                                                    }

                                                }
                                                vande++
                                            }


                                            ///////////////////////////////// alejandro

                                        }

                                        console.log("foliojeje", folio);
                                        return bande

                                    }

                                    function verificartablaempleado(data) {

                                        var bande = 0;

                                        $(".tablaempleado tbody tr label").each(function () {
                                            //classcaro=$(this).attr("class")
                                            folio = $(this).attr("clvemp")
                                            //console.log("folio", folio);
                                            //console.log("data.id", data.id);

                                            if (bande == 0) {

                                                if (folio == data.id) {

                                                    //console.log("repetido")
                                                    bande = 1
                                                }

                                            }


                                        })


                                        return bande
                                    }


                                });

                                $(".verdetalleempleado").unbind();
                                $(".verdetalleempleado").on("click", function () {

                                    $('#modaldetallegrupoempleado').modal({
                                        show: 'true',
                                        backdrop: 'static',
                                        keyboard: false
                                    });
                                    $(".tablemodaldetallegrupoempleado tbody").empty()
                                    $("#modaldetallegrupoempleado .nombreempleadogru").html("")



                                    var idgrupo = $(this).attr("grupoempleadosolo")
                                    var nombre = $(this).attr("nomemple")
                                    var folio_proyecto = $("#select2proyecto").val()
                                    var datosss = {
                                        "clv_agrupador_empleado": idgrupo,
                                        "folio_proyecto": folio_proyecto
                                    };


                                    $("#modaldetallegrupoempleado .nombreempleadogru").html(nombre)

                                    $.ajax({
                                        type: "POST",
                                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                                        data: datosss,
                                        success: function (Agrupador) {

                                            if (Agrupador.length > 0) {

                                                for (i = 0; i < Agrupador.length; i++) {

                                                    var emple = '<tr>' +
                                                        ' <td> <label>' + Agrupador[i].clv_emp + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].nombre + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].genero + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].calificacionnumero + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].puesto + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].estado + '</label></td>' +
                                                        ' <td> <label>' + Agrupador[i].municipio + '</label></td>' +
                                                        '</tr>'

                                                    $(".tablemodaldetallegrupoempleado tbody").append(emple)//.hide().show('fast');

                                                }
                                            }

                                        }
                                    })




                                })



                            })

                            function verificarexistecentrotrabajoTem(folio, padre, parentaccordion, banderaCentroTrabajoTemp) {

                                var bande = 0;

                                $("#untemporizador" + padre + " .rengloncentrotrabajotempo .uncentrotrabajotemporizador .panel-heading  a").each(function () {
                                    foliod = $(this).attr("folioCentroTrabajo")

                                    if (bande == 0) {

                                        if (folio == foliod) {

                                            bande = 1
                                        }

                                    }


                                })

                                return bande

                            }

                        }

                    }

                }

            })


            //traer los centros de trabajo con
		    /*$(".tablacentrotrabajo tbody tr label").each(function(){





		    })*/


            $(".verdetallegrupocentrotrabajo").unbind();
            $(".verdetallegrupocentrotrabajo").on("click", function () {
                $('#modaldetallegrupocentrotrabajo').modal({
                    show: 'true',
                    backdrop: 'static',
                    keyboard: false
                });
                $(".tablemodaldetallegrupocentrotrabajo tbody").empty()
                $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html("")
                var nombre = $(this).attr("nomcentrotrabajo")
                var idGrupo = $(this).attr("grupocentrotrabajo")
                var datosss = {
                    "clv_agrupador_centro_trabajo": idGrupo
                };
                $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html(nombre)

                $.ajax({
                    type: "POST",
                    url: "/Home/ObtenerCentrosTrabajoDeAgrupacion", //si
                    data: datosss,
                    success: function (Agrupador) {

                        if (Agrupador.length > 0) {

                            for (i = 0; i < Agrupador.length; i++) {
                                nombreCentroT = Agrupador[i].descripcion

                                var centrotrabajo = '<tr>' +
                                    ' <td> <label>' + nombreCentroT + '</label></td>' +
                                    '</tr>'

                                $(".tablemodaldetallegrupocentrotrabajo tbody").append(centrotrabajo)//.hide().show('fast');

                            }
                        }

                    }
                })

            })


        });



        function verificartablacentrotrabajo(data) {

            var bande = 0;

            $(".tablacentrotrabajo tbody tr label").each(function () {

                folio = $(this).attr("foliocetrotrabajo")

                if (bande == 0) {

                    if (folio == data.id) {

                        //console.log("repetido")
                        bande = 1
                    }

                }


            })


            return bande
        }
        $(".verdetallegrupocentrotrabajo").unbind();
        $(".verdetallegrupocentrotrabajo").on("click", function () {

            $('#modaldetallegrupocentrotrabajo').modal({
                show: 'true',
                backdrop: 'static',
                keyboard: false
            });
            $(".tablemodaldetallegrupocentrotrabajo tbody").empty()
            $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html("")
            var nombre = $(this).attr("nomcentrotrabajo")
            var idGrupo = $(this).attr("grupocentrotrabajo")
            var datosss = {
                "clv_agrupador_centro_trabajo": idGrupo
            };
            $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html(nombre)

            $.ajax({
                type: "POST",
                url: "/Home/ObtenerCentrosTrabajoDeAgrupacion", //si
                data: datosss,
                success: function (Agrupador) {

                    if (Agrupador.length > 0) {

                        for (i = 0; i < Agrupador.length; i++) {
                            nombreCentroT = Agrupador[i].descripcion

                            var centrotrabajo = '<tr>' +
                                ' <td> <label>' + nombreCentroT + '</label></td>' +
                                '</tr>'

                            $(".tablemodaldetallegrupocentrotrabajo tbody").append(centrotrabajo)//.hide().show('fast');

                        }
                    }

                }
            })


        })

    })



    /*  ==========================================   */


    // ir a corousel activo
    var banderaitem = 0
    //console.log("banderaitem", banderaitem);
    var banderaitemactive = 1
    //console.log("banderaitemactive", banderaitemactive);
    var stop = ''
    var classcaro
    var login = $("#carousel-example-generic .item").length
    var gaga = 1
    //$("#carousel-example-generic item")
    $("#carousel-example-generic .item").each(function () {
        //console.log($(this).attr("class"))
        classcaro = $(this).attr("class")
        if (classcaro == 'item untemporizador active') {
            stop = "true"
            $(this).removeClass("active")
        }
        banderaitem++
        if (stop != "true") {
            banderaitemactive++
        }
        if (gaga == login) {
            $(this).addClass("active")
        }
        gaga++
    })
    //console.log("banderaitem", banderaitem);
    //console.log("banderaitemactive", banderaitemactive);

    var avanzar = banderaitem - banderaitemactive
    //console.log("avanzar", avanzar);

    if (avanzar > 0) {


        for (i = 0; i < avanzar; i++) {

            //setTimeout(function(){ 
            //$("#carousel-example-generic .right").click();
            $("#carousel-example-generic").carousel('prev')
            //}, 1500);
        }


        //setTimeout(function(){
        //$("#carousel-example-generic .right").click();
        //}, 300);

        setTimeout(function () {
            //console.log("next")
            $("#carousel-example-generic").carousel('next')
            $('#backd').loading('stop');
        }, 900);



    } else {
        $('#backd').loading('stop');
    }
})





$("#agregaCentroTrabajo").on('click', function () {

    $('#modalagregarcentrotrabajosolo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });

    $(".tablacentrotrabajossolo tbody").empty()

    foliocentrotrabajo = ''
    nombrecentrotrabajo = ''

    if ($(".renglonCentroTrabajo").length > 0) {
        banderacentrotrabajo++
        banderaCentroTrabajoTemp++

    }

    $("#select2centrotrabajosolo").unbind();

    $('#select2centrotrabajosolo').on('select2:select', function (e) {



        var data = e.params.data;
        /*console.log(data.id);
            console.log(data.text);*/
        foliocentrotrabajo = data.id
        nombrecentrotrabajo = data.text

        var rrengloncentrtrabajoo = '<tr>' +
            '<td><label class="labelformu centrotrabajomodalsolo" foliocetrotrabajo="' + foliocentrotrabajo + '">' + nombrecentrotrabajo + '</label></td>' +
            '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajomodalsolo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
            '</tr>'

        if (verificartablacentrotrabajosolo(data) == 0) {


            $(".tablacentrotrabajossolo tbody").append(rrengloncentrtrabajoo)

        }


        $(".eliminarcentrotrabajomodalsolo").unbind();
        $(".eliminarcentrotrabajomodalsolo").on("click", function () {
            console.log("eliminar jej")
            $(this).parent().parent().hide("slow", function () { $(this).remove(); })


        })

    });

    function verificartablacentrotrabajosolo(data) {

        var bande = 0;

        $(".tablacentrotrabajossolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("foliocetrotrabajo")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande
    }


    $("#agregarcentrotrabajomodal").unbind();

    $('#agregarcentrotrabajomodal').on('click', function () {

        $('#modalagregarcentrotrabajosolo').modal('hide');

        $(".tablacentrotrabajossolo tbody tr label").each(function () {

            folio = $(this).attr("foliocetrotrabajo")
            console.log("folio centro solo", folio);
            nombreCentroT = $(this).html()
            console.log("nombre centro solo", nombreCentroT);

            if ($(".renglonCentroTrabajo").length > 0) {
                console.log("mas de uno")
                if (verificarexistecentrotrabajo(folio) == 0) {

                    var centrotrabajo = '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderaCentroTrabajoTemp + '">' +
                        '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'

                    $(".tabcentrotrabajo .contNewPl .table tbody").append(centrotrabajo).hide().show('fast');

                }


            } else {
                banderaCentroTrabajoTemp++
                console.log("el primero")
                var centrotrabajo = '<div class="row renglonCentroTrabajo">' +
                    '<h5 class="titulorent">Centros de trabajo</h5>' +
                    '<div class="col-md-6">' +
                    '<div class="col-md-8">' +
                    '<table class="table tableespeci">' +
                    '<tbody>' +
                    '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderaCentroTrabajoTemp + '">' +
                    '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                    '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $(".tabcentrotrabajo .contNewPl").append(centrotrabajo).hide().show('fast');

            }


        })

        function verificarexistecentrotrabajo(folio) {
            console.log("jandro");

            var bande = 0;

            $(" .renglonCentroTrabajo .table tbody tr label").each(function () {
                //classcaro=$(this).attr("class")
                foliod = $(this).attr("folioCentroTrabajo")
                //console.log("$(this)", $(this));
                console.log("folio solo ", folio);
                console.log("foliod solo//", foliod);

                if (bande == 0) {

                    if (folio == foliod) {

                        console.log("repetido")
                        bande = 1
                    }

                }


            })

            //console.log("bande", bande);
            return bande

        }


        $(".eliminarcentrotrabajo").on('click', function () {


            //console.log("id", id);


            if ($(".uncentrotrabajo").length == 1) {
                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
            } else {
                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
            }

        })

    });



})


$("#agregaCentroTrabajogrupo").on('click', function () {

    $('#modalagregarcentrotrabajogruposolo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });

    foliocentrotrabajo = ''
    nombrecentrotrabajo = ''

    if ($(".renglonCentroTrabajo").length > 0) {
        banderacentrotrabajo++
        banderaCentroTrabajoTemp++

    }

    $(".agregargrupocentrosolo").unbind();

    $('.agregargrupocentrosolo').on('click', function () {

        var idgrupo = $(this).attr("grupocentrotrabajosolo")

        $('#modalagregarcentrotrabajogruposolo').modal('hide');


        var datosss = {
            "clv_agrupador_centro_trabajo": idgrupo
        };


        $.ajax({
            type: "POST",
            url: "/Home/ObtenerCentrosTrabajoDeAgrupacion", //si
            data: datosss,
            success: function (Agrupador) {
                console.log("agrupador : ", Agrupador)
                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {

                        folio = Agrupador[i].folio_centro_trabajo
                        nombreCentroT = Agrupador[i].descripcion

                        if ($(".renglonCentroTrabajo").length > 0) {
                            console.log("mas de uno")
                            if (verificarexistecentrotrabajo(folio) == 0) {

                                var centrotrabajo = '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderaCentroTrabajoTemp + '">' +
                                    '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                                    '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                    '</tr>'

                                $(".tabcentrotrabajo .contNewPl .table tbody").append(centrotrabajo).hide().show('fast');

                            }


                        } else {
                            banderaCentroTrabajoTemp++
                            console.log("el primero")
                            var centrotrabajo = '<div class="row renglonCentroTrabajo">' +
                                '<h5 class="titulorent">Centros de trabajo</h5>' +
                                '<div class="col-md-6">' +
                                '<div class="col-md-8">' +
                                '<table class="table tableespeci">' +
                                '<tbody>' +
                                '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderaCentroTrabajoTemp + '">' +
                                '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                                '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                '</tr>' +
                                '</tbody>' +
                                '</table>' +
                                '</div>' +
                                '</div> ' +
                                '</div>'
                            $(".tabcentrotrabajo .contNewPl").append(centrotrabajo).hide().show('fast');

                        }

                        function verificarexistecentrotrabajo(folio) {
                            console.log("jandro");

                            var bande = 0;

                            $(" .renglonCentroTrabajo .table tbody tr label").each(function () {
                                //classcaro=$(this).attr("class")
                                foliod = $(this).attr("folioCentroTrabajo")
                                //console.log("$(this)", $(this));
                                console.log("folio solo ", folio);
                                console.log("foliod solo//", foliod);

                                if (bande == 0) {

                                    if (folio == foliod) {

                                        console.log("repetido")
                                        bande = 1
                                    }

                                }


                            })

                            //console.log("bande", bande);
                            return bande

                        }


                        $(".eliminarcentrotrabajo").on('click', function () {


                            //console.log("id", id);


                            if ($(".uncentrotrabajo").length == 1) {
                                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
                            } else {
                                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                            }

                        })

                    }


                }

            }

        })

    });


    function verificartablacentrotrabajosolo(data) {

        var bande = 0;

        $(".tablacentrotrabajossolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("foliocetrotrabajo")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande
    }
    $(".verdetallegrupocentrotrabajo").unbind();
    $(".verdetallegrupocentrotrabajo").on("click", function () {
        $('#modaldetallegrupocentrotrabajo').modal({
            show: 'true',
            backdrop: 'static',
            keyboard: false
        });
        $(".tablemodaldetallegrupocentrotrabajo tbody").empty()
        $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html("")
        var nombre = $(this).attr("nomcentrotrabajo")
        var idGrupo = $(this).attr("grupocentrotrabajo")
        var datosss = {
            "clv_agrupador_centro_trabajo": idGrupo
        };
        $("#modaldetallegrupocentrotrabajo .nombrecentrotra").html(nombre)

        $.ajax({
            type: "POST",
            url: "/Home/ObtenerCentrosTrabajoDeAgrupacion", //si
            data: datosss,
            success: function (Agrupador) {

                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {
                        nombreCentroT = Agrupador[i].descripcion

                        var centrotrabajo = '<tr>' +
                            ' <td> <label>' + nombreCentroT + '</label></td>' +
                            '</tr>'

                        $(".tablemodaldetallegrupocentrotrabajo tbody").append(centrotrabajo)//.hide().show('fast');

                    }
                }

            }
        })

    })
})


/*$("#agregaempleado").on('click', function () {

    $('#modalagregarempleadosolo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });

    $(".tablaempleadosolo tbody").empty()

    clvemp = ''
    nombreempleado = ''

    if ($(".renglonempleado").length > 0) {
        banderaempleado++
        banderaEmpleadoCentroTrabajoTemp++

    }

    $("#select2empleadosolo").unbind();

    $('#select2empleadosolo').on('select2:select', function (e) {

        //$('#modalagregarempleadosolo').modal('hide');

        var data = e.params.data;

        clvemp = data.id
        nombreempleado = data.text

        var empleado = '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
            '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
            '<td><button class="btn btn-sm btn-danger eliminarempleadomodalsolo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
            '</tr>'

        if (verificartablaempleadosolo(data) == 0) {


            $(".tablaempleadosolo tbody").append(empleado)

        }

        $(".eliminarempleadomodalsolo").unbind();
        $(".eliminarempleadomodalsolo").on("click", function () {
            console.log("eliminar jej")
            $(this).parent().parent().hide("slow", function () { $(this).remove(); })


        })


    });



    function verificartablaempleadosolo(data) {


        var bande = 0;

        $(".tablaempleadosolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("clvemp")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande

    }


    $("#agregarempleadomodalsolo").unbind();
    $("#agregarempleadomodalsolo").on("click", function () {


        $("#modalagregarempleadosolo").modal("hide")

        $(".tablaempleadosolo tbody tr label").each(function () {

            clvemp = $(this).attr("clvemp")
            nombreempleado = $(this).html()


            if ($(".renglonempleado").length > 0) {

                if (verificarexisteempleado(clvemp) == 0) {
                    banderaEmpleadoCentroTrabajoTemp++
                    var empleado = '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                        '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'

                    $(".tabempleado .contNewPl .table tbody").append(empleado).hide().show('fast');

                }





            } else {
                banderaEmpleadoCentroTrabajoTemp++
                var empleado = '<div class="row renglonempleado">' +
                    '<h5 class="titulorent">Empleados</h5>' +
                    '<div class="col-md-6">' +
                    '<div class="col-md-8">' +
                    '<table class="table tableespeci">' +
                    '<tbody>' +
                    '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                    '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                    '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $(".tabempleado .contNewPl").append(empleado).hide().show('fast');

            }



        })

        function verificarexisteempleado(folio) {
            console.log("jandro");

            var bande = 0;

            $(" .renglonempleado .table tbody tr label").each(function () {
                //classcaro=$(this).attr("class")
                foliod = $(this).attr("folioCentroTrabajo")
                //console.log("$(this)", $(this));
                console.log("folio solo ", folio);
                console.log("foliod solo//", foliod);

                if (bande == 0) {

                    if (folio == foliod) {

                        console.log("repetido")
                        bande = 1
                    }

                }


            })

            //console.log("bande", bande);
            return bande

        }


        $(".eliminarempleado").on('click', function () {

            //console.log("id", id);


            if ($(".unempleado").length == 1) {
                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
            } else {
                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
            }
        })
    })


})*/


$("#agregaempleado").on('click', function () {

    $('#modalagregarempleado').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });



    clvemp = ''
    nombreempleado = ''

    if ($(".renglonempleado").length > 0) {
        banderaempleado++
        banderaEmpleadoCentroTrabajoTemp++

    }

    $('#generofiltro').empty();
    $('#calificacionlfiltro').empty();
    $('#puestofiltro').empty();
    $('#municipiofiltro').empty();

    $('#generofiltro').append('<option value="">Todos</option> <option value = "1" > Masculino</option> <option value="3">Femenino</option>')
    // $('#calificacionfiltro').append('<option value="">Todos</option> <option value="1">Casado</option> <option value="2">Concubinato</option> <option value="3">Separado</option> <option value="4">Soltero</option>')
    $('#puestofiltro').append('<option value="">Todos</option> <option value = "1" > Promotor</option> <option value="2">Supervisor</option>')

    var filtrogenero = $("#generofiltro").val();
    var filtrocalificacion = $("#calificacionfiltro").val();
    var filtropuesto = $("#puestofiltro").val();


    // llenar la tabla inicio
    var tablaMisEmpleados = $("#misempletable").DataTable({

        "ajax": {

            "url": "/Home/ObtenerEmpleadosdata", //si
            "type": "POST",
            "datatype": "json",
            "data": {

                "filtrogenero": function () { return $("#generofiltro").val() },
                "filtrocalificacion": function () { return $("#calificacionfiltro").val() },
                "filtropuesto": function () { return $("#puestofiltro").val() },
                "folioproyecto": function () { return $("#select2proyecto").val() },
                "filtroestado": function () { return $("#estadofiltro").val() },
                "filtromunicipio": function () { return $("#municipiofiltro").val() }
            }
        },
        "columns": [

            { "data": "clv_emp" },
            { "data": "nombre" },
            { "data": "genero", 'searchable': false },
            { "data": "calificacionnumero", 'searchable': false },
            { "data": "puesto", 'searchable': false },
            { "data": "estado", 'searchable': false },
            { "data": "municipio", 'searchable': false },
            { "data": { clv_emp: "clv_emp", nombre: "nombre", puesto: "puesto", clv_puesto: "clv_puesto", cumplerequisitos: "cumplerequisitos", mensajeValidacion: "mensajeValidacion", calificacion_empleado: "calificacion_empleado" } }

        ],
        "columnDefs": [

            {

                'searchable': true,
                'orderable': true,

                "render": function (data, type, row) {
                    $(function () {
                        $('[data-toggle="popover"]').popover()
                    })
                    if (data.cumplerequisitos == 1) {
                        return "<label class='checkbox-inline '  ><input class='chkemple' type='checkbox' value='1' nombreempleado='" + data.nombre + "' clvemp='" + data.clv_emp + "' puestoemp='" + data.puesto + "' clvpuesto='" + data.clv_puesto + "' calificacion_empleado='" + data.calificacion_empleado + "'></label>";
                    } else if (data.cumplerequisitos == 0) {
                        return '<small class="mensajenovalidado">No cumple con requisitos</small> <br> <button type="button" class="btn btn-block btn-sm btndetallenocumple" data-toggle="popover"  title="Detalle de validación" ' +
                            'data-placement="left" data-content="' + data.mensajeValidacion + '" > Ver detalles </button >'
                        // return '<small class="mensajenovalidado">' + data.mensajeValidacion + '</small>'
                    }
                    //return " <div class='btn-group grupoB'>" + botones4 + botones1 + botones2 + botones3 + botones5 + botones6 + " </div>";

                },
                "targets": 7
            }

        ],
        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar Nombre o No de empleado",
            "sUrl": "",
            "sInfoThousands": ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            }

        },
        "autoWidth": true,
        "sScrollY": ($(window).height() - 400),
        scrollX: true,
        scrollCollapse: true,
        dom: 'Bfrti',
        //"lengthMenu": [[10, 25, 50], [10, 25, 50]],
        "lengthMenu": [[-1], ["TODOS"]],
        "fnInitComplete": function (oSettings, json) {
            console.log("stop stopppppp");
            $('#backd').loading('stop');
            $(function () {
                $('[data-toggle="popover"]').popover()
            })

        }

    });
    // llenar la tabla fin
    $("#misempletable_paginate .paginate_button ").on("click", function () {
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    })
    $("#generofiltro").unbind();
    $("#generofiltro").on("change", function () {
        tablaMisEmpleados.ajax.reload();

    })
    $("#calificacionfiltro").unbind();
    $("#calificacionfiltro").on("change", function () {

        tablaMisEmpleados.ajax.reload();

    })
    $("#puestofiltro").unbind();
    $("#puestofiltro").on("change", function () {
        tablaMisEmpleados.ajax.reload();

    })
    $("#estadofiltro").unbind();
    $("#estadofiltro").on("change", function () {
        $('#municipiofiltro').empty();
        $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")
        tablaMisEmpleados.ajax.reload();

        if ($(this).val() != "") {
            $('#backd').loading('start');
            $('div.loading-overlay-content').html('Espere un momento')
            var datosssa = {
                "clv_estado": $(this).val()
            };



            $.ajax({
                type: "POST",
                url: "/Home/ObtenerMunicipios", //si
                data: datosssa,
                success: function (Agrupador) {
                    //console.log("Agrupador", Agrupador.length)
                    $('#municipiofiltro').empty();

                    if (Agrupador.length > 0) {
                        $('#municipiofiltro').append(" <option value='' class='opcionDeSelect'>Todos</option>")

                        for (i = 0; i < Agrupador.length; i++) {

                            $('#municipiofiltro').append(" <option value=" + Agrupador[i].clv_municipio + " class='opcionDeSelect'>" + Agrupador[i].nombre + "</option>")



                        }

                    }

                    $('#backd').loading('stop');
                }

            })
        } else {
            $('#municipiofiltro').empty();
        }

    })
    $("#municipiofiltro").unbind();
    $("#municipiofiltro").on("change", function () {
        tablaMisEmpleados.ajax.reload();

    })
    $("#cerrarmodaltablaempleadote").unbind();
    $("#cerrarmodaltablaempleadote").on("click", function () {
        $('#modalagregarempleado').modal('hide');
        tablaMisEmpleados.destroy();
        /*$('#modalagregarempleado').modal({
            show: 'true',
            backdrop: 'static',
            keyboard: false
        });*/
    })



    $("#agregarempleadomodal").unbind();
    $("#agregarempleadomodal").on("click", function () {


        $('#modalagregarempleado').modal('hide');
        tablaMisEmpleados.destroy();

        $(".tablaempleado tbody tr label .chkemple").each(function () {

            if ($(this).prop('checked')) {

                clvemp = $(this).attr("clvemp")
                nombreempleado = $(this).attr("nombreempleado")
                puestoemp = $(this).attr("puestoemp")
                clvpuesto = $(this).attr("clvpuesto")
                califi = $(this).attr("calificacion_empleado")
                console.log("listaRequisitosCampania ", listaRequisitosCampania)

                if (verificarcantidadrequisito(clvpuesto) == 1) {
                    if ($(".renglonempleado").length > 0) {

                        if (verificarexisteempleado(clvemp) == 0) {
                            banderaEmpleadoCentroTrabajoTemp++
                            var empleado = '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                '<td><label class="labelformu">' + puestoemp + '</label></td>' +
                                '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                                '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                '</tr>'

                            $(".tabempleado .contNewPl .table tbody").append(empleado).hide().show('fast');

                        }





                    } else {
                        banderaEmpleadoCentroTrabajoTemp++
                        var empleado = '<div class="row renglonempleado">' +
                            '<h5 class="titulorent">Empleados</h5>' +
                            '<div class="col-md-6">' +
                            '<div class="col-md-8">' +
                            '<table class="table tableespeci">' +
                            '<tbody>' +
                            '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                            '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                            '<td class="colorcalificacion' + califi + '"><label class="labelformu" ></label></td>' +
                            '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                            '</tr>' +
                            '</tbody>' +
                            '</table>' +
                            '</div>' +
                            '</div> ' +
                            '</div>'
                        $(".tabempleado .contNewPl").append(empleado).hide().show('fast');

                    }

                } else {
                    Swal.fire({
                        title: 'Has excedido el numero de empleados por centro de trabajo',
                        showClass: {
                            popup: 'animated fadeInDown faster'
                        },
                        hideClass: {
                            popup: 'animated fadeOutUp faster'
                        }
                    })
                }



            }








        })

        function verificarcantidadrequisito(folio) {
            //console.log("ya estamos en la funcion")
            //console.log("listaRequisitosCampania ", listaRequisitosCampania)
            vande = 0;
            vende = 0;
            //console.log("foliokk", folio)
            for (i = 0; i < listaRequisitosCampania.length; i++) {
                console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                if (listaRequisitosCampania[i].clv_puesto == folio) {
                    vende = i
                }
                vande++
            }
            //console.log("bande ", vende)
            limite = listaRequisitosCampania[vende].cantidad
            //console.log("limite ", limite)

            //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
            contadorpuesto = 0;
            $(".renglonempleado .unempleado td label").each(function () {

                //console.log("vida ", $(this).attr("clvpue"))
                if ($(this).attr("clvpue") == folio) {
                    contadorpuesto++
                }
            })

            if (contadorpuesto < limite) {
                return 1;
            } else {
                return 0;
            }



        }

        function verificarexisteempleado(folio) {
            console.log("jandro");

            var bande = 0;

            $(" .renglonempleado .table tbody tr label").each(function () {
                //classcaro=$(this).attr("class")
                foliod = $(this).attr("folioCentroTrabajo")
                //console.log("$(this)", $(this));
                console.log("folio solo ", folio);
                console.log("foliod solo//", foliod);

                if (bande == 0) {

                    if (folio == foliod) {

                        console.log("repetido")
                        bande = 1
                    }

                }


            })

            //console.log("bande", bande);
            return bande

        }


        $(".eliminarempleado").on('click', function () {

            //console.log("id", id);


            if ($(".unempleado").length == 1) {
                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
            } else {
                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
            }
        })
    })

    function verificartablaempleadosolo(data) {


        var bande = 0;

        $(".tablaempleadosolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("clvemp")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande

    }

})


$("#agregaempleadogrupo").on('click', function () {

    $('#modalagregarempleadogruposolo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });

    clvemp = ''
    nombreempleado = ''

    if ($(".renglonempleado").length > 0) {
        banderaempleado++
        banderaEmpleadoCentroTrabajoTemp++

    }


    $(".agregarempleadosolo").unbind();
    $(".agregarempleadosolo").on("click", function () {

        var idgrupo = $(this).attr("grupoempleadosolo")

        $("#modalagregarempleadogruposolo").modal("hide")

        var folio_proyecto = $("#select2proyecto").val()
        var datosss = {
            "clv_agrupador_empleado": idgrupo,
            "folio_proyecto": folio_proyecto
        };


        $.ajax({
            type: "POST",
            url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
            data: datosss,
            success: function (Agrupador) {
                banderanoapto = 0;
                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {

                        clvemp = Agrupador[i].clv_emp
                        nombreempleado = Agrupador[i].nombre
                        puestoemp = Agrupador[i].puesto
                        clvpuesto = Agrupador[i].clv_puesto
                        cumplereq = Agrupador[i].cumplerequisitos

                        if (cumplereq == 1) {
                            if (verificarcantidadrequisito(clvpuesto) == 1) {

                                if ($(".renglonempleado").length > 0) {

                                    if (verificarexisteempleado(clvemp) == 0) {
                                        banderaEmpleadoCentroTrabajoTemp++
                                        var empleado = '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                            '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                            '<td><label class="labelformu">' + puestoemp + '</label></td>' +
                                            '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                            '</tr>'

                                        $(".tabempleado .contNewPl .table tbody").append(empleado).hide().show('fast');

                                    }

                                } else {
                                    banderaEmpleadoCentroTrabajoTemp++
                                    var empleado = '<div class="row renglonempleado">' +
                                        '<h5 class="titulorent">Empleados</h5>' +
                                        '<div class="col-md-6">' +
                                        '<div class="col-md-8">' +
                                        '<table class="table tableespeci">' +
                                        '<tbody>' +
                                        '<tr class="unempleado" id="unempleado' + banderaEmpleadoCentroTrabajoTemp + '">' +
                                        '<td><label class="labelformu labelemp" clvemp="' + clvemp + '" clvpue="' + clvpuesto + '">' + nombreempleado + '</label></td>' +
                                        '<td><label class="labelformu" >' + puestoemp + '</label></td>' +
                                        '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                        '</tr>' +
                                        '</tbody>' +
                                        '</table>' +
                                        '</div>' +
                                        '</div> ' +
                                        '</div>'
                                    $(".tabempleado .contNewPl").append(empleado).hide().show('fast');

                                }

                            } else {
                                Swal.fire({
                                    title: 'Has excedido el numero de empleados por centro de trabajo',
                                    showClass: {
                                        popup: 'animated fadeInDown faster'
                                    },
                                    hideClass: {
                                        popup: 'animated fadeOutUp faster'
                                    }
                                })
                            }
                        } else {
                            if (banderanoapto == 0) {
                                Swal.fire({
                                    title: 'Algunos empleados no se agregaron debido a que no cumplen con todos los requisitos',
                                    showClass: {
                                        popup: 'animated fadeInDown faster'
                                    },
                                    hideClass: {
                                        popup: 'animated fadeOutUp faster'
                                    }
                                })
                            }
                            banderanoapto++
                        }


                        function verificarcantidadrequisito(folio) {
                            console.log("ya estamos en la funcion")
                            //return 1;

                            //console.log("listaRequisitosCampania ", listaRequisitosCampania)
                            vande = 0;
                            vende = 0;
                            //console.log("foliokk", folio)
                            for (y = 0; y < listaRequisitosCampania.length; y++) {
                                //console.log("listaRequisitosCampania[i].clv_puesto ", listaRequisitosCampania[i].clv_puesto)
                                if (listaRequisitosCampania[y].clv_puesto == folio) {
                                    vende = y
                                }
                                vande++
                            }
                            //console.log("bande ", vende)
                            limite = listaRequisitosCampania[vende].cantidad
                            console.log("limite ", limite)
                            //return 1;

                            //console.log("#uncentrotrabajotemporizador" + idcentrotra + " .unempleadocentrotrabajotemporizado td label")
                            contadorpuesto = 0;
                            $(".renglonempleado .unempleado td label").each(function () {

                                //console.log("vida ", $(this).attr("clvpue"))
                                if ($(this).attr("clvpue") == folio) {
                                    contadorpuesto++
                                }
                            })
                            //console.log("contadorpuesto  ", contadorpuesto )
                            if (contadorpuesto < limite) {
                                return 1;
                            } else {
                                return 0;
                            }



                        }

                        function verificarexisteempleado(folio) {
                            console.log("jandro");

                            var bande = 0;

                            $(" .renglonempleado .table tbody tr label").each(function () {
                                //classcaro=$(this).attr("class")
                                foliod = $(this).attr("folioCentroTrabajo")
                                //console.log("$(this)", $(this));
                                console.log("folio solo ", folio);
                                console.log("foliod solo//", foliod);

                                if (bande == 0) {

                                    if (folio == foliod) {

                                        console.log("repetido")
                                        bande = 1
                                    }

                                }


                            })

                            //console.log("bande", bande);
                            return bande

                        }


                        $(".eliminarempleado").on('click', function () {

                            //console.log("id", id);


                            if ($(".unempleado").length == 1) {
                                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
                            } else {
                                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
                            }
                        })
                    }


                }

            }

        })

    })


    function verificartablaempleadosolo(data) {


        var bande = 0;

        $(".tablaempleadosolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("clvemp")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande

    }


    $(".verdetalleempleado").unbind();
    $(".verdetalleempleado").on("click", function () {

        $('#modaldetallegrupoempleado').modal({
            show: 'true',
            backdrop: 'static',
            keyboard: false
        });
        $(".tablemodaldetallegrupoempleado tbody").empty()
        $("#modaldetallegrupoempleado .nombreempleadogru").html("")



        var idgrupo = $(this).attr("grupoempleadosolo")
        var nombre = $(this).attr("nomemple")
        var folio_proyecto = $("#select2proyecto").val()
        var datosss = {
            "clv_agrupador_empleado": idgrupo,
            "folio_proyecto": folio_proyecto
        };


        $("#modaldetallegrupoempleado .nombreempleadogru").html(nombre)

        $.ajax({
            type: "POST",
            url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
            data: datosss,
            success: function (Agrupador) {

                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {

                        var emple = '<tr>' +
                            ' <td> <label>' + Agrupador[i].clv_emp + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].nombre + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].genero + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].calificacionnumero + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].puesto + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].estado + '</label></td>' +
                            ' <td> <label>' + Agrupador[i].municipio + '</label></td>' +
                            '</tr>'

                        $(".tablemodaldetallegrupoempleado tbody").append(emple)//.hide().show('fast');

                    }
                }

            }
        })




    })


})

ajustarAlturaTab()



function validarCambioTab(currentTab) {

    switch (currentTab) {

        case 1:
            return true;

            break;

        case 2:
            return false;

            break;

        case 3:
            return true;

            break;

        case 4:
            return true;

            break;


    }
}




function validardatosbasicos() {
    //console.log("validardatosbasicos")
    link(0)
    return
	/*return false
        	if(validardatosbasicos()){
        		//link(0)
        		console.log("validado")
        	}else{
console.log(" novalidado")
			setTimeout(function(){ 
				link(0)
			}, 4000);

        	}*/
}

/*function validartemporalidades() {
    //console.log("validartemporalidades")
    return true

}*/

function validarcentrosterabajo() {
    //console.log("validarcentrosterabajo")
    return true

}

function validarempleados() {
    //console.log("validarempleados")
    return true

}




/*$(".hththt").on("click",function(){

	//showTab(1)
	link(0)

})*/


$('#select2marca').on('select2:select', function (e) {
    var data = e.params.data;
    //console.log(data.id);
    //console.log(data.text);
    $(".marcaseleccionadaresumen").html(data.text)
    if (data.text != "") {
        console.log("borra msn")
        $(".mensajevalidacionmarca").html("")
    }
});


/*$('#select2proyecto').on('select2:select', function (e) {
    var data = e.params.data;
    //console.log(data.id);
     console.log("mari ",data.text);
    $(".campaniaseleccionadaresumen").html(data.text)
    if (data.text != "") {
        console.log("borra msn")
        $(".mensajevalidaciocampania").html("")
    } 
});*/

$("#inputdescplantrabajo").on("keyup", function () {
    //console.log("probando chenf")
    $(".nombreplanseleccionadoresumen").html($(this).val())
    if ($(this).val() != "") {
        $(".mensajevalidacionnombreplan").html("")
    }

})






$("#mostrarmodalcentrostrabajo").on("click", function () {

    $('#modalagregarcentrotrabajogrupo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });


})



/*$('#modalagregarcentrotrabajo').modal({
    show: 'true',
    backdrop: 'static',
    keyboard: false
});

$('#modalagregarcentrotrabajo').modal('hide');*/



$("#agregaactividad").on('click', function () {

    $('#modalagregaractividadsolo').modal({
        show: 'true',
        backdrop: 'static',
        keyboard: false
    });

    $(".tablaactividadsolo tbody").empty()

    clv_actividad = ''
    descripcion = ''

    if ($(".renglonactividades").length > 0) {
        banderactividad++

    }

    $("#select2actividad").unbind();

    $('#select2actividad').on('select2:select', function (e) {

        var data = e.params.data;
        /*console.log(data.id);
            console.log(data.text);*/
        clv_actividad = data.id
        console.log("clv_actividad ", clv_actividad)
        descripcion = data.text
        console.log("descripcion ", descripcion)
        var empleado = '<tr class="unaactividad" id="unaactividad' + banderactividad + '">' +
            '<td><label class="labelformu" clv_actividad="' + clv_actividad + '">' + descripcion + '</label></td>' +
            '<td><button type="button" class="btn btn-verdescripcionmision btn-sm" data-toggle="popover"  title="Descripción de la Misión" ' +
            'data-placement="left" data-content="' + descripcion + '" > <i class="fa fa-eye" ></i> </button ></td>' +
            '<td><button class="btn btn-sm btn-danger eliminaractividadsolo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
            '</tr>'

        if (verificartablaactividadsolo(data) == 0) {


            $(".tablaactividadsolo tbody").append(empleado)

        }

        $(".eliminaractividadsolo").unbind();
        $(".eliminaractividadsolo").on("click", function () {
            //console.log("eliminar jej")
            $(this).parent().parent().hide("slow", function () { $(this).remove(); })


        })
        $(function () {
            $('[data-toggle="popover"]').popover()
        })

    });



    function verificartablaactividadsolo(data) {


        var bande = 0;

        $(".tablaactividadsolo tbody tr label").each(function () {
            //classcaro=$(this).attr("class")
            folio = $(this).attr("clv_actividad")
            //console.log("folio", folio);
            //console.log("data.id", data.id);

            if (bande == 0) {

                if (folio == data.id) {

                    //console.log("repetido")
                    bande = 1
                }

            }


        })


        return bande

    }


    $("#agregaractividadmodalsolo").unbind();
    $("#agregaractividadmodalsolo").on("click", function () {


        $("#modalagregaractividadsolo").modal("hide")

        $(".tablaactividadsolo tbody tr label").each(function () {

            clv_actividad = $(this).attr("clv_actividad")
            descripcion = $(this).html()


            if ($(".tableactividades .unaactividad ").length > 0) {
                console.log("si hay actividades")
                if (verificarexisteactividad(clv_actividad) == 0) {

                    var empleado = '<tr class="unaactividad" id="unaactividad' + banderactividad + '">' +
                        '<td><label class="labelformu" clv_actividad="' + clv_actividad + '">' + descripcion + '</label></td>' +
                        '<td><button type="button" class="btn btn-verdescripcionmision btn-sm" data-toggle="popover"  title="Descripción de la Misión" ' +
                        'data-placement="left" data-content="' + descripcion + '" > <i class="fa fa-eye" ></i> </button ></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminaactividad" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'

                    $(".tabactividades .contNewPl .tableactividades tbody").append(empleado).hide().show('fast');

                }





            } else {
                console.log("no hay actividades")
                var empleado = '<div class="row renglonactividades">' +
                    '<h5 class="titulorent">Actividades</h5>' +
                    '<div class="col-md-6">' +
                    '<div class="col-md-8">' +
                    '<table class="table tableactividades">' +
                    '<tbody>' +
                    '<tr class="unaactividad" id="unaactividad1">' +
                    '<td><label class="labelformu" clv_actividad="' + clv_actividad + '" id="unaactividad1">' + descripcion + '</label></td>' +
                    '<td><button type="button" class="btn btn-verdescripcionmision btn-sm" data-toggle="popover"  title="Descripción de la Misión" ' +
                    'data-placement="left" data-content="' + descripcion + '" > <i class="fa fa-eye" ></i> </button ></td>' +
                    '<td><button class="btn btn-sm btn-danger eliminaactividad" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                    '</tr>' +
                    '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '</div> ' +
                    '</div>'
                $(".tabactividades .contNewPl").append(empleado).hide().show('fast');

            }



        })

        function verificarexisteactividad(folio) {
            console.log("jandro");

            var bande = 0;

            $(" .renglonactividades .table tbody tr label").each(function () {
                //classcaro=$(this).attr("class")
                foliod = $(this).attr("clv_actividad")
                //console.log("$(this)", $(this));
                console.log("folio solo ", folio);
                console.log("foliod solo//", foliod);

                if (bande == 0) {

                    if (folio == foliod) {

                        console.log("repetido")
                        bande = 1
                    }

                }


            })

            //console.log("bande", bande);
            return bande

        }
        //eliminaactividad

        $(".eliminaactividad").on('click', function () {

            console.log("idasasasa", id);

            console.log("cantidad", $(".tableactividades .unaactividad").length)
            if ($(".tableactividades .unaactividad").length == 1) {

                $(this).parent().parent().parent().parent().parent().parent().parent().hide("slow", function () { $(this).remove(); })
            } else {
                //$("#uncentrotrabajo"+id).hide("slow", function(){ $(this).remove(); })
                var id = $(this).parent().parent().hide("slow", function () { $(this).remove(); })
            }
        })
        $(function () {
            $('[data-toggle="popover"]').popover()
        })
    })



})