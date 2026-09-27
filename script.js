/* =====================================================
BLOG DATA
===================================================== */

let blogs = JSON.parse(
localStorage.getItem("blogs")
) || [

```
{
    id: 1,
    title: "The Future of Artificial Intelligence",
    category: "Technology",
    author: "Sai Charan",
    content:
        "Artificial Intelligence is transforming the modern world. From chatbots and recommendation systems to autonomous machines, AI is becoming an important part of everyday life.",
    likes: 0,
    comments: []
},

{
    id: 2,
    title: "Why Every Student Should Learn Programming",
    category: "Programming",
    author: "Sai Charan",
    content:
        "Programming improves logical thinking and problem-solving skills. Students can begin with Python, Java, JavaScript or another language and gradually develop their skills.",
    likes: 0,
    comments: []
},

{
    id: 3,
    title: "How to Study Effectively",
    category: "Education",
    author: "Sai Charan",
    content:
        "Studying effectively is more important than studying for extremely long hours. Active recall, practice, proper planning and consistency can significantly improve learning.",
    likes: 0,
    comments: []
},

{
    id: 4,
    title: "Building Better Daily Habits",
    category: "Lifestyle",
    author: "Sai Charan",
    content:
        "Small habits can create significant changes over time. Start with simple goals and focus on consistency rather than perfection.",
    likes: 0,
    comments: []
}
```

];

/* =====================================================
VARIABLES
===================================================== */

let selectedCategory = "All";

let currentBlogId = null;

/* =====================================================
HTML ELEMENTS
===================================================== */

const blogContainer =
document.getElementById("blogContainer");

const searchInput =
document.getElementById("searchInput");

const categoryButtons =
document.querySelectorAll(".category-btn");

const postModal =
document.getElementById("postModal");

const detailsModal =
document.getElementById("detailsModal");

const postForm =
document.getElementById("postForm");

const commentForm =
document.getElementById("commentForm");

const commentInput =
document.getElementById("commentInput");

/* =====================================================
SAVE DATA
===================================================== */

function saveBlogs() {

```
localStorage.setItem(
    "blogs",
    JSON.stringify(blogs)
);
```

}

/* =====================================================
DISPLAY BLOGS
===================================================== */

function displayBlogs() {

```
const searchText =
    searchInput.value
        .trim()
        .toLowerCase();


const filteredBlogs =
    blogs.filter(blog => {

        const matchesSearch =

            blog.title
                .toLowerCase()
                .includes(searchText)

            ||

            blog.content
                .toLowerCase()
                .includes(searchText);


        const matchesCategory =

            selectedCategory === "All"

            ||

            blog.category === selectedCategory;


        return (
            matchesSearch &&
            matchesCategory
        );

    });


blogContainer.innerHTML = "";


if (filteredBlogs.length === 0) {

    blogContainer.innerHTML = `
        <div style="
            grid-column:1/-1;
            text-align:center;
            padding:50px;
        ">
            <h3>No blogs found</h3>
            <p>
                Try another search or category.
            </p>
        </div>
    `;

    return;
}


filteredBlogs.forEach(blog => {

    const card =
        document.createElement("article");

    card.className = "blog-card";


    card.innerHTML = `

        <div class="blog-image">
            ✦
        </div>


        <div class="blog-content">

            <span class="blog-category">
                ${blog.category}
            </span>

            <h3>
                ${escapeHTML(blog.title)}
            </h3>

            <div class="blog-meta">
                By ${escapeHTML(blog.author)}
            </div>

            <p>
                ${escapeHTML(
                    blog.content.substring(0, 120)
                )}...
            </p>


            <button
                class="read-btn"
                onclick="openBlog(${blog.id})">

                Read More →

            </button>


            <div class="card-actions">

                <button
                    class="like-btn"
                    onclick="likeBlog(${blog.id})">

                    ❤️ ${blog.likes}

                </button>


                <button
                    class="like-btn"
                    onclick="openBlog(${blog.id})">

                    💬 ${blog.comments.length}

                </button>

            </div>

        </div>

    `;


    blogContainer.appendChild(card);

});
```

}

/* =====================================================
ESCAPE HTML
===================================================== */

function escapeHTML(text) {

```
const div =
    document.createElement("div");

div.textContent = text;

return div.innerHTML;
```

}

/* =====================================================
SEARCH
===================================================== */

searchInput.addEventListener(
"input",
displayBlogs
);

/* =====================================================
CATEGORY FILTER
===================================================== */

categoryButtons.forEach(button => {

```
button.addEventListener(
    "click",
    () => {

        categoryButtons.forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


        button.classList.add(
            "active"
        );


        selectedCategory =
            button.dataset.category;


        displayBlogs();

    }
);
```

});

/* =====================================================
LIKE BLOG
===================================================== */

function likeBlog(id) {

```
const blog =
    blogs.find(
        blog => blog.id === id
    );


if (!blog) return;


blog.likes++;

saveBlogs();

displayBlogs();
```

}

/* =====================================================
OPEN BLOG DETAILS
===================================================== */

