// for Admin
Meteor.publish("cardNewsListAdmin", function() {
    return CardNews.find();
});

// for Viewer
Meteor.publish("cardNewsList", function(category, skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    if (category === "total") {
        Counts.publish(this, 'postsCount', CardNews.find(), {
            noReady: true
        });
    } else {
        Counts.publish(this, 'postsCount', CardNews.find({category: category}), {
            noReady: true
        });
    }

    if (category === "total") {
        return CardNews.find({}, {
            limit: 5, // records to show per page
            skip: skipCount,
            sort: {date: -1}
        });
    } else {
        return CardNews.find({category: category}, {
            limit: 5,
            skip: skipCount,
            sort: {date: -1}
        });
    }
});
