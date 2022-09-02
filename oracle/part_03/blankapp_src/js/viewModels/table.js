define(["knockout", "ojs/ojchart"], function(ko){

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

    }
    return tableViewModel;
})