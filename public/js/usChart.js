const ordersChart = document.getElementById('orderChart').getContext('2d');
const oSuccessChart = document.getElementById('orderSuccess').getContext('2d');
const colors = chartLabels.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})
const colors2 = chartLabels2.map(() => {
    const hue = Math.floor(Math.random()*360)
    return `hsl(${hue}, 70%, 60%)`
})

const orderChart = new Chart(ordersChart, {
    type:'bar',
    data:{
        labels:chartLabels,
        datasets:[{
            label:'expenditure',
            data:chartData
            }]
    },
    options:{
         backgroundColor:colors,
        animation: 2000,
        easing: 'easeOutBounce'
    }
})
const orders = new Chart(oSuccessChart, {
    type:'doughnut',
    data:{
        labels:['pending','successful','cancelled' ],
        datasets:[{
            label:'orders',
            data:chartD
            }]
    },
    options:{
         backgroundColor:[
         '#291ae4',
         '#3ea422',
         '#c10a37'],
        animation: {
            duration:2000,
        animateRotate: true,
        animateScale: true,
        easing: 'easeOutBounce'}
    }
})