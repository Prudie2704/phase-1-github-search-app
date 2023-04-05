
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const userList = document.getElementById("userList");
const repoList = document.getElementById("repoList");

const apiUrl = "https://api.github.com";

function getUser(username) {
  return fetch(`${apiUrl}/users/${username}`).then((response) =>
    response.json()
  );
}

function getRepos(username) {
  return fetch(`${apiUrl}/users/${username}/repos`).then((response) =>
    response.json()
  );
}

function displayUsers(users) {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.login;
    li.addEventListener("click", () => {
      getRepos(user.login).then((repos) => {
        displayRepos(repos);
      });
    });
    userList.appendChild(li);
  });
}

function displayRepos(repos) {
  repoList.innerHTML = "";
  repos.forEach((repo) => {
    const li = document.createElement("li");
    li.textContent = repo.name;
    repoList.appendChild(li);
  });
}

searchButton.addEventListener("click", () => {
  const query = searchInput.value;
  fetch(`${apiUrl}/search/users?q=${query}`).then((response) =>
    response.json().then((data) => {
      displayUsers(data.items);
    })
  );
});
