// for Admin
Meteor.publish("newsListAdmin", function() {
    return News.find();
});

// for Viewer
Meteor.publish("newsList", function(skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'postsCount', News.find(), {
        noReady: true
    });

    return News.find({}, {
        limit: 10, // records to show per page
        skip: skipCount
    });
});

Meteor.publish("categoryNewsList", function() {
    return News.find();
});
