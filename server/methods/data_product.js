Meteor.methods({

    "THREE_YEARS.get": function( pastY2, pastY1, curY) {

        var response = HTTP.get('http://210.92.91.212:4100/pig-portal/three-years/' + pastY2 + '/' + pastY1 + '/' + curY);
        return JSON.parse(response.content);
    },    

    "TWO_YEARS.get": function(pastY, curY) {
        var response = HTTP.get('http://210.92.91.212:4100/pig-portal/two-years/' + pastY + '/' + curY);
        return JSON.parse(response.content);
    },

    "INITIAL_POPS.get": function( pastY2, pastY1, curY) {
        var response = HTTP.get('http://210.92.91.212:4100/pig-portal/initial-pops/' + pastY2 + '/' + pastY1 + '/' + curY);
        return JSON.parse(response.content);
    },
    
    "CURRENT_WEEK.get": function() {
        var response = HTTP.get('http://210.92.91.212:4100/pig-portal/currentweek');
        return JSON.parse(response.content)[0]['WEEK'];
    }

});
