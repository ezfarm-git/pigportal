Meteor.methods({

    'market.get': function(start, end, skin, sex) {
        var startDate = start;
        var endDate = end;
        var sexCode = sex;
        var skinSort = skin;
        var url = 'http://data.ekape.or.kr/openapi-data/service/user/grade/auct/pigGrade?ServiceKey=JmEE9KKsD6GqqAE4gVCOzdm5IGFturnWcpM1vM5LUTuR9LR2CXdFre2PWLao3Bd5ausrhrckUDclysY3y9BNqw%3D%3D&startYmd='.concat(startDate, '&endYmd=', endDate, '&skinYn=', skinSort, '&sexCd=0', sexCode, '&egradeExceptYn=Y');
        var xml = HTTP.get(url);
        var jsResult;
        xml2js.parseString(xml.content, function(err, result) {
            if (err) {
                console.log(err);
            } else {
                jsResult = result;
            }
        });
        return jsResult;
    }

});
