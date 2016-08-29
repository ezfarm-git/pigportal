Template.main.onRendered(function() {
  $('.fancybox').fancybox({
      closeBtn: false,
      maxHeight: '600',
      helpers: {
          title: {type: 'inside'}
      }
  });
})

Template.main.helpers({
    latestFocus: function() {
        return Focus.find({}, {sort: {date: -1}, limit: 1});
    },
    mainFocus: function() {
        return Focus.find({}, {skip: 1}, {sort: {date: -1, title: 1}, limit: 6});
    },
    mainNews: function() {
        return News.find({}, {sort: {date: -1, title: 1}, limit: 6});
    },
    mainCorps: function() {
        return Corps.find({}, {sort: {date: -1, title: 1}, limit: 2});
    },
    mainCase: function() {
        return Case.find({}, {sort: {date: -1}, limit: 1});
    },
    mainCardNews: function() {
        return CardNews.find({}, {sort: {date: -1}, limit: 1}).fetch()[0];
    },
    mainInfographic: function() {
        return Infographic.find({}, {sort: {date: -1}, limit: 1}).fetch()[0];
    }
});

Template.main.events({
    'click .fancybox': function(evt, tmpl) {
        evt.preventDefault();
    },
    'click .fancyboxLauncher': function(evt) {
        evt.preventDefault();
        $('.fancybox').eq(0).trigger('click');
        return false;
    }
});
