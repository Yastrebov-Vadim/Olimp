using Newtonsoft.Json.Serialization;
using OlympusPortal.ActionFilter;
using System.Net.Http.Headers;
using System.Web.Http;

namespace OlympusPortal
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                          "DefaultApi",
                          "api/{controller}/{action}",
                          new { id = RouteParameter.Optional }
                      );

            config.Formatters.Remove(config.Formatters.XmlFormatter);
            config.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));

            config.Filters.Add(new MainExceptionFilterAttribute());
        }
    }
}
