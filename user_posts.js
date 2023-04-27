const API_URL = "https://gorest.co.in/public/v2/posts";
const userPostsContainer = document.getElementById("list-group");


function createPostsList(post) {
  const postList = document.createElement("div");
  postList.classList.add(
    "list-group-item",
    "list-group-item-action",
    "flex-column",
    "align-items-start"
  );

  const postTitle = document.createElement("a");
  postTitle.classList.add("mb-1", "post-title");
  postTitle.textContent = post.title;
  postTitle.href = `post.html?id=${post.id}`;

  const postDescription = document.createElement("p");
  postDescription.classList.add("mb-1");
  postDescription.textContent = post.body;

  postList.appendChild(postTitle);
  postList.appendChild(postDescription);

  return postList;
}

function createErrorMessageBox(message) {
  const errorMessageBox = document.createElement("div");
  errorMessageBox.classList.add("alert");
  errorMessageBox.innerText = message;

  const linkBack = document.createElement("a");
  linkBack.classList.add("btn", "btn-link");
  linkBack.textContent = "Назад";
  linkBack.href = `user_blog.html`;

  errorMessageBox.appendChild(linkBack);

  return errorMessageBox;
}

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;

  return params.get("id");
}

async function getPosts(user) {
  const id = user ? user.id : getIdFromUrl();
  const response = await fetch(`${API_URL}?user_id=${id}`);
  const posts = await response.json();

  if (!Array.isArray(posts)) {
    posts = [posts];
  }
  if (!posts.length) {
    const errorMessageBox = createErrorMessageBox(
      "У даного користувача відсутні пости"
    );
    userPostsContainer.appendChild(errorMessageBox);
  } else {
    for (const post of posts) {
      const card = createPostsList(post);
      userPostsContainer.appendChild(card);
    }
  }
}

getPosts();
