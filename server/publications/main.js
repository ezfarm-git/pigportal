let postsNumber = 4

// News

Meteor.publish("mainNews_A", function() {
    return News.find({category: "알림"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainNews_B", function() {
    return News.find({category: "산업"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainNews_C", function() {
    return News.find({category: "현장"}, {sort: {date: -1}, limit: postsNumber});
});

// Focus

Meteor.publish("mainFocus_A", function() {
    return Focus.find({category: "글로벌"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainFocus_B", function() {
    return Focus.find({category: "리뷰"}, {sort: {date: -1}, limit: postsNumber});
});

Meteor.publish("mainFocus_C", function() {
    return Focus.find({category: "자료"}, {sort: {date: -1}, limit: postsNumber});
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
