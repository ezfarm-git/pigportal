Template.news.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var category = Router.current().params.category;
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 15; // 15 records per page
        self.subscribe('newsList', category, skipCount);

        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', 'UA-79916323-1', 'auto');
        ga('send', 'pageview');
    });
});

Template.news.onRendered(function() {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-79916323-1', 'auto');
    ga('send', 'pageview');
});

Template.news.helpers({
    postsCategory: function() {
        if (this.categoryName !== "total") {
            return this.categoryName;
        } else {
            return null;
        }
    },
    postsList: function() {
        if (this.categoryName === "total") {
            return News.find({}, {sort: {date: -1}});
        } else {
            return News.find({category: this.categoryName}, {sort: {date: -1}});
        }
    },
    prevPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.news.path({category: currnetCategory, page: previousPage});
    },
    nextPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.news.path({category: currnetCategory, page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 15 < totalPosts;
}
