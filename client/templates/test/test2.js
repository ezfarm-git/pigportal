Template.test2.onRendered(function() {
    document.getElementById("datepicker1").defaultValue = moment(new Date()).format('YYYY-MM-DD');
    document.getElementById("datepicker2").defaultValue = moment(new Date()).format('YYYY-MM-DD');

    function getData() {
        var start = moment($('#datepicker1').val()).format('YYYYMMDD');
        var end = moment($('#datepicker2').val()).format('YYYYMMDD');
        var sex = $('input[name="optradio"]:checked').val();
        Meteor.call('test2.get', start, end, sex, function(error, result) {
            if(error) {
                console.log(error);
            } else {
                console.log(start, end, sex);
                Session.setPersistent('test', result);
            }
        });
    }

    getData();

    $('.container').change(function() {
        getData();
    });
});

Template.test2.helpers({
    test: function() {
        return Session.get('test');
    }
});
