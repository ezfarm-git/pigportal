// for Admin
Meteor.publish("eventsListAdmin", function() {
    return Events.find();
});

Meteor.publish("events", function(start, end) {
    return Events.find();
});

Meteor.publish("recentEvents", function() {
    return Events.find({end: {$gte: moment().format('YYYY-MM-DD')}}, {sort: {start: 1}});
});
