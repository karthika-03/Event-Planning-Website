import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js';
import { getAuth, onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js';

const firebaseConfig = {
  apiKey: "AIzaSyBorbhjYKB6x17B3uDeBRc9EotsVinMBjY",
  authDomain: "event-planner-82ba6.firebaseapp.com",
  projectId: "event-planner-82ba6",
  storageBucket: "event-planner-82ba6.appspot.com",
  messagingSenderId: "502023105017",
  appId: "1:502023105017:web:3efc4fba9cf41b100ab528"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.addEventListener('DOMContentLoaded', function () {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  onAuthStateChanged(auth, (user) => {
      if (user) {
          nameInput.value = user.displayName || "Default Name"; 
          emailInput.value = user.email || "default@example.com";

          nameInput.setAttribute('readonly', true);
          emailInput.setAttribute('readonly', true);

          console.log("User is signed in: ", user.displayName, user.email);
      } else {
          console.log("No user is signed in.");
      }
  });
});

