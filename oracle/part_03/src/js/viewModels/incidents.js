/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['../accUtils', "knockout", "ojs/ojarraydataprovider", "ojs/ojtable", 
"ojs/ojpagingcontrol", "ojs/ojpagingdataproviderview"],
 function(accUtils, ko, ArrayDataProvider, table, paging, PagingDataProviderView) {
    function IncidentsViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self = this;

      var deptArray = [ {DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
                        {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
                        {DepartmentId: 110, DepartmentName: 'Marketing13', LocationId: 200, ManagerId: 300},
                        {DepartmentId: 120, DepartmentName: 'Purchasing14', LocationId: 200, ManagerId: 300},
                        {DepartmentId: 130, DepartmentName: 'Human Resources15', LocationId: 200, ManagerId: 300}
                      ];
      self.dataProvider = new ArrayDataProvider(deptArray, {keyAttributes: 'DepartmentId'});
      self.pagingDataProvider =  new PagingDataProviderView(new ArrayDataProvider(deptArray, {keyAttributes: 'DepartmentId'}));

      var deptArray2 = ko.observableArray(
        [ {DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending', LocationId: 200, ManagerId: 300},
          {DepartmentId: 556, DepartmentName: 'BB', LocationId: 200, ManagerId: 300},
      ]);
      self.dataProvider2 = new ArrayDataProvider(deptArray2, {keyAttributes: 'DepartmentId'});

      self.handleDropRows = (event, context) => {
        const dragData = event.dataTransfer.getData("application/ojtablerows+json");
        if (dragData) {
            const dragDataArray = JSON.parse(dragData);
            console.log(dragDataArray);
            for (let i = 0; i < dragDataArray.length; i++) {
                console.log(dragDataArray[i].data);
                deptArray2.push(dragDataArray[i].data);
                //Alternatively splice() can be used as well
            }
        }
        console.log(deptArray2());
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
