document.addEventListener('DOMContentLoaded', function () {
    // Create the form HTML
    const formHTML = `
        <div id="cart-form" class="form-popup" style="display: none;">
            <form id="event-form">
                <h3>Event Details</h3>

                <label for="name">Name:</label>
                <input type="text" id="name" name="name" required><br>

                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required><br>

                <label for="phone">Phone Number:</label>
                <input type="tel" id="phone" name="phone" required><br>

                <label for="address">Address:</label>
                <input type="text" id="address" name="address" required><br>

                <label for="event-date">Event Date:</label>
                <input type="date" id="event-date" name="event-date" required><br>

                <label for="guest-count">Guest Count:</label>
                <input type="number" id="guest-count" name="guest-count" required><br>

                <label for="event-place">Event Place:</label>
                <select id="event-place" name="event-place" required>
                    <option value="" disabled selected>Select an event place</option>
                    <option value="Tiruppur">Tiruppur</option>
                    <option value="Namakkal">Namakkal</option>
                    <option value="Dharmapuri">Dharmapuri</option>
                </select><br>

                <label for="venue">Venue:</label>
                <select id="venue" name="venue" required>
                    <option value="" disabled selected>Select a venue</option>
                </select><br>

                <label for="invitation-card">Invitation Card:</label>
                <select id="invitation-card" name="invitation-card" required>
                    <option value="" disabled selected>Select Invitation Card Type</option>
                    <option value="Digital">Digital</option>
                    <option value="Printed">Printed</option>
                </select><br>

                <label for="entertainment">Entertainment:</label>
                <select id="entertainment" name="entertainment" required>
                    <option value="" disabled selected>Select Entertainment Type</option>
                    <option value="DJ">DJ</option>
                    <option value="Live Band">Live Band</option>
                    <option value="None">None</option>
                </select><br>

                <label for="food">Food:</label>
                <select id="food" name="food" required>
                    <option value="" disabled selected>Select Food Type</option>
                    <option value="Vegetarian">Vegetarian</option>
                    <option value="Non-Vegetarian">Non-Vegetarian</option>
                    <option value="Both">Both</option>
                </select><br>

                <label for="photos-videos">Photos and Videos:</label>
                <select id="photos-videos" name="photos-videos" required>
                    <option value="" disabled selected>Select Photos & Videos</option>
                    <option value="Photos">Photos Only</option>
                    <option value="Videos">Videos Only</option>
                    <option value="Both">Both</option>
                </select><br>

                <label for="decoration">Decoration:</label>
                <select id="decoration" name="decoration" required>
                    <option value="" disabled selected>Select Decoration Type</option>
                    <option value="Floral">Floral</option>
                    <option value="Lighting">Lighting</option>
                    <option value="Thematic">Thematic</option>
                    <option value="Minimalist">Minimalist</option>
                </select><br>

                <input type="submit" value="Submit">
            </form>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', formHTML);

    const cartIcon = document.getElementById('cart-icon');
    const formPopup = document.getElementById('cart-form');
    const form = document.getElementById('event-form');
    const venueSelect = document.getElementById('venue');
    const eventPlaceSelect = document.getElementById('event-place');


    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    document.getElementById('event-date').setAttribute('min', formattedToday);

    if (localStorage.getItem('formData')) {
        const savedData = JSON.parse(localStorage.getItem('formData'));
        document.getElementById('name').value = savedData.name || '';
        document.getElementById('email').value = savedData.email || '';
        document.getElementById('phone').value = savedData.phone || '';
        document.getElementById('address').value = savedData.address || '';
        document.getElementById('event-date').value = savedData.eventDate || '';
        document.getElementById('guest-count').value = savedData.guestCount || '';
        document.getElementById('event-place').value = savedData.eventPlace || '';
        document.getElementById('venue').value = savedData.venue || '';
        document.getElementById('invitation-card').value = savedData.invitationCard || '';
        document.getElementById('entertainment').value = savedData.entertainment || '';
        document.getElementById('food').value = savedData.food || '';
        document.getElementById('photos-videos').value = savedData.photosVideos || '';
        document.getElementById('decoration').value = savedData.decoration || '';
    }

    form.addEventListener('input', function () {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            eventDate: document.getElementById('event-date').value,
            guestCount: document.getElementById('guest-count').value,
            eventPlace: document.getElementById('event-place').value,
            venue: document.getElementById('venue').value,
            invitationCard: document.getElementById('invitation-card').value,
            entertainment: document.getElementById('entertainment').value,
            food: document.getElementById('food').value,
            photosVideos: document.getElementById('photos-videos').value,
            decoration: document.getElementById('decoration').value
        };

        localStorage.setItem('formData', JSON.stringify(formData));
    });

    cartIcon.addEventListener('click', function () {
        formPopup.style.display = formPopup.style.display === 'block' ? 'none' : 'block';
        document.body.classList.toggle('modal-open', formPopup.style.display === 'block');
    });

    window.addEventListener('click', function (e) {
        if (e.target === formPopup) {
            formPopup.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    });

    const bookedDates = [];
    fetch('php/get_booked_dates.php')
        .then(response => response.json())
        .then(data => {
            bookedDates.push(...data);
            const eventDateInput = document.getElementById('event-date');

            eventDateInput.addEventListener('change', function () {
                const selectedDate = eventDateInput.value;
                if (bookedDates.includes(selectedDate)) {
                    alert('This date is already booked.');
                    eventDateInput.value = '';
                }
            });
        })
        .catch(error => console.error('Error fetching booked dates:', error));

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const eventDate = document.getElementById('event-date').value;
        if (new Date(eventDate) < new Date(formattedToday)) {
            alert('Cannot book an event for past dates.');
            return;
        }

        const formData = new FormData(form);

        fetch('php/submit_form.php', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.status === 'success') {
                alert('Form submitted successfully!'); 
                formPopup.style.display = 'none'; 
                form.reset(); 
                localStorage.removeItem('formData'); 
            } else {
                throw new Error(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem with your submission: ' + error.message);
        });
        
    });

    eventPlaceSelect.addEventListener('change', function () {
        const eventPlace = eventPlaceSelect.value;
        let venueOptions = '';

        if (eventPlace === 'Tiruppur') {
            venueOptions = `
                <option value="" disabled selected>Select a venue</option>
                <option value="Tiruppur-1">Tiruppur-1 (Max Count: 500)</option>
                <option value="Tiruppur-2">Tiruppur-2</option>
                <option value="Tiruppur-3">Tiruppur-3</option>
            `;
        } else if (eventPlace === 'Namakkal') {
            venueOptions = `
                <option value="" disabled selected>Select a venue</option>
                <option value="Namakkal-1">Namakkal-1 (Max Count: 300)</option>
                <option value="Namakkal-2">Namakkal-2</option>
                <option value="Namakkal-3">Namakkal-3</option>
            `;
        } else if (eventPlace === 'Dharmapuri') {
            venueOptions = `
                <option value="" disabled selected>Select a venue</option>
                <option value="Dharmapuri-1">Dharmapuri-1 (Max Count: 400)</option>
                <option value="Dharmapuri-2">Dharmapuri-2</option>
                <option value="Dharmapuri-3">Dharmapuri-3</option>
            `;
        }

        venueSelect.innerHTML = venueOptions; // Update the venue options
    });
});
