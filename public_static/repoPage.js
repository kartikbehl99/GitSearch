let issues = [];
let pullRequests = [];
let info = [];
let contents = [];
let contentType = [];
$(function () {
    $.get('/repoPage.html/helperPage', (data)=> {
        info = data;
        $("#display-repo-name").html(`<h3>${info[1]}</h3>`);
        apiCallCode(info);
        let list = $("#code-list");
        populateListCode(list, contents);
    });

    function populateList(list, data) {
        let html = "";
        for (let i = 0; i < data.length; i++) {
            html += `<li class="list-group-item">${data[i]} </li>`;
        }
        list.html(html);
        if (data.length === 0) {
            list.html(`<li class="list-group-item">No issues/Requests</li>`);
        }
    }

    function populateListCode(list, data) {
        let html = "";
        for (let i=0; i<data.length; i++) {
            html += `<a href="#" class="list-group-item list-group-item-action list-group-item-light" id="${data[i]}">${data[i]}</a>`
        }
        list.html(html);

        $(".list-group-items-light").click(function() {
            let id = $(this).attr('id');
            $.post('/download/downloadSingle',
                {
                    file: id,
                });
        });
    }

    function getIssues() {
        let issuesAll = JSON.parse(this.responseText);
        issues = [];
        issuesAll.forEach((issue)=> {
            issues.push(issue.title);
        });
    }

    function getPR() {
        let allPR = JSON.parse(this.responseText);
        pullRequests = [];
        allPR.forEach((pr)=> {
            pullRequests.push(pr.title);
        });
    }

    function getContents() {
        let allContents = JSON.parse(this.responseText);
        contents = [];
        contentType = [];
        allContents.forEach((content)=> {
            contents.push(content.name);
            contentType.push(content.type);
        });
    }

    function apiCallIssues(info) {
        let request = new XMLHttpRequest();
        request.onload = getIssues;
        request.open('get', `https://api.github.com/repos/${info[0]}/${info[1]}/issues`, false);
        request.send();
    }

    function apiCallPR(info) {
        let request = new XMLHttpRequest();
        request.onload = getPR;
        request.open('get', `https://api.github.com/repos/${info[0]}/${info[1]}/pulls`, false);
        request.send();
    }

    function apiCallCode(info) {
        let request = new XMLHttpRequest();
        request.onload = getContents;
        request.open('get', `https://api.github.com/repos/${info[0]}/${info[1]}/contents`, false);
        request.send();
    }

    $("#issues-tab").click(()=> {
        apiCallIssues(info);
        let list = $("#issues-list");
        populateList(list, issues);

    });

    $("#pull-tab").click(()=> {
        apiCallPR(info);
        let list = $("#pull-list");
        populateList(list, pullRequests);
    });

    $("#code-tab").click(()=> {
        apiCallCode(info);
        let list = $("#code-list");
        populateListCode(list, contents);
    });

    $("#download-button").click(()=> {

        $.post('/download', {
            username: info[0],
            reponame: info[1]
        });
    });
});