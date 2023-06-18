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

let goAccount=document.querySelector('.goAccount')
let signIn=document.querySelector('.signIn')
let customer=JSON.parse(localStorage.getItem("normalUser"))
// console.log(customer);

if(customer){
    goAccount.style.display="block"
    signIn.style.display="none"
}else{
    goAccount.style.display="none"
    signIn.style.display="block"
}

const BASE_URL="http://localhost:3000/allProducts"
let allProducts=document.querySelector('.see-all-products')
function fillProductData(arr){
    allProducts.innerHTML=''
    arr.forEach(el => {
        allProducts.innerHTML+=`
        <div class="single-product">
        <img src="./images/${el.productImageMain}" alt="">     
<button type="button" class="btn styled-btn" data-bs-toggle="modal" data-bs-target="#${el.id}" id="modal-btn">Buy now</button>
<div class="modal fade" id="${el.id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
<div class="modal-dialog modal-lg">
<div class="modal-content">
  <div class="modal-header">
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
  </div>
  <div class="modal-body">
    <img src="./images/${el.productImageModal}" alt="">
    <div class="modal-text">
      <h1>${el.productName}</h1>
      <p>${el.productDescription}</p>
      <div class="rating">
      </div>
      <div class="price">
        <h3>$${el.productPrice}.00</h3>
        <button onclick="addBag(${el.id})">Add to bag</button>
      </div>
    </div>
  </div>
  <div class="modal-footer">
    <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
  </div>
</div>
</div>
</div>

<p class="mt-3">Price: $${el.productPrice}</p>
<div class="mobile-txt">
<p>${el.productName}</p>
<p>$${el.productPrice}</p>
<div class="rating-add-bag">
<div class="rating">
</div>
<div class="add-bag">
<button onclick="addBag(${el.id})">Add to bag</button>
</div>
</div>
</div>
        </div>
        `
    });
}

async function getProdData(){
   let res=await axios(BASE_URL)
  let  data= await res.data
   fillProductData(data)
}
getProdData()

// /////////////////////////////////////////////////
let CUSTOMER_API="http://localhost:4000/customers"

async function addBag(id) {
  const res = await axios(BASE_URL);
  const data = await res.data;
  let desiredProd = data.find(item => item.id === id);

  const customerRes = await axios(CUSTOMER_API);
  const customerData = await customerRes.data;
  let findCustomer = customerData.find(el => el.customerName === customer.userName);

  if (!findCustomer.basketItems) {
    findCustomer.basketItems = []; 
  }
  findCustomer.basketItems.push(desiredProd);
  await axios.patch(`${CUSTOMER_API}/${findCustomer.id}`, findCustomer);
  console.log(findCustomer.basketItems);
  window.location.href="user-account.html"
}


