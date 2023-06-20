
let allOrders=document.querySelector('.allOrders')
function getAllOrders(arr){
    // allOrders.innerHTML=obj.reduce((acc,curr)=>acc+curr.purchaseAmount,0)
    const sum = arr.reduce((total, product) => total + product.purchaseAmount, 0);
    allOrders.innerHTML=sum
}
let totalRevenue=document.querySelector('.total-revenue')
let revenue=0
function calcRevenue(arr){
    arr.forEach(element => {
        let num=element.purchaseAmount*element.productPrice;
        revenue+=num;
        totalRevenue.innerHTML=`$${revenue}`
    });
}
let allCustomers=document.querySelector('.all-customers')
const CUSTOMER_API="http://localhost:8000/customers"
async function getCustomers(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    allCustomers.innerHTML=data.length
}
getCustomers()
const BASE_URL = "http://localhost:3000/allProducts";
async function getData(){
    const res=await axios(BASE_URL)
    const data= await res.data
    calcRevenue(data)
    getAllOrders(data)
}
getData()


document.addEventListener('DOMContentLoaded', function() {
    let ctx1 = document.getElementById('productChart').getContext('2d');
    let ctx2 = document.getElementById('visitChart').getContext('2d');
    let productData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'My Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    let visitData = {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: 'My Dataset',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)',
                'rgba(153, 102, 255, 0.7)',
                'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };
    let productChart = new Chart(ctx1, {
        type: 'line',
        data: productData
    });
    let  visitChart= new Chart(ctx2, {
        type: 'line',
        data: visitData
    });
});


let admin=JSON.parse(localStorage.getItem("isAdmin"))

if(!admin){
    window.location.href="singin-login.html"
}
