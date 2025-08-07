document.addEventListener('DOMContentLoaded', () => {
    fetch('php/fetch_bookings.php')
        .then(response => response.json())
        .then(data => {
            const sortedData = data.sort((a, b) => {
                if (a.event_status === 'Not-Completed' && b.event_status === 'Completed') {
                    return -1;
                }
                if (a.event_status === 'Completed' && b.event_status === 'Not-Completed') {
                    return 1;
                }
                return 0;
            });

            const bookingData = document.getElementById('bookingData');
            bookingData.innerHTML = sortedData.map(booking => `
                <tr>
                    <td>${booking.id}</td>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.event_date}</td>
                    <td><span class="payment-status" style="color: ${booking.payment_status === 'Completed' ? 'green' : 'red'};">${booking.payment_status}</span></td>
                    <td><button class="${booking.event_status === 'Completed' ? 'solvedButton' : 'solveButton'}" onclick="toggleStatus(${booking.id}, '${booking.event_status}')">${booking.event_status}</button></td>
                    <td><i class="fa fa-eye" onclick="viewDetails(${booking.id})"></i></td>
                </tr>
            `).join('');
        });
});


function viewDetails(id) {
    fetch('php/fetch_details.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        const bookingDetails = document.getElementById('bookingDetails');
        bookingDetails.innerHTML = `
            <p><strong>ID:</strong> ${data.id}</p>
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Address:</strong> ${data.address}</p>
            <p><strong>Event Date:</strong> ${data.event_date}</p>
            <p><strong>Guest Count:</strong> ${data.guest_count}</p>
            <p><strong>Event Place:</strong> ${data.event_place}</p>
            <p><strong>Venue:</strong> ${data.venue}</p>
            <p><strong>Invitation Card:</strong> ${data.invitation_card}</p>
            <p><strong>Entertainment:</strong> ${data.entertainment}</p>
            <p><strong>Food:</strong> ${data.food}</p>
            <p><strong>Photos/Videos:</strong> ${data.photos_videos}</p>
            <p><strong>Decoration:</strong> ${data.decoration}</p>
            <p><strong>Payment Status:</strong> ${data.payment_status}</p>
            <p><strong>Event Status:</strong> ${data.event_status}</p>
        `;
        document.getElementById('detailsModal').style.display = 'block';
    });
}


function closeModal() {
    document.getElementById('detailsModal').style.display = 'none';
}

function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'Completed' ? 'Not-Completed' : 'Completed';

    fetch('php/update_status.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `id=${id}&newStatus=${newStatus}`
    }).then(() => {
        const statusButton = document.querySelector(`button[onclick="toggleStatus(${id}, '${currentStatus}')"]`);
        statusButton.textContent = newStatus;
        statusButton.className = newStatus === 'Completed' ? 'solvedButton' : 'solveButton';
        statusButton.setAttribute('onclick', `toggleStatus(${id}, '${newStatus}')`);

        updateEventCounts(currentStatus, newStatus);
    }).catch(error => {
        console.error("Error updating status:", error);
    });
}

function updateEventCounts(oldStatus, newStatus) {
    const totalEventsCircle = document.getElementById('totalEventsCircle');
    const completedEventsCircle = document.getElementById('completedEventsCircle');
    const notCompletedEventsCircle = document.getElementById('notCompletedEventsCircle');

    const totalEvents = parseInt(totalEventsCircle.textContent);


    let completedEvents = parseInt(completedEventsCircle.textContent);
    let notCompletedEvents = parseInt(notCompletedEventsCircle.textContent);


    if (oldStatus === 'Completed' && newStatus === 'Not-Completed') {
        completedEvents = Math.max(0, completedEvents - 1); // Decrease completed count
        notCompletedEvents += 1; // Increase not-completed count
    } else if (oldStatus === 'Not-Completed' && newStatus === 'Completed') {
        completedEvents += 1; // Increase completed count
        notCompletedEvents = Math.max(0, notCompletedEvents - 1); // Decrease not-completed count
    }


    completedEventsCircle.textContent = completedEvents;
    notCompletedEventsCircle.textContent = notCompletedEvents;


    reorderEventStatusCircles();
}

function reorderEventStatusCircles() {
    const notCompletedEventsCircle = document.getElementById('notCompletedEventsCircle').parentElement;
    const completedEventsCircle = document.getElementById('completedEventsCircle').parentElement;
    const parent = notCompletedEventsCircle.parentElement;

    if (parseInt(notCompletedEventsCircle.querySelector('.stat-circle').textContent) > 0) {
        parent.insertBefore(notCompletedEventsCircle, completedEventsCircle);
    }
}

function setTotalEventsCount(total) {
    const totalEventsCircle = document.getElementById('totalEventsCircle');
    totalEventsCircle.textContent = total;  // Set the total events
}

function initializeCounts(completedCount, notCompletedCount) {
    const completedEventsCircle = document.getElementById('completedEventsCircle');
    const notCompletedEventsCircle = document.getElementById('notCompletedEventsCircle');

    completedEventsCircle.textContent = completedCount;
    notCompletedEventsCircle.textContent = notCompletedCount;
}

fetch('php/get_event_counts.php')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        const totalEvents = data.totalEvents || 0;
        const completedEvents = data.completedEvents || 0;
        const notCompletedEvents = data.notCompletedEvents || 0;

        setTotalEventsCount(totalEvents);
        initializeCounts(completedEvents, notCompletedEvents);
    })
    .catch(error => {
        console.error("Error fetching event counts:", error);
        document.getElementById('error-log').textContent = error;
    });
