let isPast = function(date) {
    let today = moment().format();
    return moment(today).isAfter(date);
};

Template.events_admin.onCreated(function() {
    let template = Template.instance();
    template.subscribe('events');
});

Template.events_admin.onRendered(function() {
    $('#events-calendar').fullCalendar({
        events(start, end, timezone, callback) {
            let data = Events.find().fetch().map(function(event) {
                event.editable = !isPast(event.start);
                return event;
            });
            if (data) {
                callback(data);
            }
        },
        eventRender(event, element) {
            element.find('.fc-content').html(
                `<h4 class="event-title">${event.title}, <span class="category-${event.category}">#${event.category}</span></h4>
                 <p class="event-summary">${event.summary}</p>
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
