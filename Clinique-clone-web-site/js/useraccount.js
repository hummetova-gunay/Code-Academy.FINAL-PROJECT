let menuIcon=document.querySelector('.fa-bars')
let desktopHeader=document.querySelector('.header')
let closeIcon=document.querySelector('.fa-x')
let mobileHeading=document.querySelector('.mobile-header')
menuIcon.addEventListener('click', function(){
    mobileHeading.classList.add('show')
    desktopHeader.classList.add('hide')
})
closeIcon.addEventListener('click', function(){
    mobileHeading.classList.remove('show')
    desktopHeader.classList.remove('hide')
})
localStorage.removeItem('isAdmin')

//////////////////////////////////////////////////

let CUSTOMER_API="http://localhost:8000/customers"
// let count=1;
let allBasketItems=document.querySelector('.all-basket-items')
let badge=document.querySelector('.badge')
function fillBasket(arr){
    allBasketItems.innerHTML=""
    arr.forEach(el=> {
      let basketItem=document.createElement('div')
      basketItem.classList.add('basket-item')
        basketItem.innerHTML=`
        <img src="./images/${el.productImageMain}" alt="">
        <div class="basket-info">
          <p>${el.productName}</p>
          <div class="basket-actions">
            <span>$${el.productPrice}</span>
            <button class="delete-from-basket" onclick="deleteFromBasket(${el.id})"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
        `
        allBasketItems.append(basketItem)
    });
}
let customer= JSON.parse(localStorage.getItem('normalUser'))

async function getBasketItems(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
    badge.innerHTML=activeCustomer.basketItems.length
    fillBasket(activeCustomer.basketItems)
}
getBasketItems()

let totalPrice=document.querySelector('.total-price')
 async function calculatePrice(){
  const res= await axios(CUSTOMER_API)
  const data= await res.data
  let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
  totalPrice.innerHTML= `$${activeCustomer.basketItems.reduce((acc, item) => acc + item.productPrice, 0)}`

}
calculatePrice()

async function deleteFromBasket(id){
  const res= await axios(CUSTOMER_API)
  const data= await res.data
   activeCustomer=data.find(item=>item.customerEmail===customer.userEmail) 
  activeCustomer.basketItems=activeCustomer.basketItems.filter(item => item.id !== id);
  await axios.patch(`${CUSTOMER_API}/${activeCustomer.id}`, activeCustomer);
}

let accountOwner=document.querySelector('#accountOwner')
accountOwner.innerHTML=customer.userName

let logOut=document.querySelector('.log-out')
logOut.addEventListener('click', function(){
  localStorage.removeItem('normalUser')
  window.location.href="index.html"
})

let orderNow=document.querySelector('.orderNow')

orderNow.addEventListener('click',async function(){
  window.location.href="order-information.html"
})

