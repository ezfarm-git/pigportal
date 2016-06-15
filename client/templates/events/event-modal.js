Template.EventModal.helpers({
    event: function() {
        let eventModal = Session.get('eventModal');
        return Events.findOne(eventModal.event);
    }
});
