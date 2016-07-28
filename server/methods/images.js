Meteor.methods({
    'Images.remove': function(id) {
        return Images.remove({_id: id});
    },
    'Images.multiple.remove': function(ids) {
        return Images.remove({_id: {'$in': ids}});
    }
})
