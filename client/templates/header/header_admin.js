Template.header_admin.events({
    'click #signout': function() {
        event.preventDefault();
        Meteor.logout(function(err) {
            if(!err) {
                Router.go('/signin');
            }
        });
    }
})
