// for Admin
Meteor.publish("eventsListAdmin", function() {
    return Events.find();
});

Meteor.publish("events", function(start, end) {
    return Events.find();
});

// for Viewer
Meteor.publish("eventsList", function() {
    return Favorites.find({}, {sort: {date: -1}});
});
