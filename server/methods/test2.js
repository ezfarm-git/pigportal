Meteor.methods({

    'test2.get': function(start, end, sex) {
        var startDate = start;
        var endDate = end;
        var sexCode = sex;
        var url = 'http://data.ekape.or.kr/openapi-data/service/user/grade/auct/pigGrade?ServiceKey=1pnhQ%2B2gxF6XxDmZw67PCIa4tczVx1nfVyeSPjbDhW%2FSbRo5FqskuFoSPRKPaIUmVLoaiKvS4Sfz1e21mZleiA%3D%3D&startYmd='.concat(startDate, '&endYmd=', endDate, '&skinYn=Y&sexCd=0', sexCode, '&egradeExceptYn=Y');
        var xml = HTTP.get(url);
        var jsResult;
        xml2js.parseString(xml.content, function(err, result) {
            if(err) {
                console.log(err);
            } else {
                jsResult = result;
            }
        });
        console.log(url);
        console.log(jsResult);
        return jsResult;
    }

});
