using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CirculoAntad.Views.Registro
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class RegistroCuatroPage : ContentPage
    {
        public RegistroCuatroPage()
        {
            InitializeComponent();
        }

        private async void Heart_Clicked(object sender, EventArgs e)
        {
            await Navigation.PopAsync();
        }
    }
}