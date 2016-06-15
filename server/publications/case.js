// for Admin
Meteor.publish("caseListAdmin", function() {
    return Case.find();
});

// for Viewer
Meteor.publish("caseList", function(skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    Counts.publish(this, 'postsCount', Case.find(), {
        noReady: true
    });

    return Case.find({}, {
        limit: 10, // records to show per page
        skip: skipCount,
        sort: {date: -1}
    });
});

Meteor.publish("casePost", function(postId) {
    return Case.find({_id: postId});
});
