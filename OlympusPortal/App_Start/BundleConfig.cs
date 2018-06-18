using System.Web.Optimization;

namespace OlympusPortal
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/util").Include(
                        "~/Scripts/util"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site1.css"));

            bundles.Add(new ScriptBundle("~/bundles/webPack").Include(
                       "~/Scripts/minify/polyfills.js",
                       "~/Scripts/minify/vendor.js",
                       "~/Scripts/minify/app.js"));
        }
    }
}
