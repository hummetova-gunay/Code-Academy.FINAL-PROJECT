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

let allOrders=document.querySelector('.all-orders')
let emptyOrder=document.querySelector('.empty-order-list')

function fillCustomerOrders(arr){
  allOrders.innerHTML=""
  arr.forEach(item=>{
      if(item.orderedProducts){
        emptyOrder.style.display="none"
      }
      allOrders.innerHTML+=`
      <div class="orderedProd">
      <img src="./images/${item.productImageMain}" alt="">
      <span class="prodName">Almost Lipstick in Black Honey</span>
<button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#${item.id}">
How was your experience?
</button>
<div class="modal fade review-modal" id="${item.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog modal-dialog-centered">
<div class="modal-content">
<div class="modal-header">
<h1 class="modal-title fs-5" id="staticBackdropLabel"></h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
<form action="" onsubmit="sendReview(${item.id})">
<textarea name="" id="userReview" cols="30" rows="10" required placeholder="Share your thoughts with us" oninput="sendThought(this)"></textarea> 
<div class="rating">
<input value="star-1" required name="star-radio" id="star-1" type="radio" onclick="rate(5)" >
<label for="star-1">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
</label>
<input value="star-1" required name="star-radio" id="star-2" type="radio" onclick="rate(4, ${item.id})" >
<label for="star-2">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
</label>
<input value="star-1" required name="star-radio" id="star-3" type="radio" onclick="rate(3, ${item.id})" >
<label for="star-3">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
</label>
<input value="star-1" required name="star-radio" id="star-4" type="radio" onclick="rate(2, ${item.id})" >
<label for="star-4">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
</label>
<input value="star-1" required name="star-radio" id="star-5" type="radio" onclick="rate(1, ${item.id})" >
<label for="star-5">
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z" pathLength="360"></path></svg>
</label>
</div> 
<button type="submit" class="sendReview mt-3">Send</button>
</form>
</div>
<div class="modal-footer">
<button type="button" class="btn" data-bs-dismiss="modal">Close</button>
</div>
</div>
</div>
</div>
    </div>
      `
  })
}

async function getBasketItems(){
  const res= await axios(CUSTOMER_API)
  const data= await res.data
  let activeCustomer=data.find(item=>item.customerEmail===customer.userEmail)
  badge.innerHTML=activeCustomer.basketItems.length
  fillBasket(activeCustomer.basketItems)
  fillCustomerOrders(activeCustomer.orderedProducts)
}
getBasketItems()
let PRODUCTS_URL="http://localhost:3000/allProducts"

let textarea="nmmnmn"
function sendThought(e){
textarea=e.value
return textarea
}

let star=9
function rate(num){
return star=num
}

async  function sendReview(id){
  const res= await axios(PRODUCTS_URL)
  const data= await res.data
  let ratedProd=data.find(item=>item.id===id)
  console.log(ratedProd);
  if(!ratedProd.userReview&&!ratedProd.productRating){
    ratedProd.userReview=[]
    ratedProd.productRating=[]
  }
  ratedProd.userReview.push(textarea)
  ratedProd.productRating.push(star)
  await axios.patch(`${PRODUCTS_URL}/${id}`, ratedProd)
}