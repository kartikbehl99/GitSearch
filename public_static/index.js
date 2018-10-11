let names = [];

$(function () {
    function populateList(list) {
        let html = "";
        for (let i=0; i<names.length; i++) {
            html += `<li class="list-group-item">${names[i]} <button type="button" class="btn btn-success" id="${names[i]}" style="position: absolute; left: 1500px; bottom: 5px">View</button></li>`;
        }
        list.html(html);

        $(".btn-success").click(function() {
            let userName = $('#search').val();
            let id = $(this).attr('id');
            $.post('/repoPage.html',
                {
                    username: userName,
                    reponame: id
                });
            window.open('./repoPage.html');
        });
    }

    function getReposName() {
        let repo = JSON.parse(this.responseText);
        repo.forEach((repo)=> {
            names.push(repo.name);
        });
    }

    function apiCall(userName) {
        let request = new XMLHttpRequest();
        request.onload = getReposName;
        request.open('get', `https://api.github.com/users/${userName}/repos`, false);
        request.send();
    }

    $("#search-button").click(function () {
        let userName = $("#search").val();
        let list = $("#repo-list");
        names = [];

        if (userName === "" || userName.startsWith(" ")) {
            alert('Please enter something!!');
        }
        else {
            apiCall(userName);
            if (names.length === 0) {
                alert('No such username found');
            }
            else {
                console.log(names);
                populateList(list);
            }
        }
        $.post("/",
            {
                username: userName,
                repoNames: names
            },
            ()=> console.log('post request sent to the server'));
    });

    $("#search").keyup((event)=> {
        if (event.keyCode === 13) {
            let userName = $("#search").val();
            let list = $("#repo-list");
            names = [];

            if (userName === "" || userName.startsWith(" ")) {
                alert('Please enter something!!');
            }
            else {
                apiCall(userName);
                if (names.length === 0) {
                    alert('No such username found');
                }
                else {
                    console.log(names);
                    populateList(list);
                }
            }
            $.post("/",
                {
                    username: userName,
                    repoNames: names
                },
                ()=> {
                    return console.log('post request sent to the server');
                });
        }
    });
});