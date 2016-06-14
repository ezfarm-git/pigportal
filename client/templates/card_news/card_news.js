Template.card_news.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var category = Router.current().params.category;
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 5; // 5 records per page
        self.subscribe('cardNewsList', category, skipCount);
        self.subscribe('images');
    });
});

Template.card_news.onRendered(function() {
    $('.fancybox').fancybox({
        helpers: {
            title: {type: 'inside'}
        }
    });
})

Template.card_news.helpers({
    postsCategory: function() {
        if (this.categoryName !== "total") {
            return this.categoryName;
        } else {
            return null;
        }
    },
    postsList: function() {
        if (this.categoryName === "total") {
            return CardNews.find({}, {sort: {date: -1}});
        } else {
            return CardNews.find({category: this.categoryName}, {sort: {date: -1}});
        }
    },
    prevPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.card_news.path({category: currnetCategory, page: previousPage});
    },
    nextPage: function() {
        var currnetCategory = Router.current().params.category || "total";
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.card_news.path({category: currnetCategory, page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 5 < totalPosts;
}

Template.card_news.events({
    'click .fancybox': function(evt, tmpl) {
        evt.preventDefault();
    }
});
