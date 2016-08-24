Meteor.methods({
  'Case.remove': function (id) {
    return Case.remove({_id: id});
  },
  'get.Case': function (id) {
    return Case.find({_id: id}).fetch()[0];
  },
  'get.Image': function (id) {
    return Images.find({_id: id}).fetch()[0];
  },
});
