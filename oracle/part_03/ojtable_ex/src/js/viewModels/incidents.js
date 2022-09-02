/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(["accUtils", "require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojbufferingdataprovider", "ojs/ojpagingdataproviderview", "ojs/ojarraydataprovider", "ojs/ojtable", "ojs/ojknockout", "ojs/ojpagingcontrol"], 
function (accUtils, require, exports, ko, ojbootstrap_1, BufferingDataProvider, PagingDataProviderView, ArrayDataProvider)  {
    function IncidentsViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self = this;

      self.deptArray = [
        {
            DepartmentId: 3,
            DepartmentName: "ADFPM 1001 neverending",
            LocationId: 200,
            ManagerId: 300,
        },
        { DepartmentId: 5, DepartmentName: "BB", LocationId: 200, ManagerId: 300 },
        {
            DepartmentId: 10,
            DepartmentName: "Administration",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 20,
            DepartmentName: "Marketing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 30,
            DepartmentName: "Purchasing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 40,
            DepartmentName: "Human Resources1",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 50,
            DepartmentName: "Administration2",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 60,
            DepartmentName: "Marketing3",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 70,
            DepartmentName: "Purchasing4",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 80,
            DepartmentName: "Human Resources5",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 90,
            DepartmentName: "Human Resources11",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 100,
            DepartmentName: "Administration12",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 110,
            DepartmentName: "Marketing13",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 120,
            DepartmentName: "Purchasing14",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 130,
            DepartmentName: "Human Resources15",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 1001,
            DepartmentName: "ADFPM 1001 neverending",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 1009,
            DepartmentName: "BB",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 1011,
            DepartmentName: "Administration",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 2011,
            DepartmentName: "Marketing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 3011,
            DepartmentName: "Purchasing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 4011,
            DepartmentName: "Human Resources1",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 5011,
            DepartmentName: "Administration2",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 6011,
            DepartmentName: "Marketing3",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 7011,
            DepartmentName: "Purchasing4",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 8011,
            DepartmentName: "Human Resources5",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 9011,
            DepartmentName: "Human Resources11",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 10011,
            DepartmentName: "Administration12",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 11011,
            DepartmentName: "Marketing13",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 12011,
            DepartmentName: "Purchasing14",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 13011,
            DepartmentName: "Human Resources15",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 14011,
            DepartmentName: "ADFPM 1001 neverending",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 15011,
            DepartmentName: "BB",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 21022,
            DepartmentName: "Administration",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 22022,
            DepartmentName: "Marketing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 23022,
            DepartmentName: "Purchasing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 24022,
            DepartmentName: "Human Resources1",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 25022,
            DepartmentName: "Administration2",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 26022,
            DepartmentName: "Marketing3",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 27022,
            DepartmentName: "Purchasing4",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 28022,
            DepartmentName: "Human Resources5",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 29022,
            DepartmentName: "Human Resources11",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 310022,
            DepartmentName: "Administration12",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 311022,
            DepartmentName: "Marketing13",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 312022,
            DepartmentName: "Purchasing14",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: 313022,
            DepartmentName: "Human Resources15",
            LocationId: 200,
            ManagerId: 300,
        },
    ];
      self.dataProvider = new ArrayDataProvider(self.deptArray, {keyAttributes: 'DepartmentId'});
      self.pagingDataProvider =  new PagingDataProviderView(new ArrayDataProvider(self.deptArray, {keyAttributes: 'DepartmentId'}));
     
      self.editRow = ko.observable();


      self.dataArray = ko.observableArray([
        {
            DepartmentId: 3,
            DepartmentName: "ADFPM 1001 neverending",
            LocationId: 200,
            ManagerId: 300
        },
        {
            DepartmentId: 10,
            DepartmentName: "Administration",
            LocationId: 200,
            ManagerId: 300
        }
      ]);
      
      
      self.dataprovider2 = new ArrayDataProvider(self.dataArray, {
        keyAttributes: "DepartmentId",
      });
  

      self.handleDropRows = (event, context) => {
        const dragData = event.dataTransfer.getData("application/ojtablerows+json");
        if (dragData) {
            const dragDataArray = JSON.parse(dragData);
            console.log(dragDataArray);
            for (let i = 0; i < dragDataArray.length; i++) {
                console.log(dragDataArray[i].data);
                self.dataArray.push(dragDataArray[i].data);
                //Alternatively splice() can be used as well
            }
        }
        console.log(self.dataArray);
      };


      
      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Incidents page loaded.', 'assertive');
        document.title = "Incidents";
        // Implement further logic if needed
      };

      /**
       * Optional ViewModel method invoked after the View is disconnected from the DOM.
       */
      this.disconnected = () => {
        // Implement if needed
      };

      /**
       * Optional ViewModel method invoked after transition to the new View is complete.
       * That includes any possible animation between the old and the new View.
       */
      this.transitionCompleted = () => {
        // Implement if needed
      };
    }

    /*
     * Returns an instance of the ViewModel providing one instance of the ViewModel. If needed,
     * return a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.
     */
    return IncidentsViewModel;
  }
);
