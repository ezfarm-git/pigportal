// skinYn 돈피구분 N 박피,  Y 탕박  Default 탕박
// sexCd	성별	6	0	025001	025001	암  025002	수 025003	거세 025004	기타(프리마틴등) Default  025001

// 도매시장 코드
// 0905	농협고령
// 1301	삼성식품
// 0809	농협나주
// 1005	김해축공
// 0302	협신식품
// 1201	신흥산업
// 0202	부경축공
// 0320	도드람
// 0323	농협부천
// 0714	익산
// 0513	농협음성
// 1101	제주축협
// 1401 삼호축산

Template.price_ticker.onRendered(function () {
  var today = moment(new Date()).format('YYYYMMDD');

  let wantedProperties = [
    'c_0202Amt', 'c_0202Cnt', 'c_0302Amt', 'c_0302Cnt', 'c_0320Amt', 'c_0320Cnt',
    'c_0323Amt', 'c_0323Cnt', 'c_0513Amt', 'c_0513Cnt', 'c_0714Amt', 'c_0714Amt',
    'c_0809Amt', 'c_0809Cnt', 'c_0905Amt', 'c_0905Cnt', 'c_1005Amt', 'c_1005Cnt',
    'c_1101Amt', 'c_1101Cnt', 'c_1201Amt', 'c_1201Cnt', 'c_1301Amt', 'c_1301Cnt',
    'c_1401Amt', 'c_1401Cnt', 'gradeNm', 'judgeSexNm', 'skinNm'
  ];

  Meteor.call('market.get', today, today, 'Y', '025001', function (error, result) {
    if (error) {
      console.log(error);
    } else {
      let data = result.response.body[0].items[0];

      var female_Y = [{}, {}, {}, {}, {}];
      for (i = 0; i < 5; i++) {
        Object.getOwnPropertyNames(data.item[i]).forEach(function (val, idx, array) {
          if (wantedProperties.includes(val)) {
            female_Y[i][val] = data.item[i][val];
          }
        });
      }
      Session.setPersistent('female_Y', female_Y);
    }
  });

  ////////////////////////////////////////////////////////
  var myIndex = 0;
  carousel();

  function carousel() {
    var i;
    var x = document.getElementsByClassName("mySlides");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 8000);
  }

});

Template.price_ticker.helpers({
  female_Y: function () {
    return Session.get('female_Y');
  }
});
