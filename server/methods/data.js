Meteor.methods({
    "pig_farms_by_scale_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO051/2/1/20160622160255_1&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_scale_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO051/2/1/20160622160255_6&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_under_2_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_2&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_under_4_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_3&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_under_6_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_4&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_under_8_female_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_6&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_under_8_male_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_7&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_over_8_female_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_9&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_age_over_8_male_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO096/2/1/20160623163325_10&prdSe=Q&newEstPrdCnt=5');
        return result;
    }
});
