Meteor.startup(function () {

  if (Meteor.users.find().count() === 0) {
    seedUserId = Accounts.createUser({
      email: 'pigportal@ezfarm.co.kr',
      password: 'pig2016'
    });
  }

  // ServiceConfiguration.configurations.update({
  //   "service": "facebook"
  // }, {
  //   $set: {
  //     "appId": "133083553796392",
  //     "secret": "14dd68ea69509432fa4bba201296e600"
  //   }
  // }, {
  //   upsert: true
  // });
  //
  // // Add Google configuration entry
  // ServiceConfiguration.configurations.update({
  //   "service": "google"
  // }, {
  //   $set: {
  //     "clientId": "565266697241-8ot1a3kbn8o2te2pbliok3pm20q9erui.apps.googleusercontent.com",
  //     "secret": "_ywxOC_xejRaEBumZaV-CBBx"
  //   }
  // }, {
  //   upsert: true
  // });

});
