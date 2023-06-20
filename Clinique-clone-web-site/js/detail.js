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
let hasUser=JSON.parse(localStorage.getItem("normalUser"))
// console.log(hasUser);

if(hasUser){
    goAccount.style.display="block"
    signIn.style.display="none"
}else{
    goAccount.style.display="none"
    signIn.style.display="block"
}


////////// get reviews /////////

let id = new URLSearchParams(window.location.search).get('id')
// console.log(id);

let detailedProduct=document.querySelector('.detailed-product')
const BASE_URL="http://localhost:3000/allProducts"

function prodDetail(obj){
    detailedProduct.innerHTML=""
    detailedProduct.innerHTML=`
    <div id="carouselExampleFade" class="carousel slide carousel-fade">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="./images/${obj.productImageMain}" class="d-block w-100" alt="...">
      </div>
      <div class="carousel-item">
        <img src="./images/${obj.productImageModal}" class="d-block w-100" alt="...">
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" ></span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </button>
  </div>
  <div class="detailed-info">
    <h3>${obj.productName}</h3>
    <a href="#review-section">Read reviews</a>
    <h4>Category: ${obj.productCategory}</h4>
    <h4>Skin Type: ${obj.skinType}</h4>
    <h4>Skin Concern: ${obj.skinConcern}</h4>
    <h4>Product Form : ${obj.productForm}</h4>
    <h3>Price: $${obj.productPrice}.00</h3>
  </div>
    `
}

async function getdetail(){
    const res= await axios(`${BASE_URL}/${id}`)
    const data = await res.data
    prodDetail(data)
    // console.log(data);
}
getdetail()

// let totalRating=0
let totalReview=document.querySelector('.total-review')
let reviewAmount= document.querySelector('.review-amount')
let userRating=document.querySelectorAll('.user-rating')

function getRating(arr){
  userRating[0].innerHTML=arr.filter(item=>item==5).length
  userRating[1].innerHTML=arr.filter(item=>item==4).length
  userRating[2].innerHTML=arr.filter(item=>item==3).length
  userRating[3].innerHTML=arr.filter(item=>item==2).length
  userRating[4].innerHTML=arr.filter(item=>item==1).length
}


let ratedStars=document.querySelector('.rated-stars')
function getStars(arr){
  if(arr.length){
    let rate=arr.reduce((acc, curr)=>acc+curr,0)/arr.length
    console.log(rate);
    if(!Number.isInteger(rate)){
      let halfStar=document.createElement('i')
      halfStar.classList.add('fa-solid', 'fa-star-half-stroke')
      let intNum=Math.floor(rate)
      for (let  i= 0;  i< intNum; i++) {
       let star=document.createElement('i')
       star.classList.add("fa-solid","fa-star")
       ratedStars.append(star)
      }
      ratedStars.append(halfStar)
      for (let  i= 0;  i< 4-intNum; i++) {
        let star=document.createElement('i')
        star.classList.add("fa-regular","fa-star")
        ratedStars.append(star)
       }
    }else{
      for (let  i= 0;  i< rate; i++) {
        let star=document.createElement('i')
        star.classList.add("fa-solid","fa-star")
        ratedStars.append(star)
       }
       for (let  i= 0;  i< 5-rate; i++) {
        let star=document.createElement('i')
        star.classList.add("fa-regular","fa-star")
        ratedStars.append(star)
       }
    }

  }else{
    ratedStars.innerHTML="No rating yet"
  }
}
let comment=document.querySelector(".comment")
function getComments(arr){
  if(arr.length){
    arr.forEach(element => {
      comment.innerHTML+=`
      <p>${element}</p>
      `
    });
  }else{
    comment.innerHTML="No comments yet"
  }
}

async function getReviews(){
  const res= await axios(`${BASE_URL}/${id}`)
  const data = await res.data
  getRating(data.productRating)
  getStars(data.productRating)
  getComments(data.userReview)
  if(data.productRating.length){
    totalReview.innerHTML=`${data.productRating.reduce((acc, curr)=>acc+curr,0)/data.productRating.length}/5`
    reviewAmount.innerHTML=`${data.productRating.length} reviews`
  }else{
    totalReview.innerHTML="No reviews yet"
    reviewAmount.innerHTML="0 reviews"
  }
}
getReviews()