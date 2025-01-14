google.charts.load('current', { packages: ['corechart', 'line'] });
google.charts.setOnLoadCallback(drawCharts);
google.charts.setOnLoadCallback(drawVisualization);
google.charts.setOnLoadCallback(drawMonthlyRevenueChart);

function parseJSONSafe(id) {
  try {
    return JSON.parse(document.getElementById(id).value);
  } catch (error) {
    console.error(`Error parsing JSON for ${id}:`, error);
    return [];
  }
}

function drawCharts() {
  var topDayData = parseJSONSafe('topDayData');
  var topMonthData = parseJSONSafe('topMonthData');
  var topYearData = parseJSONSafe('topYearData');

  [topDayData, topMonthData, topYearData].forEach((data) => {
    data.forEach((row) => {
      row.quantity = isNaN(Number(row.quantity)) ? 0 : Number(row.quantity);
    });
  });

  drawBarChart('Top Products Today', topDayData, 'topSellerDay');
  drawBarChart('Top Products This Month', topMonthData, 'topSellerMonth');
  drawBarChart('Top Products This Year', topYearData, 'topSellerYear');
}

function drawBarChart(title, data, elementId) {
  var chartData = new google.visualization.DataTable();
  chartData.addColumn('string', 'Product');
  chartData.addColumn('number', 'Quantity');
  data.forEach(function (row) {
    chartData.addRow([row.name, row.quantity]);
  });

  var options = {
    title: title,
    width: '100%',
    height: 300,
  };

  var chart = new google.visualization.BarChart(document.getElementById(elementId));
  chart.draw(chartData, options);
}

function drawVisualization() {
  var chartData = parseJSONSafe('saleCategoryData');
  if (chartData.length === 0) {
    console.warn('No data for saleCategoryData');
    return;
  }

  var data = google.visualization.arrayToDataTable(chartData);

  var options = {
    title: 'Monthly Sales by Category',
    vAxis: { title: 'Units Sold' },
    hAxis: { title: 'Month' },
    seriesType: 'bars',
    series: { 3: { type: 'line' } },
  };

  var chart = new google.visualization.ComboChart(document.getElementById('categoryChart'));
  chart.draw(data, options);
}

async function drawMonthlyRevenueChart() {
  const monthlyRevenues = parseJSONSafe('revenue');
  const chartData = monthlyRevenues.map(({ month, revenue }) => [month, parseFloat(revenue)]);

  const data = new google.visualization.DataTable();
  data.addColumn('number', 'Month');
  data.addColumn('number', 'Revenue');
  data.addRows(chartData);

  const options = {
    chart: {
      title: 'Monthly Revenue',
      subtitle: 'In USD',
    },
  };

  const chart = new google.charts.Line(document.getElementById('monthlyRevenueChart'));
  chart.draw(data, google.charts.Line.convertOptions(options));
}

// Hàm fetch dữ liệu mới khi người dùng chọn thời gian
async function fetchDataByDate(newURL) {
  try {
    const response = await fetch(newURL, {
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
        },
    });
    const data = await response.json();
    document.getElementById('topDayData').value = JSON.stringify(data.topDay);
    document.getElementById('topMonthData').value = JSON.stringify(data.topMonth);
    document.getElementById('topYearData').value = JSON.stringify(data.topYear);
    document.getElementById('saleCategoryData').value = JSON.stringify(data.saleCategoryData);
    document.getElementById('revenue').value = JSON.stringify(data.revenue);

    drawVisualization();
    drawCharts();
    drawMonthlyRevenueChart();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Lắng nghe sự kiện chọn thời gian
document.addEventListener('DOMContentLoaded', function () {
  const timeSelector = document.getElementById('timeSelector');
  timeSelector.addEventListener('change', function (event) {
    const selectedTime = event.target.value;
   
    const params = new URLSearchParams(window.location.search);
    params.set('date', selectedTime);
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState(null, '', newURL);
    fetchDataByDate(newURL);
  });
});
