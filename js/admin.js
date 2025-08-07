document.addEventListener('DOMContentLoaded', function() {
    let menu = document.querySelector('#menu-bars');
    let navbar = document.querySelector('.navbar');

    menu.onclick = () => {
        menu.classList.toggle('fa-times');
        navbar.classList.toggle('active');
    }

    window.onscroll = () => {
        menu.classList.remove('fa-times');
        navbar.classList.remove('active');
    }
});

function toggleDropdown() {
    let dropdown = document.getElementById('dropdown');
    dropdown.classList.toggle('show');
}

function logout() {
    window.location.href = 'index.html';
}

function loadUserDetails() {
    const totalUsersCircle = document.getElementById('total-users');
    const userTableBody = document.querySelector('#userTable tbody');

    fetch('php/fetch_users.php')
        .then(response => response.json())
        .then(data => {
            console.log('Fetched users:', data);  // Debugging

            const users = data.users;
            const totalUsers = users.length;

            if (totalUsers > 0) {
                totalUsersCircle.textContent = totalUsers;
                
                userTableBody.innerHTML = '';

                users.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.uid}</td>
                        <td>${user.email}</td>
                        <td>${user.displayName}</td>
                        <td>${user.role}</td>
                        <td>${user.created_at}</td>
                        <td>
                        <button onclick="deleteUser(${user.id})" style="background-color: red; color: white; border: none; padding: 5px 10px; cursor: pointer; font-weight:bold; border-radius: 10px">
                        Delete
                        </button>
                        </td>

                    `;
                    userTableBody.appendChild(row);
                });
            } else {
                console.error('No users found');
                totalUsersCircle.textContent = '0'; 
            }
        })
        .catch(error => console.error('Error fetching users:', error));
}

function deleteUser(userId) {
    if (confirm('Are you sure you want to delete this user?')) {
        fetch(`php/delete_user.php?id=${userId}`, {
            method: 'POST',
        })
        .then(response => response.text())
        .then(result => {
            if (result === 'success') {
                alert('User deleted successfully.');
                loadUserDetails(); 
            } else {
                alert('Failed to delete the user.');
            }
        })
        .catch(error => console.error('Error deleting user:', error));
    }
}

window.onload = loadUserDetails;
