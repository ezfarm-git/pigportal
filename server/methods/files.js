Meteor.methods({
    'Files.remove': function(id) {
        return Files.remove({_id: id});
    }
})
