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
    public class ActividadDAO
    {
        public ConexionDB conexion;

        public ActividadDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Actividad> ConsultarActividades(UserSessionWeb login)
        {
            string sql = "SELECT * FROM actividad_plan_cara";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Actividad> actividades = new List<Actividad>();

            while (reader.Read())
            {
                Actividad actividad = new Actividad();
                actividad.clv_actividad = Convert.ToInt32(reader["clv_actividad"].ToString());
                actividad.descripcion = reader["descripcion"].ToString();
                actividades.Add(actividad);
            }
            conexion.Cerrar();
            return actividades;
        }
    }
}
