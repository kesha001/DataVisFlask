export function createChart(labels, dataPoints) {
    const data = {
        labels: labels,
        datasets: [{
            label: 'Sales',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: dataPoints,
        }]
    };

    const config = {
        type: 'line',
        data: data,
        options: { maintainAspectRatio: false }
    };

    const myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}