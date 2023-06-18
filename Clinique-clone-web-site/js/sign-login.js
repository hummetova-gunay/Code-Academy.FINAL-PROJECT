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

const USER_URL="http://localhost:4000/users"
const CUSTOMER_URL="http://localhost:4000/customers"
let  userName =document.querySelector('#userName')
let  userEmail=document.querySelector('#userEmail')
let  userPassword=document.querySelector('#userPassword')
let  form=document.querySelector('form')

async function addUser(){
    const user={
        userName:userName.value,
        userEmail:userEmail.value,
        userPassword:userPassword.value
    }
    const customer={
        customerName:userName.value,
        customerEmail:userEmail.value,
        basketItems:[],
        searchings:[],
        bougthProducts:[]
    }
    if(userEmail.value&&userName.value&&userPassword.value){
        await axios.post(USER_URL, user)
        await axios.post(CUSTOMER_URL, customer)
        window.location.href="user-account.html"
        localStorage.setItem("normalUser", JSON.stringify(user))
        console.log(customer);
    }else{
        alert('Please fill out the form')
    }
}
async function checkUser(){
    const res = await axios(USER_URL)
    const data= await res.data
    const matchedUser = data.find(user => (
        user.userName === userName.value &&
        user.userEmail === userEmail.value &&
        user.userPassword === userPassword.value
      ));
      if (matchedUser) {
        if(matchedUser.isAdmin){
            localStorage.setItem('isAdmin',JSON.stringify(matchedUser))
            window.location.href="admin.html"
        }else{
            localStorage.setItem("normalUser", JSON.stringify(matchedUser))
            window.location.href="user-account.html"
        }
      }else{
        addUser()
      }
}
form.addEventListener('submit', function(e){
    e.preventDefault()
    checkUser()
})