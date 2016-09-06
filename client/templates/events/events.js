Template.events.onRendered(function() {
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
                `<div>
                    ${event.title}
                 </div>
                `
            );
        },
        eventClick(event) {
            Session.set('eventModal', {
                event: event._id
            });
            $('#event-modal').modal('show');
        },
        lang: 'ko',
        height: 'auto',
        header: {
            left: 'prev, next, today',
            center: '',
            right: 'title'
        },
        defaultView: 'month'
    });
    Tracker.autorun(function() {
        Events.find().fetch();
        $('#events-calendar').fullCalendar('refetchEvents');
    });
});

Template.events.onDestroyed(function() {
    Session.set('eventModal', null);
});

Template.events.helpers({
  recentEvents: function() {
    let recentEvents = Events.find({end: {$gte: moment().format('YYYY-MM-DD')}}, {sort: {start: 1}}).fetch();
    $.each(recentEvents, function(key, value) {
      if (value.start === value.end) {
        value.end = null;
      } else {
        value.end = moment(value.end).add(-1, 'day').format('YYYY-MM-DD');
      }
    });
    return recentEvents;
  }
});
