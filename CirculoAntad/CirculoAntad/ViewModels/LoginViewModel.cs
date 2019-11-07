﻿using CirculoAntad.Helpers;
using CirculoAntad.Services;
using CirculoAntad.Views;
using GalaSoft.MvvmLight.Command;
using ModelsLibraryAntad.Models;
using Newtonsoft.Json;
using Plugin.Media;
using Plugin.Media.Abstractions;
using System;
using System.Collections.Generic;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace CirculoAntad.ViewModels
{
    public class LoginViewModel : BaseViewModel
    {

        #region Atributes
        private MediaFile file;
        private ImageSource imageSourceFoto;
        private bool isRunning;
        private bool isEnabled;
        private ApiService apiService;
        #endregion

        #region Properties
        public string Usuario { get; set; }
        public string ClvEmp { get; set; }
        public string Password { get; set; }

        public bool IsRemembered { get; set; }
        public ImageSource ImageSourceFoto
        {
            get { return this.imageSourceFoto; }
            set
            {
                imageSourceFoto = value;
                OnPropertyChanged();
            }
        }
        public bool IsRunning
        {
            get { return this.isRunning; }
            set
            {
                isRunning = value;
                OnPropertyChanged();
            }
        }
        public bool IsEnabled
        {
            get { return this.isEnabled; }
            set
            {
                isEnabled = value;
                OnPropertyChanged();
            }
        }
        #endregion}

        #region Contructors
        public LoginViewModel()
        {
            this.apiService = new ApiService();
            this.IsEnabled = true;
            this.IsRemembered = true;
        }
        #endregion

        #region Commands


        public ICommand RegisterCommand
        {
            get
            {
                return new RelayCommand(Register);
            }

        }

        private async void Register()
        {
            MainViewModel.GetInstance().Preregistro = new PreregistroViewModel();
            await Application.Current.MainPage.Navigation.PushAsync(new PreregistroPage());
        }

        
        /*public ICommand CargarImagenPruebaCommand
        {
            get
            {
                return new RelayCommand(CargarImagenPrueba);
            }

        }

        private async void CargarImagenPrueba()
        {
            await CrossMedia.Current.Initialize();

            var source = await Application.Current.MainPage.DisplayActionSheet(
               "Donde",
                "Cancelar",
                null,
                "Galeria",
                "Nueva foto");

            if (source == "Cancelar")
            {
                this.file = null;
                return;
            }

            if (source == "Nueva foto")
            {
                this.file = await CrossMedia.Current.TakePhotoAsync(
                    new StoreCameraMediaOptions
                    {
                        Directory = "Sample",
                        Name = "test.jpg",
                        PhotoSize = PhotoSize.Small,
                    }
                );
            }
            else
            {
                this.file = await CrossMedia.Current.PickPhotoAsync();
            }

            if (this.file != null)
            {
                this.ImageSourceFoto = ImageSource.FromStream(() =>
                {
                    var stream = this.file.GetStream();
                    return stream;
                });
            }
        }*/

        [Obsolete]
        public ICommand LoginCommand
        {
            get
            {
                return new RelayCommand(Login);
            }

        }

        [Obsolete]
        private async void Login()
        {
            if (string.IsNullOrEmpty(this.Usuario))
            {
                await Application.Current.MainPage.DisplayAlert(
                    "Error",
                    "Digita el usuario",
                    "Aceptar");
                return;
            }
            if (string.IsNullOrEmpty(this.Password))
            {
                await Application.Current.MainPage.DisplayAlert(
                    "Error",
                    "Digita el password",
                    "Aceptar");
                return;
            }
            this.IsRunning = true;
            this.IsEnabled = false;
            var connection = await this.apiService.CheckConnection();

            if (!connection.IsSuccess)
            {
                this.IsRunning = false;
                this.IsEnabled = true;
                await Application.Current.MainPage.DisplayAlert("Aviso", connection.Message, "Aceptar");
                return;
            }


            var login = new UserSession
            {
                usuario = this.Usuario,
                password = this.Password,


            };


            var url = Application.Current.Resources["UrlAPI"].ToString();
            var prefix = Application.Current.Resources["UrlPrefix"].ToString();
            var controller = Application.Current.Resources["UrlLoginApp"].ToString();
            var response = await this.apiService.Post<UserSession>(url, prefix, controller, login);

            if (!response.IsSuccess)
            {
                this.IsRunning = false;
                this.IsEnabled = true;
                await Application.Current.MainPage.DisplayAlert(
                    "Aviso",
                    response.Message,
                    "Aceptar");
                return;
            }
            this.IsRunning = false;
            this.IsEnabled = true;

            login = (UserSession)response.Result;



            if (!login.seLogeo)
            {
                await Application.Current.MainPage.DisplayAlert(
                "Mensaje",
               login.mensajeLogin,
                "Aceptar");
                return;
            }
            else
            {

                if (this.IsRemembered)
                {
                    Settings.Clvemp = login.clvEmp.ToString();
                    Settings.Usuario = this.Usuario;
                    Settings.Password = this.Password;
                    Settings.IsRemembered = true;
                }

                //recuperar UserSession
                MainViewModel.GetInstance().UserSession = login;
                Settings.UserSession = JsonConvert.SerializeObject(login);
                if (login.clvPuesto.Equals(1))
                {
                    //promotor

                }
                else if (login.clvPuesto.Equals(3))
                {
                    //intramuro

                }

                MainViewModel.GetInstance().Bienvenido = new BienvenidoViewModel();
                Application.Current.MainPage = new Master(new Bienvenido());


            }

        }
        #endregion
    }
}
