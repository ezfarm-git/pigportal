Meteor.methods({
    'Infographic.remove': function(id) {
        return Infographic.remove({_id: id});
    }
});
