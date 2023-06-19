(function () {
  var myConnector = tableau.makeConnector();

  myConnector.getSchema = function (schemaCallback) {
    // Define the table schema here
    var cols = [
      { id: "name", alias: "Name", dataType: tableau.dataTypeEnum.string },
      { id: "isoCode", alias: "ISO Code", dataType: tableau.dataTypeEnum.string },
      { id: "population", alias: "Population", dataType: tableau.dataTypeEnum.integer },
      { id: "area", alias: "Area", dataType: tableau.dataTypeEnum.float },
      // Add more columns as needed
    ];

    var tableSchema = {
      id: "geoboundaries",
      alias: "Geo Boundaries",
      columns: cols,
    };

    schemaCallback([tableSchema]);
  };

  myConnector.getData = function (table, doneCallback) {
    // Prompt the user for ISO code and administrative level
    var isoCode = prompt("Please enter the ISO code:");
    var admLevel = prompt("Please enter the administrative level:");

    // Use the entered values to construct the API URL
    var apiUrl = "https://www.geoboundaries.org/api/current/gbOpen/" + isoCode + "/" + admLevel + "/";

    // Make an AJAX request to the API
    $.ajax({
      url: apiUrl,
      dataType: "json",
      success: function (data) {
        var tableData = [];

        // Loop through the data and extract the relevant values
        for (var i = 0; i < data.length; i++) {
          var rowData = {
            name: data[i].name,
            isoCode: data[i].isoCode,
            population: data[i].population,
            area: data[i].area,
            // Add more columns and extract the values from the response
            // Adjust the property names and response structure based on your API
          };
          tableData.push(rowData);
        }

        table.appendRows(tableData);
        doneCallback();
      },
      error: function (xhr, textStatus, errorThrown) {
        // Handle API request failure or error response
        console.error("API request failed:", errorThrown);
        // Display an error message to the user or take other appropriate actions
        alert("Error occurred while fetching data from the API. Please try again later.");
      }
    });
  };

  tableau.registerConnector(myConnector);

  $(document).ready(function () {
    $("#submitButton").click(function () {
      tableau.connectionName = "Geo Boundaries Connector";
      tableau.submit();
    });
  });
})();
