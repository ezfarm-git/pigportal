// for Admin
Meteor.publish("infographicListAdmin", function() {
    return Infographic.find();
});

// for Viewer
Meteor.publish("infographicList", function(category, skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    if (category === "total") {
        Counts.publish(this, 'postsCount', Infographic.find(), {
            noReady: true
        });
    } else {
        Counts.publish(this, 'postsCount', Infographic.find({category: category}), {
            noReady: true
        });
    }

    if (category === "total") {
        return Infographic.find({}, {
            limit: 10, // records to show per page
            skip: skipCount
        });
    } else {
        return Infographic.find({category: category}, {
            limit: 10,
            skip: skipCount
        });
    }
});

Meteor.publish("infographicPost", function(postId) {
    return Infographic.find({_id: postId});
});
