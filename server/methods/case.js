Meteor.methods({
  'Case.remove': function (id) {
    return Case.remove({_id: id});
  }
});
