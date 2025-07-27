//const {Chart} = require('chart.js')
const salesChart = document.getElementById('salesChart').getContext('2d');
const listChart = document.getElementById('listChart').getContext('2d');
console.log(chartLabels, chartData, chartLabels2, chartData2);

const colors = chartLabels.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})
const colors2 = chartLabels2.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})
const saleChart = new Chart(salesChart, {
    type:'bar',
    data:{
        labels:chartLabels,
        datasets:[{
            label:'sales',
            data: chartData,
                
            }]
    },
    options:{
         backgroundColor:colors,
        animation: 2000,
        easing: 'easeOutBounce'
    }
})
const listedChart = new Chart(listChart, {
    type:'polarArea',
    data:{
        labels:chartLabels2,
        datasets:[{
            label:'sales',
            data:chartData2
            }]
    },
    options:{
         backgroundColor:colors2,
        animation: {
            duration:2000,
        animateRotate: true,
        animateScale: true,
        easing: 'easeOutBounce'}
    }
})
