

var tablaMisTickets = $("#tbprojectmanager").DataTable({

    "ajax": {

        "url": "/Home/ObtenerListaPlanes", //si
        "type": "POST",
        "datatype": "json",
                        "data": {

                                "filtrogenero": function () { return "pruebapara" }
                            }
    },
    "columns": [
        { "data": "folio_trabajo" },
        { "data": "proyecto", 'searchable': false },
        { "data": "descripcion", 'searchable': false },
        { "data": "fecha_ini", 'searchable': false },
        { "data": "fecha_fin", 'searchable': false },
        { "data": "dominio", 'searchable': false },
        { "data": "estado", 'searchable': false },
        { "data": { folio_trabajo: "folio_trabajo" } }

    ],
    "columnDefs": [

        {

            'searchable': true,
            'orderable': true,

            "render": function (data, type, row) {
                //console.log("la vista es : " + data.PendientePorVisualizar)
                /*checkse = "";
                botones5 = "";*/
                return "<button class='btn btn-warning btn-sm editarPlanTrabajo' foliotrabajo=" + data.folio_trabajo + "  ><i class='fa fa-pencil'></i> Editar</button>";
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
        "sSearch": "Buscar Folio de trabajo:",
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
    "sScrollY": ($(window).height() - 320),
    scrollX: true,
    scrollCollapse: true,
    "lengthMenu": [[10, 25, 50], [10, 25, 50]]

});

console.log("hola imi")
$("#irespecifico").on("click", function () {

    window.location = "NuevoPlan";

})

$("#irgeneral").on("click", function () {

    window.location = "NuevoPlanG";

})

/*
setTimeout(function () {
    $("#tbprojectmanager .editarPlanTrabajo").on("click", function () {
        //$(".tablamisplanes tbody tr label .chkemple").each(function () {
        folioplan = $(this).attr("foliotrabajo")
        console.log("folioplannn ", folioplan)

       // var baseUrl = 'Url.Action("EditarPlan","Home")';
        var url = "EditarPlan" + "/" + folioplan;
        window.location=url
    })
}, 5000);*/

/*
setTimeout(function () {
    $("#tbprojectmanager .editarPlanTrabajo").on("click", function () {
        //$(".tablamisplanes tbody tr label .chkemple").each(function () {
        folioplan = $(this).attr("foliotrabajo")
        console.log("folioplan ", folioplan)

        var baseUrl='@Url'
    })
}, 5000);*/