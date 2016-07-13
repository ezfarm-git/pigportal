Meteor.methods({

    'test.get': function() {
        var xml = HTTP.get('http://www.w3schools.com/xml/simple.xml');
        var jsResult;
        xml2js.parseString(xml.content, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                jsResult = result;
            }
        });
        console.log(jsResult);
        return jsResult;
    }

});
