Template.corps.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var category = Router.current().params.category;
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 10; // 10 records per page
        self.subscribe('corpsList', category, skipCount);
        self.subscribe('images');
    });
});

Template.corps.helpers({
    postsCategory: function() {
        if (this.categoryName !== "total") {
            return this.categoryName;
        } else {
            return null;
        }
    },
    postsList: function() {
        if (this.categoryName === "total") {
            return Corps.find({}, {sort: {date: -1}});
        } else {
            return Corps.find({category: this.categoryName}, {sort: {date: -1}});
        }
    },
    prevPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.corps.path({category: currnetCategory, page: previousPage});
    },
    nextPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.corps.path({category: currnetCategory, page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 10 < totalPosts;
}
