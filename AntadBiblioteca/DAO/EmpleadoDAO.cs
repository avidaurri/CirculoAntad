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
            /*login.filtrogenero
            login.filtroedocivil
            login.filtropuesto*/


            string filtro = "";

            if (login.filtrogenero != "")
            {
                if(login.filtrogenero == "1")
                {
                    filtro = filtro + " and e.genero ='Masculino'";
                }
                else if (login.filtrogenero == "3")
                {
                    filtro = filtro + " and e.genero ='Femenino'";
                }
               
            }
            if (login.filtrocalificacion != "")
            {
                filtro = filtro + " and e.calificacion_empleado="+ login.filtrocalificacion;

            }

            if (login.filtroestado != "")
            {
                //filtro = filtro + " and e.ciu_edo= '" + login.filtroestado + "'";
                filtro = filtro + " and e.ciu_edo=(select nombre from estado where clv_edo="+ login.filtroestado + ")";
            }

            if (login.filtromunicipio != "")
            {
                //filtro = filtro + " and e.del_mun= '" + login.filtromunicipio+"'";
                filtro = filtro + " and e.del_mun = (select nombre from municipio where clv_mun =" + login.filtromunicipio + ")";
            }


            if (login.filtropuesto != "")
            {

                if (login.filtropuesto == "1")
                {
                    filtro = filtro + " and cp.puesto='Promotor'";
                }
                else if (login.filtropuesto == "2")
                {
                    filtro = filtro + " and cp.puesto='Supervisor'";
                }

                    
            }


            //string sql = "SELECT clv_emp, (e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno) as nombre  FROM empleado e";
            string sql = "select (e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno) as nombre, e.clv_emp as clv_emp, e.genero as genero, " +
                "e.edo_civil as edo_civil, cp.puesto as puesto, cp.clv_puesto as clvPuesto, e.nss as nss, e.estatura as estatura, e.peso as peso, " +
                "DATEDIFF(year, CASE WHEN SUBSTRING(e.curp, 5, 2) < 40 THEN '20' + SUBSTRING(e.curp, 5, 2) ELSE '19' + SUBSTRING(e.curp, 5, 2) " +
                "end + '-' + SUBSTRING(e.curp, 7, 2) + '-' + SUBSTRING(e.curp, 9, 2), getdate()) as edad, e.calificacion_empleado, " +
                "e.ciu_edo as estado, e.del_mun as municipio from empleado e left join emp_puesto ep on ep.clv_emp = e.clv_emp left join " +
                " cat_puesto cp on cp.clv_puesto = ep.clv_puesto where cp.puesto != ' '"+ filtro;


            List<Parametro> parametros = new List<Parametro>();

            Parametro paramCliente = new Parametro();
            paramCliente.Nombre = "@clv_cli";
            paramCliente.Valor = "1";
            parametros.Add(paramCliente);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Empleado> empleados = new List<Empleado>();

            List<Parametro> parametrosd = new List<Parametro>();
            int tiporequisito;
            double inferior;
            double superior;
            int masculino=0;
            int femenino=0;
            string cali;
            int cal;
            while (reader.Read())
            {
                Empleado empleado = new Empleado();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                empleado.clv_emp = Convert.ToInt32(reader["clv_emp"].ToString());
                empleado.nombre = reader["nombre"].ToString();
                empleado.genero = reader["genero"].ToString();
                empleado.edo_civil = reader["edo_civil"].ToString();
                empleado.puesto = reader["puesto"].ToString();
                empleado.clv_puesto = Convert.ToInt32(reader["clvPuesto"].ToString());
                empleado.nss = reader["nss"].ToString();
                empleado.estatura = Convert.ToDouble(reader["estatura"].ToString());
                empleado.peso = Convert.ToDouble(reader["peso"].ToString());
                empleado.edad = Convert.ToInt32(reader["edad"].ToString());
                empleado.mensajeValidacion = "";
                empleado.estado = reader["estado"].ToString();
                empleado.municipio = reader["municipio"].ToString();
                empleado.cumplerequisitos = 1;
                empleado.calificacionnumero = 0;
                cali = reader["calificacion_empleado"].ToString();
                if (reader["calificacion_empleado"].ToString() !="" || !string.IsNullOrEmpty(reader["calificacion_empleado"].ToString()))
                {
                    empleado.calificacionnumero = Convert.ToInt32(cali);
                    cal = Convert.ToInt32(cali);
                    if (cal <= 5)
                    {
                        empleado.calificacion_empleado = "rojo";
                    }else if (cal > 5 && cal <= 8)
                    {
                        empleado.calificacion_empleado = "amarillo";
                    }
                    else if (cal >8)
                    {
                        empleado.calificacion_empleado = "verde";
                    }
                    else
                    {
                        empleado.calificacion_empleado = "";
                    }

                }
                else
                {
                    empleado.calificacion_empleado = "";
                }

                //verificar requisitos de acuerdo a su puesto.
                string sqlreg = "select cre.clv_requisito_evento, cre.descripcion, prpp.inferior, prpp.superior from proyecto_requisitos_personal_puesto prpp " +
                    "left join cat_requisito_evento cre on prpp.clv_requisito_evento = cre.clv_requisito_evento " +
                    "where prpp.folio_proyecto = 'PP19-13' and prpp.clv_puesto = @clv_puesto";

                parametrosd.Clear();

                 Parametro paramclvpu = new Parametro();
                paramclvpu.Nombre = "@clv_puesto";
                paramclvpu.Valor = empleado.clv_puesto.ToString();
                parametrosd.Add(paramclvpu);

                SqlDataReader readerclvpu = conexion.Consultar(sqlreg, parametrosd);

                while (readerclvpu.Read())
                {
                    tiporequisito = Convert.ToInt32(readerclvpu["clv_requisito_evento"].ToString());
                    inferior = Convert.ToDouble(readerclvpu["inferior"].ToString());
                    superior = Convert.ToDouble(readerclvpu["superior"].ToString());

                    if (tiporequisito == 1)
                    {
                        if (empleado.edad < inferior || empleado.edad > superior)
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con edad requerida ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                    else if(tiporequisito == 2)
                    {
                        //genero femenino 2
                        femenino = 1;

                    }else if (tiporequisito == 3)
                    {
                        //genero masculino 3
                        masculino = 1;


                    }else if(tiporequisito == 4)
                    {
                        // altura
                        if (empleado.estatura < inferior || empleado.estatura > superior)
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con la altura requerida ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                    else if(tiporequisito == 6)
                    {
                        // imss
                        if (empleado.nss=="" || string.IsNullOrEmpty(empleado.nss))
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el NSS";
                            empleado.cumplerequisitos = 0;
                        }
                    }




                }

                if(masculino != femenino)
                {
                    if (masculino == 1)
                    {
                        if(empleado.genero == "Femenino")
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el genero requerido ";
                            empleado.cumplerequisitos = 0;
                        }
                    }else if (femenino == 1)
                    {
                        if (empleado.genero == "Masculino")
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el genero requerido ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                }

                empleados.Add(empleado);
            }
            conexion.Cerrar();
            return empleados;
        }
        public List<Empleado> ConsultarEmpleadosAgrupador(AgrupadorEmpleado agrupador)
        {
            /*string sql = "select e.clv_emp, (e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno) as nombre, e.genero as genero, " +
                "e.edo_civil as edo_civil, cp.puesto as puesto, cp.clv_puesto as clvPuesto from agrupador_empleado_deta act " +
                "left join empleado e on e.clv_emp = act.clv_emp left join emp_puesto ep on ep.clv_emp = e.clv_emp " +
                "left join cat_puesto cp on cp.clv_puesto = ep.clv_puesto where act.clv_agrupador_empleado = @clv_agrupador_empleado";*/

            string sql = "select (e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno) as nombre, e.clv_emp as clv_emp, e.genero as genero, " +
                "e.edo_civil as edo_civil, cp.puesto as puesto, cp.clv_puesto as clvPuesto, e.nss as nss, e.estatura as estatura, e.peso as peso, " +
                "DATEDIFF(year, CASE WHEN SUBSTRING(e.curp, 5, 2) < 40 THEN '20' + SUBSTRING(e.curp, 5, 2) ELSE '19' + SUBSTRING(e.curp, 5, 2) " +
                "end + '-' + SUBSTRING(e.curp, 7, 2) + '-' + SUBSTRING(e.curp, 9, 2), getdate()) as edad, e.calificacion_empleado, " +
                "e.ciu_edo as estado, e.del_mun as municipio from agrupador_empleado_deta act left join empleado e on e.clv_emp = act.clv_emp " +
                " left join emp_puesto ep on ep.clv_emp = e.clv_emp left join cat_puesto cp on cp.clv_puesto = ep.clv_puesto " +
                "where act.clv_agrupador_empleado = @clv_agrupador_empleado";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramClve = new Parametro();
            paramClve.Nombre = "@clv_agrupador_empleado";
            paramClve.Valor = agrupador.clv_agrupador_empleado.ToString();
            parametros.Add(paramClve);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<Empleado> empleados = new List<Empleado>();
            List<Parametro> parametrosd = new List<Parametro>();
            int tiporequisito;
            double inferior;
            double superior;
            int masculino = 0;
            int femenino = 0;
            string cali;
            int cal;
            while (reader.Read())
            {
                Empleado empleado = new Empleado();
                //proyecto.ClvCliente = Convert.ToInt32(reader["clv_cli"].ToString());
                empleado.clv_emp = Convert.ToInt32(reader["clv_emp"].ToString());
                empleado.nombre = reader["nombre"].ToString();
                empleado.genero = reader["genero"].ToString();
                empleado.edo_civil = reader["edo_civil"].ToString();
                empleado.puesto = reader["puesto"].ToString();
                empleado.clv_puesto = Convert.ToInt32(reader["clvPuesto"].ToString());
                empleado.nss = reader["nss"].ToString();
                empleado.estatura = Convert.ToDouble(reader["estatura"].ToString());
                empleado.peso = Convert.ToDouble(reader["peso"].ToString());
                empleado.edad = Convert.ToInt32(reader["edad"].ToString());
                empleado.mensajeValidacion = "";
                empleado.estado = reader["estado"].ToString();
                empleado.municipio = reader["municipio"].ToString();
                empleado.cumplerequisitos = 1;
                empleado.calificacionnumero = 0;
                cali = reader["calificacion_empleado"].ToString();
                if (reader["calificacion_empleado"].ToString() != "" || !string.IsNullOrEmpty(reader["calificacion_empleado"].ToString()))
                {
                    empleado.calificacionnumero = Convert.ToInt32(cali);
                    cal = Convert.ToInt32(cali);
                    if (cal <= 5)
                    {
                        empleado.calificacion_empleado = "rojo";
                    }
                    else if (cal > 5 && cal <= 8)
                    {
                        empleado.calificacion_empleado = "amarillo";
                    }
                    else if (cal > 8)
                    {
                        empleado.calificacion_empleado = "verde";
                    }
                    else
                    {
                        empleado.calificacion_empleado = "";
                    }

                }
                else
                {
                    empleado.calificacion_empleado = "";
                }

                //verificar requisitos de acuerdo a su puesto.
                string sqlreg = "select cre.clv_requisito_evento, cre.descripcion, prpp.inferior, prpp.superior from proyecto_requisitos_personal_puesto prpp " +
                    "left join cat_requisito_evento cre on prpp.clv_requisito_evento = cre.clv_requisito_evento " +
                    "where prpp.folio_proyecto = 'PP19-13' and prpp.clv_puesto = @clv_puesto";

                parametrosd.Clear();

                Parametro paramclvpu = new Parametro();
                paramclvpu.Nombre = "@clv_puesto";
                paramclvpu.Valor = empleado.clv_puesto.ToString();
                parametrosd.Add(paramclvpu);

                SqlDataReader readerclvpu = conexion.Consultar(sqlreg, parametrosd);

                while (readerclvpu.Read())
                {
                    tiporequisito = Convert.ToInt32(readerclvpu["clv_requisito_evento"].ToString());
                    inferior = Convert.ToDouble(readerclvpu["inferior"].ToString());
                    superior = Convert.ToDouble(readerclvpu["superior"].ToString());

                    if (tiporequisito == 1)
                    {
                        if (empleado.edad < inferior || empleado.edad > superior)
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con edad requerida ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                    else if (tiporequisito == 2)
                    {
                        //genero femenino 2
                        femenino = 1;

                    }
                    else if (tiporequisito == 3)
                    {
                        //genero masculino 3
                        masculino = 1;


                    }
                    else if (tiporequisito == 4)
                    {
                        // altura
                        if (empleado.estatura < inferior || empleado.estatura > superior)
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con la altura requerida ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                    else if (tiporequisito == 6)
                    {
                        // imss
                        if (empleado.nss == "" || string.IsNullOrEmpty(empleado.nss))
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el NSS";
                            empleado.cumplerequisitos = 0;
                        }
                    }




                }

                if (masculino != femenino)
                {
                    if (masculino == 1)
                    {
                        if (empleado.genero == "Femenino")
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el genero requerido ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                    else if (femenino == 1)
                    {
                        if (empleado.genero == "Masculino")
                        {
                            empleado.mensajeValidacion = empleado.mensajeValidacion + " | No cumple con el genero requerido ";
                            empleado.cumplerequisitos = 0;
                        }
                    }
                }

                empleados.Add(empleado);
            }
            conexion.Cerrar();
            return empleados;
        }
    }
}
