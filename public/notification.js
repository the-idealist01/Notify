function showNotification(message, type = 'info') {
    // You can customize this function to display notifications in the way you want
    switch (type) {
        case 'success':
            alert(`Success: ${message}`);
            break;
        case 'error':
            alert(`Error: ${message}`);
            break;
        default:
            alert(message);
            break;
    }
}

// Usage example:
fetch("http://localhost:3000/test_email", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message) {
            showNotification(data.message, 'success'); // Display success notification
        } else {
            showNotification('Something went wrong', 'error'); // Display error notification
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showNotification('An error occurred. Please try again later.', 'error');
    });