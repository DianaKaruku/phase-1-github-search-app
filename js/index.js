document.addEventListener('DOMContentLoaded', function () {
    let form = document.getElementById('github-form');
    let userList = document.getElementById('user-list');
    let reposList = document.getElementById('repos-list');
  
    form.addEventListener('submit', function (e) {
        e.preventDefault();
    
        let searchInput = document.getElementById('search').value;

    userList.innerHTML = '';
    reposList.innerHTML = '';

    fetch(`https://api.github.com/search/users?q=${searchInput}`)
    .then(function (response) {
        return response.json();
      })
      .then(function (data){
        let users = data.items;
        users.forEach((user) => {
            const userItem = document.createElement('li');
            userItem.innerHTML = `
              <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
              <a href="${user.html_url}" target="_blank">${user.login}</a>
            `;
            userList.appendChild(userItem);
  
            userItem.addEventListener('click', () => {
                fetchUserRepos(user.login);
              });
            });
      });
    });
    
    function fetchUserRepos(username) {
        fetch(`https://api.github.com/users/${username}/repos`)
        .then(function (response){
            return response.json();
        })
        .then((repos) => {
            reposList.innerHTML = '<h3>Repositories:</h3>';
            repos.forEach((repo) => {
              const repoItem = document.createElement('li');
              repoItem.innerHTML = `<a href="${repo.html_url}" target="_blank">${repo.name}</a>`;
              reposList.appendChild(repoItem);
            });
          })
        }
    })

    
