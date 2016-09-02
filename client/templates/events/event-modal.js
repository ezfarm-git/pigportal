Template.EventModal.helpers({
  event: function () {
    let eventModal = Session.get('eventModal');
    return Events.findOne(eventModal.event);
  },
  endDate: function () {
    let eventModal = Session.get('eventModal');
    let result = Events.findOne(eventModal.event);
    if (result['start'] === result['end']) {
      return result['end'];
    } else {
      return moment(result['end']).add(-1, 'day').format('YYYY-MM-DD');
    }
  }
});
