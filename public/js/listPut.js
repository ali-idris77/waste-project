const form = document.getElementById('updForm')
const pname = document.querySelector('#name')
const type = document.querySelector('#type')
const desc = document.querySelector('#desc')
const price = document.querySelector('#price')
const qty = document.querySelector('#qty')
const id = form.dataset.id

console.log('here');

form.addEventListener('submit', async (e)=>{
   e.preventDefault();
   checkValues();
console.log('clicked');
   
    const nameValue = pname.value.trim();
    const priceValue = price.value.trim();
    const descValue = desc.value.trim();
    const qtyValue = qty.value.trim()
   try{
     const res = await fetch( `/product/${id}/edit`,{
        method: 'PUT',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
            name: nameValue,
            desc:descValue,
            price:priceValue,
            qty:qtyValue
        })
    })
    if(!res.ok){
      const data = await res.json
      console.log(data);
      
    }
   }catch(err){
      console.log(err);
   } finally{
    showus('product edited')
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
