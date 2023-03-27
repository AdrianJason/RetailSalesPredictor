document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.getElementById('store-item-selector');
    const chartDiv = document.getElementById('chart');
    

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

        const tickFormat = d3.timeFormat('%b %d, %Y');
        const tickText = xTickVals.map(date => tickFormat(new Date(date)));

        const layout = {
            title: `Actual and Predicted Sales for Store ${store}, Item ${item}`,
            xaxis: {
                tickmode: 'array',
                tickvals: xTickVals, // Use the generated array of every 15th date
                ticktext: tickText
            },
            yaxis: { title: 'Sales' }
        };

        Plotly.newPlot(chartDiv, [traceActual, tracePredicted], layout);
    }

    function createMetricsTable(metricsData) {
        const table = document.createElement('table');
        table.classList.add('table', 'table-bordered', 'table-hover');
      
        const thead = document.createElement('thead');
        thead.classList.add('thead-light');
        const tr = document.createElement('tr');
        const th1 = document.createElement('th');
        const th2 = document.createElement('th');
        th1.textContent = 'Metric';
        th2.textContent = 'Value';
        tr.appendChild(th1);
        tr.appendChild(th2);
        thead.appendChild(tr);
        table.appendChild(thead);
      
        const tbody = document.createElement('tbody');
      
        Object.entries(metricsData[0])
          .filter(([key, _]) => key !== 'store' && key !== 'item')
          .forEach(([key, value]) => {
            const tr = document.createElement('tr');
            const td1 = document.createElement('td');
            const td2 = document.createElement('td');
            td1.textContent = key;
            td2.textContent = value.toFixed(2);
            tr.appendChild(td1);
            tr.appendChild(td2);
            tbody.appendChild(tr);
          });
      
        table.appendChild(tbody);
      
        // Replace the existing table (if any) with the new one
        const metricsTableDiv = document.getElementById('metrics');
        metricsTableDiv.innerHTML = '';
        metricsTableDiv.appendChild(table);
    }
      
    
      

    function updateChart() {
        fetchData().then(data => {
          const selectedStoreItem = dropdown.value;
          createChart(data, selectedStoreItem);
      
          const [store, item] = selectedStoreItem.split('-');
      
          fetch(`/api/v1.0/metrics?store=${store}&item=${item}`)
            .then(response => response.json())
            .then(metricsData => {
              // Filter the fetched data based on the selected store and item
              const filteredMetricsData = metricsData.filter(row => row.store === parseInt(store) && row.item === parseInt(item));
              createMetricsTable(filteredMetricsData);
            })
            .catch(error => console.log(error));
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
