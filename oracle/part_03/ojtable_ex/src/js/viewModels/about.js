/**
 * @license
 * Copyright (c) 2014, 2021, Oracle and/or its affiliates.
 * Licensed under The Universal Permissive License (UPL), Version 1.0
 * as shown at https://oss.oracle.com/licenses/upl/
 * @ignore
 */
/*
 * Your about ViewModel code goes here
 */
define(["accUtils","require", "exports", "knockout", "ojs/ojbootstrap", "ojs/ojarraydataprovider", "ojs/ojbufferingdataprovider", "ojs/ojkeyset", "ojs/ojconverter-number", "ojs/ojcontext", "ojs/ojknockout", "ojs/ojinputtext", "ojs/ojinputnumber", "ojs/ojlabel", "ojs/ojvalidationgroup", "ojs/ojformlayout", "ojs/ojtoolbar", "ojs/ojmessages", "ojs/ojtable"], 
function (accUtils, require, exports, ko, ojbootstrap_1, ArrayDataProvider, BufferingDataProvider, ojkeyset_1, NumberConverter) {
    function AboutViewModel() {
      // Below are a set of the ViewModel methods invoked by the oj-module component.
      // Please reference the oj-module jsDoc for additional information.

      // -----------------------------------------------------------------------------------

      // ------------------------------- Section #1
      this.deptArray = [
        {
            DepartmentId: 10,
            DepartmentName: "Administration",
            LocationId: 100,
            ManagerId: 1001,
        },
        {
            DepartmentId: 20,
            DepartmentName: "Marketing",
            LocationId: 200,
            ManagerId: 1002,
        },
        {
            DepartmentId: 30,
            DepartmentName: "Purchasing",
            LocationId: 300,
            ManagerId: 1003,
        },
        {
            DepartmentId: 40,
            DepartmentName: "Human Resources",
            LocationId: 400,
            ManagerId: 1004,
        },
        {
            DepartmentId: 50,
            DepartmentName: "Accounting",
            LocationId: 500,
            ManagerId: 1005,
        },
        {
            DepartmentId: 60,
            DepartmentName: "Operations",
            LocationId: 600,
            ManagerId: 1006,
        },
        {
            DepartmentId: 70,
            DepartmentName: "Engineering",
            LocationId: 700,
            ManagerId: 1007,
        },
        {
            DepartmentId: 80,
            DepartmentName: "Production",
            LocationId: 800,
            ManagerId: 1008,
        },
        {
            DepartmentId: 90,
            DepartmentName: "Sales",
            LocationId: 900,
            ManagerId: 1009,
        },
        {
            DepartmentId: 100,
            DepartmentName: "Customer Service",
            LocationId: 1000,
            ManagerId: 1010,
        },
      ];

      // Create a buffering data provider for the table
      // Remember ArrayDataProvider does not support adding or removing items

      this.deptObservableArray = ko.observableArray(this.deptArray);
      this.dataprovider = new BufferingDataProvider(new ArrayDataProvider(this.deptObservableArray, {
                  keyAttributes: "DepartmentId",
              }));

      // ------------------------------- Section #2

      // Declare all the observables necessary for the form side

      this.inputDepartmentId = ko.observable();
      this.inputDepartmentName = ko.observable();
      this.inputLocationId = ko.observable();
      this.inputManagerId = ko.observable();
      this.firstSelected = ko.observable();
      this.disableSubmit = ko.observable(true);

      // Declare all the observables for the table side

      this.isEmptyTable = ko.observable(false);
      this.groupValid = ko.observable();      

      // Other observables misc

      this.messageArray = ko.observableArray();

      this.converter = new NumberConverter.IntlNumberConverter({
        useGrouping: false,
      });

      // ------------------------------- Section #3

      // Define all the button actions

      // Return true if the Create button should be disabled
      this.disableCreate = ko.computed(() => {
        return !this.inputDepartmentId() || this.groupValid() === "invalidShown";
      });

      // Return true if the Remove and Update buttons should be disabled
      this.disableRemoveUpdate = ko.computed(() => {
          const firstSelected = this.firstSelected();
          return (!firstSelected ||
              !firstSelected.key ||
              this.groupValid() === "invalidShown");
      });

      // Add a new row
      this.addRow = () => {
        if (this.groupValid() !== "invalidShown") {
            const dept = {
                DepartmentId: this.inputDepartmentId(),
                DepartmentName: this.inputDepartmentName(),
                LocationId: this.inputLocationId(),
                ManagerId: this.inputManagerId(),
            };
            this.dataprovider.addItem({
                metadata: { key: dept.DepartmentId },
                data: dept,
            });
        }
      };

      // Update the selected row
      this.updateRow = () => {
          if (this.groupValid() !== "invalidShown") {
              const element = document.getElementById("table");
              const currentRow = element.currentRow;
              console.log("[UPDATE]", currentRow);
              if (currentRow != null) {
                  const key = this.inputDepartmentId();
                  const newData = {
                      DepartmentId: this.inputDepartmentId(),
                      DepartmentName: this.inputDepartmentName(),
                      LocationId: this.inputLocationId(),
                      ManagerId: this.inputManagerId(),
                  };
                  this.dataprovider.updateItem({ metadata: { key: key }, data: newData });
              }
          }
      };

      // Remove the selected row
      this.removeRow = () => {
          const element = document.getElementById("table");
          const currentRow = element.currentRow;
          if (currentRow != null) {
              const dataObj = element.getDataForVisibleRow(currentRow.rowIndex);
              this.dataprovider.removeItem({
                  metadata: { key: dataObj.key },
                  data: dataObj.data,
              });
              // Clear the table selection
              element.selected = { row: new ojkeyset_1.KeySetImpl(), column: new ojkeyset_1.KeySetImpl() };
          }
      };

      // ------------------------------- Section #4: Define functionality for reset and submit

      // Reset all rows to discard buffered changes
      this.resetRows = () => {
          this.dataprovider.resetAllUnsubmittedItems();
          if (this.dataprovider.isEmpty() === "yes") {
              this.isEmptyTable(true);
          }

      };

      
      // Submit required special treatment as follows:

      this.findIndex = (key) => {
        const ar = this.deptObservableArray();
        for (let idx = 0; idx < this.deptObservableArray().length; idx++) {
            if (ar[idx].DepartmentId === key) {
                return idx;
            }
        }
        return -1;
      };

      // Commit a row to the data source
      // Any changes reflects on the BufferingDataProvider
      // These changes should be committed to the the core data provider

      this.commitOneRow = (editItem) => {
        const idx = this.findIndex(editItem.item.metadata.key);
        let error;
        if (idx > -1) {
            if (editItem.operation === "update") {
                this.deptObservableArray.splice(idx, 1, editItem.item.data);
            }
            else if (editItem.operation === "remove") {
                this.deptObservableArray.splice(idx, 1);
                if (this.dataprovider.isEmpty() === "yes") {
                    this.isEmptyTable(true);
                }
            }
            else {
                error = {
                    severity: "error",
                    summary: "add error",
                    detail: "Row with same key already exists",
                };
            }
        }
        else {
            if (editItem.operation === "add") {
                this.deptObservableArray.splice(this.deptObservableArray().length, 0, editItem.item.data);
            }
        }

      };


      // Submit the unsubmitted items
      this.submitRows = () => {

        this.disableSubmit(true);

        // Get all the submittable items
        const editItems = this.dataprovider.getSubmittableItems();
        editItems.forEach((editItem) => {
            // Set each edit item to "submitting" status before data submission
            this.dataprovider.setItemStatus(editItem, "submitting");
            // DepartmentData
            // Commit data
            this.commitOneRow(editItem)
                .then(() => {
                // Set the edit item to "submitted" if successful
                this.dataprovider.setItemStatus(editItem, "submitted");
                })
                .catch((error) => {
                // Set the edit item back to "unsubmitted" with error if not successful
                this.dataprovider.setItemStatus(editItem, "unsubmitted", error);

            });
        });

      };

      // Show all submittable edit items
      this.showSubmittableItems = (submittable) => {
          const textarea = document.getElementById("bufferContent");
          let textValue = "";
          submittable.forEach((editItem) => {
                    textValue += editItem.operation + " ";
                    textValue += editItem.item.metadata.key + ": ";
                    textValue += JSON.stringify(editItem.item.data);
                    if (editItem.item.metadata.message) {
                        textValue +=
                            " error: " + JSON.stringify(editItem.item.metadata.message);
                    }
                    textValue += "\n";
            });
            textarea.value = textValue;
      };


      // ------------------------------- Section #5: Handle some important events

      // Listener for updating the form when row selection changes in the table
      this.firstSelectedRowChangedListener = (event) => {
                const itemContext = event.detail.value;
                if (itemContext && itemContext.data) {
                    const dept = itemContext.data;
                    this.inputDepartmentId(dept.DepartmentId);
                    this.inputDepartmentName(dept.DepartmentName);
                    this.inputLocationId(dept.LocationId);
                    this.inputManagerId(dept.ManagerId);
                }
      };      

      this.dataprovider.addEventListener("submittableChange", (event) => {
        // BufferingDataProvider fires the "submittableChange" event whenever there is a change in the number of submittable items.
        // We can use this to update the UI.
        const submittable = event.detail;
        this.disableSubmit(submittable.length === 0);
        this.showSubmittableItems(submittable);
      });

      this.dataprovider.addEventListener("mutate", (event) => {
        if (this.isEmptyTable() === true && event.detail.add != null) {
            this.isEmptyTable(false);
        }
      });


      // ------------------------------------------------------------------------------------

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
