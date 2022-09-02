define(["require", "exports", "ojs/ojbootstrap", "ojs/ojconverter-number", "ojs/ojarraydataprovider", "knockout", "ojs/ojknockout", "ojs/ojinputtext", "ojs/ojtable"], 
function (require, exports, ojbootstrap_1, ojconverter_number_1, ArrayDataProvider, ko) {
    function editViewModel() {


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
            
                const rowIndex = this.empObservableArray.indexOf(detail.rowContext.item.data);
                this.empObservableArray.splice(rowIndex, 1, this.rowData);
                //document.getElementById("rowDataDump").value = JSON.stringify(this.rowData);
        }
    };





    }

    return editViewModel;
  }
);
