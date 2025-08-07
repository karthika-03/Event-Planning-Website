document.addEventListener('DOMContentLoaded', function() {
    const cartIconHTML = `
        <div id="cart-icon" class="cart-icon">
            <div class="cart-circle">
                <i class="fa fa-shopping-cart"></i>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', cartIconHTML);

    function initializeForm() {
        const cartIcon = document.getElementById('cart-icon');
        const formPopup = document.getElementById('cart-form');

        if (cartIcon && formPopup) {
            cartIcon.addEventListener('click', function() {
                if (formPopup.classList.contains('show')) {
                    formPopup.classList.remove('show');
                    document.body.classList.remove('modal-open');
                } else {
                    formPopup.classList.add('show');
                    document.body.classList.add('modal-open'); 
                }
            });


            window.addEventListener('click', function(e) {
                if (e.target === formPopup) {
                    formPopup.classList.remove('show');
                    document.body.classList.remove('modal-open');
                }
            });
        } else {
            setTimeout(initializeForm, 100); 
        }
    }

    initializeForm(); 
});
