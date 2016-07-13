Template.test.onCreated(function() {
    Meteor.call('test.get', function(error, result) {
        if(error) {
            console.log(error);
        } else {
            console.log(result);
            console.log(typeof(result));
            console.log(result.breakfast_menu);
            console.log(result.breakfast_menu.food);
            console.log(result.breakfast_menu.food[0].name);
            console.log(result.breakfast_menu.food[0].description);
            Session.setPersistent('test', result);
        }
    });
});

Template.test.onRendered(function() {

});

Template.test.helpers({
    test: function() {
        return Session.get('test');
    }
});
