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
    public class ProyectoDAO
    {
        public ConexionDB conexion;

        public ProyectoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Proyecto> ConsultarProyectos(UserSessionWeb login)
        {
            string sql = "SELECT * FROM proyecto_cara";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Proyecto> proyectos = new List<Proyecto>();

            while (reader.Read())
            {
                Proyecto proyecto = new Proyecto();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                proyecto.folio_proyecto = reader["folio_proyecto"].ToString();
                proyecto.descripcion = reader["descripcion"].ToString();
                proyectos.Add(proyecto);
            }
            conexion.Cerrar();
            return proyectos;
        }
    }
}
