// Select the search bar and blog cards
const searchInput = document.querySelector('.form-control'); // Search input field
const searchButton = document.querySelector('.btn-outline-success'); // Search button
const blogCards = document.querySelectorAll('.card'); // All blog cards

// Add event listener for the search button
searchButton.addEventListener('click', function (e) {
    const query = searchInput.value.toLowerCase().trim(); // Get user input and convert to lowercase

    // If the search bar is empty, reload the page
    if (!query) {
        return; // Allow the default behavior to reload the page
    }

    e.preventDefault(); // Prevent default form submission when search input is not empty

    let found = false;

    // Loop through each blog card
    blogCards.forEach(card => {
        const title = card.querySelector('.card-title').textContent.toLowerCase(); // Blog title
        const description = card.querySelector('.card-text').textContent.toLowerCase(); // Blog description

        // Check if query matches the title or description
        if (title.includes(query) || description.includes(query)) {
            card.style.display = 'block'; // Show matching card
            found = true;
        } else {
            card.style.display = 'none'; // Hide non-matching card
        }
    });

    // Alert if no match is found
    if (!found) {
        alert('No blogs match your search query.');
    }
});
