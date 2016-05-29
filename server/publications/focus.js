// for Admin
Meteor.publish("focusListAdmin", function() {
    return Focus.find();
});

// for Viewer
Meteor.publish("focusList", function(skip, limit) {
    var options;
    Counts.publish(this, 'total_posts', Focus.find());
    if (skip < 0) {
        skip = 0;
    }
    options = {};
    options.skip = skip;
    options.limit = limit;
    if (options.limit > 10) {
        options.limit = 10;
    }
    options.sort = {
        date: -1
    };
    return Focus.find({}, options);
});

Meteor.publish("categoryFocusList", function(category, skip, limit) {
    var options;
    Counts.publish(this, 'total_posts', Focus.find({category:category}));
    if (skip < 0) {
        skip = 0;
    }
    options = {};
    options.skip = skip;
    options.limit = limit;
    if (options.limit > 10) {
        options.limit = 10;
    }
    options.sort = {
        date: -1
    };
    return Focus.find({category:category}, options);
});

Meteor.publish("focusPost", function(postId) {
    return Focus.find({_id:postId});
});

Meteor.publish("focusImage", function(postId) {
    var imageId = Images.findOne({_id: postId})._id;
    return Images.find({_id: imageId});
});
