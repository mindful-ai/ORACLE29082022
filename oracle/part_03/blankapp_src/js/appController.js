define([ "ojs/ojcorerouter", 
         "ojs/ojknockoutrouteradapter", 
         "ojs/ojurlparamadapter", 
         "ojs/ojarraydataprovider", 
         "knockout",
         "ojs/ojnavigationlist",
         "ojs/ojmodulerouter-adapter",
         "ojs/ojmodule-element"
        ], 
    function(   CoreRouter,
                KnockoutRouterAdapter,
                UrlParamAdapter,
                ArrayDataProvider,
                ko,
                nlist,
                ModuleRouterAdapter

    ){ 

    function rootViewModel(){

        // Define the routes
        this.routes = [
            { path: "", redirect: "table" },
            { path: "table", detail: { label: "Table" } },
            { path: "edit", detail: { label: "Edit Table" } },
            { path: "crud", detail: { label: "CRUD Table" } },
            { path: "rest", detail: { label: "ReST" } },
            { path: "other", detail: { label: "Other" } },

        ];

        // Create ADP with partial array, excluding first redirect route
        this.dataProvider = new ArrayDataProvider(this.routes.slice(1), {
            keyAttributes: "path",
        });

        // Create the router with the routes
        this.router = new CoreRouter(this.routes, {
            urlAdapter: new UrlParamAdapter(),
        });

        // Create an observable to react to the current router state path
        this.selection = new KnockoutRouterAdapter(this.router);

        // Module Router Adapter
        this.moduleAdapter = new ModuleRouterAdapter(this.router);

        // Synchronize the router, causing it to go to its default route
        this.router.sync();

    }

    return new rootViewModel();
})