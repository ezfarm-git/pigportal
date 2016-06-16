let postsNumber = 4

// News

Meteor.publish("mainNews_A", function() {
    return News.find({category: "A"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainNews_B", function() {
    return News.find({category: "B"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainNews_C", function() {
    return News.find({category: "C"}, {sort: {date: -1}, limit: postsNumber});
});

// Focus

Meteor.publish("mainFocus_A", function() {
    return Focus.find({category: "가"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainFocus_B", function() {
    return Focus.find({category: "나"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainFocus_C", function() {
    return Focus.find({category: "다"}, {sort: {date: -1}, limit: postsNumber});
});

// Corps

Meteor.publish("mainCorps", function() {
    return Corps.find({}, {sort: {date: -1}, limit: postsNumber});
});

// CardNews

Meteor.publish("mainCardNews", function() {
    return CardNews.find({}, {sort: {date: -1}, limit: 1});
});

// Infographic

Meteor.publish("mainInfographic", function() {
    return Infographic.find({}, {sort: {date: -1}, limit: 1});
});
