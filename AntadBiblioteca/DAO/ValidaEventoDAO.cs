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
    public class ValidaEventoDAO
    {
        public ConexionDB conexion;
        public ValidaEventoDAO(string cadena)
        {
            conexion = new ConexionDB(cadena);
        }
        public ValidaEvento getValidacionEvento(int idusuario, string idEvento)
        {
            Utilidades ser = new Utilidades();
            string urlServidor = ser.getUrlServidor(conexion);

            ValidaEvento evento = new ValidaEvento();
            evento.validacionFinal = true;

            string select = "select ec.folio_evento as folioEvento, e.clv_emp as clv_Empleado, ct.logo_url as fotoSucursal, ct.folio_centro_trabajo as folioSucursal, " +
                "ct.nombre_comercial as nombreSucursal, ec.folio_proyecto as folioProyecto, " +
                "(select nombre from adscripcion where adscripcion = (SUBSTRING(bpa.adscripcion, 0, 3) + '000')) as agencia, " +
                "ec.fecha_inicial as fechaInicioEvento, ec.fecha_final as fechaFinalEvento, " +
                "ep.fecha_inicial as fechaInicioEventoEmpleado, ep.fecha_final as fechaFinalEventoEmpleado, ee.descripcion as estatusEvento, " +
                "ep.clv_edo_evento_personal as clvEstatusEventoUsuario, eee.descripcion as estatusEventoUsuario," +
                "ee.clv_edo_evento as clvEstatusEvento, cte.descripcion as tipoEvento, cte.clv_tip_evento as clvTipoEvento, e.foto_url as fotoUsuario, " +
                "(e.nombre + ' ' + e.apellido_paterno + ' ' + e.apellido_materno) as nombreUsuario, e.genero as sexoUsuario, " +
                "DATEDIFF(year, CASE WHEN SUBSTRING(e.curp, 5, 2) < 40 THEN '20' + SUBSTRING(e.curp, 5, 2) ELSE '19' + SUBSTRING(e.curp, 5, 2) " +
                "end + '-' + SUBSTRING(e.curp, 7, 2) + '-' + SUBSTRING(e.curp, 9, 2), getdate()) as edadUsuario, e.nu_seguro as imssUsuario, " +
                "e.estatura as alturaUsuario, e.clv_puesto as clv_Puesto, cp.puesto as puesto from evento_cara ec left join evento_personal ep on ep.folio_evento = ec.folio_evento " +
                "left join empleado e on e.clv_emp = ep.clv_emp left join cat_tip_evento cte on cte.clv_tip_evento = ec.clv_tip_evento " +
                "left join edo_evento ee on ee.clv_edo_evento = ec.clv_edo_evento left join centro_trabajo ct on ct.folio_centro_trabajo = ec.folio_centro_trabajo " +
                "left join cadena_centro_trabajo cct on cct.clv_cadena = ct.clv_cadena " +
                "left join bitacora_proyecto_adscripcion bpa on bpa.folio_proyecto = ec.folio_proyecto 	" +
                "left join edo_evento eee on eee.clv_edo_evento = ep.clv_edo_evento_personal " +
                "left join cat_puesto cp on cp.clv_puesto=e.clv_puesto where e.clv_emp = @usuario and ec.folio_evento = @evento";

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramIdUsuario = new Parametro();
            paramIdUsuario.Nombre = "@usuario";
            paramIdUsuario.Valor = idusuario.ToString();
            parametros.Add(paramIdUsuario);

            Parametro paramIdEevento = new Parametro();
            paramIdEevento.Nombre = "@evento";
            paramIdEevento.Valor = idEvento;
            parametros.Add(paramIdEevento);

            Parametro paramClvReq = new Parametro();
            paramClvReq.Nombre = "@req";
            paramClvReq.Valor = "prueba";
            parametros.Add(paramClvReq);

            SqlDataReader readerSuc = conexion.Consultar(select, parametros);

            evento.validacionFinal = true;

            if (readerSuc.Read())
            {
                evento.folioEvento = readerSuc["folioEvento"].ToString();
                evento.clv_Empleado = Convert.ToInt32(readerSuc["clv_Empleado"].ToString());
                evento.fotoSucursal = "https://compilacionweb.online/DemoAntad/" + readerSuc["fotoSucursal"].ToString();
                evento.folioSucursal = readerSuc["folioSucursal"].ToString();
                evento.nombreSucursal = readerSuc["nombreSucursal"].ToString();
                evento.folioProyecto = readerSuc["folioProyecto"].ToString();
                evento.agencia = readerSuc["agencia"].ToString();
                evento.fechaInicioEvento = readerSuc["fechaInicioEvento"].ToString();
                evento.fechaFinalEvento = readerSuc["fechaFinalEvento"].ToString();
                evento.fechaInicioEventoEmpleado = readerSuc["fechaInicioEventoEmpleado"].ToString();
                evento.fechaFinalEventoEmpleado = readerSuc["fechaFinalEventoEmpleado"].ToString();
                evento.estatusEvento = readerSuc["estatusEvento"].ToString();
                evento.clvEstatusEvento = Convert.ToInt32(readerSuc["clvEstatusEvento"].ToString());
                evento.estatusEventoUsuario = readerSuc["estatusEventoUsuario"].ToString();
                evento.clvEstatusEventoUsuario = Convert.ToInt32(readerSuc["clvEstatusEventoUsuario"].ToString());
                evento.tipoEvento = readerSuc["tipoEvento"].ToString();
                evento.clvTipoEvento = Convert.ToInt32(readerSuc["clvTipoEvento"].ToString());
                evento.fotoUsuario = readerSuc["fotoUsuario"].ToString();
                evento.nombreUsuario = readerSuc["nombreUsuario"].ToString();
                evento.sexoUsuario = readerSuc["sexoUsuario"].ToString();
                evento.edadUsuario = Convert.ToInt32(readerSuc["edadUsuario"].ToString());
                evento.imssUsuario = readerSuc["imssUsuario"].ToString();
                evento.alturaUsuario = readerSuc["alturaUsuario"].ToString();
                evento.clv_Puesto = Convert.ToInt32(readerSuc["clv_Puesto"].ToString());
                evento.puesto = readerSuc["puesto"].ToString();
            }





            string tipoDosSuc = "select cre.clv_requisito_evento as clvreq, cre.descripcion, cre.clv_tipo_requisito as tipo, per.rango_inferior as inferior, " +
                "per.rango_superior as superior, ere.valor as cal, ere.caducidad from evento_personal_requisitos er " +
                "left join evento_cara ec on ec.folio_evento = er.folio_evento left join cat_requisito_evento cre on cre.clv_requisito_evento = er.clv_requisito_evento " +
                "left join proyecto_evento_requisitos per on per.clv_requisito_evento = cre.clv_requisito_evento and per.folio_proyecto = ec.folio_proyecto " +
                "left join emp_requisitos_evento ere on ere.clv_requisito_evento = cre.clv_requisito_evento and ere.clv_emp = er.clv_emp " +
                "where er.folio_evento =@evento and er.clv_emp =  @usuario ";


            SqlDataReader readertipoDos = conexion.Consultar(tipoDosSuc, parametros);

            List<ValidaEvento.Valor> ldocSucv = new List<ValidaEvento.Valor>();
            List<ValidaEvento.Rango> ldocSuc = new List<ValidaEvento.Rango>();
            List<ValidaEvento.Curso> ldocSucC = new List<ValidaEvento.Curso>();
            double bajo;
            double alto;
            int clvReqEven;
            int tipoReq;
            evento.sexoValidado = true;
            evento.errorSexo = false;
            evento.imssValidado = true;
            evento.errorIms = false;
            evento.sexoSucursal = "";
            evento.mensajevalidacionsexo = "cumple con requisitos de genero";
            evento.mensajevalidacionimss = "cumple con el requisito de imss";
            bool fem = false;
            bool mas = false;


            while (readertipoDos.Read())
            {
                tipoReq = Convert.ToInt32(readertipoDos["tipo"].ToString());
                clvReqEven = Convert.ToInt32(readertipoDos["clvreq"].ToString());
                if (tipoReq.Equals(1))
                {
                    if (clvReqEven.Equals(2))
                    {//genero femenino
                        evento.sexoSucursal = "Sexo Femenino";
                        fem = true;
                    }
                    else if (clvReqEven.Equals(3))
                    {//genero masculino
                        evento.sexoSucursal = "Sexo Masculino";
                        mas = true;
                    }
                    else if (clvReqEven.Equals(6))
                    {//imss activo
                        evento.imssSuc = "Alta en el IMSS";
                        if (evento.imssUsuario == "" || evento.imssUsuario == null)
                        {
                            evento.imssUsuario = "NO";
                            evento.imssValidado = false;
                            evento.errorIms = true;
                            evento.mensajevalidacionimss = "No cumple con el requisito del imss";
                            evento.validacionFinal = false;
                        }
                        else
                        {
                            evento.imssUsuario = "SI";
                        }

                    }

                    //requsitos tipo dos rango
                }
                else if (tipoReq.Equals(2) )
                {
                    ValidaEvento.Rango docSuc = new ValidaEvento.Rango();
                    docSuc.nombreRequisito = readertipoDos["descripcion"].ToString();

                    if (readertipoDos["inferior"].ToString() == "")
                    {
                        docSuc.menor = 0;
                    }
                    else
                    {
                        docSuc.menor = Convert.ToDouble(readertipoDos["inferior"].ToString());
                    }
                    if (readertipoDos["superior"].ToString() == "")
                    {
                        docSuc.mayor = 0;
                    }
                    else
                    {
                        docSuc.mayor = Convert.ToDouble(readertipoDos["superior"].ToString());
                    }
                    if (readertipoDos["cal"].ToString() == "")
                    {
                        docSuc.valor = 0;
                    }
                    else
                    {
                        docSuc.valor = Convert.ToDouble(readertipoDos["cal"].ToString());
                    }
                    bajo = docSuc.menor;
                    alto = docSuc.mayor;
                    
                    if (docSuc.valor >= bajo && docSuc.valor <= alto)
                    {
                        docSuc.validado = true;
                        docSuc.errorvaidado = false;
                    }
                    else
                    {
                        docSuc.validado = false;
                        docSuc.errorvaidado = true;
                        evento.validacionFinal = false;
                    }

                    ldocSuc.Add(docSuc);

                }
                else if (tipoReq.Equals(3))
                {
                    ValidaEvento.Valor docSucv = new ValidaEvento.Valor();
                    docSucv.nombreRequisito = readertipoDos["descripcion"].ToString();

                    if (readertipoDos["inferior"].ToString() == "")
                    {
                        docSucv.valorRequerido = 0;
                    }
                    else
                    {
                        docSucv.valorRequerido = Convert.ToDouble(readertipoDos["inferior"].ToString());
                    }

                    if (readertipoDos["cal"].ToString() == "")
                    {
                        docSucv.valor = 0;
                    }
                    else
                    {
                        docSucv.valor = Convert.ToDouble(readertipoDos["cal"].ToString());
                    }
                    bajo = docSucv.valorRequerido;

                    //extraer los rangos del empleado y comprar

                    if (docSucv.valor == bajo)
                    {
                        docSucv.validado = true;
                        docSucv.errorvaidado = false;
                    }
                    else
                    {
                        docSucv.validado = false;
                        docSucv.errorvaidado = true;
                        evento.validacionFinal = false;
                    }

                    ldocSucv.Add(docSucv);

                }
                else if (tipoReq.Equals(4))
                {
                    /////////////////////////////////

                    ValidaEvento.Curso docSucC = new ValidaEvento.Curso();
                    docSucC.nombreCurso = readertipoDos["descripcion"].ToString();
                    docSucC.caducidad= readertipoDos["caducidad"].ToString();
                    if (readertipoDos["inferior"].ToString() == "")
                    {
                        docSucC.menor = 0;
                    }
                    else
                    {
                        docSucC.menor = Convert.ToDouble(readertipoDos["inferior"].ToString());
                    }
                    if (readertipoDos["superior"].ToString() == "")
                    {
                        docSucC.mayor = 0;
                    }
                    else
                    {
                        docSucC.mayor = Convert.ToDouble(readertipoDos["superior"].ToString());
                    }
                    if (readertipoDos["cal"].ToString() == "")
                    {
                        docSucC.valor = 0;
                    }
                    else
                    {
                        docSucC.valor = Convert.ToDouble(readertipoDos["cal"].ToString());
                    }
                    bajo = docSucC.menor;
                    alto = docSucC.mayor;

                    if (docSucC.valor >= bajo && docSucC.valor <= alto)
                    {
                        docSucC.validado = true;
                        docSucC.errorvaidado = false;
                        //validar caducidad
                        DateTime fechaF = Convert.ToDateTime(docSucC.caducidad).Date;
                        DateTime FechAc = DateTime.Now.Date;
                        if (fechaF < FechAc) // Si la fecha indicada es menor o igual a la fecha actual
                        {
                            docSucC.validado = false;
                            docSucC.errorvaidado = true;
                            docSucC.mensaje = "La vigencia del curso caduco";
                            evento.validacionFinal = false;
                        }


                    }
                    else
                    {
                        docSucC.validado = false;
                        docSucC.errorvaidado = true;
                        evento.validacionFinal = false;
                    }




                    ldocSucC.Add(docSucC);


                    ///////////////////////////////////
                }
            }


            evento.requisitosValores = ldocSucv;
            evento.requisitoCursos = ldocSucC;
            evento.requisitosRangos = ldocSuc;

            //validar sexo
            if(fem && mas)
            {
                evento.sexoSucursal = "Sexo Masculino y Femenino";
            }else if (fem && !mas)
            {
                if (evento.sexoUsuario.Equals("Masculino"))
                {
                    evento.sexoValidado = false;
                    evento.errorSexo = true;
                    evento.validacionFinal = false;
                    evento.mensajevalidacionsexo = "Se solicita genero femenino";
                }
            }
            else if (!fem && mas)
            {
                if (evento.sexoUsuario.Equals("Femenino"))
                {
                    evento.sexoValidado = false;
                    evento.errorSexo = true;
                    evento.validacionFinal = false;
                    evento.mensajevalidacionsexo = "Se solicita genero masculino";
                }
            }



            conexion.Cerrar();
            return evento;

        }
        
        public ParamValidarEvento ValidarEvento(int id, ParamValidarEvento value)
        {
            ParamValidarEvento respuesta = new ParamValidarEvento();
            respuesta.seValido = true;
            string folioEvento = value.folioEvento;
            int idUsuario = value.idUsuario;
            int clvEdoNuevo = value.clvEdoEventoNuevo;
            int clvEdoActual = value.clvEdoEventoActual;

            List<Parametro> parametros = new List<Parametro>();

            Parametro paramFolio = new Parametro();
            paramFolio.Nombre = "@folioEvento";
            paramFolio.Valor = value.folioEvento.ToString();
            parametros.Add(paramFolio);

            Parametro paramEmp = new Parametro();
            paramEmp.Nombre = "@clvEmp";
            paramEmp.Valor = value.idUsuario.ToString();
            parametros.Add(paramEmp);

            Parametro paramclvAct = new Parametro();
            paramclvAct.Nombre = "@clvEdoActual";
            paramclvAct.Valor = value.clvEdoEventoActual.ToString();
            parametros.Add(paramclvAct);

            Parametro paramclvANu = new Parametro();
            paramclvANu.Nombre = "@ClvEdoNuevo";
            paramclvANu.Valor = value.clvEdoEventoNuevo.ToString();
            parametros.Add(paramclvANu);


            //verificar que el evento no este finalizado o cancelado
            string verisql = "select * from evento_cara where folio_evento=@folioEvento AND clv_edo_evento in(13,20)";

            SqlDataReader readerSuc = conexion.Consultar(verisql, parametros);



            if (readerSuc.Read())
            {
                respuesta.mensajeValidacion = "El evento se encuentra cancelado o finalizado";
                respuesta.seValido = false;
            }
            else
            {
                // verificar que el evento se encuentre en el estado actual
                string veriestadosql = "select * from evento_personal where folio_evento=@folioEvento and clv_edo_evento_personal != @clvEdoActual and clv_emp=@clvEmp";

                SqlDataReader readerestSuc = conexion.Consultar(veriestadosql, parametros);

                if (readerestSuc.Read())
                {
                    respuesta.mensajeValidacion = "El evento cambio de estado, Por favor vuelve a escanear el código y repite el paso";
                    respuesta.seValido = false;

                }
                else
                {
                // actualizar
                    string sql = "update evento_personal set clv_edo_evento_personal=@ClvEdoNuevo where clv_edo_evento_personal=@clvEdoActual and clv_emp=@clvEmp and folio_evento=@folioEvento";

                    int registro = conexion.ActualizarParametro(sql, parametros);
                    if (registro > 0)
                    {
                            respuesta.mensajeValidacion = "La acción se realizó con exito";
                    }
                    else
                    {
                        respuesta.mensajeValidacion = "La acción no se realizó con exito, por favor intentalo de nuevo";
                        respuesta.seValido = false;
                    }
                }
            }
                                          
            conexion.Cerrar();
            return respuesta;
        }
    }
}
