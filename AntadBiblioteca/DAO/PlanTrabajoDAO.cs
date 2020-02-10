using AntadBiblioteca.Util;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AntadBiblioteca.DAO
{
    public class PlanTrabajoDAO
    {
        public ConexionDB conexion;

        public PlanTrabajoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }

        public PlanTrabajo guardarPlanTrabajo(PlanTrabajo plan)
        {
            int numeroFolio;
            string st = "foliador_documentos";
            List<Parametro> parametrosdd = new List<Parametro>();
            Parametro paramLogind = new Parametro();
            paramLogind.Nombre = "@ano";
            paramLogind.Valor = "2020";
            parametrosdd.Add(paramLogind);

            Parametro paramLoginde = new Parametro();
            paramLoginde.Nombre = "@documento";
            paramLoginde.Valor = "tp";
            parametrosdd.Add(paramLoginde);

            Parametro paramLoginder = new Parametro();
            paramLoginder.Nombre = "@resultado";
            paramLoginder.Valor = "46";
            parametrosdd.Add(paramLoginder);

            DataSet leer = conexion.ConsultarSP(st, parametrosdd);

            //extraer el ultimo numero de la tabla.


            string ultimo = "select folio as folio from folios_documentos where ano=2020 and documento='tp'";


            SqlDataReader obtenerUltimo = conexion.Consultar(ultimo, parametrosdd);

            if (obtenerUltimo.Read())
            {
                numeroFolio = Convert.ToInt32(obtenerUltimo["folio"]);
            }
            else
            {
                numeroFolio = 5555;
            }


            string sqlInsert = "insert into plan_0_cara(clv_empre,folio_proyecto,clv_usr,fecha_cap,folio_trabajo,descripcion,fecha_ini,fecha_fin,folio_dominio,clv_edo_calendario_trabajo) " +
                            "values(1,@folio_proyecto,1,GetDate(),@folio_trabajo,@descripcion,@fecha_ini,@fecha_fin,@folio_dominio,1)";

            PlanTrabajo planrespuesta = new PlanTrabajo();
            Random rdn = new Random();

            string folio_proyecto = plan.folio_proyecto;
            string descripcion = plan.descripcion;
            string fecha_ini = plan.fecha_ini;
            string fecha_fin = plan.fecha_fin;
            string folio_dominio = plan.folio_dominio;
            string folio_trabajo = "TP20-" + numeroFolio;

            List<Parametro> parametrosd = new List<Parametro>();
            List<Parametro> parametroslistatempo = new List<Parametro>();
            List<Parametro> parametroslistaCentr = new List<Parametro>();
            List<Parametro> parametroslistaEmp = new List<Parametro>();
            List<Parametro> parametroslistaAct = new List<Parametro>();

            Parametro paramFolioPro = new Parametro();
            paramFolioPro.Nombre = "@folio_proyecto";
            paramFolioPro.Valor = folio_proyecto;
            parametrosd.Add(paramFolioPro);

            Parametro paramDescri= new Parametro();
            paramDescri.Nombre = "@descripcion";
            paramDescri.Valor = descripcion;
            parametrosd.Add(paramDescri);

            Parametro paramFechaIni= new Parametro();
            paramFechaIni.Nombre = "@fecha_ini";
            paramFechaIni.Valor = fecha_ini;
            parametrosd.Add(paramFechaIni);

            Parametro paramFechaFin = new Parametro();
            paramFechaFin.Nombre = "@fecha_fin";
            paramFechaFin.Valor = fecha_fin;
            parametrosd.Add(paramFechaFin);

            Parametro paramFolioTra = new Parametro();
            paramFolioTra.Nombre = "@folio_trabajo";
            paramFolioTra.Valor = folio_trabajo;
            parametrosd.Add(paramFolioTra);

            Parametro paramFolioDom = new Parametro();
            paramFolioDom.Nombre = "@folio_dominio";
            paramFolioDom.Valor = folio_dominio;
            parametrosd.Add(paramFolioDom);

                //ImagePath
                int registradoplancara = conexion.ActualizarParametro(sqlInsert, parametrosd);

                if (registradoplancara != 1)
                {
                    planrespuesta.guardado = 0;
                }
                else
                {

                    //temporalidades
                    for (int i = 0; i < plan.listaTemporalidad.Count; i++)
                    {
                        string sqlInserttemp = "insert into plan_1_temporalidad(folio_trabajo,consec_temporalidad,clv_empre,fecha_cap," +
                        "fecha_inicial,fecha_final,descripcion,lun,mar,mie,jue,vie,sab,dom) " +
                            "values(@folio_trabajoo,@consec_temporalidad,1,GetDate()," +
                            "@fecha_inicial,@fecha_final,@descripcion,@lun,@mar,@mie,@jue,@vie,@sab,@dom)";

                        parametroslistatempo.Clear();


                        Parametro paramFolioTrate = new Parametro();
                        paramFolioTrate.Nombre = "@folio_trabajoo";
                        paramFolioTrate.Valor = folio_trabajo;
                        parametroslistatempo.Add(paramFolioTrate);

                        Parametro paramConcevTem = new Parametro();
                        paramConcevTem.Nombre = "@consec_temporalidad";
                        paramConcevTem.Valor = plan.listaTemporalidad[i].consec_temporalidad.ToString();
                        parametroslistatempo.Add(paramConcevTem);

                        Parametro paramFechaInite = new Parametro();
                        paramFechaInite.Nombre = "@fecha_inicial";
                        paramFechaInite.Valor = plan.listaTemporalidad[i].fecha_inicial.ToString();
                        parametroslistatempo.Add(paramFechaInite);
                    
                        Parametro paramFechaFinte = new Parametro();
                        paramFechaFinte.Nombre = "@fecha_final";
                        paramFechaFinte.Valor = plan.listaTemporalidad[i].fecha_final.ToString();
                        parametroslistatempo.Add(paramFechaFinte);

                        Parametro paramDeste = new Parametro();
                        paramDeste.Nombre = "@descripcion";
                        paramDeste.Valor = plan.listaTemporalidad[i].descripcion.ToString();
                        parametroslistatempo.Add(paramDeste);


                        Parametro paramLunte = new Parametro();
                        paramLunte.Nombre = "@lun";
                        paramLunte.Valor = plan.listaTemporalidad[i].lun.ToString();
                        parametroslistatempo.Add(paramLunte);

                        Parametro paramMate = new Parametro();
                        paramMate.Nombre = "@mar";
                        paramMate.Valor = plan.listaTemporalidad[i].mar.ToString();
                        parametroslistatempo.Add(paramMate);

                        Parametro paramMite = new Parametro();
                        paramMite.Nombre = "@mie";
                        paramMite.Valor = plan.listaTemporalidad[i].mie.ToString();
                        parametroslistatempo.Add(paramMite);

                        Parametro paramJuete = new Parametro();
                        paramJuete.Nombre = "@jue";
                        paramJuete.Valor = plan.listaTemporalidad[i].jue.ToString();
                        parametroslistatempo.Add(paramJuete);

                        Parametro paramViete = new Parametro();
                        paramViete.Nombre = "@vie";
                        paramViete.Valor = plan.listaTemporalidad[i].vie.ToString();
                        parametroslistatempo.Add(paramViete);

                        Parametro paramSate = new Parametro();
                        paramSate.Nombre = "@sab";
                        paramSate.Valor = plan.listaTemporalidad[i].sab.ToString();
                        parametroslistatempo.Add(paramSate);

                        Parametro paramDomte = new Parametro();
                        paramDomte.Nombre = "@dom";
                        paramDomte.Valor = plan.listaTemporalidad[i].dom.ToString();
                        parametroslistatempo.Add(paramDomte);


                        int registradoTemporalidades = conexion.ActualizarParametro(sqlInserttemp, parametroslistatempo);
                        //var descr = plan.listaTemporalidad[i].descripcion;


                    }


                //centros de trabajo
                for (int i = 0; i < plan.listaCentroTrabajo.Count; i++)
                {
                    string sqlInsertCent = "insert into plan_2_centro_trabajo(folio_trabajo,consec_temporalidad,clv_empre,fecha_cap,clv_usr," +
                    "folio_centro_trabajo,consec_centro_trabajo) " +
                        "values(@folio_trabajoo,@consec_temporalidad,1,GetDate(),1," +
                        "@folio_centro_trabajo,@consec_centro_trabajo)";

                    parametroslistaCentr.Clear();


                    Parametro paramFolioTrate = new Parametro();
                    paramFolioTrate.Nombre = "@folio_trabajoo";
                    paramFolioTrate.Valor = folio_trabajo;
                    parametroslistaCentr.Add(paramFolioTrate);

                    Parametro paramConcevTem = new Parametro();
                    paramConcevTem.Nombre = "@consec_temporalidad";
                    paramConcevTem.Valor = plan.listaCentroTrabajo[i].consec_temporalidad.ToString();
                    parametroslistaCentr.Add(paramConcevTem);

                    Parametro paramFoliCe = new Parametro();
                    paramFoliCe.Nombre = "@folio_centro_trabajo";
                    paramFoliCe.Valor = plan.listaCentroTrabajo[i].folio_centro_trabajo.ToString();
                    parametroslistaCentr.Add(paramFoliCe);

                    Parametro paramoncece = new Parametro();
                    paramoncece.Nombre = "@consec_centro_trabajo";
                    paramoncece.Valor = plan.listaCentroTrabajo[i].consec_centro_trabajo.ToString();
                    parametroslistaCentr.Add(paramoncece);

                   


                    int registradoCentros = conexion.ActualizarParametro(sqlInsertCent, parametroslistaCentr);
                    //var descr = plan.listaTemporalidad[i].descripcion;
                                                                          
                }


                //empleados
                for (int i = 0; i < plan.listaEmpleados.Count; i++)
                {
                    string sqlInsertEmp = "insert into plan_3_empleado(folio_trabajo,consec_empleado,consec_centro_trabajo,consec_temporalidad," +
                        "clv_emp,clv_puesto) values(@folio_trabajoo,@consec_empleado,@consec_centro_trabajo,@consec_temporalidad,@clv_emp,1)";

                    parametroslistaEmp.Clear();


                    Parametro paramFolioTrate = new Parametro();
                    paramFolioTrate.Nombre = "@folio_trabajoo";
                    paramFolioTrate.Valor = folio_trabajo;
                    parametroslistaEmp.Add(paramFolioTrate);

                    Parametro paramConcevTem = new Parametro();
                    paramConcevTem.Nombre = "@consec_temporalidad";
                    paramConcevTem.Valor = plan.listaEmpleados[i].consec_temporalidad.ToString();
                    parametroslistaEmp.Add(paramConcevTem);

                    Parametro paramConEmp = new Parametro();
                    paramConEmp.Nombre = "@consec_empleado";
                    paramConEmp.Valor = plan.listaEmpleados[i].consec_empleado.ToString();
                    parametroslistaEmp.Add(paramConEmp);

                    Parametro paramoncece = new Parametro();
                    paramoncece.Nombre = "@consec_centro_trabajo";
                    paramoncece.Valor = plan.listaEmpleados[i].consec_centro_trabajo.ToString();
                    parametroslistaEmp.Add(paramoncece);

                    Parametro paramClvEmp = new Parametro();
                    paramClvEmp.Nombre = "@clv_emp";
                    paramClvEmp.Valor = plan.listaEmpleados[i].clv_emp.ToString();
                    parametroslistaEmp.Add(paramClvEmp);


                    int registraEmpleados = conexion.ActualizarParametro(sqlInsertEmp, parametroslistaEmp);
                    //var descr = plan.listaTemporalidad[i].descripcion;

                }

                for (int i = 0; i < plan.listaActividades.Count; i++)
                {
                    string sqlInsertAct = "insert into plan_4_actividades(folio_trabajo,consec_actividad,consec_empleado,consec_centro_trabajo,consec_temporalidad," +
                        "clv_actividad,cantidad,visibilidad_tiempo_real,evidencia_fotografica,evidencia_video,evidencia_archivo,evidencia_geolocalizacion,clv_puesto) " +
                        "values(@folio_trabajoo,@consec_actividad,@consec_empleado,@consec_centro_trabajo,@consec_temporalidad,@clv_actividad,1,1,2,0,0,0,1)";

                    parametroslistaAct.Clear();


                    Parametro paramFolioTrate = new Parametro();
                    paramFolioTrate.Nombre = "@folio_trabajoo";
                    paramFolioTrate.Valor = folio_trabajo;
                    parametroslistaAct.Add(paramFolioTrate);

                    Parametro paramConcevAct = new Parametro();
                    paramConcevAct.Nombre = "@consec_actividad";
                    paramConcevAct.Valor = plan.listaActividades[i].consec_actividad.ToString();
                    parametroslistaAct.Add(paramConcevAct);

                    Parametro paramConcevTem = new Parametro();
                    paramConcevTem.Nombre = "@consec_temporalidad";
                    paramConcevTem.Valor = plan.listaActividades[i].consec_temporalidad.ToString();
                    parametroslistaAct.Add(paramConcevTem);

                    Parametro paramConEmp = new Parametro();
                    paramConEmp.Nombre = "@consec_empleado";
                    paramConEmp.Valor = plan.listaActividades[i].consec_empleado.ToString();
                    parametroslistaAct.Add(paramConEmp);

                    Parametro paramoncece = new Parametro();
                    paramoncece.Nombre = "@consec_centro_trabajo";
                    paramoncece.Valor = plan.listaActividades[i].consec_centro_trabajo.ToString();
                    parametroslistaAct.Add(paramoncece);

                    Parametro paramClvAct = new Parametro();
                    paramClvAct.Nombre = "@clv_actividad";
                    paramClvAct.Valor = plan.listaActividades[i].clv_actividad.ToString();
                    parametroslistaAct.Add(paramClvAct);


                    int registraActividad = conexion.ActualizarParametro(sqlInsertAct, parametroslistaAct);
                    //var descr = plan.listaTemporalidad[i].descripcion;

                }

                planrespuesta.guardado = 1;
                planrespuesta.folio_trabajo = folio_trabajo;
                    //insertar en login

                /*string sqlInsertLogin = "insert into login(fecha_cap,clv_empre,clv_edo_reg_usr,estado_cuenta,administrador,login,password,clv_emp, url_dom,url_com) " +
                    "values(GetDate(),1,5,0,0,@login,@password,@clv_emp,@identificacion,@comprobante)";

                int registradoLogin = conexion.ActualizarParametro(sqlInsertLogin, parametrosInsert);

                string sqlInsertReferenciaUno = "insert into emp_telefono(clv_emp,telefono,descripcion,fecha_cap,clv_empre) " +
                    "values(@clv_emp,@telefonoUno,@nombreReferenciaUno,GetDate(),1)";

                int registradoreferenciaUno = conexion.ActualizarParametro(sqlInsertReferenciaUno, parametrosInsert);

                string sqlInserttelefono = "insert into emp_telefono(clv_emp,telefono,descripcion,fecha_cap,clv_empre) " +
                    "values(@clv_emp,@telefono,'particular',GetDate(),1)";

                int registradoreferenciaDos = conexion.ActualizarParametro(sqlInserttelefono, parametrosInsert);


                //insertar foto usuario

                string sqlInsertfoto = "insert into emp_foto(clv_emp,consec,clv_usr,clv_empre,fecha,ruta) " +
                    "values(@clv_emp,1,1,1,GetDate(),@foto_url)";

                int registradofoto = conexion.ActualizarParametro(sqlInsertfoto, parametrosInsert);

                //insertar documentos

                string sqlInsertdocu = "insert into emp_documentacion(clv_emp,consec,clv_usr,observaciones,clv_empre,fecha,ruta) " +
                    "values(@clv_emp,1,1,'identificacion personal',1,GetDate(),@identificacion)";

                int registradodocu = conexion.ActualizarParametro(sqlInsertdocu, parametrosInsert);

                string sqlInsertdocd = "insert into emp_documentacion(clv_emp,consec,clv_usr,observaciones,clv_empre,fecha,ruta) " +
                    "values(@clv_emp,1,1,'comprobante domiciliario',1,GetDate(),@comprobante)";

                int registradodocd = conexion.ActualizarParametro(sqlInsertdocd, parametrosInsert);

                //insertar ciclo escolar en la tabla emp_requisitos_evento
                string sqlInsertce = "insert into emp_requisitos_evento(clv_emp,fecha_cap,clv_empre,clv_usr,clv_requisito_evento,valor) " +
                                "values(@clv_emp,GetDate(),1,1,5,@clv_gradoestu)";

                int registradodoce = conexion.ActualizarParametro(sqlInsertce, parametrosInsert);


                if (registradoLogin == 1)
                {
                    respuesta.mensajeRegistro = "Felicidades, tu registro fue exitoso";
                    respuesta.usuarioRegistrado = true;
                }*/
                }


            conexion.Cerrar();
            return planrespuesta;


        }
        public List<PlanTrabajo> ConsultarPlanes(PlanTrabajo plann)
        {
            string sql = "select poc.descripcion as proyecto, pc.folio_trabajo as folio_trabajo, pc.descripcion as descripcion, " +
                "pc.fecha_ini as fecha_ini, pc.fecha_fin as fecha_fin, do.nombre as dominio, pc.fecha_cap as fecha_captura, " +
                "pc.folio_dominio as folio_dominio, ect.descripcion as estado from plan_0_cara pc left join proyecto_cara poc on poc.folio_proyecto = pc.folio_proyecto " +
                "left join dominio do on do.folio_dominio = pc.folio_dominio " +
                "left join edo_calendario_trabajo ect on ect.clv_edo_calendario_trabajo=pc.clv_edo_calendario_trabajo";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramDomiini = new Parametro();
            paramDomiini.Nombre = "@folio_dominio";
            paramDomiini.Valor = plann.folio_dominio.ToString();
            parametros.Add(paramDomiini);


            SqlDataReader reader = conexion.Consultar(sql, parametros);

            List<PlanTrabajo> planes = new List<PlanTrabajo>();

            while (reader.Read())
            {
                PlanTrabajo plan = new PlanTrabajo();
                plan.proyecto = reader["proyecto"].ToString();
                plan.folio_trabajo = reader["folio_trabajo"].ToString();
                plan.descripcion = reader["descripcion"].ToString();
                plan.fecha_ini = reader["fecha_ini"].ToString();
                plan.fecha_fin = reader["fecha_fin"].ToString();
                plan.dominio = reader["dominio"].ToString();
                plan.fecha_captura = reader["fecha_captura"].ToString();
                plan.folio_dominio = reader["folio_dominio"].ToString();
                plan.estado = reader["estado"].ToString();
                planes.Add(plan);
            }
            conexion.Cerrar();
            return planes;
        }
    }
}
