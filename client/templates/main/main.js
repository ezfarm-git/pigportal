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
        return News.find({category: "A"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainNews_B: function() {
        return News.find({category: "B"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainNews_C: function() {
        return News.find({category: "C"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_A: function() {
        return Focus.find({category: "가"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_B: function() {
        return Focus.find({category: "나"}, {sort: {date: -1}, limit: postsNumber});
    },
    mainFocus_C: function() {
        return Focus.find({category: "다"}, {sort: {date: -1}, limit: postsNumber});
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
