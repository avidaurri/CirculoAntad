﻿using CirculoAntad.Services;
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
        private string evento;
        private ApiService apiService;
        private string usuario;
        private ValidaEvento validaEvento { get; set; }

        #endregion


        #region Properties
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
           // this.traerEvento();
        }

       /* private async void traerEvento()
        {
            //this.IsRefreshing = true;
            var connection = await this.apiService.CheckConnection();

            if (!connection.IsSuccess)
            {
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
                //this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                return;
            }
            this.ValidaEvento = (ValidaEvento)response.Result;

        }*/


        #endregion


        #region Commands

        /*public ICommand ConcederCommand
        {
            get
            {
                return new RelayCommand(Conceder);
            }
        }

        private async void Conceder()
        {
            //throw new NotImplementedException();

            string folio = this.evento;
            var connection = await this.apiService.CheckConnection();

            if (!connection.IsSuccess)
            {
                //this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", connection.Message, "Aceptar");
                return;
            }

            var usser = new ParamValidarEvento
            {
                folioEvento = folio,


            };

            var url = Application.Current.Resources["UrlAPI"].ToString();
            var prefix = Application.Current.Resources["UrlPrefix"].ToString();
            var controller = Application.Current.Resources["UrlDar"].ToString();
            var response = await this.apiService.Dar(url, prefix, controller, usser);
            if (!response.IsSuccess)
            {
                //this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                return;
            }


            await Application.Current.MainPage.DisplayAlert("Mensaje", "Aprobación exitosa", "aceptar");
            await App.Navigator.PopAsync();


        }*/

        public ICommand RechazarCommand
        {
            get
            {
                return new RelayCommand(Rechazar);
            }
        }

        private async void Rechazar()
        {
            await App.Navigator.PopAsync();
        }
        #endregion

    }
}
