using AntadBiblioteca.Util;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.DAO
{
    public class CalificacionDAO
    {
        public ConexionDB conexion;

        public CalificacionDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Calificacion> ConsultarCalificaciones(UserSessionWeb login)
        {
            string sql = "select distinct calificacion_empleado from empleado where calificacion_empleado is not null";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@folio_dominio";
            paramCliente.Valor = login.folioAgencia;
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Calificacion> calificaciones = new List<Calificacion>();

            while (reader.Read())
            {
                Calificacion calificacion = new Calificacion();
                calificacion.calificacion =Convert.ToInt32(reader["calificacion_empleado"].ToString());

                calificaciones.Add(calificacion);
            }
            conexion.Cerrar();
            return calificaciones;
        }
    }
}
