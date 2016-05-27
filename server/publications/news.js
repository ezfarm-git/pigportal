// for Admin
Meteor.publish("newsList", function() {
    return News.find();
});

// for Viewer
Meteor.publish("categoryNewsList", function(newsCategory) {
    return News.find({category: newsCategory});
});
