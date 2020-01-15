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
    public class EmpleadoDAO
    {
        public ConexionDB conexion;

        public EmpleadoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public List<Empleado> ConsultarEmpleados(UserSessionWeb login)
        {
            string sql = "SELECT * FROM empleado";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Empleado> empleados = new List<Empleado>();

            while (reader.Read())
            {
                Empleado empleado = new Empleado();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                empleado.clv_emp = Convert.ToInt32(reader["clv_emp"].ToString());
                empleado.nombre = reader["nombre"].ToString();
                empleados.Add(empleado);
            }
            conexion.Cerrar();
            return empleados;
        }
        public List<Empleado> ConsultarEmpleadosAgrupador(AgrupadorEmpleado agrupador)
        {
            string sql = "select cct.clv_emp, cct.nombre from agrupador_empleado_deta act " +
                "left join empleado cct on cct.clv_emp = act.clv_emp where act.clv_agrupador_empleado = @clv_agrupador_empleado";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramClve = new Parametro();
            paramClve.Nombre = "@clv_agrupador_empleado";
            paramClve.Valor = agrupador.clv_agrupador_empleado.ToString();
            parametros.Add(paramClve);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Empleado> empleados = new List<Empleado>();

            while (reader.Read())
            {
                Empleado empleado = new Empleado();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                empleado.clv_emp = Convert.ToInt32(reader["clv_emp"].ToString());
                empleado.nombre = reader["nombre"].ToString();
                empleados.Add(empleado);
            }
            conexion.Cerrar();
            return empleados;
        }
    }
}
