const form = document.getElementById('signupForm');
const username = document.getElementById('user');
const email = document.getElementById('put1');
const password = document.getElementById('passw');
console.log('logged', email);
const isEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

//form handling
form.addEventListener('submit', async (e)=>{
   e.preventDefault();
   checkValues();

   const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const role =form.role.value.trim()
    const emailPlace = form.email;
    const passPlace = form.password;
   try{
     const res = await fetch( '/signup',{
        method: 'POST',
        body:JSON.stringify({username, email, password, role}),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await res.json();
    console.log(data);
    
    if(data.error === "short password"){
      setError(passPlace, "must be more than 6 chars");
      return
    }else if(data.error === "email already exists"){
      setError(emailPlace , data.error)
    }else if(data.user){
      location.assign("/dashboard")
    }
   }catch(err){
      console.log(err);
   }   
})

 function checkValues(){
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    // check username
    if(usernameValue === ''){
       setError(username, 'username is required')
    }else{
       setSuccess(username)
    }

    //check email
    if(emailValue ===''){
        setError(email, 'email is required')
    }else if(!isEmail.test(emailValue)){
        setError(email, 'email is not valid')
 }else{
        setSuccess(email)
    }

    if (passwordValue === '') {
        setError(password, 'password is required')
    }else if(passwordValue.length <= 6){
        setError(password, 'must be more than 6 chars')
    }else{
         setSuccess(password)
    }
}
 function setError(element, errorMessage){
    const field = element.parentElement;
    const messageDiv = field.querySelector('.message')

    messageDiv.innerText = errorMessage;

    field.className = 'feel error'
 }

function setSuccess(element){
     const field = element.parentElement;
    const messageDiv = field.querySelector('.message')

    messageDiv.innerText = '';

    field.className = 'feel success'
}
