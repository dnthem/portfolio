function checkPhoto () {
    const myPhoto = document.querySelector('.small-photo');
    const mediumPhoto = document.querySelector('.home-container');
    if (mediumPhoto.offsetHeight <window.scrollY)
        myPhoto.classList.remove('hidden');
    else
        myPhoto.classList.add('hidden');
}

function bindCheckMyPhoto () {
    document.addEventListener('scroll', checkPhoto);
}


function bindButtons () {
    const checkPJ = document.querySelector('#checkOutPJBtn');
    const contactBtn = document.querySelector('#contectBtn');

    checkPJ.addEventListener('click', () => {
        document.querySelector('#projects').scrollIntoView();
    });
    
    contactBtn.addEventListener('click', () => {
        document.querySelector('#contact').scrollIntoView();
    })
}

function setNavBar () {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        document.addEventListener('scroll', () => {
           
            const top = section.getBoundingClientRect().top;
            const height = section.getBoundingClientRect().height;
            const id = section.getAttribute('id');
            const aTag = document.querySelector(`a[href="#${id}"]`);
            if (top <= height*0.3 && top >= 0)
                aTag.classList.add('actived-section');
            else
                aTag.classList.remove('actived-section');
        })
    })
}

function bindToggleNavBar () {
    const navBar = document.querySelector('.nav-bar');
    const checkBox = document.querySelector('input[type="checkbox"]');

    navBar.addEventListener('click', (event) => {
        const target = event.target;
        if (target.matches('[href]'));
            checkBox.checked = false;
    })
}

function init() {
    setNavBar();
    bindToggleNavBar ();
    bindButtons ();
    bindCheckMyPhoto ();
}

checkPhoto ();
window.addEventListener('DOMContentLoaded', init);