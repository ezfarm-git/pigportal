Meteor.methods({

  // 사육규모, 농가 (한우,육우,젖소)
  'hanwoo_farm_scale_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO021/3/10/20160804173728&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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

  'yukwoo_farm_scale_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO031/3/11/20160804173821&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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

  'dariy_farm_scale_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO041/3/12/20160804173926&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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

  // 월령별 사육규모
  'hanwoo_age_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO093/3/14/20160804174233&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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
  'yukwoo_age_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO094/3/13/20160804174052&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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

  'dairy_age_by_city.get': function () {

    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/101/DT_1EO095/3/15/20160804174426&type=StructureSpecific&prdSe=Q&newEstPrdCnt=5&version=v2_1');
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

  // 육질 등급별 경락가격, 두수
  'cow_grade_by_quality.get': function (start, end) {
    var startDate = start;
    var endDate = end;
    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/323/DT_APGS_009/3/19/20160816133210&type=StructureSpecific&prdSe=M&startPrdDe=' + startDate + '&endPrdDe=' + endDate + '&version=v2_1');
    var res;
    var series;
    var time;
    xml2js.parseString(xml.content, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res = result['message:StructureSpecificTimeSeriesData']['message:DataSet'][0]['Series'];
      }
    });
    return res;
  },

  // 육량 등급별 경락가격, 두수
  'cow_grade_by_quantity.get': function (start, end) {
    var startDate = start;
    var endDate = end;
    var xml = HTTP.get('http://kosis.kr/openapi/statisticsBigData.do?method=getList&apiKey=OWI2ODY5NWEzMWNlMTJiNTBmYWJhMGVhMGI0Nzc3YmI=&format=sdmx&userStatsId=k0013280/323/DT_APGS_010/3/18/20160816132811&type=StructureSpecific&prdSe=M&startPrdDe=' + startDate + '&endPrdDe=' + endDate + '&version=v2_1');
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
