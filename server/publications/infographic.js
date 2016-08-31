// for Admin
Meteor.publish("infographicListAdmin", function() {
    return Infographic.find();
});

// for Viewer
Meteor.publish("infographicList", function(skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'postsCount', Infographic.find(), {
        noReady: true
    });

    return Infographic.find({}, {
        limit: 20, // records to show per page
        skip: skipCount,
        sort: {date: -1}
    });
});
