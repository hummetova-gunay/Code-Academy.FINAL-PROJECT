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
let x = setInterval(()=>{
    let startDate= new Date("June 30, 2023 06:50:20").getTime()
// console.log(startDate);
let now= new Date().getTime()
// console.log(now);
let howFar=startDate-now
// console.log(howFar);
let days =Math.floor(howFar/(24*60*60*1000))
// console.log(days);
let hours = Math.floor((howFar % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
let minutes = Math.floor((howFar % (1000 * 60 * 60)) / (1000 * 60));
let seconds = Math.floor((howFar % (1000 * 60)) / 1000);
    document.querySelector('.left-days').innerHTML=days
    document.querySelector('.left-hours').innerHTML=hours
    document.querySelector('.left-minutes').innerHTML=minutes
    document.querySelector('.left-seconds').innerHTML=seconds  
    if(howFar<0){
        clearInterval(x)
    } 
},1000);
