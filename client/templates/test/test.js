Template.test.onRendered(function() {
    Meteor.call('pig_farms_by_scale_total.get', function(error, result) {
        if(error) {
            console.log(error);
        } else {
            console.log(result.content);
            Session.set('pig_farms_by_scale_total', JSON.parse(result.content));
        }
    });
});

Template.test.helpers({
    pig_farms_by_scale_total: function() {
        return Session.get('pig_farms_by_scale_total');
    }
});
