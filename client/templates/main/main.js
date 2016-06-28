let postsNumber = 4

Template.main.onRendered(function() {
    $('.fancybox').fancybox({
        helpers: {
            title: {type: 'inside'}
        }
    });
})

Template.main.helpers({
    mainNews_A: function() {
        return News.find({category: "알림"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainNews_B: function() {
        return News.find({category: "산업"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainNews_C: function() {
        return News.find({category: "현장"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_A: function() {
        return Focus.find({category: "글로벌"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_B: function() {
        return Focus.find({category: "리뷰"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_C: function() {
        return Focus.find({category: "자료"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainCorps: function() {
        return Corps.find({}, {sort: {date: -1}, limit: postsNumber});
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
    }
});
