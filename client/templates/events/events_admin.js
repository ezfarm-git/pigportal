Template.events_admin.onRendered(function() {
    $('#events-calendar').fullCalendar({
        events(start, end, timezone, callback) {
            let data = Events.find().fetch().map(function(event) {
                return event;
            });
            if (data) {
                callback(data);
            }
        },
        eventRender(event, element) {
            element.find('.fc-content').html(
                `<div class="category-${event.category}">
                    ${event.title}
                 </div>
                `
            );
        },
        dayClick(date) {
            Session.set('eventModal', {
                type: 'add',
                date: date.format()
            });
            $('#add-edit-event-modal').modal('show');
        },
        eventClick(event) {
            Session.set('eventModal', {
                type: 'edit',
                event: event._id
            });
            $('#add-edit-event-modal').modal('show');
        },
        lang: 'ko'
    });
    Tracker.autorun(function() {
        Events.find().fetch();
        $('#events-calendar').fullCalendar('refetchEvents');
    });
});

Template.events_admin.onDestroyed(function() {
    Session.set('eventModal', null);
});
