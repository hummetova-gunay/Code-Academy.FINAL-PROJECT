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
let hasUser=JSON.parse(localStorage.getItem("isLoggedIn"))
console.log(hasUser);

if(hasUser){
    goAccount.style.display="block"
    signIn.style.display="none"
}else{
    goAccount.style.display="none"
    signIn.style.display="block"
}

let addToBag=document.querySelector('.add-to-bag')

addToBag.addEventListener('click', function(){
    if(!hasUser){
        window.location.href="singin-login.html"
    }
})