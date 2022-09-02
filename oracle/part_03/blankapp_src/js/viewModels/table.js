define(["knockout", "ojs/ojarraydataprovider",  "ojs/ojlistdataproviderview", "ojs/ojknockout","ojs/ojtable","ojs/ojinputtext"],
 function(ko, ArrayDataProvider, ListDataProviderView){

    function tableViewModel(){
    //Observable array for data
      var data = [
        {name:"Pedestrians", items:[42]},
        {name:"Vehicles", items:[82]},
        {name:"Bicycles", items:[20]},
        {name:"Busses", items:[76]},
        {name:"Trains", items:[31]}
      
      ];

      this.datasource = ko.observableArray(data);

      // ------------------------------------------------------------------ //

      this.baseDeptArray = [
        {
            DepartmentId: "01",
            DepartmentName: "ADFPM 1001 neverending",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "20",
            DepartmentName: "BB",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "30",
            DepartmentName: "Administration",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "40",
            DepartmentName: "Marketing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "50",
            DepartmentName: "Purchasing",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "60",
            DepartmentName: "Human Resources1",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "70",
            DepartmentName: "Administration2",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "80",
            DepartmentName: "Marketing3",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "90",
            DepartmentName: "Purchasing4",
            LocationId: 200,
            ManagerId: 300,
        },
        {
            DepartmentId: "10",
            DepartmentName: "Human Resources5",
            LocationId: 200,
            ManagerId: 300,
        },
      ];

      this.filter = ko.observable();

      // Populate the array, just for demonstration purposes
      // to work with "Seemingly" large amounts of data
      this.generateDeptArray = (num) => {
        const deptArray = [];
        let count = 0;
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < this.baseDeptArray.length; j++) {
                deptArray[count] = Object.assign({}, this.baseDeptArray[j]);
                deptArray[count].DepartmentId += count.toString();
                deptArray[count].DepartmentName += count.toString();
                count++;
            }
        }
        return deptArray;
      };

      // Generate some 1000 entries
      this.deptArray = this.generateDeptArray(2);

      // When the text box value changes, capture its raw value
      this.handleValueChanged = () => { 
        this.filter(document.getElementById("filter").rawValue);
        console.log("Filter value changed: ", this.filter());
      };

      // Make the dataprovider for the table a computed function
      // based on the input received on the filter input text box

      // this.dataprovider = new ArrayDataProvider(this.deptArray, { keyAttributes: "DepartmentId" });

      
      this.dataprovider = ko.computed(function () {
        const filterRegEx = new RegExp(this.filter(), "i");
        const filterCriterions = {
            op: "$or",
            criteria: [
                { op: "$regex", value: { DepartmentId: filterRegEx } },
                { op: "$regex", value: { DepartmentName: filterRegEx } },
                { op: "$regex", value: { LocationId: filterRegEx } },
                { op: "$regex", value: { ManagerId: filterRegEx } },
            ],
        };
        const arrayDataProvider = new ArrayDataProvider(this.deptArray, { keyAttributes: "DepartmentId" });
        return new ListDataProviderView(arrayDataProvider, { filterCriterion: filterCriterions });
      }, this);

      // ---------------------------------------------------------------------------------------

      this.highlightingCellRenderer = (context) => {
        let field = null;
        if (context.columnIndex === 0) {
            field = "DepartmentId";
        }
        else if (context.columnIndex === 1) {
            field = "DepartmentName";
        }
        else if (context.columnIndex === 2) {
            field = "LocationId";
        }
        else if (context.columnIndex === 3) {
            field = "ManagerId";
        }

        let data = context.row[field].toString(); // apples
        const filterString = this.filter(); // app

        let textNode;
        let spanNode = document.createElement("span");
        if (filterString && filterString.length > 0) {
            const index = data.toLowerCase().indexOf(filterString.toLowerCase());
            if (index > -1) {
                const highlightedSegment = data.substr(index, filterString.length);
                if (index !== 0) {
                    textNode = document.createTextNode(data.substr(0, index));
                    spanNode.appendChild(textNode);
                }
                let bold = document.createElement("b");
                textNode = document.createTextNode(highlightedSegment);
                bold.appendChild(textNode);
                spanNode.appendChild(bold);
                if (index + filterString.length !== data.length) {
                    textNode = document.createTextNode(data.substr(index + filterString.length, data.length - 1));
                    spanNode.appendChild(textNode);
                }
            }
            else {
                textNode = document.createTextNode(data);
                spanNode.appendChild(textNode);
            }
        }
        else {
            textNode = document.createTextNode(data);
            spanNode.appendChild(textNode);
        }
        context.parentElement.appendChild(spanNode);
    };

    this.columnArray = [
        { headerText: "Department Id", renderer: this.highlightingCellRenderer },
        { headerText: "Department Name", renderer: this.highlightingCellRenderer },
        { headerText: "Location Id", renderer: this.highlightingCellRenderer },
        { headerText: "Manager Id", renderer: this.highlightingCellRenderer },
    ];


    }
    return tableViewModel;
})