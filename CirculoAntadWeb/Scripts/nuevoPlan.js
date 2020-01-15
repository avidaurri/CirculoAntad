
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

$.get("/Home/ObtenerEmpleados", function (data, statusText) { //si

    $.each(data, function (i, item) {

        $('#select2empleado').append(" <option value=" + item.clv_emp + " class='opcionDeSelect'>" + item.nombre + "</option>")
        $('#select2empleadosolo').append(" <option value=" + item.clv_emp + " class='opcionDeSelect'>" + item.nombre + "</option>")
    });

});


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

function agregarAgrupacionCentrosTrabajo() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableagrupacioncentrotrabajotem tbody").empty();
    $(".tableagrupacioncentrotrabajosolo tbody").empty();
    

    var folio_proyecto = $("#select2proyecto").val()
    console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerAgrupacionCentrosTrabajo", //si
        data: datosss,
        success: function (Agrupador) {
            console.log("Agrupador", Agrupador.length)

            if (Agrupador.length > 0) {

                for (i = 0; i < Agrupador.length; i++) {

                    console.log("Agrupador i ", Agrupador[i].descripcion)

                    renglonagru = '<tr>'+
                        '<td> <label >' + Agrupador[i].descripcion +'</label></td>'+
                        ' <td><label >' + Agrupador[i].tipo +'</label></td>'+
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregargrupocentrotem" grupocentrotrabajo="' + Agrupador[i].clv_agrupador_centro_trabajo +'">Agregar</button> </label></td>'+
                        '</tr>';

                    $(".tableagrupacioncentrotrabajotem tbody").append(renglonagru)


                    renglonagrusolo = '<tr>' +
                        '<td> <label >' + Agrupador[i].descripcion + '</label></td>' +
                        ' <td><label >' + Agrupador[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregargrupocentrosolo" grupocentrotrabajosolo="' + Agrupador[i].clv_agrupador_centro_trabajo + '">Agregar</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacioncentrotrabajosolo tbody").append(renglonagrusolo)


                }

            }


            $('#backd').loading('stop');
        }

    })

}

function agregarAgrupacionEmpleado() {
    $('#backd').loading('start');
    $('div.loading-overlay-content').html('Espere un momento')

    $(".tableagrupacionempleadotem tbody").empty();
    $(".tableagrupacionempleadosolo tbody").empty();

    var folio_proyecto = $("#select2proyecto").val()
    console.log("folio_proyecto ", folio_proyecto)

    var datosss = {
        "folio_proyecto": folio_proyecto
    };



    $.ajax({
        type: "POST",
        url: "/Home/ObtenerAgrupacionEmpleado", //si
        data: datosss,
        success: function (Empleado) {
            console.log("empleados", Empleado)

            if (Empleado.length > 0) {

                for (i = 0; i < Empleado.length; i++) {

                    console.log("Agrupador i ", Empleado[i].descripcion)

                    renglonemp = '<tr>' +
                        '<td> <label >' + Empleado[i].descripcion + '</label></td>' +
                        ' <td><label >' + Empleado[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregargrupoempleadotem" grupoempleado="' + Empleado[i].clv_agrupador_empleado + '">Agregar</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacionempleadotem tbody").append(renglonemp)

                    renglonempsologrupo = '<tr>' +
                        '<td> <label >' + Empleado[i].descripcion + '</label></td>' +
                        ' <td><label >' + Empleado[i].tipo + '</label></td>' +
                        ' <td ><label ><button class="btn btn-sm btn-outline-primary agregarempleadosolo" grupoempleadosolo="' + Empleado[i].clv_agrupador_empleado + '">Agregar</button> </label></td>' +
                        '</tr>';

                    $(".tableagrupacionempleadosolo tbody").append(renglonempsologrupo)


                }

            }


            $('#backd').loading('stop');
        }

    })

}


$('#select2proyecto').on('select2:select', function (e) {

    agregarAgrupacionCentrosTrabajo()
    agregarAgrupacionEmpleado()
});

agregarAgrupacionCentrosTrabajo()
agregarAgrupacionEmpleado()

