const blogForm = document.getElementById('blogForm');
const blogList = document.getElementById('blogList');

// Load saved blogs from localStorage
const loadBlogs = () => {
    const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
    blogs.forEach(blog => addBlogToPage(blog.title, blog.content, blog.image));
};

// Save blogs to localStorage
const saveBlogs = () => {
    const blogs = [];
    document.querySelectorAll('.card').forEach(card => {
        const title = card.querySelector('.card-title').innerText;
        const content = card.querySelector('.card-text').innerText;
        const image = card.querySelector('img')?.src || '';
        blogs.push({ title, content, image });
    });
    localStorage.setItem('blogs', JSON.stringify(blogs));
};

// Add a blog to the page
const addBlogToPage = (title, content, imageUrl) => {
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
};

// Delete a blog
const deleteBlog = (button) => {
    button.parentElement.parentElement.remove();
    saveBlogs();
};

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
            saveBlogs();
        };
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        addBlogToPage(title, content, imageUrl);
        saveBlogs();
    }

    // Clear the form
    blogForm.reset();
});

// Load blogs on page load
window.addEventListener('DOMContentLoaded', loadBlogs);