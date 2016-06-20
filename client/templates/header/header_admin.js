Template.header_admin.events({
    'click .signout': function(evt) {
        event.preventDefault();
        Meteor.logout();
        Router.go('/signin');
    }
})
