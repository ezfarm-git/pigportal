// for Admin
Meteor.publish("newsListAdmin", function() {
    return News.find();
});

// for Viewer
Meteor.publish("newsList", function() {
    return News.find();
});

Meteor.publish("categoryNewsList", function() {
    return News.find();
});
