using CirculoAntad.Services;
using GalaSoft.MvvmLight.Command;
using ModelsLibraryAntad.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace CirculoAntad.ViewModels
{
    public class ValidacionAutorizarViewModel : BaseViewModel
    {


        #region Attributes
        private bool isRunning;
        private string evento;
        private ApiService apiService;
        private string usuario;
        private int clvEdoEvento;
        private ValidaEvento validaEvento { get; set; }

        #endregion


        #region Properties
        public bool IsRunning
        {
            get { return this.isRunning; }
            set
            {
                isRunning = value;
                OnPropertyChanged();
            }
        }
        public ValidaEvento ValidaEvento
        {

            get { return this.validaEvento; }
            set
            {
                validaEvento = value;
                OnPropertyChanged();
            }
        }

        #endregion


        #region Contructors
        public ValidacionAutorizarViewModel(string eventom, string usuariom)
        {
            this.apiService = new ApiService();
            this.evento = eventom;
            this.usuario = usuariom;
            this.traerEvento();
        }

        private async void traerEvento()
        {
            this.IsRunning = true;
            //this.IsRefreshing = true;
            var connection = await this.apiService.CheckConnection();

            if (!connection.IsSuccess)
            {
                this.IsRunning = false;
                //this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", connection.Message, "Aceptar");
                return;
            }

            var usser = new ValidaEvento
            {
                folioEvento = this.evento,
                clv_Empleado = Convert.ToInt32(this.usuario),

            };

            var url = Application.Current.Resources["UrlAPI"].ToString();
            var prefix = Application.Current.Resources["UrlPrefix"].ToString();
            var controller = Application.Current.Resources["UrlValidaEvento"].ToString();
            //var response = await this.apiService.GetWithPostVa(url, prefix, controller, usser);
            var response = await this.apiService.Post<ValidaEvento>(url, prefix, controller, usser);

            if (!response.IsSuccess)
            {
                this.IsRunning = false;
                //this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                return;
            }
            this.IsRunning = false;
            this.ValidaEvento = (ValidaEvento)response.Result;
            this.clvEdoEvento = this.ValidaEvento.clvEstatusEventoUsuario;
            if (this.ValidaEvento.validacionFinal)
            {
                await Application.Current.MainPage.DisplayAlert("Mensaje", "El usuario cuenta con todos los requisitos", "Aceptar");
            }
            else
            {
                await Application.Current.MainPage.DisplayAlert("Mensaje", "El usuario no cuenta con todos los requisitos", "Aceptar");
            }


        }


        #endregion


        #region Commands

        public ICommand ConcederCommand
        {
            get
            {
                return new RelayCommand(Conceder);
            }
        }

        private async void Conceder()
        {
           
            var source = await Application.Current.MainPage.DisplayActionSheet(
            "¿Esta seguro de autorizar el acceso?",
            "Cancelar",
            null,
            "SI",
            "NO");

            if (source == "SI")
            {
                this.IsRunning = true;
                //throw new NotImplementedException();
                int clvEdoE = this.clvEdoEvento;
                string folio = this.evento;
                int clvEmp = Convert.ToInt32(this.usuario);
                var connection = await this.apiService.CheckConnection();

                if (!connection.IsSuccess)
                {
                    this.IsRunning = false;
                    //this.IsRefreshing = false;
                    await Application.Current.MainPage.DisplayAlert("Mensaje", connection.Message, "Aceptar");
                    return;
                }
                //20
                var usser = new ParamValidarEvento
                {
                    folioEvento = folio,
                    idUsuario = clvEmp,
                    clvEdoEventoActual = clvEdoE,
                    clvEdoEventoNuevo = 3


                };

                var url = Application.Current.Resources["UrlAPI"].ToString();
                var prefix = Application.Current.Resources["UrlPrefix"].ToString();
                var controller = Application.Current.Resources["UrlValidaEvento"].ToString();
                var response = await this.apiService.Put<ParamValidarEvento>(url, prefix, controller, usser, clvEmp);
                if (!response.IsSuccess)
                {
                    this.IsRunning = false;
                    //this.IsRefreshing = false;
                    await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                    return;
                }

                usser = (ParamValidarEvento)response.Result;

                /*if (usser.seValido)
                {
                    await Application.Current.MainPage.DisplayAlert("Mensaje", usser.mensajeValidacion, "aceptar");
                    await App.Navigator.PopAsync();
                }
                else
                {

                }*/

                await Application.Current.MainPage.DisplayAlert("Mensaje", usser.mensajeValidacion, "aceptar");
                this.IsRunning = false;
                await App.Navigator.PopAsync();
            }
            else
            {
                return;
            }




        }

        public ICommand RechazarCommand
        {
            get
            {
                return new RelayCommand(Rechazar);
            }
        }

        private async void Rechazar()
        {

            var source = await Application.Current.MainPage.DisplayActionSheet(
            "¿Esta seguro de rechazar el acceso al evento?",
            "Cancelar",
            null,
            "SI",
            "NO");

            if (source == "SI")
            {
                this.IsRunning = true;
                //throw new NotImplementedException();
                int clvEdoE = this.clvEdoEvento;
                string folio = this.evento;
                int clvEmp = Convert.ToInt32(this.usuario);
                var connection = await this.apiService.CheckConnection();

                if (!connection.IsSuccess)
                {
                    this.IsRunning = false;
                    //this.IsRefreshing = false;
                    await Application.Current.MainPage.DisplayAlert("Mensaje", connection.Message, "Aceptar");
                    return;
                }

                var usser = new ParamValidarEvento
                {
                    folioEvento = folio,
                    idUsuario = clvEmp,
                    clvEdoEventoActual = clvEdoE,
                    clvEdoEventoNuevo = 20


                };

                var url = Application.Current.Resources["UrlAPI"].ToString();
                var prefix = Application.Current.Resources["UrlPrefix"].ToString();
                var controller = Application.Current.Resources["UrlValidaEvento"].ToString();
                var response = await this.apiService.Put<ParamValidarEvento>(url, prefix, controller, usser, clvEmp);
                if (!response.IsSuccess)
                {
                    this.IsRunning = false;
                    //this.IsRefreshing = false;
                    await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                    return;
                }

                usser = (ParamValidarEvento)response.Result;

                /*if (usser.seValido)
                {
                    await Application.Current.MainPage.DisplayAlert("Mensaje", usser.mensajeValidacion, "aceptar");
                    await App.Navigator.PopAsync();
                }
                else
                {

                }*/

                await Application.Current.MainPage.DisplayAlert("Mensaje", usser.mensajeValidacion, "aceptar");
                this.IsRunning = false;
                await App.Navigator.PopAsync();
            }
            else
            {
                return;
            }


        }
        #endregion

    }
}
