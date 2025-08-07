document.addEventListener("DOMContentLoaded", function () {
    fetch('php/fetch_queries.php')
        .then(response => response.json())
        .then(data => {
            let contactsTable = document.getElementById('contactsTable').getElementsByTagName('tbody')[0];
            let totalQueriesCircle = document.getElementById('totalQueriesCircle');
            let solvedQueriesCircle = document.getElementById('solvedQueriesCircle');
            let unsolvedQueriesCircle = document.getElementById('unsolvedQueriesCircle');

            data.sort((a, b) => (a.status === 'unsolved' ? -1 : 1));

            let total = data.length;
            let solved = data.filter(contact => contact.status === 'solved').length;
            let unsolved = total - solved;


            totalQueriesCircle.innerHTML = total;
            solvedQueriesCircle.innerHTML = solved;
            unsolvedQueriesCircle.innerHTML = unsolved;


            contactsTable.innerHTML = '';

            data.forEach(contact => {
                let newRow = contactsTable.insertRow();

                // Add table cells
                newRow.insertCell(0).innerHTML = contact.id;
                newRow.insertCell(1).innerHTML = contact.name;
                newRow.insertCell(2).innerHTML = contact.email;
                newRow.insertCell(3).innerHTML = contact.phone_number;
                newRow.insertCell(4).innerHTML = contact.subject;
                newRow.insertCell(5).innerHTML = contact.message;
                newRow.insertCell(6).innerHTML = contact.created_at;

                let actionCell = newRow.insertCell(7);

                if (contact.status === 'unsolved') {
                    actionCell.innerHTML = `<button class="solveButton" data-id="${contact.id}">Solve</button>`;
                } else {
                    actionCell.innerHTML = `<button class="solvedButton" disabled>Solved</button>`;
                }
            });
        })
        .catch(error => console.error('Error fetching contacts:', error));

    document.addEventListener("click", function (event) {
        if (event.target.classList.contains('solveButton')) {
            let contactId = event.target.getAttribute('data-id');

            fetch('php/solve_query.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ contact_id: contactId }),
            })
                .then(response => response.json())
                .then(result => {
                    if (result.success) {
                        event.target.classList.remove('solveButton');
                        event.target.classList.add('solvedButton');
                        event.target.innerHTML = 'Solved';
                        event.target.disabled = true;

                        let solvedQueriesCircle = document.getElementById('solvedQueriesCircle');
                        let unsolvedQueriesCircle = document.getElementById('unsolvedQueriesCircle');

                        solvedQueriesCircle.innerHTML = parseInt(solvedQueriesCircle.innerHTML) + 1;
                        unsolvedQueriesCircle.innerHTML = parseInt(unsolvedQueriesCircle.innerHTML) - 1;
                    } else {
                        alert('Error marking query as solved.');
                    }
                })
                .catch(error => console.error('Error solving query:', error));
        }
    });
});
