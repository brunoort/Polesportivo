using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Polesportivo.Models;
using Repositorio;
using Repositorio.Repositories;

namespace Polesportivo.Controllers
{
    public class HomeController : Controller
    {
        //static string connString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        //PolesportivoContext pContext = new PolesportivoContext(connString);

        public ActionResult Default()
        {
            return View("Default");
        }

        [HttpPost]
        public ActionResult Default(HttpPostedFileBase file)
        {
            var table = new DataTable();

            if (file.ContentLength > 0)
            {
                var fileName = Path.GetFileName(file.FileName);
                var path = Path.Combine(Server.MapPath("~/App_Data/uploads"), fileName);
                file.SaveAs(path);

                //Ler o arquivo e retornar direto o dt para a página
                PolesportivoHelper polesportivo = new PolesportivoHelper();
                table = polesportivo.LerArquivo(path);
            }

            return View("Index", table);
        }

        //Método utilizado quando os dados já estão na base.
        public ActionResult Index()
        {
            //PolesportivoContext pContext = new PolesportivoContext("Server=(localdb)\\v11.0;Integrated Security=true;Database=Polesportivo;Trusted_Connection=True;");

            ////Ler o arquivo e retornar direto o dt para a página
            //PolesportivoHelper polesportivo = new PolesportivoHelper();
            //var table = polesportivo.LerArquivo(@"~/App_Data/uploads/arquivo.xlsx");
            
            return View();
        }

        //public ActionResult Index()
        //{
        //    //Ler o arquivo e retornar direto o dt para a página
        //    PolesportivoHelper polesportivo = new PolesportivoHelper();
        //    var table = polesportivo.LerArquivo(@"c:\arquivo.xlsx");

        //    //------------------------------------------------------------------
        //    //Montando os Objeto
        //    //------------------------------------------------------------------
        //    using (var db = new PolesportivoContext("Server=(localdb)\\v11.0;Integrated Security=true;Database=Polesportivo;Trusted_Connection=True;"))
        //    {

        //        Entidades.Evento evento = new Entidades.Evento
        //        {
        //            Nome = "teste",
        //            Descricao = "descricao",
        //            DataEvento = Convert.ToDateTime("12/08/2014")
        //        };
        //        //db.Eventos.Add(evento);
                
        //        foreach (DataRow row in table.Rows) // Loop over the rows.
        //        {
        //            //Capturando os dados dos atletas
        //            Entidades.Atleta atleta = new Entidades.Atleta
        //            {
        //                Nome = row.ItemArray[1].ToString(),
        //                Sobrenome = ""
        //            };
        //            //db.Atletas.Add(atleta);

        //            Entidades.Dados dados = new Entidades.Dados
        //            {
        //                Evento = evento,
        //                Atleta = atleta,
        //                Largada = row.ItemArray[2].ToString(),
        //                Split1 = row.ItemArray[3].ToString(),
        //                Chegada = row.ItemArray[4].ToString(),
        //                Total = row.ItemArray[5].ToString()
        //            };

        //            db.Dados.Add(dados);
        //        }

        //        db.SaveChanges();
        //    }

        //    return View(table);
        //}

       
        
       
    }
}