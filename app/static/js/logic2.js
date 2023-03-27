document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('store-item-selector');
    const chartDiv = document.getElementById('chart');
    const metricsTableDiv = document.getElementById('metricsTable');

    function fetchData() {
        return fetch('/api/v1.0/results')
            .then(response => response.json());
    }

    function populateDropdown(data) {
        const storeItemSet = new Set(data.map(row => `${row.store}-${row.item}`));

        storeItemSet.forEach(storeItem => {
            const option = document.createElement('option');
            option.value = storeItem;
            option.textContent = `Store ${storeItem.split('-')[0]}, Item ${storeItem.split('-')[1]}`;
            dropdown.appendChild(option);
        });
    }

    function createChart(data, storeItem) {
        const [store, item] = storeItem.split('-');
        const filteredData = data.filter(row => row.store == store && row.item == item);

        const traceActual = {
            x: filteredData.map(row => row.ds),
            y: filteredData.map(row => row.sales),
            mode: 'lines',
            name: 'Actual Sales'
        };

        const tracePredicted = {
            x: filteredData.map(row => row.ds),
            y: filteredData.map(row => row.yhat),
            mode: 'lines',
            name: 'Predicted Sales',
            line: { dash: 'dot' }
        };

        // Generate an array of every 15th date
        const xTickVals = filteredData.filter((_, index) => index % 15 === 0).map(row => row.ds);

        const layout = {
            title: `Actual and Predicted Sales for Store ${store}, Item ${item}`,
            xaxis: {
                tickmode: 'array',
                tickvals: xTickVals // Use the generated array of every 15th date
            },
            yaxis: { title: 'Sales' }
        };

        Plotly.newPlot(chartDiv, [traceActual, tracePredicted], layout);
    }

    function updateChart() {
        fetchData().then(data => {
            const selectedStoreItem = dropdown.value;
            createChart(data, selectedStoreItem);
        });
    }

    // Initial population of the dropdown and chart
    fetchData().then(data => {
        populateDropdown(data);
        updateChart();
    });

    // Update the chart when the dropdown value changes
    dropdown.addEventListener('change', updateChart);
});
