import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-firestore.js";
import { firebaseConfig } from './firebase-auth.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.8.1/firebase-app.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch all reviews
const reviewsList = document.getElementById('reviewsList');

async function fetchReviews() {
    const reviewsSnapshot = await getDocs(collection(db, "reviews"));
    reviewsSnapshot.forEach((doc) => {
        const reviewData = doc.data();
        const reviewElement = document.createElement('div');
        reviewElement.classList.add('review-item');
        reviewElement.innerHTML = `
            <h3>${reviewData.name}</h3>
            <p><strong>Rating:</strong> ${reviewData.rating} ⭐</p>
            <p>${reviewData.reviewText}</p>
        `;
        reviewsList.appendChild(reviewElement);
    });
}

fetchReviews();
