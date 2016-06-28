Template.header_admin.events({
    'click #signout': function() {
        event.preventDefault();
        Meteor.logout(function(err) {
            if(err) {
                console.log(err);
            } else {
                Router.go('/signin');
            }
        });
        return false;
    }
})
