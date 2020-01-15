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
    public class CentroTrabajoDAO
    {
        public ConexionDB conexion;

        public CentroTrabajoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<CentroTrabajo> ConsultarCentrosTrabajo(UserSessionWeb login)
        {
            string sql = "SELECT distinct folio_centro_trabajo, nombre_comercial FROM centro_trabajo";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<CentroTrabajo> centrosTrabajos = new List<CentroTrabajo>();

            while (reader.Read())
            {
                CentroTrabajo centroT = new CentroTrabajo();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                centroT.folio_centro_trabajo = reader["folio_centro_trabajo"].ToString();
                centroT.descripcion = reader["nombre_comercial"].ToString();
                centrosTrabajos.Add(centroT);
            }
            conexion.Cerrar();
            return centrosTrabajos;
        }

        public List<CentroTrabajo> ConsultarCentrosTrabajoAgrupador(AgrupadorCentroTrabajo agrupador)
        {
            string sql = "select cct.folio_centro_trabajo, cct.nombre_comercial from agrupador_centro_trabajo_deta act " +
                "left join centro_trabajo cct on cct.folio_centro_trabajo = act.folio_centro_trabajo " +
                "where act.clv_agrupador_centro_trabajo = @clv_agrupador_centro_trabajo";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramClve = new Parametro();
            paramClve.Nombre = "@clv_agrupador_centro_trabajo";
            paramClve.Valor = agrupador.clv_agrupador_centro_trabajo.ToString();
            parametros.Add(paramClve);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<CentroTrabajo> centrosTrabajos = new List<CentroTrabajo>();

            while (reader.Read())
            {
                CentroTrabajo centroT = new CentroTrabajo();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                centroT.folio_centro_trabajo = reader["folio_centro_trabajo"].ToString();
                centroT.descripcion = reader["nombre_comercial"].ToString();
                centrosTrabajos.Add(centroT);
            }
            conexion.Cerrar();
            return centrosTrabajos;
        }


    }
}
