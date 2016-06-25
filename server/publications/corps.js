// for Admin
Meteor.publish("corpsListAdmin", function() {
    return Corps.find();
});

// for Viewer
Meteor.publish("corpsList", function(skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'postsCount', Corps.find(), {
        noReady: true
    });

    return Corps.find({}, {
        limit: 10, // records to show per page
        skip: skipCount,
        sort: {date: -1}
    });
});

Meteor.publish("corpsPost", function(postId) {
    return Corps.find({_id: postId});
});
