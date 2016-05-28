// for Admin
Meteor.publish("newsListAdmin", function() {
    return News.find();
});

// for Viewer
Meteor.publish("newsList", function(skip, limit) {
    var options;
    Counts.publish(this, 'total_posts', News.find());
    if (skip < 0) {
        skip = 0;
    }
    options = {};
    options.skip = skip;
    options.limit = limit;
    if (options.limit > 10) {
        options.limit = 10;
    }
    options.sort = {
        date: -1
    };
    return News.find({}, options);
});

Meteor.publish("categoryNewsList", function(newsCategory, skip, limit) {
    var options;
    Counts.publish(this, 'total_posts', News.find({category: newsCategory}));
    if (skip < 0) {
        skip = 0;
    }
    options = {};
    options.skip = skip;
    options.limit = limit;
    if (options.limit > 10) {
        options.limit = 10;
    }
    options.sort = {
        date: -1
    };
    return News.find({category: newsCategory}, options);
});
