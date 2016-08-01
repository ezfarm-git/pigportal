Meteor.methods({

  'pig_farm_scale_by_city.get':function(){

          var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO051/3/1/20160630140534&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
          var res = xml.content;
          return res;
      },
    // 월령별 사육규모
      'pig_age_by_city.get':function(){

              var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO096/3/2/20160719113604&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
              var res = xml.content;
              return res;
          },
// 성별 등급별 경락가격
      'pig_price_by_grade.get':function() {
              var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/323/DT_APGS_014/3/4/20160727181831&type=StructureSpecific&prdSe=M&newEstPrdCnt=13&version=v2_1');
              var res = xml.content;
              return res;
      },

// 성별 등급별 판정두수
      'pig_quantity_by_grade.get':function() {
              var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/323/DT_APGS_012/3/5/20160728094449&type=StructureSpecific&prdSe=M&newEstPrdCnt=13&version=v2_1');
              var res = xml.content;
              return res;
      }

});
