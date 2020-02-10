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

        public List<ActividadWeb> ConsultarActividades(UserSessionWeb login)
        {
            string sql = "SELECT * FROM actividad_plan_cara";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<ActividadWeb> actividades = new List<ActividadWeb>();

            while (reader.Read())
            {
                ActividadWeb actividad = new ActividadWeb();
                actividad.clv_actividad = Convert.ToInt32(reader["clv_actividad"].ToString());
                actividad.descripcion = reader["descripcion"].ToString();
                actividades.Add(actividad);
            }
            conexion.Cerrar();
            return actividades;
        }

        

        public List<ActividadWeb> ObtenerActividadproyecto(ActividadWeb actividad)
        {
            string sql = "select * from proyecto_mecanica where folio_proyecto=@folio_proyecto";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramAFol= new Parametro();
            paramAFol.Nombre = "@folio_proyecto";
            paramAFol.Valor = actividad.folio_proyecto.ToString();
            parametros.Add(paramAFol);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<ActividadWeb> actividades = new List<ActividadWeb>();

            while (reader.Read())
            {
                ActividadWeb actividaddd = new ActividadWeb();
                actividaddd.clv_actividad = Convert.ToInt32(reader["clv_actividad"].ToString());
                actividaddd.descripcion = reader["descripcion"].ToString();
                actividades.Add(actividaddd);
            }
            conexion.Cerrar();
            return actividades;
        }


    }
}
