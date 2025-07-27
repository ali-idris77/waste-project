const usersChart = document.getElementById('userChart').getContext('2d');
const proChart = document.getElementById('pChart').getContext('2d');
console.log(chartLabels2);
const colors = chartLabels.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})
const colors2 = chartLabels2.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})

const userChart = new Chart(usersChart, {
    type:'bar',
    data:{
        labels:chartLabels,
         datasets:[{
            label:'sales',
            data:chartData
            }]
    },
    options:{
         backgroundColor:colors,
         borderRadius:10,
        animation: 2000,
        easing: 'easeOutBounce'
    }
})
const productChart = new Chart(proChart, {
    type:'bar',
    data:{
        labels:chartLabels2,
        datasets:[{
            label:'sales',
            data:chartData2
            }]
    },
    options:{
        backgroundColor:colors2,
        borderRadius:10,
        animation: 2000,
        easing: 'easeOutBounce'
    }
})