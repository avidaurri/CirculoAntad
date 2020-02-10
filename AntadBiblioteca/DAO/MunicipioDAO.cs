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
    public class MunicipioDAO
    {
        public ConexionDB conexion;

        public MunicipioDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Municipio> ConsultarMunicipios(Estado login)
        {
            string sql = "select * from municipio where clv_edo=(select clv_edo from estado where clv_edo=@estado)";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@estado";
            paramCliente.Valor = login.clv_estado.ToString();
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Municipio> municipios = new List<Municipio>();

            while (reader.Read())
            {
                Municipio municipio = new Municipio();
                municipio.clv_municipio =Convert.ToInt32(reader["clv_mun"].ToString());
                municipio.nombre = reader["nombre"].ToString();
                municipios.Add(municipio);
            }
            conexion.Cerrar();
            return municipios;
        }
    }
}
