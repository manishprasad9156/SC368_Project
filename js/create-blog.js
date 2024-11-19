const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');

// Event listener for form submission
blogForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('blogTitle').value;
    const content = document.getElementById('blogContent').value;
    const imageInput = document.getElementById('blogImage');
    let imageUrl = '';

    // If an image is uploaded, read it and convert to base64
    if (imageInput.files && imageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            imageUrl = e.target.result;
            addBlogToPage(title, content, imageUrl);
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addBlogToPage(title, content, imageUrl);
    }

    // Clear the form
    blogForm.reset();
});

// Function to add blog to the page
function addBlogToPage(title, content, imageUrl) {
    const blogDiv = document.createElement('div');
    blogDiv.classList.add('card', 'mb-4');

    let blogContent = `
        <div class="card-body">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${content}</p>
    `;

    if (imageUrl) {
        blogContent += `<img src="${imageUrl}" alt="${title}" class="img-fluid my-3">`;
    }

    blogContent += `
            <button class="btn btn-danger btn-sm" onclick="deleteBlog(this)">Delete</button>
        </div>
    `;

    blogDiv.innerHTML = blogContent;
    blogList.prepend(blogDiv);
}

// Function to delete a blog
function deleteBlog(button) {
    button.parentElement.parentElement.remove();
}