Meteor.users.allow({
    insert: function(userId, doc) {
        return userId;
    },
    update: function(userId, doc, fields,modifier) {
        return userId && doc._id === userId;
    },
    remove: function(userId) {
        return userId;
    }
});
