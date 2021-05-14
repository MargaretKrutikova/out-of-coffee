namespace NotificationService

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open NotificationService.CompositionRoot

type Startup(configuration: IConfiguration) =
    member _.Configuration = configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) =
        let notificationApi = this.Configuration.GetValue<string>("NotificationApiUrl")
        let orderGraphqlApi = this.Configuration.GetValue<string>("OrderGraphqlApi")

        let compositionRoot = createCompositionRoot (OrderGraphqlApiUrl orderGraphqlApi) (NotificationApiUrl notificationApi)
        
        services.AddSingleton<CompositionRoot>(compositionRoot) |> ignore
        services.AddControllers() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member _.Configure(app: IApplicationBuilder, env: IWebHostEnvironment) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage() |> ignore
        app.UseHttpsRedirection()
           .UseRouting()
           .UseAuthorization()
           .UseEndpoints(fun endpoints ->
                endpoints.MapControllers() |> ignore
            ) |> ignore
