// for Admin
Meteor.publish("focusListAdmin", function() {
    return Focus.find();
});

// for Viewer
Meteor.publish("focusList", function(category, skipCount) {
    var positiveIntegerCheck = Match.Where(function(x) {
        check(x, Match.Integer);
        return x >= 0;
    });
    check(skipCount, positiveIntegerCheck);

    if (category === "total") {
        Counts.publish(this, 'postsCount', Focus.find(), {
            noReady: true
        });
    } else {
        Counts.publish(this, 'postsCount', Focus.find({category: category}), {
            noReady: true
        });
    }

    if (category === "total") {
        return Focus.find({}, {
            limit: 10, // records to show per page
            skip: skipCount
        });
    } else {
        return Focus.find({category: category}, {
            limit: 10,
            skip: skipCount
        });
    }
});

Meteor.publish("focusPost", function(postId) {
    return Focus.find({_id: postId});
});

// Meteor.publish("categoryFocusList", function() {
//     return Focus.find();
// });
