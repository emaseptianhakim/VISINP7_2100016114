google.charts.load('current', { packages: ['table', 'corechart'] });
google.charts.setOnLoadCallback(getSpreadsheetData);

function getSpreadsheetData() {
  var spreadsheetId = '1n9SDrwDZ5ST9FI1vmW1XVI00GS3OidDFG12Sb1LRDok';
  var range = 'sheet1!A1:D5';

  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/' + spreadsheetId + '/gviz/tq?gid=0&range=' + range);
  query.send(handleQueryResponse);
}

function handleQueryResponse(response) {
  if (response.isError()) {
    console.error('Error: ' + response.getMessage());
    return;
  }

  var data = response.getDataTable();
  drawComparisonTable(data);
}

function drawComparisonTable(data) {
  var options = {
    width: '100%',
    height: '100%',
    showRowNumber: true
  };

  var table = new google.visualization.Table(document.getElementById('comparisonTable'));
  table.draw(data, options);

  // Calculate the total from the UnitPrice column
  var total = 0;
  var numRows = data.getNumberOfRows();
  for (var i = 0; i < numRows; i++) {
    var unitPrice = data.getValue(i, 1); // Assuming UnitPrice is in the second column (index 1)
    total += unitPrice;
  }

  // Display the total on the dashboard
  var totalElement = document.getElementById('total');
  if (totalElement) {
    totalElement.innerText = 'Total: ' + total.toFixed(2);
  }

  var chart1Options = {
    ...options,
    title: 'Column Chart',
  };
  var chart1 = new google.visualization.ColumnChart(
    document.getElementById('chart1')
  );
  chart1.draw(data, chart1Options);

  var chart3Options = {
    ...options,
    title: 'Bar Chart',
  };
  var chart3 = new google.visualization.BarChart(
    document.getElementById('chart3')
  );
  chart3.draw(data, chart3Options);

  var chart4Options = {
    ...options,
    title: 'Scatter Chart',
  };
  var chart4 = new google.visualization.ScatterChart(
    document.getElementById('chart4')
  );
  chart4.draw(data, chart4Options);
}
