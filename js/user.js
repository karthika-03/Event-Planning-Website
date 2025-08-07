let menu = document.querySelector('#menu-bars');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

let themeToggler = document.querySelector('.theme-toggler');
let toggleBtn = document.querySelector('.toggle-btn');

toggleBtn.onclick = () => {
    themeToggler.classList.toggle('active');
}

window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
    themeToggler.classList.remove('active');
}

document.querySelectorAll('.theme-toggler .theme-btn').forEach(btn => {
    btn.onclick = () => {
        let color = btn.style.background;
        document.querySelector(':root').style.setProperty('--main-color', color);
    }
});

var swiper = new Swiper(".home-slider", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 2,
        slideShadows: true,
    },
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

var swiper = new Swiper(".review-slider", {
    slidesPerView: 1,
    grabCursor: true,
    loop: true,
    spaceBetween: 10,
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 2,
        },
        1050: {
            slidesPerView: 3,
        },
    },
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    }
});

// Function to toggle dropdown visibility
function toggleDropdown() {
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}

// Function to set user initial (Call this function when user logs in)
function setUserInitial(fullName) {
    let userInitial = document.getElementById('user-initial');
    userInitial.textContent = fullName.charAt(0).toUpperCase();
}

// Function to log out
function logout() {
    // Implement logout logic here, e.g., clear user session, redirect to login page, etc.
    window.location.href = 'index.html';
}

// Example function call after login (replace 'John Doe' with the actual user's full name)
// This should be called dynamically based on the logged-in user's name
setUserInitial('John Doe');
