const firebaseConfig = {
    apiKey: "AIzaSyBorbhjYKB6x17B3uDeBRc9EotsVinMBjY",
    authDomain: "event-planner-82ba6.firebaseapp.com",
    projectId: "event-planner-82ba6",
    storageBucket: "event-planner-82ba6.appspot.com",
    messagingSenderId: "502023105017",
    appId: "1:502023105017:web:3efc4fba9cf41b100ab528"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();

function googleSignIn() {
    firebase.auth()
        .signInWithPopup(provider)
        .then((result) => {
            var user = result.user;
            var userEmail = user.email;
            var displayName = user.displayName;
            var uid = user.uid;

            storeUserData(uid, userEmail, displayName);

            if (userEmail === "kabileshvijay05@gmail.com") {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'user.html';
            }
        }).catch((error) => {
            console.error(error);
        });
}

function storeUserData(uid, email, displayName) {
    console.log(`Storing data for user: ${email}`);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "store-user.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                console.log('User data stored successfully:', xhr.responseText);
            } else {
                console.error('Failed to store user data:', xhr.responseText);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Error during AJAX request');
    };

    xhr.send(`uid=${uid}&email=${email}&displayName=${displayName}`);
}


document.getElementById('google-signin').addEventListener('click', googleSignIn);
