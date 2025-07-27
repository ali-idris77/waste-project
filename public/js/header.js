let control = document.querySelector('.coslider');
let navBar = document.querySelector('.slide');
let coTwo = document.querySelector('.slided');
control.addEventListener('click', ()=>{
    control.classList.toggle('active')
    navBar.classList.toggle('active')
    coTwo.classList.toggle('active')
})

coTwo.addEventListener('click', ()=>{
    control.classList.toggle('active')
    navBar.classList.toggle('active')
    coTwo.classList.toggle('active')
})