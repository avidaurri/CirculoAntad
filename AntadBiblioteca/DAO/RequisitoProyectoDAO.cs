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
    public class RequisitoProyectoDAO
    {
        public ConexionDB conexion;

        public RequisitoProyectoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }


        public List<RequisitoProyecto> ObtenerRequisitosproyecto(ActividadWeb actividad)
        {
            string sql = "select prp.proyecto_cara as folio_proyecto, prp.clv_puesto, cp.puesto, prp.cantidad " +
                "from proyecto_requisitos_personal prp left join cat_puesto cp on cp.clv_puesto = prp.clv_puesto " +
                "where prp.proyecto_cara = @folio_proyecto";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramAFol = new Parametro();
            paramAFol.Nombre = "@folio_proyecto";
            paramAFol.Valor = actividad.folio_proyecto.ToString();
            parametros.Add(paramAFol);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<RequisitoProyecto> requisitos = new List<RequisitoProyecto>();

            while (reader.Read())
            {
                RequisitoProyecto requisito = new RequisitoProyecto();
                requisito.clv_puesto = Convert.ToInt32(reader["clv_puesto"].ToString());
                requisito.folio_proyecto = reader["folio_proyecto"].ToString();
                requisito.puesto = reader["puesto"].ToString();
                requisito.cantidad = Convert.ToInt32(reader["cantidad"].ToString());
                requisitos.Add(requisito);
            }
            conexion.Cerrar();
            return requisitos;
        }

    }
}
