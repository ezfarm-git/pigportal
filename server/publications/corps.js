// for Admin
Meteor.publish("corpsListAdmin", function() {
    return Corps.find();
});

// for Viewer
Meteor.publish("corpsList", function(category, skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    if (category === "total") {
        Counts.publish(this, 'postsCount', Corps.find(), {
            noReady: true
        });
    } else {
        Counts.publish(this, 'postsCount', Corps.find({category: category}), {
            noReady: true
        });
    }

    if (category === "total") {
        return Corps.find({}, {
            limit: 10, // records to show per page
            skip: skipCount,
            sort: {date: -1}
        });
    } else {
        return Corps.find({category: category}, {
            limit: 10,
            skip: skipCount,
            sort: {date: -1}
        });
    }
});

Meteor.publish("corpsPost", function(postId) {
    return Corps.find({_id: postId});
});

// Meteor.publish("categoryCorpsList", function() {
//     return Corps.find();
// });
