Meteor.methods({
    // 사육규모
    "pig_farms_by_scale_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO051/2/1/20160622160255_1&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    "pig_pops_by_scale_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/101/DT_1EO051/2/1/20160622160255_6&prdSe=Q&newEstPrdCnt=5');
        return result;
    },
    // 월령별 사육규모
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
    },
    // 등급별 판정두수
    "quantity_by_grade_1+_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_18&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_19&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_2_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_20&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_out_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_21&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1+_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_39&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_40&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_2_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_41&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_out_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_42&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1+_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_60&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_61&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_2_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_62&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_out_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_63&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1+_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_81&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_1_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_82&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_2_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_83&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "quantity_by_grade_out_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_012/2/1/20160623183521_84&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    // 등급별 경락가격
    "price_by_grade_1+_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_18&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_19&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_2_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_20&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_out_total.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_21&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1+_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_39&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_40&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_2_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_41&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_out_female.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_42&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1+_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_60&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_61&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_2_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_62&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_out_male.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_63&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1+_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_81&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_1_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_82&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_2_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_83&prdSe=M&newEstPrdCnt=13');
        return result;
    },
    "price_by_grade_out_cast.get": function() {
        var result = Meteor.http.get('http://kosis.kr/openapi/statisticsData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=json&jsonVD=Y&userStatsId=k0013280/323/DT_APGS_014/2/1/20160623183418_84&prdSe=M&newEstPrdCnt=13');
        return result;
    }
});
