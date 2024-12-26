const baseURL = 'https://florentine-tortoiseshell-condorraptor.glitch.me/users'; // Your deployed JSON server URL

// Fetch and display the list of users
document.getElementById('fetchUsers').addEventListener('click', () => {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => displayUsers(data))
        .catch(error => console.error('Error fetching users:', error));
});

// Add a new user via form submission
document.getElementById('createUserForm').addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values
    const userId = document.getElementById('userId').value;
    const userName = document.getElementById('userName').value;

    // Validate input
    if (!userId || !userName) {
        alert('Please provide both User ID and User Name.');
        return;
    }

    // Make POST request to add user
    fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: parseInt(userId), name: userName })
    })
        .then(response => response.json())
        .then(() => {
            alert('User added successfully!');
            document.getElementById('createUserForm').reset(); // Clear form
            fetchUsers(); // Refresh user list
        })
        .catch(error => console.error('Error adding user:', error));
});

// Update user with ID 1
document.getElementById('updateUser').addEventListener('click', () => {
    fetch(`${baseURL}/1`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: 'Alice' })
    })
        .then(response => response.json())
        .then(() => alert('User with ID 1 updated! Fetch the users again to see updates.'))
        .catch(error => console.error('Error updating user:', error));
});

// Delete user with ID 1
document.getElementById('deleteUser').addEventListener('click', () => {
    fetch(`${baseURL}/1`, { method: 'DELETE' })
        .then(() => alert('User with ID 1 deleted! Fetch the users again to see updates.'))
        .catch(error => console.error('Error deleting user:', error));
});

// Display users in the DOM
function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = ''; // Clear previous list

    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = `ID: ${user.id}, Name: ${user.name}`;
        usersList.appendChild(li);
    });
}

// Fetch and display users initially
function fetchUsers() {
    fetch(baseURL)
        .then(response => response.json())
        .then(data => displayUsers(data))
        .catch(error => console.error('Error fetching users:', error));
}
