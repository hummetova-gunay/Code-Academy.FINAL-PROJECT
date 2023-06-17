const USER_URL="http://localhost:9000/users"
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
    if(userEmail.value&&userName.value&&userPassword.value){
        await axios.post(USER_URL, user)
    }else{
        alert('Please fill out the form')
    }
}
form.addEventListener('submit', function(e){
    e.preventDefault()
    addUser()
})