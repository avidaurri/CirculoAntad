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
    public class RequisitoEmpleadoDAO
    {
        public ConexionDB conexion;

        public RequisitoEmpleadoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<RequisitoEmpleado> ObtenerRequisitosEmpleado(ActividadWeb login)
        {
            string sql = "select cre.clv_requisito_evento, prpp.clv_puesto as clv_puesto, cp.puesto as puesto, cre.clv_tipo_requisito as tipoRequisito, cre.descripcion, " +
                " prpp.inferior, prpp.superior from proyecto_requisitos_personal_puesto prpp " +
                "left join cat_requisito_evento cre on prpp.clv_requisito_evento = cre.clv_requisito_evento " +
                "left join cat_puesto cp on cp.clv_puesto = prpp.clv_puesto where prpp.folio_proyecto =@folio_proyecto ";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@folio_proyecto";
            paramCliente.Valor = login.folio_proyecto.ToString();
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<RequisitoEmpleado> requisitos = new List<RequisitoEmpleado>();
            int clvrequisito = 0;

            while (reader.Read())
            {
                RequisitoEmpleado requisito = new RequisitoEmpleado();
                /*actividad.clv_actividad = Convert.ToInt32(reader["clv_actividad"].ToString());
                actividad.descripcion = reader["descripcion"].ToString();*/
                requisito.clv_puesto= Convert.ToInt32(reader["clv_puesto"].ToString());
                requisito.puesto = reader["puesto"].ToString();
                requisito.nombreRequisito = reader["descripcion"].ToString();
                clvrequisito = Convert.ToInt32(reader["clv_requisito_evento"].ToString());
                if (clvrequisito == 1)
                {
                    requisito.valor = "Entre " + reader["inferior"] + " y " + reader["superior"]+ " años";
                }
                else if (clvrequisito == 2)
                {
                    //genero femenino 2
                    requisito.valor = "Indispensable";

                }
                else if (clvrequisito == 3)
                {
                    //genero masculino 3
                    requisito.valor = "Indispensable";


                }
                else if (clvrequisito == 4)
                {
                    // altura
                    requisito.valor = "Entre " + reader["inferior"] + " y " + reader["superior"] + " mts";
                }
                else if (clvrequisito == 6)
                {
                    // imss
                    requisito.valor = "IMSS Vigente";
                }


                requisitos.Add(requisito);
            }
            conexion.Cerrar();
            return requisitos;
        }




    }
}
