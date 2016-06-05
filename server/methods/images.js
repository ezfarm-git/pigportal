Meteor.methods({
    'Images.remove': function(id) {
        return Images.remove({_id: id});
    }
})
