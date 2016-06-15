let closeModal = function() {
    $('#add-edit-event-modal').modal('hide');
    $('.modal-backdrop').fadeOut();
};

Template.addEditEventModal.helpers({
    modalType(type) {
        let eventModal = Session.get('eventModal');
        if (eventModal) {
            return eventModal.type === type;
        }
    },
    modalLabel() {
        let eventModal = Session.get('eventModal');
        if (eventModal) {
            return {
                button: eventModal.type === 'edit' ? 'Edit' : 'Add',
                label: eventModal.type === 'edit' ? 'Edit' : 'Add an'
            };
        }
    },
    selected(v1, v2) {
        return v1 === v2;
    },
    event() {
        let eventModal = Session.get('eventModal');
        if (eventModal) {
            return eventModal.type === 'edit' ? Events.findOne(eventModal.event) : {
                start: eventModal.date,
                end: eventModal.date
            };
        }
    }
});

Template.addEditEventModal.events({
    'submit form' (event, template) {
        event.preventDefault();
        let eventModal = Session.get('eventModal'),
            submitType = eventModal.type === 'edit' ? 'editEvent' : 'addEvent',
            eventItem = {
                title: template.find('[name="title"]').value,
                start: template.find('[name="start"]').value,
                end: template.find('[name="end"]').value,
                category: template.find('[name="category"] option:selected').value,
                summary: template.find('[name="summary"]').value
            };
        if (submitType === 'editEvent') {
            eventItem._id = eventModal.event;
        }
        Meteor.call(submitType, eventItem, function(error) {
            if (error) {
                console.log(error.reason, 'danger');
            } else {
                console.log(`Event ${ eventModal.type }ed!`, 'success');
                closeModal();
            }
        });
    },
    'click .delete-event' (event, template) {
        let eventModal = Session.get('eventModal');
        if (confirm('이 이벤트를 삭제하시겠습니까?')) {
            Meteor.call('removeEvent', eventModal.event, function(error) {
                if (error) {
                    console.log(error.reason, 'danger');
                } else {
                    console.log('Event deleted!', 'success');
                    closeModal();
                }
            });
        }
    }
});
