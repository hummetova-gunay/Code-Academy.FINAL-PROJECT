let  userEmail=document.querySelector('#userEmail')
let  userPassword=document.querySelector('#userPassword')
let  form=document.querySelector('form')

const USER_URL="http://localhost:4000/users"
const CUSTOMER_URL="http://localhost:8000/customers"




form.addEventListener('submit', async function(e){
    e.preventDefault()
    const res= await axios(USER_URL)
    const data= await res.data
    console.log(data);
    const matchedUser = data.find(user => user.userEmail === userEmail.value && user.userPassword === userPassword.value);
    console.log(matchedUser);
    if(matchedUser){
        window.location.href="user-account.html"
        localStorage.setItem("normalUser", JSON.stringify(matchedUser))
    }else{
        alert('User not found')
    }
})