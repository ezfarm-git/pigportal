Template.infographic.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var skipCount = (currentPage - 1) * 20; // 10 records per page
        self.subscribe('infographicList', skipCount);
    });
});

Template.infographic.onRendered(function() {
    $('.fancybox').fancybox({
        helpers: {
            title: {type: 'inside'}
        }
    });
    $('.grid').isotope({
      // options...
      itemSelector: '.grid-item',
      masonry: {
        columnWidth: 50
      }
    });
})

Template.infographic.helpers({
    postsList: function() {
        return Infographic.find({}, {sort: {date: -1}});
    },
    prevPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var previousPage = currentPage === 1 ? 1 : currentPage - 1;
        return Router.routes.infographic.path({page: previousPage});
    },
    nextPage: function() {
        var currentPage = parseInt(Router.current().params.page) || 1;
        var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
        return Router.routes.infographic.path({page: nextPage});
    }
});

var hasMorePages = function() {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var totalPosts = Counts.get('postsCount');
    return currentPage * 20 < totalPosts;
}

Template.infographic.events({
    'click .fancybox': function(evt) {
        evt.preventDefault();
    }
});
