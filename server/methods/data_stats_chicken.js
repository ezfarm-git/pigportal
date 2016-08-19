Meteor.methods({

  // 시도/규모
  'chicken_farm_scale_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO061/3/2/20160719112821&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');

    var res;
    xml2js.parseString(xml.content, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res = result['message:StructureSpecificTimeSeriesData']['message:DataSet'][0]['Series'];
      }
    });
    return res;
  },

  // 시도/월령
  'chicken_age_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO097/3/2/20160719114135&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
    var res;
    xml2js.parseString(xml.content, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res = result['message:StructureSpecificTimeSeriesData']['message:DataSet'][0]['Series'];
      }
    });
    return res;
  },

});
