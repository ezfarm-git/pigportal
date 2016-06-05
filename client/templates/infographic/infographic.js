Template.infographic.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var category = Router.current().params.category;
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 10; // 10 records per page
        self.subscribe('infographicList', category, skipCount);
    });
});

Template.infographic.helpers({
    postsCategory: function() {
        if (this.categoryName) {
            return this.categoryName;
        } else {
            return "전체";
        }
    },
    postsList: function() {
        if (this.categoryName === "total") {
            return Infographic.find({}, {sort: {date: -1}});
        } else {
            return Infographic.find({category: this.categoryName}, {sort: {date: -1}});
        }
    },
    images: function() {
        return Images.findOne({_id: this.image});
    },
    prevPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.infographic.path({category: currnetCategory, page: previousPage});
    },
    nextPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.infographic.path({category: currnetCategory, page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 10 < totalPosts;
}
