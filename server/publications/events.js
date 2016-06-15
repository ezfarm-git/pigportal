// for Admin
Meteor.publish("eventsListAdmin", function() {
    return Events.find();
});

Meteor.publish("events", function(start, end) {
    return Events.find();
});

// for Viewer
Meteor.publish("eventsList", function(category) {
    if (category === "total") {
        return Favorites.find({}, {sort: {date: -1}});
    } else {
        return Favorites.find({category: category}, {sort: {date: -1}});
    }
});
