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
        window.location.href="user-account.html"
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
            localStorage.setItem('normalUser', JSON.stringify(matchedUser))
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
localStorage.clear()