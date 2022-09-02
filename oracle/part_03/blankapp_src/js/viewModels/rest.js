define([
    'knockout', 
    'ojs/ojcollectiondataprovider', 
    "ojs/ojmodel", 
    "ojs/ojtable"
], function(ko, CollectionDataProvider, Model){

    function restViewModel(){

        var self = this;

        // Define the service URL
        self.serviceURL = "https://apex.oracle.com/pls/apex/oraclejet/lp/activities/";

        // Define the model structure
        self.parseData = function(response) {
            return {name: response['name'],
                short_desc: response['short_desc']
            };
          };

        // Extend model class 
        self.Department = Model.Model.extend({
            urlRoot: self.serviceURL,
            parse: self.parseData,
            idAttribute: 'id'
        });

        // Create a model object
        self.myDept = new self.Department();

        // Extend the collection class
        self.DeptCollection = Model.Collection.extend({
            url: self.serviceURL + "?limit=50",
            model: self.myDept
        });

        // Create a collection object
        self.DeptCol = ko.observable();
        self.DeptCol(new self.DeptCollection());

        // Data source
        self.datasource = ko.observable();

        // Connect to the table using the CDP
        self.datasource(new CollectionDataProvider(self.DeptCol()));


    }
    return restViewModel;
})