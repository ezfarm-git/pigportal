// for Admin
Meteor.publish("eventsListAdmin", function() {
    return Events.find();
});

Meteor.publish("events", function(start, end) {
    return Events.find();
});