//CARGAR SUBCATEGORIAS CON RESPECTO A LA CATEGORIA AL EDITAR TICKET
/*$('#select2marca').on('select2:select', function (e) {
    $("#select2proyecto").attr("disabled", true);
    var data = e.params.data;
   //console.log(data);
      //   console.log(data.text);
    //folioCentroT = data.id
    var valor = data.id
    console.log(valor);

    if (valor == "") {
        $('#select2marca').empty();
        $('#select2marca').append(" <option value=''> Selecciona una marca </option>");
    } else {
        console.log("traer proyectos")
        $.get("/Home/ObtenerProyectos?idC=" + valor, function (data, statusText) { //si
            // console.log(data);
            $(this).html('#select2proyecto');

            $('#select2proyecto').empty();
            $('#select2proyecto').append(" <option value=''> Selecciona un proyecto </option>");
            //console.log("bandera")
            $.each(data, function (i, item) {
                //console.log(item.DescripcionSubCategoria);

                $('#select2proyecto').append(" <option value=" + item.folio_proyecto + " class='opcionDeSelect'>" + item.descripcion + "</option>")
            });
            $("#select2proyecto").attr("disabled", false);
        });
    }

})*/

$('#backd').loading('start');
$('div.loading-overlay-content').html('Espere un momento')

var banderaTemp = 1;
var banderaCentroTrabajoTemp = 1;
var banderaEmpleadoCentroTrabajoTemp = 1;
var banderacentrotrabajo = 1
var banderaempleado = 1
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
        document.getElementById("nextBtn").innerHTML = "Revisar y Crear";
    } else {
        document.getElementById("nextBtn").innerHTML = "Siguiente";
    }

    fixStepIndicator(n)


    var ope = currentTab * 25
    $("#baraprogresoconfigurar .progress-bar").css("width", ope + "%")
    $("#baraprogresoconfigurar .progress-bar").html(" " + ope + "% " + " Completado")
    ajustarAlturaTab()


	/*switch (currentTab){
            
        case 1:
        validardatosbasicos()
        	//return true;

			
        break;

        case 2:
        	//return false;
			
        break;

        case 3:
        	//return true;
			
        break;

        case 4:
        	//return true;
			
        break;


    } */

}




