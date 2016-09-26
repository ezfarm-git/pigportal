Meteor.startup(function () {

  if (Meteor.users.find().count() === 0) {
    seedUserId = Accounts.createUser({
      email: 'pigportal@ezfarm.co.kr',
      password: 'pig2016'
    });
  }


});
