namespace NotificationService

open Microsoft.AspNetCore.Builder
open Microsoft.AspNetCore.Cors.Infrastructure
open Microsoft.AspNetCore.Hosting
open Microsoft.Extensions.Configuration
open Microsoft.Extensions.DependencyInjection
open Microsoft.Extensions.Hosting
open NotificationService.CompositionRoot

type Startup(configuration: IConfiguration) =
    let configureCors (builder : CorsPolicyBuilder) =
        builder
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader()
             |> ignore
    let originsPolicy = "_originsPolicy"
    
    member _.Configuration = configuration

    // This method gets called by the runtime. Use this method to add services to the container.
    member this.ConfigureServices(services: IServiceCollection) =
        let notificationApi = this.Configuration.GetValue<string>("NotificationApiUrl")
        let orderGraphqlApi = this.Configuration.GetValue<string>("OrderGraphqlApi")

        let compositionRoot = createCompositionRoot (OrderGraphqlApiUrl orderGraphqlApi) (NotificationApiUrl notificationApi)
        
        services.AddCors(fun options -> options.AddPolicy(originsPolicy, configureCors)
        ) |> ignore
        services.AddSingleton<CompositionRoot>(compositionRoot) |> ignore
        services.AddControllers() |> ignore

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    member _.Configure(app: IApplicationBuilder, env: IWebHostEnvironment) =
        if (env.IsDevelopment()) then
            app.UseDeveloperExceptionPage() |> ignore
        app.UseHttpsRedirection()
           .UseRouting()
           .UseCors(originsPolicy)
           .UseAuthorization()
           .UseEndpoints(fun endpoints ->
                endpoints.MapControllers() |> ignore
            ) |> ignore