function openBlog(id) {

```
const blog =
    blogs.find(
        blog => blog.id === id
    );


if (!blog) return;


currentBlogId = id;


document.getElementById(
    "detailsCategory"
).textContent = blog.category;


document.getElementById(
    "detailsTitle"
).textContent = blog.title;


document.getElementById(
    "detailsAuthor"
).textContent =
    `Written by ${blog.author}`;


document.getElementById(
    "detailsContent"
).textContent = blog.content;


displayComments(blog);


detailsModal.style.display =
    "flex";
```

}

/* =====================================================
DISPLAY COMMENTS
===================================================== */

function displayComments(blog) {

```
const container =
    document.getElementById(
        "commentsContainer"
    );


container.innerHTML = "";


if (blog.comments.length === 0) {

    container.innerHTML = `
        <p style="color:#94a3b8;">
            No comments yet.
            Be the first to comment!
        </p>
    `;

    return;

}


blog.comments.forEach(comment => {

    const div =
        document.createElement("div");

    div.className = "comment";

    div.textContent = comment;

    container.appendChild(div);

});
```

}

/* =====================================================
ADD COMMENT
===================================================== */

commentForm.addEventListener(
"submit",
event => {

```
    event.preventDefault();


    const comment =
        commentInput.value.trim();


    if (!comment) return;


    const blog =
        blogs.find(
            blog => blog.id === currentBlogId
        );


    if (!blog) return;


    blog.comments.push(comment);


    saveBlogs();


    commentInput.value = "";


    displayComments(blog);


    displayBlogs();

}
```

);

/* =====================================================
CREATE POST MODAL
===================================================== */

function openPostModal() {

```
postModal.style.display =
    "flex";
```

}

document.getElementById(
"createPostBtn"
).addEventListener(
"click",
openPostModal
);

document.getElementById(
"heroCreateBtn"
).addEventListener(
"click",
openPostModal
);

/* =====================================================
CLOSE POST MODAL
===================================================== */

document.getElementById(
"closePostModal"
).addEventListener(
"click",
() => {

```
    postModal.style.display =
        "none";

}
```

);

/* =====================================================
CLOSE DETAILS MODAL
===================================================== */

document.getElementById(
"closeDetailsModal"
).addEventListener(
"click",
() => {

```
    detailsModal.style.display =
        "none";

}
```

);

/* =====================================================
CLOSE MODALS WHEN CLICKING OUTSIDE
===================================================== */

window.addEventListener(
"click",
event => {

```
    if (event.target === postModal) {

        postModal.style.display =
            "none";

    }


    if (event.target === detailsModal) {

        detailsModal.style.display =
            "none";

    }

}
```

);

/* =====================================================
CREATE NEW POST
===================================================== */

postForm.addEventListener(
"submit",
event => {

```
    event.preventDefault();


    const title =
        document.getElementById(
            "postTitle"
        ).value.trim();


    const category =
        document.getElementById(
            "postCategory"
        ).value;


    const author =
        document.getElementById(
            "postAuthor"
        ).value.trim();


    const content =
        document.getElementById(
            "postContent"
        ).value.trim();


    if (
        !title ||
        !author ||
        !content
    ) {

        alert(
            "Please fill all fields."
        );

        return;

    }


    const newBlog = {

        id: Date.now(),

        title: title,

        category: category,

        author: author,

        content: content,

        likes: 0,

        comments: []

    };


    blogs.unshift(newBlog);


    saveBlogs();


    displayBlogs();


    postForm.reset();


    postModal.style.display =
        "none";


    alert(
        "Your blog was published successfully!"
    );

}
```

);

/* =====================================================
DARK MODE
===================================================== */

const darkModeBtn =
document.getElementById(
"darkModeBtn"
);

darkModeBtn.addEventListener(
"click",
() => {

```
    document.body.classList.toggle(
        "dark"
    );


    const dark =
        document.body.classList.contains(
            "dark"
        );


    darkModeBtn.textContent =
        dark ? "☀️" : "🌙";


    localStorage.setItem(
        "darkMode",
        dark ? "enabled" : "disabled"
    );

}
```

);

/* =====================================================
LOAD DARK MODE
===================================================== */

if (
localStorage.getItem(
"darkMode"
) === "enabled"
) {

```
document.body.classList.add(
    "dark"
);

darkModeBtn.textContent = "☀️";
```

}

/* =====================================================
MOBILE MENU
===================================================== */

const menuBtn =
document.getElementById(
"menuBtn"
);

const navMenu =
document.getElementById(
"navMenu"
);

menuBtn.addEventListener(
"click",
() => {

```
    navMenu.classList.toggle(
        "show"
    );

}
```

);

/* =====================================================
CONTACT FORM
===================================================== */

document.getElementById(
"contactForm"
).addEventListener(
"submit",
event => {

```
    event.preventDefault();


    alert(
        "Thank you! Your message has been submitted."
    );


    event.target.reset();

}
```

);

/* =====================================================
INITIALIZE WEBSITE
===================================================== */

displayBlogs();
