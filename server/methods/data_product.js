Meteor.methods({

    "TWO_YEARS.get": function(pastY, curY) {
        var result = HTTP.get('http://localhost:4100/pig-portal/two-years/' + pastY + '/' + curY);
        return JSON.parse(result.content);
    },

    "CURRENT_WEEK.get": function() {
        var result = HTTP.get('http://localhost:4100/pig-portal/currentweek');
        return JSON.parse(result.content)[0]['WEEK'];
    },

});
