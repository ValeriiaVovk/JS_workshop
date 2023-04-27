const API_URL = "https://gorest.co.in/public/v2/posts";
const postContainer = document.getElementById("container");

const API_URL_COM = "https://gorest.co.in/public/v2/comments";
const commentContainer = document.getElementById("comment-container");

function getIdFromUrl() {
  const params = new URL(document.location).searchParams;

  return params.get("id");
}

function createPost(post, user) {
  const userPost = document.createElement("div");
  userPost.classList.add("card");

  const postTitle = document.createElement("h5");
  postTitle.classList.add("card-title");
  postTitle.textContent = post.title;

  const postDescription = document.createElement("p");
  postDescription.classList.add("card-text");
  postDescription.textContent = post.body;

  const linkToPosts = document.createElement("a");
  linkToPosts.classList.add("card-link");
  linkToPosts.textContent = `Back to other posts`;

  userPost.appendChild(postTitle);
  userPost.appendChild(postDescription);
  userPost.appendChild(linkToPosts);

  return userPost;
}

async function getPost(post, user) {
  const id = post ? post.id : getIdFromUrl();
  const response = await fetch(`${API_URL}?id=${id}`);
  const posts = await response.json();

  if (!Array.isArray(posts)) {
    posts = [posts];
  }

  for (const post of posts) {
    const card = createPost(post);
    postContainer.appendChild(card);
    let user_id = user ? user.id : getIdFromUrl();
    user_id = post.user_id;
    const linkToPosts = document.querySelector(".card-link");
    linkToPosts.href = `user_posts.html?id=${user_id}`;
  }
}


async function getComments(post) {
  const id = post ? post.id : getIdFromUrl();
  const response = await fetch(
    `https://gorest.co.in/public/v2/comments?post_id=${id}`
  );
  const comments = await response.json();

  if (!Array.isArray(comments)) {
    comments = [comments];
  }

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add("commented-section", "mt-2");

  const commentsTitle = document.createElement("h5");
  commentsTitle.classList.add("mr-2");
  commentsTitle.textContent = "Коментарі";
  commentsContainer.appendChild(commentsTitle);

  if (comments.length > 0) {
    for (const comment of comments) {
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");

      const commentAuthor = document.createElement("h6");
      commentAuthor.classList.add("comment-author");
      commentAuthor.textContent = comment.name;

      const commentText = document.createElement("p");
      commentText.classList.add("comment-text-sm");
      commentText.textContent = comment.body;

      commentElement.appendChild(commentAuthor);
      commentElement.appendChild(commentText);
      commentsContainer.appendChild(commentElement);
    }
  } else {
    const noComments = document.createElement("p");
    noComments.classList.add("no-comments");
    noComments.textContent = "Коментарі відсутні";
    commentsContainer.appendChild(noComments);
  }

  postContainer.appendChild(commentsContainer);
}

getPost().then((post) => getComments(post));