myConnector.getData = function (table, doneCallback) {
  console.log("getData function called");
  
  // Prompt the user for ISO code and administrative level
  var isoCode = prompt("Please enter the ISO code:");
  var admLevel = prompt("Please enter the administrative level:");

  // Use the entered values to construct the API URL
  var apiUrl = "https://www.geoboundaries.org/api/current/gbOpen/" + isoCode + "/" + admLevel + "/";

  console.log("API URL:", apiUrl);

  // Make an AJAX request to the API
  $.ajax({
    url: apiUrl,
    dataType: "json",
    success: function (data) {
      console.log("API request success");

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

      console.log("Table data:", tableData);

      table.appendRows(tableData);
      doneCallback();
    },
    error: function (xhr, textStatus, errorThrown) {
      console.error("API request failed:", errorThrown);
      alert("Error occurred while fetching data from the API. Please try again later.");
    }
  });
};
