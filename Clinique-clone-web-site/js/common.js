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



// let admin=JSON.parse(localStorage.getItem("isAdmin"))

// let currentURL = window.location.href;
// let desiredURL = "admin.html";
// if (currentURL.includes(desiredURL)) {
//   window.location.href="singin-login.html"  
// }

localStorage.removeItem('isAdmin')

