(function () {
    var myConnector = tableau.makeConnector();

    // Define how you want to map the data to one or more tables.
    myConnector.getSchema = function (schemaCallback) {
        // The variable 'cols' is an array of objects. Each object defines a single column in our table.
        var cols = [{
            id: "id",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "firstName",
            alias: "First Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "lastName",
            alias: "Last Name",
            dataType: tableau.dataTypeEnum.string
        }, {
            id: "primaryEmail",
            alias: "Email",
            dataType: tableau.dataTypeEnum.geometry
        }];
    
        var tableSchema = {
            id: "Customers",
            alias: "Fusebill Customers",
            columns: cols
        };
    
        schemaCallback([tableSchema]);
        tableau.log("Hello Scott. Your code was successful.");
    };

    $.ajaxSetup({
        headers : {
          'Authorization' : 'Basic MDowaUgyczFlbjNsbDBwdlpsSzRaYllxWG1FcGxyZ0U5UnpJYkg5aWtjV0dxd2RLcnJPdXVUUkRCZFhuZUZXakNE',
          'Content-Type': 'application/json'
        }
      });

    myConnector.getData = function (table, doneCallback) {
        $.getJSON("http://secure.fusebill.com/v1/customers", function(resp) {
        var feat = resp.features,
            tableData = [];

        // Iterate over the JSON object
        for (var i = 0, len = feat.length; i < len; i++) {
            tableData.push({
                "id": feat[i].id,
                "firstName": feat[i].firstName,
                "lastName": feat[i].lastName,
                "primaryEmail": feat[i].primaryEmail
            });
        }

        table.appendRows(tableData);
        doneCallback();
    });
    };

    tableau.registerConnector(myConnector);

    $(document).ready(function () {
        $("#submitButton").click(function () {
            tableau.connectionName = "Fusebill Customers";
            tableau.submit();
        });
    });
})();
