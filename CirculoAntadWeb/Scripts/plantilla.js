

$(function () {
    $('#example1').DataTable()
    $('#tablaplanes').DataTable({
        'paging': true,
        'lengthChange': true,
        'searching': true,
        'ordering': true,
        'info': true,
        'autoWidth': true,
        "language": {

            "sProcessing": "Procesando...",
            "sLengthMenu": "Mostrar _MENU_ registros",
            "sZeroRecords": "No se encontraron resultados",
            "sEmptyTable": "Ningún dato disponible en esta tabla",
            "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_",
            "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0",
            "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sInfoPostFix": "",
            "sSearch": "Buscar Plan:",
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
        "lengthMenu": [[5, 10, 25, 50], [5, 10, 25, 50]],
    })
})

$('#select2proyecto').select2()
$('#select2centroTrabajo').select2()
$('#select2empleado').select2()
$('#select2actividades').select2()
$('#select2marca').select2()
$('#select2centrotrabajo').select2()


$('#select2centrotrabajosolo').select2()
$('#select2empleadosolo').select2()


$('.datepicker').datepicker({
    autoclose: true
})







