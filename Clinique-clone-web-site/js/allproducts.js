const BASE_URL="http://localhost:8000/allProducts"
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
      <div class="quantity">
        <h3>Quantity</h3>
        <div class="inc-dec">
          <button>-</button>
          <span id="amount">1</span>
          <button>+</button>
        </div>
      </div>
      <div class="price">
        <h3>$${el.productPrice}.00</h3>
        <button>Add to bag</button>
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
<button>Add to bag</button>

</div>
</div>
</div>
        </div>
        `
    });
}

async function getProdData(){
   let res=await axios(BASE_URL)
   let data= await res.data
   console.log(data);
   fillProductData(data)
}
getProdData()

