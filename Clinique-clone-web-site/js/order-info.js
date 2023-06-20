let chooseDelivery=document.querySelector('#choose-delivery')
let choosePickUp=document.querySelector('#choose-pickup')
let purchasedProduct=document.querySelector('.purchased-product')
let prodprice=document.querySelector('.product-price')
let methodName=document.querySelector('.method')
let kargoPayment=document.querySelector('.kargo-payment')
let totalPrice=document.querySelector('.total-price')

const BASE_URL="http://localhost:3000/allProducts"
const CUSTOMER_API="http://localhost:8000/customers"
let customer= JSON.parse(localStorage.getItem('normalUser'))
let customerName=document.querySelector('#customerName')
customerName.innerHTML=customer.userEmail
function fillData(arr){
    purchasedProduct.innerHTML=""
    arr.forEach(element => {
        purchasedProduct.innerHTML+=`
        <div class="product-info">
        <img src="./images/${element.productImageMain}" alt="">
        <span>${element.productName}</span>
        <div class="purchased-product-price">$${element.productPrice}</div>
    </div>
        `
    });
}
async function getBasketItems(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
    fillData(activeCustomer.basketItems)
}
getBasketItems()

methodName.innerHTML="Choose delivery method"
choosePickUp.addEventListener('click', function(){
    methodName.innerHTML="Pick up"
    kargoPayment.innerHTML=0
})

async function calculatePrice(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
    prodprice.innerHTML=+activeCustomer.basketItems.reduce((acc, item) => acc + item.productPrice, 0)
    let price=+prodprice.innerHTML
    chooseDelivery.addEventListener('click', function(){
        methodName.innerHTML="Delivery"
        kargoPayment.innerHTML=5
        let kargo=+kargoPayment.innerHTML
        totalPrice.innerHTML=price+kargo
    })
    choosePickUp.addEventListener('click', function(){
        methodName.innerHTML="Pick up"
        kargoPayment.innerHTML=0
        totalPrice.innerHTML=price
    })
}
calculatePrice()

async function addOrder(){
  const res= await axios(CUSTOMER_API)
  const data= await res.data
  let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail) 
  if(!activeCustomer.orderedProducts){
    activeCustomer.orderedProducts=[]
  }
  activeCustomer.orderedProducts=[...activeCustomer.basketItems]
  console.log(activeCustomer.orderedProducts);
  await axios.patch(`${CUSTOMER_API}/${activeCustomer.id}`, activeCustomer);
  window.location.href="user-account.html"
}


async function increasePurchase(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
    const prodRes= await axios(BASE_URL)
    const prodData= await prodRes.data
    activeCustomer.basketItems.forEach(el=>{
        let allPurchasedProds=prodData.find(item=>item.id===el.id)
        let id=allPurchasedProds.id
        console.log(id);
        allPurchasedProds.purchaseAmount+=1
        axios.patch(`${BASE_URL}/${id}`, allPurchasedProds)
    })
}
let form= document.querySelector('form')

form.addEventListener('submit', function(e){
    e.preventDefault()
    addOrder()
   increasePurchase()
})
