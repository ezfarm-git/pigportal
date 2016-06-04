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
            limit: 10, // records to show per page
            skip: skipCount
        });
    } else {
        return News.find({category: category}, {
            limit: 10,
            skip: skipCount
        });
    }
});

Meteor.publish("categoryNewsList", function() {
    return News.find();
});
