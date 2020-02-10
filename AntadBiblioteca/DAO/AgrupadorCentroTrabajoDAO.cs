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
    public class AgrupadorCentroTrabajoDAO
    {
        public ConexionDB conexion;

        public AgrupadorCentroTrabajoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<AgrupadorCentroTrabajo> ObtenerAgrupadoresCentroTrabajo(AgrupadorCentroTrabajo agru)
        {
            string foliodom = agru.folio_dominio;
            string folioPro = agru.folio_proyecto;
            //agrupador dominio

            string sqldominio = "select acc.clv_agrupador_centro_trabajo, acc.clv_cli, acc.descripcion, d.nombre as tipo " +
                " from agrupador_centro_trabajo_cara  acc left join dominio d on d.folio_dominio = acc.folio_dominio " +
                "where acc.folio_dominio =@folio_dominio";
            string sqlproyecto = "select acc.clv_agrupador_centro_trabajo, acc.clv_cli, acc.descripcion, d.descripcion as tipo " +
                " from agrupador_centro_trabajo_cara  acc left join proyecto_cara d on d.folio_proyecto = acc.folio_proyecto " +
                " where acc.folio_proyecto = @folio_proyecto";
            string sqlcli = "select acc.clv_agrupador_centro_trabajo, acc.clv_cli, acc.descripcion, d.nombre_comercial as tipo " +
                " from agrupador_centro_trabajo_cara  acc left join cliente d on d.clv_cli = acc.clv_cli " +
                " where acc.clv_cli = (select clv_cli from proyecto_cara where folio_proyecto = @folio_proyecto)";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramFolioDominio = new Parametro();
            paramFolioDominio.Nombre = "@folio_dominio";
            paramFolioDominio.Valor = agru.folio_dominio;
            parametros.Add(paramFolioDominio);

            if (folioPro != "")
            {

                Parametro paramFolioProyecto = new Parametro();
                paramFolioProyecto.Nombre = "@folio_proyecto";
                paramFolioProyecto.Valor = agru.folio_proyecto;
                parametros.Add(paramFolioProyecto);


            }


            List<AgrupadorCentroTrabajo> agrupadores = new List<AgrupadorCentroTrabajo>();

            if (folioPro == "")
            {
                SqlDataReader reader = conexion.Consultar(sqldominio, parametros);

                while (reader.Read())
                {
                    AgrupadorCentroTrabajo agrupador = new AgrupadorCentroTrabajo();
                    agrupador.clv_agrupador_centro_trabajo = Convert.ToInt32(reader["clv_agrupador_centro_trabajo"].ToString());
                    agrupador.clv_cli = reader["clv_cli"].ToString();
                    agrupador.descripcion = reader["descripcion"].ToString();
                    agrupador.tipo = reader["tipo"].ToString();
                    agrupadores.Add(agrupador);
                }


            }
            else
            {

                SqlDataReader readerdominio = conexion.Consultar(sqldominio, parametros);

                while (readerdominio.Read())
                {
                    AgrupadorCentroTrabajo agrupador = new AgrupadorCentroTrabajo();
                    agrupador.clv_agrupador_centro_trabajo = Convert.ToInt32(readerdominio["clv_agrupador_centro_trabajo"].ToString());
                    agrupador.clv_cli = readerdominio["clv_cli"].ToString();
                    agrupador.descripcion = readerdominio["descripcion"].ToString();
                    agrupador.tipo = readerdominio["tipo"].ToString();
                    agrupadores.Add(agrupador);
                }


                SqlDataReader readerproyecto = conexion.Consultar(sqlproyecto, parametros);

                while (readerproyecto.Read())
                {
                    AgrupadorCentroTrabajo agrupador = new AgrupadorCentroTrabajo();
                    agrupador.clv_agrupador_centro_trabajo = Convert.ToInt32(readerproyecto["clv_agrupador_centro_trabajo"].ToString());
                    agrupador.clv_cli = readerproyecto["clv_cli"].ToString();
                    agrupador.descripcion = readerproyecto["descripcion"].ToString();
                    agrupador.tipo = readerproyecto["tipo"].ToString();
                    agrupadores.Add(agrupador);
                }


                SqlDataReader readerCli = conexion.Consultar(sqlcli, parametros);

                while (readerCli.Read())
                {
                    AgrupadorCentroTrabajo agrupador = new AgrupadorCentroTrabajo();
                    agrupador.clv_agrupador_centro_trabajo = Convert.ToInt32(readerCli["clv_agrupador_centro_trabajo"].ToString());
                    agrupador.clv_cli = readerCli["clv_cli"].ToString();
                    agrupador.descripcion = readerCli["descripcion"].ToString();
                    agrupador.tipo = readerCli["tipo"].ToString();
                    agrupadores.Add(agrupador);
                }

            }

            conexion.Cerrar();
            return agrupadores;
        }
    }
}
