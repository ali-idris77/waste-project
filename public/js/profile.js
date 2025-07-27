const save = document.getElementById('save')
const pop = document.getElementById('pop')
const load = document.getElementById('load')
const userForm = document.getElementById('user')


userForm.addEventListener('submit',    
 async (e)=>{
    const username = userForm.querySelector('#name').value.trim()
    const company = userForm.querySelector('#company').value.trim()
    const level = userForm.querySelector('#level').value.trim()
    const tel = userForm.querySelector('#tel').value.trim()
    const address = userForm.querySelector('#address').value.trim()

    e.preventDefault()
    try{
         const formData = {
                username,
                company,
                level,
                tel,
                address
         }
        load.classList.add('show')
        console.log(formData)
        const res = await fetch('/profile/edit',{
            method:'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                username,
                company,
                level,
                tel,
                address
            })
        })
 }finally{
    load.classList.remove('show')
        showus('Profile Updated')
        }   
    }
)