function nextPrev(n) {
    //console.log("n", n);

    var x = document.getElementsByClassName("tab");//--> x(6)
    x[currentTab].style.display = "none";//vista bloquedo
    currentTab = parseInt(currentTab) + parseInt(n);// vista desbloquedo = vista bloqueado + 1  ***/

    // console.log("currentTab", currentTab);


    //if(validarCambioTab(currentTab)){

    if (currentTab >= x.length) {// si esta al final de la vista enviardatos porfas

        document.getElementById("regForm").submit();
        return false;
    }

    showTab(currentTab);// vista desbloqueado = vista bloqueado + 1    
    /*var ope=currentTab*25
    $("#baraprogresoconfigurar .progress-bar").css("width",ope+"%")
    $("#baraprogresoconfigurar .progress-bar").html(" "+ope+"% "+" Completado")
    ajustarAlturaTab()*/

    /*}else{
    	console.log("logo")
    	regree(-1)
    	//showTab(currentTab-1);
    }*/




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
    var ope = currentTab * 25
    $("#baraprogresoconfigurar .progress-bar").css("width", ope + "%")
    $("#baraprogresoconfigurar .progress-bar").html(" " + ope + "% " + " Completado")
    ajustarAlturaTab()



}

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
            '<input type="text" class="form-control" id="tempInputDesc' + banderaTemp + '">' +
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
            '<div class="col-md-6">' +
            '<br>' +
            '<button class="btn btn-outline-primary btn-sm agregarCentroTrabajoTem" id="agregarCentroTrabajoTem' + banderaTemp + '">Agregar Centro de trabajo</button>' +
            '<br>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<br>' +
            '<button class="btn btn-outline-primary btn-sm agregarGrupoCentroTrabajoTem" id="agregarGrupoCentroTrabajoTem' + banderaTemp + '">Agregar Grupo de Centros de trabajo</button>' +
            '<br>' +
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
            '<input type="text" class="form-control" id="tempInputDesc1">' +
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
            '<div class="col-md-6">' +
            '<br>' +
            '<button class="btn btn-outline-primary btn-sm agregarCentroTrabajoTem" id="agregarCentroTrabajoTem1">Agregar Centro de trabajo</button>' +
            '<br>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<br>' +
            '<button class="btn btn-outline-primary btn-sm agregarGrupoCentroTrabajoTem" id="agregarGrupoCentroTrabajoTem1">Agregar Grupo de Centros de trabajo</button>' +
            '<br>' +
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


    $(".irfre .fa-angle-right").on('click', function () {

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
                console.log("eliminar jej")
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
                            '<div class="col-md-6"> ' +
                            '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Empleado</button>' +
                            '</div>' +
                            '<div class="col-md-6"> ' +
                            '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Grupo de Empleados</button>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '</div> '
                        // console.log("#untemporizador"+padre+" .rengloncentrotrabajotempo #accordion"+parentaccordion)
                        $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion).append(centrotravajoTem).hide().show('fast');

                    }

                } else {
                    //console.log("si es primera")
                    var centrotravajoTem = '<div class="row rengloncentrotrabajotempo" id="rengloncentrotrabajotempo1">' +
                        '<h5 class="tituloren">Centros de trabajo</h5>' +
                        '<div class="col-md-8 frfr">' +
                        '<div class="panel-group" id="accordion' + banderaTemp + '">' +

                        '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador1">' +
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
                        '<div class="col-md-6"> ' +
                        '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem1">Agregar Empleado</button>' +
                        '</div>' +
                        '<div class="col-md-6"> ' +
                        '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem1">Agregar Grupo de Empleados</button>' +
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
                ideliminarcentrotrabajotemp = $(this).attr("id").substring(33);
                //console.log(" borrar   centro trabajo"+ideliminarcentrotrabajotemp);
                //console.log("#uncentrotrabajotemporizador"+ideliminarcentrotrabajotemp)
                var padreacco = $(this).parent().parent().parent().attr("id").substring(9)
                var padretem = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14)
                $("#untemporizador" + padretem + " #accordion" + padreacco + " #uncentrotrabajotemporizador" + ideliminarcentrotrabajotemp).hide("slow", function () { $(this).remove(); })
                /*$("#carousel-example-generic .right").click();

            setTimeout(function(){ 
        	

                verificarCantidadTempo()
            }, 3000);*/
            })


            $(".agregarEmpleadoCentroTrabajoTem").unbind();
			/*console.log("se elimino")
			console.log("se agrego")*/
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
                            console.log("si es primera")
                            var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                '<h5 class="tituloren">Empleados</h5> ' +
                                '<div class="col-md-6 frfr">' +
                                '<table class="table table-condensed tableespeci">' +
                                '<tbody>' +
                                '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado1">' +
                                '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem1"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
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
                        /*$("#carousel-example-generic .right").click();

                    setTimeout(function(){ 
                	

                        verificarCantidadTempo()
                    }, 3000);*/
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

            })

            $(".agregarGrupoEmpleadoCentroTrabajoTem").unbind();
			/*console.log("se elimino")
			console.log("se agrego")*/
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


                    var datosss = {
                        "clv_agrupador_empleado": idgrupo
                    };


                    $.ajax({
                        type: "POST",
                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                        data: datosss,
                        success: function (Agrupador) {
                            console.log("Agrupador", Agrupador)
                            if (Agrupador.length > 0) {

                                for (i = 0; i < Agrupador.length; i++) {


                                    clvemp = Agrupador[i].clv_emp
                                    nombreempleado = Agrupador[i].nombre


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
                                        console.log("si es primera")
                                        var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                            '<h5 class="tituloren">Empleados</h5> ' +
                                            '<div class="col-md-6 frfr">' +
                                            '<table class="table table-condensed tableespeci">' +
                                            '<tbody>' +
                                            '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado1">' +
                                            '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem1"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                            '</tr>' +
                                            '</tbody>' +
                                            '</table>' +
                                            '</div>' +
                                            '</div>'


                                        $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');
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


                });





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
                                        '<div class="col-md-6"> ' +
                                        '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Empleado</button>' +
                                        '</div>' +
                                        '<div class="col-md-6"> ' +
                                        '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem' + banderaCentroTrabajoTemp + '">Agregar Grupo de Empleados</button>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div>' +
                                        '</div> '
                                    // console.log("#untemporizador"+padre+" .rengloncentrotrabajotempo #accordion"+parentaccordion)
                                    $("#untemporizador" + padre + " .rengloncentrotrabajotempo #accordion" + parentaccordion).append(centrotravajoTem).hide().show('fast');

                                }

                            } else {
                                //console.log("si es primera")
                                var centrotravajoTem = '<div class="row rengloncentrotrabajotempo" id="rengloncentrotrabajotempo1">' +
                                    '<h5 class="tituloren">Centros de trabajo</h5>' +
                                    '<div class="col-md-8 frfr">' +
                                    '<div class="panel-group" id="accordion' + banderaTemp + '">' +

                                    '<div class="panel panel-default uncentrotrabajotemporizador" id="uncentrotrabajotemporizador1">' +
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
                                    '<div class="col-md-6"> ' +
                                    '<button class="btn btn-sm btn-outline-warning agregarEmpleadoCentroTrabajoTem" id="agregarEmpleadoCentroTrabajoTem1">Agregar Empleado</button>' +
                                    '</div>' +
                                    '<div class="col-md-6"> ' +
                                    '<button class="btn btn-sm btn-outline-warning agregarGrupoEmpleadoCentroTrabajoTem" id="agregarGrupoEmpleadoCentroTrabajoTem1">Agregar Grupo de Empleados</button>' +
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
                                ideliminarcentrotrabajotemp = $(this).attr("id").substring(33);
                                var padreacco = $(this).parent().parent().parent().attr("id").substring(9)
                                var padretem = $(this).parent().parent().parent().parent().parent().parent().parent().attr("id").substring(14)
                                $("#untemporizador" + padretem + " #accordion" + padreacco + " #uncentrotrabajotemporizador" + ideliminarcentrotrabajotemp).hide("slow", function () { $(this).remove(); })

                            })


                            $(".agregarEmpleadoCentroTrabajoTem").unbind();

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
                                            console.log("si es primera")
                                            var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                '<h5 class="tituloren">Empleados</h5> ' +
                                                '<div class="col-md-6 frfr">' +
                                                '<table class="table table-condensed tableespeci">' +
                                                '<tbody>' +
                                                '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado1">' +
                                                '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                                '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem1"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
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

                            })

                            $(".agregarGrupoEmpleadoCentroTrabajoTem").unbind();
                            /*console.log("se elimino")
                            console.log("se agrego")*/
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


                                    var datosss = {
                                        "clv_agrupador_empleado": idgrupo
                                    };


                                    $.ajax({
                                        type: "POST",
                                        url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
                                        data: datosss,
                                        success: function (Agrupador) {
                                            console.log("Agrupador", Agrupador)
                                            if (Agrupador.length > 0) {

                                                for (i = 0; i < Agrupador.length; i++) {


                                                    clvemp = Agrupador[i].clv_emp
                                                    nombreempleado = Agrupador[i].nombre

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
                                                        console.log("si es primera")
                                                        var empleadocentrotrabajotem = '<div class="row renglonempleadocentrotrabajotempo">' +
                                                            '<h5 class="tituloren">Empleados</h5> ' +
                                                            '<div class="col-md-6 frfr">' +
                                                            '<table class="table table-condensed tableespeci">' +
                                                            '<tbody>' +
                                                            '<tr class="unempleadocentrotrabajotemporizado" id="unempleadocentrotrabajotemporizado1">' +
                                                            '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                                            '<td><button class="btn btn-sm btn-danger eliminarempleadocentrotrabajoTem" id="eliminarempleadocentrotrabajoTem1"><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                                            '</tr>' +
                                                            '</tbody>' +
                                                            '</table>' +
                                                            '</div>' +
                                                            '</div>'


                                                        $("#untemporizador" + padredeagregaremple + " #collapse" + padrecollapse + " .contenedorempleadocentrotrabajotem ").append(empleadocentrotrabajotem).hide().show('fast');
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


                                });





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

                    var centrotrabajo = '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderacentrotrabajo + '">' +
                        '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'

                    $(".tabcentrotrabajo .contNewPl .table tbody").append(centrotrabajo).hide().show('fast');

                }


            } else {
                console.log("el primero")
                var centrotrabajo = '<div class="row renglonCentroTrabajo">' +
                    '<h5 class="tituloren">Centros de trabajo</h5>' +
                    '<div class="col-md-6">' +
                    '<div class="col-md-8">' +
                    '<table class="table tableespeci">' +
                    '<tbody>' +
                    '<tr class="uncentrotrabajo" id="uncentrotrabajo1">' +
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

                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {

                        folio = Agrupador[i].folio_centro_trabajo
                        nombreCentroT = Agrupador[i].descripcion

                        if ($(".renglonCentroTrabajo").length > 0) {
                            console.log("mas de uno")
                            if (verificarexistecentrotrabajo(folio) == 0) {

                                var centrotrabajo = '<tr class="uncentrotrabajo" id="uncentrotrabajo' + banderacentrotrabajo + '">' +
                                    '<td><label class="labelformu" foliocentrotrabajo="' + folio + '">' + nombreCentroT + '</label></td>' +
                                    '<td><button class="btn btn-sm btn-danger eliminarcentrotrabajo" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                    '</tr>'

                                $(".tabcentrotrabajo .contNewPl .table tbody").append(centrotrabajo).hide().show('fast');

                            }


                        } else {
                            console.log("el primero")
                            var centrotrabajo = '<div class="row renglonCentroTrabajo">' +
                                '<h5 class="tituloren">Centros de trabajo</h5>' +
                                '<div class="col-md-6">' +
                                '<div class="col-md-8">' +
                                '<table class="table tableespeci">' +
                                '<tbody>' +
                                '<tr class="uncentrotrabajo" id="uncentrotrabajo1">' +
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

})


$("#agregaempleado").on('click', function () {

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

    }

    $("#select2empleadosolo").unbind();

    $('#select2empleadosolo').on('select2:select', function (e) {

        //$('#modalagregarempleadosolo').modal('hide');

        var data = e.params.data;
        /*console.log(data.id);
            console.log(data.text);*/
        clvemp = data.id
        nombreempleado = data.text

        var empleado = '<tr class="unempleado" id="unempleado' + banderaempleado + '">' +
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

                    var empleado = '<tr class="unempleado" id="unempleado' + banderaempleado + '">' +
                        '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                        '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                        '</tr>'

                    $(".tabempleado .contNewPl .table tbody").append(empleado).hide().show('fast');

                }





            } else {
                var empleado = '<div class="row renglonempleado">' +
                    '<h5 class="tituloren">Empleados</h5>' +
                    '<div class="col-md-6">' +
                    '<div class="col-md-8">' +
                    '<table class="table tableespeci">' +
                    '<tbody>' +
                    '<tr class="unempleado" id="unempleado1">' +
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

    }


    $(".agregarempleadosolo").unbind();
    $(".agregarempleadosolo").on("click", function () {

        var idgrupo = $(this).attr("grupoempleadosolo")

        $("#modalagregarempleadogruposolo").modal("hide")

        var datosss = {
            "clv_agrupador_empleado": idgrupo
        };


        $.ajax({
            type: "POST",
            url: "/Home/ObtenerEmpleadosDeAgrupacion", //si
            data: datosss,
            success: function (Agrupador) {

                if (Agrupador.length > 0) {

                    for (i = 0; i < Agrupador.length; i++) {

                        clvemp = Agrupador[i].clv_emp
                        nombreempleado = Agrupador[i].nombre

                        if ($(".renglonempleado").length > 0) {

                            if (verificarexisteempleado(clvemp) == 0) {

                                var empleado = '<tr class="unempleado" id="unempleado' + banderaempleado + '">' +
                                    '<td><label class="labelformu" clvemp="' + clvemp + '">' + nombreempleado + '</label></td>' +
                                    '<td><button class="btn btn-sm btn-danger eliminarempleado" ><i class="fa fa-times" aria-hidden="true"></i></button></td>' +
                                    '</tr>'

                                $(".tabempleado .contNewPl .table tbody").append(empleado).hide().show('fast');

                            }

                        } else {
                            var empleado = '<div class="row renglonempleado">' +
                                '<h5 class="tituloren">Empleados</h5>' +
                                '<div class="col-md-6">' +
                                '<div class="col-md-8">' +
                                '<table class="table tableespeci">' +
                                '<tbody>' +
                                '<tr class="unempleado" id="unempleado1">' +
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

function validartemporalidades() {
    //console.log("validartemporalidades")
    return true

}

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
});


$('#select2proyecto').on('select2:select', function (e) {
    var data = e.params.data;
    //console.log(data.id);
    //  console.log(data.text);
    $(".campaniaseleccionadaresumen").html(data.text)
});

$("#inputdescplantrabajo").on("keyup", function () {
    //console.log("probando chenf")
    $(".nombreplanseleccionadoresumen").html($(this).val())

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
