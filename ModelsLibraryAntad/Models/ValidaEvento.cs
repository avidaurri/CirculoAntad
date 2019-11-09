using System;
using System.Collections.Generic;
using System.Text;

namespace ModelsLibraryAntad.Models
{
    public class ValidaEvento
    {
        //personales
        public int clv_Empleado { get; set; } //1
        public string fotoUsuario { get; set; }//1  
        public string nombreUsuario { get; set; }//1
        public string sexoUsuario { get; set; }
        public string imssUsuario { get; set; } //1
        public int edadUsuario { get; set; } //1
        public string alturaUsuario { get; set; } //1
        public int clv_Puesto { get; set; } //1
        public string puesto { get; set; } //1
        //sucursal
        public string folioSucursal { get; set; } //1
        public string fotoSucursal { get; set; } //1
        public string nombreSucursal { get; set; } //1
        //proyecto
        public string folioProyecto { get; set; } //1
        public string agencia { get; set; } //1
        //evento
        public string folioEvento { get; set; } //1
        public string fechaInicioEvento { get; set; } //1
        public string fechaFinalEvento { get; set; } //1
        public string fechaInicioEventoEmpleado { get; set; } //1
        public string fechaFinalEventoEmpleado { get; set; } //1
        public string estatusEvento { get; set; }//1  api
        public int clvEstatusEvento { get; set; } //1
        public string estatusEventoUsuario { get; set; }//1  api
        public int clvEstatusEventoUsuario { get; set; } //1
        public string tipoEvento { get; set; }//1  api
        public int clvTipoEvento { get; set; } //1


        //requisitos fijos
        public string sexoSucursal { get; set; } //2
        public string mensajevalidacionsexo { get; set; } //1
        public bool sexoValidado { get; set; } //3
        public bool errorSexo { get; set; } //3

        public string imssSuc { get; set; } //2
        public bool imssSucursal { get; set; } //2
        public string mensajevalidacionimss { get; set; } //1
         public bool imssValidado { get; set; } //2
        public bool errorIms { get; set; } //2


        public List<Rango> requisitosRangos { get; set; } //2
        public List<Valor> requisitosValores { get; set; } //2
        public List<Curso> requisitoCursos { get; set; } //2
        public class Valor
        {
            public string nombreRequisito { get; set; }
            public double valorRequerido { get; set; }
            public double valor { get; set; }
            public bool validado { get; set; }
            public bool errorvaidado { get; set; }
            public bool mensaje { get; set; }
        }
        public class Rango
        {
            public string nombreRequisito { get; set; }
            public double menor { get; set; }
            public double mayor { get; set; }
            public double valor { get; set; }
            public bool validado { get; set; }
            public bool errorvaidado { get; set; }
            public bool mensaje { get; set; }
        }

        public class Curso
        {
            public string nombreCurso { get; set; }
            public double valor { get; set; }
            public double menor { get; set; }
            public double mayor { get; set; }
            public bool validado { get; set; }
            public bool errorvaidado { get; set; }
            public string mensaje { get; set; }
            public string caducidad { get; set; }
        }

        public bool validacionFinal { get; set; }


    }
}
