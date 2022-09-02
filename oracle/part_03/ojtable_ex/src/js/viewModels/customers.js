/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your customer ViewModel code goes here
 */
define(["accUtils","require", "exports", "ojs/ojbootstrap", "ojs/ojconverter-number", "ojs/ojarraydataprovider", "knockout", "ojs/ojknockout", "ojs/ojinputtext", "ojs/ojtable"], 
function (accUtils,require, exports, ojbootstrap_1, ojconverter_number_1, ArrayDataProvider, ko) {
    function CustomerViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      // -------------------------------------------------------------------------------

      this.empArray = [
        {
            EmployeeId: 5,
            FirstName: "Amy",
            LastName: "Bartlet",
            salary: 100000,
            bonus: 2000,
        },
        {
            EmployeeId: 10,
            FirstName: "Andy",
            LastName: "Jones",
            salary: 1030000,
            bonus: 1000,
        },
        {
            EmployeeId: 20,
            FirstName: "Andrew",
            LastName: "Bugsy",
            salary: 1120000,
            bonus: 2100,
        },
        {
            EmployeeId: 50,
            FirstName: "Bart",
            LastName: "Buckler",
            salary: 910000,
            bonus: 3100,
        },
        {
            EmployeeId: 60,
            FirstName: "Bobby",
            LastName: "Fisher",
            salary: 140200,
            bonus: 2130,
        },
    ];
    this.empObservableArray = ko.observableArray(this.empArray);
    this.dataprovider = new ArrayDataProvider(this.empObservableArray, {
        keyAttributes: "EmployeeId",
    });
    // // NUMBER AND DATE CONVERTER ////
    this.numberConverter = new ojconverter_number_1.IntlNumberConverter();
    this.editRow = ko.observable();
    // checking for validity of editables inside a row
    // return false if one of them is considered as invalid
    /*
    this.hasValidationErrorInRow = (table) => {
        const editables = table.querySelectorAll(".editable");
        for (let i = 0; i < editables.length; i++) {
            const editable = editables.item(i);
            editable.validate();
            // Table does not currently support editables with async validators
            // so treating editable with 'pending' state as invalid
            if (editable.valid !== "valid") {
                return true;
            }
        }
        return false;
    };
    */
    this.valueChange = () => {
        this.rowData.total(this.rowData.salary + this.rowData.bonus);
    };
    this.beforeRowEditListener = (event) => {
        this.rowData = Object.assign({}, event.detail.rowContext.item.data);
        this.rowData.total = ko.observable(this.rowData.salary + this.rowData.bonus);
    };

    //ojBeforeRowEditEnd 
    this.beforeRowEditEndListener = (event) => {
        const detail = event.detail;
        if (!detail.cancelEdit) {
            if (this.hasValidationErrorInRow(document.getElementById("table"))) {
                event.preventDefault();
            }
            else {
                const rowIndex = this.empObservableArray.indexOf(detail.rowContext.item.data);
                this.empObservableArray.splice(rowIndex, 1, this.rowData);
                document.getElementById("rowDataDump").value = JSON.stringify(this.rowData);
            }
        }
    };

      // -------------------------------------------------------------------------------

      /**
       * Optional ViewModel method invoked after the View is inserted into the
       * document DOM.  The application can put logic that requires the DOM being
       * attached here.
       * This method might be called multiple times - after the View is created
       * and inserted into the DOM and after the View is reconnected
       * after being disconnected.
       */
      this.connected = () => {
        accUtils.announce('Customers page loaded.', 'assertive');
        document.title = "Customers";
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
    return CustomerViewModel;
  }
);
