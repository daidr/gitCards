(function ($) {
    $(function () {
        reloadGitCards();
    })


window.reloadGitCards = function () {
    if ("IntersectionObserver" in window) {
        let gitCardObserver = new IntersectionObserver(function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    let card = entry.target;
                    var gitsite = card.dataset.gitsite;
                    var giturl = card.dataset.giturl;
                    try {
                        switch (gitsite) {
                            case "1":
                                //github
                                var repopath = giturl.match(/github\.com\/([^\s\/]+\/[^\s\/]+)/)[1]
                                $.ajax({
                                    type: "GET",
                                    url: `https://api.github.com/repos/${repopath}`,
                                    dataType: "json",
                                    success: function (result) {
                                        let json = result;
                                        content = "";
                                        content += `<a href='${json.owner.html_url}' target='_blank' class='ownername'>${json.owner.login}/<a href='${json.html_url}' target='_blank' class='reponame'>${json.name}</a></a>`;
                                        content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}${!!json.homepage ? "<a href='" + json.homepage + "' target='_blank'>" + json.homepage + "</a>" : ""}</p>`;
                                        content += `<div class='gitdata'><git-stars title='Stars'>${json.stargazers_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.html_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                        $(card).children(".gitcard-body").html(content);
                                    },
                                    error: function () {
                                        $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                    }
                                });
                                break;
                            case "2":
                                //coding
                                var attr = giturl.match(/(dev\.tencent\.com|coding\.net)\/u\/([^\s\/]+)\/p\/([^\s\/]+)/)
                                $.ajax({
                                    type: "GET",
                                    url: `https://codingapi.daidr.me/api/user/${attr[2]}/project/${attr[3]}`,
                                    dataType: "json",
                                    success: function (result) {
                                        let json = result;
                                        if (json.code != 0) {
                                            $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                            return;
                                        }
                                        content = "";
                                        content += `<a href='${'https://dev.tencent.com/u/' + json.data.owner_user_name}' target='_blank' class='ownername'>${json.data.owner_user_name}/<a href='${json.data.https_url}' target='_blank' class='reponame'>${json.data.display_name}</a></a>`;
                                        content += `<p class='desc'>${!!json.data.description ? json.data.description : "暂无描述"}</p>`;
                                        content += `<div class='gitdata'><git-stars title='Stars'>${json.data.star_count}</git-stars><git-forks title='Forks'>${json.data.fork_count}</git-forks><a class='viewmore' href='${json.data.https_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                        $(card).children(".gitcard-body").html(content);
                                    },
                                    error: function () {
                                        $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                    }
                                });
                                break;
                            case "3":
                                //gitee
                                var repopath = giturl.match(/gitee\.com\/([^\s\/]+\/[^\s\/]+)/)[1]
                                $.ajax({
                                    type: "GET",
                                    url: `https://gitee.com/api/v5/repos/${repopath}`,
                                    dataType: "json",
                                    success: function (result) {
                                        let json = result;
                                        content = "";
                                        content += `<a href='${json.owner.html_url}' target='_blank' class='ownername'>${json.owner.login}/<a href='${json.html_url}' target='_blank' class='reponame'>${json.path}</a></a>`;
                                        content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}${!!json.homepage ? "<a href='" + json.homepage + "' target='_blank'>" + json.homepage + "</a>" : ""}</p>`;
                                        content += `<div class='gitdata'><git-stars title='Stars'>${json.stargazers_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.html_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                        $(card).children(".gitcard-body").html(content);
                                    },
                                    error: function () {
                                        $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                    }
                                });
                                break;
                            case "4":
                                //gitee 
                                var repopath = encodeURIComponent(giturl.match(/gitlab\.com\/([^\s\/]+\/[^\s\/]+)/)[1])
                                $.ajax({
                                    type: "GET",
                                    url: `https://gitlab.com/api/v4/projects/${repopath}`,
                                    dataType: "json",
                                    success: function (result) {
                                        let json = result;
                                        content = "";
                                        content += `<a href='${"https://gitlab.com/" + json.namespace.path}' target='_blank' class='ownername'>${json.namespace.path}/<a href='${json.web_url}' target='_blank' class='reponame'>${json.path}</a></a>`;
                                        content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}</p>`;
                                        content += `<div class='gitdata'><git-stars title='Stars'>${json.star_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.web_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                        $(card).children(".gitcard-body").html(content);
                                    },
                                    error: function () {
                                        $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                    }
                                });
                                break;
                            default:
                                throw "error";
                                break;
                        }
                    } catch (error) {
                        if (error != "") {
                            $(card).children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                        }
                    }
                    gitCardObserver.unobserve(card);
                }
            });
        });

        $(".wp-block-gitcards-gitcards-block").each(function (i) {
            gitCardObserver.observe($(".wp-block-gitcards-gitcards-block")[i]);
        });
    } else {
        $(".wp-block-gitcards-gitcards-block").each(function () {
            try {
                var gitsite = $(this).attr("data-gitsite")
                var giturl = $(this).attr("data-giturl")
                var that = $(this)
                switch (gitsite) {
                    case "1":
                        //github
                        var repopath = giturl.match(/github\.com\/([^\s\/]+\/[^\s\/]+)/)[1]
                        $.ajax({
                            type: "GET",
                            url: `https://api.github.com/repos/${repopath}`,
                            dataType: "json",
                            success: function (result) {
                                let json = result;
                                content = "";
                                content += `<a href='${json.owner.html_url}' target='_blank' class='ownername'>${json.owner.login}/<a href='${json.html_url}' target='_blank' class='reponame'>${json.name}</a></a>`;
                                content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}${!!json.homepage ? "<a href='" + json.homepage + "' target='_blank'>" + json.homepage + "</a>" : ""}</p>`;
                                content += `<div class='gitdata'><git-stars title='Stars'>${json.stargazers_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.html_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                that.children(".gitcard-body").html(content);
                            },
                            error: function () {
                                that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                            }
                        });
                        break;
                    case "2":
                        //coding
                        var attr = giturl.match(/(dev\.tencent\.com|coding\.net)\/u\/([^\s\/]+)\/p\/([^\s\/]+)/)
                        $.ajax({
                            type: "GET",
                            url: `https://codingapi.daidr.me/api/user/${attr[2]}/project/${attr[3]}`,
                            dataType: "json",
                            success: function (result) {
                                let json = result;
                                if (json.code != 0) {
                                    that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                                    return;
                                }
                                content = "";
                                content += `<a href='${'https://dev.tencent.com/u/' + json.data.owner_user_name}' target='_blank' class='ownername'>${json.data.owner_user_name}/<a href='${json.data.https_url}' target='_blank' class='reponame'>${json.data.display_name}</a></a>`;
                                content += `<p class='desc'>${!!json.data.description ? json.data.description : "暂无描述"}</p>`;
                                content += `<div class='gitdata'><git-stars title='Stars'>${json.data.star_count}</git-stars><git-forks title='Forks'>${json.data.fork_count}</git-forks><a class='viewmore' href='${json.data.https_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                that.children(".gitcard-body").html(content);
                            },
                            error: function () {
                                that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                            }
                        });
                        break;
                    case "3":
                        //gitee
                        var repopath = giturl.match(/gitee\.com\/([^\s\/]+\/[^\s\/]+)/)[1]
                        $.ajax({
                            type: "GET",
                            url: `https://gitee.com/api/v5/repos/${repopath}`,
                            dataType: "json",
                            success: function (result) {
                                let json = result;
                                content = "";
                                content += `<a href='${json.owner.html_url}' target='_blank' class='ownername'>${json.owner.login}/<a href='${json.html_url}' target='_blank' class='reponame'>${json.path}</a></a>`;
                                content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}${!!json.homepage ? "<a href='" + json.homepage + "' target='_blank'>" + json.homepage + "</a>" : ""}</p>`;
                                content += `<div class='gitdata'><git-stars title='Stars'>${json.stargazers_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.html_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                that.children(".gitcard-body").html(content);
                            },
                            error: function () {
                                that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                            }
                        });
                        break;
                    case "4":
                        //gitee 
                        var repopath = encodeURIComponent(giturl.match(/gitlab\.com\/([^\s\/]+\/[^\s\/]+)/)[1])
                        $.ajax({
                            type: "GET",
                            url: `https://gitlab.com/api/v4/projects/${repopath}`,
                            dataType: "json",
                            success: function (result) {
                                let json = result;
                                content = "";
                                content += `<a href='${"https://gitlab.com/" + json.namespace.path}' target='_blank' class='ownername'>${json.namespace.path}/<a href='${json.web_url}' target='_blank' class='reponame'>${json.path}</a></a>`;
                                content += `<p class='desc'>${!!json.description ? json.description : "暂无描述"}</p>`;
                                content += `<div class='gitdata'><git-stars title='Stars'>${json.star_count}</git-stars><git-forks title='Forks'>${json.forks_count}</git-forks><a class='viewmore' href='${json.web_url}' title='前往查看' target='_blank'>\uf054</a></div>`;
                                that.children(".gitcard-body").html(content);
                            },
                            error: function () {
                                that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                            }
                        });
                        break;
                    default:
                        throw "error";
                        break;
                }
            } catch (error) {
                if (error != "") {
                    that.children(".gitcard-body").html("<h1 class='bigtext'>ERROR</h1>");
                }
            }
        });
    }
}
})(jQuery);