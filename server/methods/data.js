Meteor.methods({
    "pig_farms_by_scale_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO051/2/1/20160622160255_1&prdSe=Q&newEstPrdCnt=5');
        return result;
    }
});
