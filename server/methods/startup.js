Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        seedUserId = Accounts.createUser({
            email: 'pigportal@ezfarm.co.kr',
            password: 'pig2016'
        });
    }

    // var users = Meteor.users.find().fetch();
    // _.each(users, function(userData) {
    //     if(userData.emails[0].address === "pigportal@ezfarm.co.kr") {
    //         Roles.addUsersToRoles(userData, ['admin']);
    //     }
    // });
});
