Template.card_news.onCreated(function () {
  var self = this;
  self.autorun(function () {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var skipCount = (currentPage - 1) * 10; // 5 records per page
    self.subscribe('cardNewsList', skipCount);
    self.subscribe('images');
  });
});

Template.card_news.onRendered(function () {
  $('.fancybox').fancybox({
    closeBtn: false,
    maxHeight: '600',
    helpers: {
      title: {
        type: 'inside'
      }
    }
  });
  $('.grid').isotope({
    // options...
    itemSelector: '.grid-item',
    masonry: {
      columnWidth: 10,
      fitWidth: true
    }
  });
})

Template.card_news.helpers({
  postsList: function () {
    return CardNews.find({}, {
      sort: {
        date: -1
      }
    });
  },
  prevPage: function () {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var previousPage = currentPage === 1 ? 1 : currentPage - 1;
    return Router.routes.cardnews.path({
      page: previousPage
    });
  },
  nextPage: function () {
    var currentPage = parseInt(Router.current().params.page) || 1;
    var nextPage = hasMorePages() ? currentPage + 1 : currentPage;
    return Router.routes.cardnews.path({
      page: nextPage
    });
  }
});

var hasMorePages = function () {
  var currentPage = parseInt(Router.current().params.page) || 1;
  var totalPosts = Counts.get('postsCount');
  return currentPage * 10 < totalPosts;
}

Template.card_news.events({
  'click .fancybox': function (evt) {
    evt.preventDefault();
  }
});
