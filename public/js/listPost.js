const form = document.getElementById('lisForm')
const pname = document.querySelector('#name')
const type = document.querySelector('#type')
const desc = document.querySelector('#desc')
const price = document.querySelector('#price')
const qty = document.querySelector('#qty')

console.log('here');

form.addEventListener('submit', async (e)=>{
   e.preventDefault();
   checkValues();
console.log('clicked');
   
    const formData = new FormData(form)
   try{
     const res = await fetch( '/user/listings/create',{
        method: 'POST',
        body: formData
    })
    if(!res.ok){
      const data =await res.json
      console.log(data);
      
    }
    
   location.assign("/user/listings")
   }catch(err){
      console.log(err);
   }   
})

 function checkValues(){
    const nameValue = pname.value.trim();
    const priceValue = price.value.trim();
    const descValue = desc.value.trim();
    // check username
    if(nameValue === ''){
       setError(pname, 'Product name is required')
    }else{
       setSuccess(pname)
    }

    //check email
    if(priceValue ===''){
        setError(price, 'product price is required')
    }else{
        setSuccess(price)
    }

    if (descValue === '') {
        setError(desc, 'description is required')
    }else{
         setSuccess(desc)
    }
}
 function setError(element, errorMessage){
    const field = element.parentElement;
    const messageDiv = field.querySelector('.message')

    messageDiv.innerText = errorMessage;

    field.className = 'formField error'
 }

function setSuccess(element){
     const field = element.parentElement;
    const messageDiv = field.querySelector('.message')

    messageDiv.innerText = '';

    field.className = 'formField success'
}
