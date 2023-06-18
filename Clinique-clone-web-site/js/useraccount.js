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

let CUSTOMER_API="http://localhost:4000/customers"
let count=1;
let allBasketItems=document.querySelector('.all-basket-items')
let badge=document.querySelector('.badge')
function fillBasket(arr){
    allBasketItems.innerHTML=""
    arr.forEach(el=> {
        allBasketItems.innerHTML+=`
        <div class="basket-item">
        <img src="./images/${el.productImageMain}" alt="">
        <div class="basket-info">
          <p>${el.productName}</p>
          <div class="basket-actions">
            <span>$${el.productPrice}</span>
            <button class="delete-from-basket" onclick="deleteFromBasket(${el.id})"><i class="fa-solid fa-trash-can"></i></button>
          </div>
        </div>
      </div>
        `
    });
}
let customer= JSON.parse(localStorage.getItem('normalUser'))
async function getBasketItems(){
    const res= await axios(CUSTOMER_API)
    const data= await res.data
    let activeCustomer=data.find(item=>item.customerName===customer.userName)
    // console.log(activeCustomer);
    badge.innerHTML=activeCustomer.basketItems.length
    fillBasket(activeCustomer.basketItems)
}
getBasketItems()

// function deleteFromBasket(id){

// }

let totalPrice=document.querySelector('.total-price')

 async function calculatePrice(){
  const res= await axios(CUSTOMER_API)
  const data= await res.data
  let activeCustomer=data.find(item=>item.customerName===customer.userName)
    totalPrice.innerHTML= `$${activeCustomer.basketItems.reduce((acc, item) => acc + item.productPrice, 0)}`

}
calculatePrice()

