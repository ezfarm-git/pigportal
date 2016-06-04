Template.news.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 10; // 10 records per page
        self.subscribe('newsList', skipCount);
    });
});

Template.news.helpers({
    postsCategory: function() {
        if (this.categoryName) {
            return this.categoryName;
        } else {
            return "전체";
        }
    },
    // postsList: function() {
    //     return News.find();
    // },
    postsList: function() {
        if (this.categoryName) {
            return News.find({category: this.categoryName}, {sort: {date: -1}});
        } else {
            return News.find({}, {sort: {date: -1}});
        };
    },
    prevPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.news.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.news.path({page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 10 < totalPosts;
}
