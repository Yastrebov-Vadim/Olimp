namespace Olimp.BLL.Models.Response
{
    public class ElementResponse
    {
        public string Txt { get; set; }

        public ElementResponse(string txt)
        {
            Txt = txt;
        }
    }
}