Template.corps.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 10; // 10 records per page
        self.subscribe('corpsList', skipCount);
        self.subscribe('images');
    });
});

Template.corps.helpers({
    postsList: function() {
        return Corps.find({}, {sort: {date: -1}});
    },
    prevPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.corps.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.corps.path({page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 10 < totalPosts;
}
