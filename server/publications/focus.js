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

Meteor.publish("categoryFocusList", function(focusCategory, skip, limit) {
    var options;
    Counts.publish(this, 'total_posts', Focus.find({category: focusCategory}));
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
    return Focus.find({category: focusCategory}, options);
});
