async function fetchData(url, page = 1, per_page = 100) {
    const response = await fetch(`${url}?page=${page}&per_page=${per_page}`);
    const data = await response.json();
    return data;
}

async function fetchAllData(url, per_page = 100) {
    let page = 1;
    let data = await fetchData(url, page, per_page);
    let allData = data.data;

    while (page < data.total_pages) {
        page++;
        data = await fetchData(url, page, per_page);
        allData = allData.concat(data.data);
    }

    return allData;
}

async function createChart() {
    const url = '/api/v1.0/stores';
    const data = await fetchAllData(url);

    // Group data by year and month and calculate the combined total monthly sales
    const monthlySales = d3.rollups(
        data,
        v => d3.sum(v, d => d.sales),
        d => d.year,
        d => d.month
    );

    // Sort monthly sales data by year and month
    monthlySales.sort(([yearA, monthA], [yearB, monthB]) => {
        if (yearA !== yearB) {
            return yearA - yearB;
        }
        return monthA - monthB;
    });

    // Create yearly line chart trace
    const yearlyTrace = {
        x: monthlySales.map(([year, month]) => year),
        y: d3.rollups(monthlySales, v => d3.sum(v), ([year]) => year),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: 'steelblue'
        },
        name: 'Yearly Sales'
    };

    // Create monthly line chart trace
    const monthlyTrace = {
        x: monthlySales.map(([year, month]) => `${year}-${month}`),
        y: monthlySales.map(([year, month, sales]) => sales),
        type: 'scatter',
        mode: 'lines+markers',
        marker: {
            color: 'orange'
        },
        name: 'Monthly Sales'
    };

    // Define the layout for the charts
    const layout = {
        margin: { t: 20, r: 20, b: 30, l: 50 },
        xaxis: {
            title: 'Year',
            tickformat: 'd'
        },
        yaxis: {
            title: 'Total Sales'
        }
    };

    // Create the charts
    Plotly.newPlot('chart', [yearlyTrace], layout);

    // Set the height of the monthly chart
    const monthlyChart = document.getElementById('line');
    monthlyChart.style.height = `${monthlyChart.clientWidth * 0.5}px`;

    // Create the monthly chart
    const monthlyLayout = {
        margin: { t: 20, r: 20, b: 30, l: 50 },
        xaxis: {
            title: 'Year-Month'
        },
        yaxis: {
            title: 'Total Sales'
        }
    };

    Plotly.newPlot('line', [monthlyTrace], monthlyLayout);
}

// Call the createChart function to render the chart
createChart();
