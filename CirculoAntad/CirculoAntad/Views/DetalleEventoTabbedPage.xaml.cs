﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
//using Xamarin.Forms.PlatformConfiguration.AndroidSpecific;
using Xamarin.Forms;
using Xamarin.Forms.Xaml;

namespace CirculoAntad.Views
{
    [XamlCompilation(XamlCompilationOptions.Compile)]
    public partial class DetalleEventoTabbedPage : TabbedPage
    {
        //Xamarin.Forms.TabbedPage
        public DetalleEventoTabbedPage()
        {
            InitializeComponent();
            // On<Android>().SetToolbarPlacement(ToolbarPlacement.Bottom);
        }
    }
}