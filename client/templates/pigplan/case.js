Template.case.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 10; // 10 records per page
        self.subscribe('caseList', skipCount);
        self.subscribe('images');
    });
});

Template.case.helpers({
    postsList: function() {
        return Case.find({}, {sort: {date: -1}});
    },
    prevPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.case.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.case.path({page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 10 < totalPosts;
}
