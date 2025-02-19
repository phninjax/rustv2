
const btn = document.querySelector('.mbbtn');
const navlinks = document.querySelector('.navlinks');


btn.addEventListener('click', ()=>{
    navlinks.classList.toggle('mbbtnclicked');
});