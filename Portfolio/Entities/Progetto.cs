using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Portfolio.Entities
{
    public class Progetto
{
    public int Id { get; set; }
    public string Titolo { get; set; }
    public string Descrizione { get; set; }
    public string LinkDemo { get; set; }
    public string LinkGitHub { get; set; }
    public DateTime DataCreazione { get; set; }
}
}