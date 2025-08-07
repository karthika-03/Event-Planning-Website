document.addEventListener("DOMContentLoaded", function() {
    let currentPage = 1; 
    const reviewsPerPage = 10;  
    let reviewsData = [];  

    function fetchReviews() {
        fetch('php/fetch_adreviews.php')
            .then(response => response.json())
            .then(data => {
                reviewsData = data; 
                updateTotalReviews(); 
                paginateReviews(currentPage);
            })
            .catch(error => console.error('Error fetching reviews:', error));
    }

    function paginateReviews(page) {
        let start = (page - 1) * reviewsPerPage;
        let end = start + reviewsPerPage;
        let paginatedReviews = reviewsData.slice(start, end);

        let reviewsTable = document.getElementById('reviewsTable').getElementsByTagName('tbody')[0];
        reviewsTable.innerHTML = ''; 

        paginatedReviews.forEach((review) => {
            let newRow = reviewsTable.insertRow();

            let idCell = newRow.insertCell(0);
            idCell.innerHTML = review.id;

            let userIdCell = newRow.insertCell(1);
            userIdCell.innerHTML = review.name;

            let reviewCell = newRow.insertCell(2);
            reviewCell.className = 'review';
            reviewCell.innerHTML = review.review;

            let ratingCell = newRow.insertCell(3);
            ratingCell.innerHTML = review.rating;

            let createdAtCell = newRow.insertCell(4);
            createdAtCell.innerHTML = review.created_at;

            let actionCell = newRow.insertCell(5);
            actionCell.innerHTML = `<button class="deleteButton" data-id="${review.id}">Delete</button>`;
        });

        updatePaginationButtons();  // Enable/Disable buttons based on page number
    }

    function updateTotalReviews() {
        let totalReviewsCircle = document.getElementById('totalReviewsCircle');
        totalReviewsCircle.innerHTML = reviewsData.length;
    }

    function updatePaginationButtons() {
        document.getElementById('prevButton').disabled = currentPage === 1;
        document.getElementById('nextButton').disabled = currentPage === Math.ceil(reviewsData.length / reviewsPerPage);
    }

    document.addEventListener("click", function(event) {
        if (event.target.classList.contains('deleteButton')) {
            let reviewId = event.target.getAttribute('data-id');

            fetch('php/delete_reviews.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ review_id: reviewId }),
            })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    reviewsData = reviewsData.filter(review => review.id != reviewId);
                    updateTotalReviews(); // Update review count
                    paginateReviews(currentPage); // Refresh current page
                } else {
                    alert('Error deleting review.');
                }
            })
            .catch(error => console.error('Error deleting review:', error));
        }
    });

    document.getElementById('nextButton').addEventListener('click', function() {
        if (currentPage < Math.ceil(reviewsData.length / reviewsPerPage)) {
            currentPage++;
            paginateReviews(currentPage);
        }
    });

    document.getElementById('prevButton').addEventListener('click', function() {
        if (currentPage > 1) {
            currentPage--;
            paginateReviews(currentPage);
        }
    });

    fetchReviews();
});

function toggleDropdown() {
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}

function logout() {
    window.location.href = 'index.html';
}