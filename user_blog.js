const API_URL = "https://gorest.co.in/public/v2/users";
const usersContainer = document.getElementById("list-group");

function createUser(user) {
  const userItem = document.createElement("li");
  userItem.classList.add("list-group-item");

  const userName = document.createElement("a");
  userName.classList.add("user-name");
  userName.textContent = user.name;
  userName.href = `user_posts.html?id=${user.id}`;

  userItem.appendChild(userName);

  return userItem;
}

function createErrorMessageBox(message) {
  const errorMessageBox = document.createElement("div");
  errorMessageBox.classList.add("alert");
  errorMessageBox.innerText = message;

  return errorMessageBox;
}

function getUsers() {
  return fetch(API_URL)
      .then((response) => {
        
        return response.json();
        // return {
        //     products: []
        // };
    })
    .then((users) => {
      if (!users.length) {
        const errorMessageBox = createErrorMessageBox("Користувачі незнайдені");
        usersContainer.appendChild(errorMessageBox);
      }

      users.forEach((user) => {
        const card = createUser(user);
        usersContainer.appendChild(card);
      });
    });

}
getUsers();
