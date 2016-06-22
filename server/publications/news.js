// for Admin
Meteor.publish("newsListAdmin", function() {
    return News.find();
});

// for Viewer
Meteor.publish("newsList", function(category, skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    if (category === "total") {
        Counts.publish(this, 'postsCount', News.find(), {
            noReady: true
        });
    } else {
        Counts.publish(this, 'postsCount', News.find({category: category}), {
            noReady: true
        });
    }

    if (category === "total") {
        return News.find({}, {
            limit: 15, // records to show per page
            skip: skipCount,
            sort: {date: -1}
        });
    } else {
        return News.find({category: category}, {
            limit: 15,
            skip: skipCount,
            sort: {date: -1}
        });
    }
});

Meteor.publish("categoryNewsList", function() {
    return News.find();
});
