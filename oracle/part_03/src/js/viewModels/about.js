/**
 * @license
 * Copyright (c) 2014, 2022, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(['../accUtils', 'knockout', 'ojs/ojchart'],
 function(accUtils, ko) {
    function AboutViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      var self = this;

      // ----------------------------------------------------------------

      var data1 = [
        {name:"Papers Published", items:[12]},
        {name:"Projects Completed", items:[14]},
        {name:"Team Size", items:[28]}   
      ];

      var data2 = [
              {name:"Papers Published", items:[10]},
              {name:"Projects Completed", items:[18]},
              {name:"Team Size", items:[8]}   
            ]; 
      
      var data3 = [
              {name:"Papers Published", items:[17]},
              {name:"Projects Completed", items:[8]},
              {name:"Team Size", items:[18]}   
            ];

      self.datasource1 = ko.observableArray(data1);
      self.datasource2 = ko.observableArray(data2);
      self.datasource3 = ko.observableArray(data3);

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('About page loaded.', 'assertive');
        document.title = "About";
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
    return AboutViewModel;
  }
);
