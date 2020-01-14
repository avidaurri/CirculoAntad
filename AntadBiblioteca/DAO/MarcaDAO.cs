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
    public class MarcaDAO
    {
        public ConexionDB conexion;

        public MarcaDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Marca> ConsultarMarcas(UserSessionWeb login)
        {
            string sql = "select distinct pc.clv_cli, c.nombre from proyecto_dominio pd left join proyecto_cara pc on pd.folio_proyecto = pc.folio_proyecto " +
                "left join cliente c on pc.clv_cli = c.clv_cli where pd.folio_dominio =@folio_dominio and pc.clv_edo_gen_proyecto = 2";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@folio_dominio";
            paramCliente.Valor = login.folioAgencia;
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Marca> marcas = new List<Marca>();

            while (reader.Read())
            {
                Marca marca = new Marca();
                marca.clv_cli = reader["clv_cli"].ToString();
                marca.nombre = reader["nombre"].ToString();
                marcas.Add(marca);
            }
            conexion.Cerrar();
            return marcas;
        }
    }
}
