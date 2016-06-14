Template.events_admin.onRendered({
    var fc = this.$('.fc');
    this.autorun(function() {
        Events.find();
        fc.fullCalendar('refetchEvents');
    });
});

Template.events_admin.helpers({
    events: function() {
        var fc = $('.fc');
        return function(start, end, tz, callback) {
            Meteor.subscribe('events', start.toDate(), end.toDate(), function() {
                fc.fullCalendar('refetchEvents');
            });
            var events = Events.find().map(function(it) {
                return {
                    title: it.date.toISOString(),
                    start: it.date,
                    allDay: true
                };
            });
            callback(events);
        };
    },
    onEventClicked: function() {
        return function(calEvent, jsEvent, view) {
            alert("Event clicked: " + calEvent.title);
        }
    }
});
