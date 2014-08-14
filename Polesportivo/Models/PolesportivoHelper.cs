using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.Office.Interop.Excel;
using DataTable = System.Data.DataTable;

namespace Polesportivo.Models
{
    public class PolesportivoHelper
    {
        private static DataTable table = new DataTable();

        public DataTable LerArquivo(string caminhoArquivo)
        {
            var app = new Application();

            //Cria um objeto do tipo WorkBook com todos os elementos do Excel.
            Workbook workBook = app.Workbooks.Open(caminhoArquivo,
                Type.Missing, true, Type.Missing, Type.Missing,
                Type.Missing, Type.Missing, Type.Missing, Type.Missing,
                Type.Missing, Type.Missing, Type.Missing, Type.Missing,
                Type.Missing, Type.Missing);


            int numSheets = workBook.Sheets.Count;
            //esse loop vai percorrer todas as pastas de trabalho do excel.
            for (int sheetNum = 1; sheetNum < numSheets + 1; sheetNum++)
            {
                Worksheet sheet = (Worksheet)workBook.Sheets[sheetNum];
                int numColumns = sheet.Columns.Count;
                int numRows = sheet.Rows.Count;

                Range excelRange = sheet.UsedRange;
                //Pega o conteúdo de uma linha e transforma e um array de objetos.
                object[,] Linha = (object[,])excelRange.get_Value(XlRangeValueDataType.xlRangeValueDefault);

                List<string[]> Linhas = new List<string[]>();
                int cont_ant = 0;
                //Percorre todas as dimensões do array linha para pegar o conteúdo de cada célula.
                for (int i = 1; i <= Linha.GetUpperBound(0); i++)
                {
                    if (i > cont_ant)
                    {
                        cont_ant = i;
                        //pega o total de células preenchidas na linha e cria um array com o número exato de dimensões.
                        string[] celulas = new string[Linha.GetUpperBound(1)];
                        //percorre todas as células atribuindo preenchendo o array.
                        for (int j = 1; j <= Linha.GetUpperBound(1); j++)
                        {
                            if (Linha[i, j] != null)
                                celulas[j - 1] = Linha[i, j].ToString();
                        }
                        Linhas.Add(celulas);
                    }
                }

                var arr = new List<Tuple<string, string, int, int>>();
                arr.Add(Tuple.Create("info", "numero", 1, 0));
                arr.Add(Tuple.Create("info", "nome", 2, 0));
                arr.Add(Tuple.Create("info", "largada", 4, 0));

                arr.Add(Tuple.Create("calc", "modalidade", 6, 4));

                arr.Add(Tuple.Create("info", "chegada", 17, 0));
                arr.Add(Tuple.Create("info", "total", 18, 0));

                //while (vLinha < cont_ant)
                //Criando as colunas na datatable pra receber os valores que serão calculados

                
                foreach (var vColunas in arr)
                {
                    //table.Columns.Add("largada");
                    table.Columns.Add(vColunas.Item2);
                }

                foreach (var tuple in arr)
                {
                    if (tuple.Item1 == "info")
                    {
                        if (tuple.Item2 == "numero")
                        {
                            for (var vLinha = 1; vLinha <= cont_ant; vLinha++)
                            {
                                var vNumero = Linha[vLinha, Convert.ToInt32(tuple.Item3)].ToString();
                                table.Rows.Add(vNumero);
                            }
                        }
                        else if (tuple.Item2 == "nome")
                        {
                            for (var vLinha = 1; vLinha <= (table.Rows.Count); vLinha++)
                            {
                                var vNome = Linha[vLinha, Convert.ToInt32(tuple.Item3)].ToString();
                                table.Rows[vLinha - 1][tuple.Item2] = vNome;
                            }
                        }
                        else if (tuple.Item2 == "largada")
                        {
                            for (var vLinha = 1; vLinha <= (table.Rows.Count); vLinha++)
                            {
                                var vLargada = ConverterHorario(Linha[vLinha, Convert.ToInt32(tuple.Item3)].ToString());
                                table.Rows[vLinha - 1][tuple.Item2] = vLargada;
                            }
                        }
                        else if (tuple.Item2 == "chegada")
                        {
                            for (var vLinha = 1; vLinha <= (table.Rows.Count); vLinha++)
                            {
                                var vChegada = Linha[vLinha, Convert.ToInt32(tuple.Item3)].ToString();
                                table.Rows[vLinha - 1][tuple.Item2] = vChegada;
                            }
                        }
                        else if (tuple.Item2 == "total")
                        {
                            for (var vLinha = 1; vLinha <= (table.Rows.Count); vLinha++)
                            {
                                var vTotal = Linha[vLinha, Convert.ToInt32(tuple.Item3)].ToString();
                                table.Rows[vLinha - 1][tuple.Item2] = vTotal;
                            }
                        }
                    }
                    else if (tuple.Item1 == "calc")
                    {
                        if (tuple.Item2 == "modalidade")
                        {
                            for (var vLinha = 1; vLinha <= (table.Rows.Count); vLinha++)
                            {
                                var vValor1 = Linha[vLinha, Convert.ToInt32(tuple.Item3)];
                                var vValor2 = Linha[vLinha, Convert.ToInt32(tuple.Item4)];
                                var vFinal = ((double)vValor2 - (double)vValor1).ToString();
                                table.Rows[vLinha - 1][tuple.Item2] = ConverterHorario(vFinal);
                            }
                        }
                    }
                }


            }

            workBook.Close();

            return table;
        }

        public TimeSpan? ConverterHorario(string dataHora)
        {
            try
            {
                TimeSpan conv = DateTime.FromOADate(double.Parse((dataHora))).TimeOfDay;
                return conv;
            }
            catch
            {
                return null;
            }
        }

        public TimeSpan? ConverterTimeSpan(string hora)
        {
            if (hora != "")
            {
                var arrv1 = hora.Split('.');
                var arrv2 = arrv1[0].Split(':');

                var timespan = new TimeSpan(Convert.ToInt32(arrv2[0]), Convert.ToInt32(arrv2[1]),
                    Convert.ToInt32(arrv2[2]), Convert.ToInt32(arrv2[3]), Convert.ToInt32(arrv1[1]));
                return timespan;
            }
            else
            {
                return null;
            }
        }
    }
}