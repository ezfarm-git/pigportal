Meteor.startup(function() {
    if (Meteor.users.find().count() === 0) {
        seedUserId = Accounts.createUser({
            email: 'pigportal@ezfarm.co.kr',
            password: 'pig2016'
        });
    }
    if (Meteor.isClient) {
        window.fbAsyncInit = function() {
            FB.init({
                appId: '133083553796392',
                status: true,
                xfbml: true,
                version: 'v2.5'
            });
        };
    }
});
