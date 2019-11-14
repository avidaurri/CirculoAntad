using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CirculoAntad.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class Master : MasterDetailPage
    {
        public Master(Page pagina)
        {
            InitializeComponent();
            App.Navigator = new NavigationPage(pagina);
            this.Detail = App.Navigator;
            //IsPresented = false;
            //this.Master.IsVisible = false;
            //this.IsPresented = false;
         

        }

        
    }
}