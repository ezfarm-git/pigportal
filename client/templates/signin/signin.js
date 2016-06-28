Template.signin.events({
    'submit form': function(evt) {
        evt.preventDefault();
        var email = evt.target.email.value;
        var password = evt.target.password.value;
        Meteor.loginWithPassword(email, password, function(err) {
            if(err) {
                console.log(err);
            } else {
                Router.go('/admin');
            }
        });
        return false;
    }
});
