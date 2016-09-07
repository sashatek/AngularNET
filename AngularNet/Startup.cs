using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(AngularNet.Startup))]
namespace AngularNet
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
