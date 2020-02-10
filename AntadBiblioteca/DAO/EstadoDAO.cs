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
    public class EstadoDAO
    {
        public ConexionDB conexion;

        public EstadoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Estado> ConsultarEstados(UserSessionWeb login)
        {
            string sql = "select distinct nombre as estado, clv_edo  from estado";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@folio_dominio";
            paramCliente.Valor = login.folioAgencia;
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Estado> estados = new List<Estado>();

            while (reader.Read())
            {
                Estado estado = new Estado();
                estado.nombre = reader["estado"].ToString();
                estado.clv_estado = Convert.ToInt32(reader["clv_edo"].ToString());
                estados.Add(estado);
            }
            conexion.Cerrar();
            return estados;
        }
    }
}
