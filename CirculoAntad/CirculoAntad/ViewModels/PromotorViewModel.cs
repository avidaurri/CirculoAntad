using CirculoAntad.Helpers;
using CirculoAntad.Services;
using GalaSoft.MvvmLight.Command;
using ModelsLibraryAntad.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Windows.Input;
using Xamarin.Forms;

namespace CirculoAntad.ViewModels
{
    public class PromotorViewModel : BaseViewModel
    {
        #region Attributes
        private bool isRefreshing;
        private ApiService apiService;
        private bool existenEventos;
        private ObservableCollection<EventoItemViewModel> eventos { get; set; }
        #endregion


        #region Properties
        public bool ExistenEventos
        {
            get { return this.existenEventos; }
            set
            {
                existenEventos = value;
                OnPropertyChanged();
            }
        }
        public bool IsRefreshing
        {
            get { return this.isRefreshing; }
            set
            {
                isRefreshing = value;
                OnPropertyChanged();
            }
        }
        public UserSession urr = JsonConvert.DeserializeObject<UserSession>(Settings.UserSession);

        public string UserName
        {
            get
            {

                return urr.usuario;


            }
        }

        public string ClvEmp
        {
            get
            {

                return urr.clvEmp.ToString();


            }
        }

        public ObservableCollection<EventoItemViewModel> Eventos
        {

            get { return this.eventos; }
            set
            {
                eventos = value;
                OnPropertyChanged();
            }
        }
        #endregion

        #region Commands
        
        public ICommand RecargarEventosCommand
        {
            get
            {
                return new RelayCommand(CargarEventos);
            }
        }
        public ICommand RefreshCommand
        {
            get
            {
                return new RelayCommand(CargarEventos);
            }
        }
        #endregion

        #region Contructors
        public PromotorViewModel()
        {
            this.apiService = new ApiService();
            this.ExistenEventos = false;
            this.CargarEventos();
           
        }

        private async void CargarEventos()
        {
            this.ExistenEventos = false;
            this.IsRefreshing = true;
            var connection = await this.apiService.CheckConnection();

            if (!connection.IsSuccess)
            {
                this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", connection.Message, "Aceptar");
                return;
            }

            var usser = new GetUserRequest
            {
                clvEmp = Convert.ToInt32(ClvEmp),
                User = UserName,
                latitud = 1.2,
                longitud = 1.2,


            };

            var url = Application.Current.Resources["UrlAPI"].ToString();
            var prefix = Application.Current.Resources["UrlPrefix"].ToString();
            var controller = Application.Current.Resources["UrlEvento"].ToString();
            var response = await this.apiService.PostList<Evento>(url, prefix, controller, usser);
            if (!response.IsSuccess)
            {
                this.IsRefreshing = false;
                await Application.Current.MainPage.DisplayAlert("Mensaje", response.Message, "Aceptar");
                return;
            }

            var list = (List<Evento>)response.Result;
            //int count = list.Count;
            if (list.Count.Equals(0))
            {
                this.ExistenEventos = true;
            }
            var myList = list.Select(p => new EventoItemViewModel
            {
                folioEvento = p.folioEvento,
                clvEmp = p.clvEmp,
                fotoCentroTrabajo = p.fotoCentroTrabajo,
                folioCentroTrabajo = p.folioCentroTrabajo,
                nombreCentroTrabajo = p.nombreCentroTrabajo,
                fechaInicio = p.fechaInicio,
                fechaFinal = p.fechaFinal,
                estadoEvento = p.estadoEvento,
                clvEdoEvento = p.clvEdoEvento,
                estadoEventoUsuario = p.estadoEventoUsuario,
                clvEdoEventoUsuario = p.clvEdoEventoUsuario,
                fotoCadenaCentroTrabajo = p.fotoCadenaCentroTrabajo,

                agencia = p.agencia,
                folioProyecto = p.folioProyecto,
                puesto = p.puesto,

            });

            this.Eventos = new ObservableCollection<EventoItemViewModel>(myList);
            this.IsRefreshing = false;
            //this.MyUsuarios = (List<Usuario>)response.Result;
            //this.RefreshList();

            //this.IsRefreshing = false;
        }
        #endregion
    }
}
