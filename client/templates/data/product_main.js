Template.product_main.onRendered(function () {

  let d3 = Plotly.d3;
  let gd3 = d3.select('div[id="plot_1"]');
  let gd = gd3.node();
  let annotationElement = document.getElementById('annotation');
  let pastInitElement = document.getElementById('past_initial2');
  let pastInitElement2 = document.getElementById('past_initial');
  let currentInitElement = document.getElementById('current_initial');

  let pastInitYear2 = document.getElementById('pastY2');
  let pastInitYear1 = document.getElementById('pastY1');
  let currentInitYear = document.getElementById('curY');

  let today = new Date();
  let currentYear = today.getFullYear();
  let pastYear = currentYear - 1;
  let pastYear2 = currentYear -2;


  function stringToWeek(x) {
    return x + '주';
  }

  function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
  }

  let txtMap = {
    'gCNT': '교배복수',
    'bCNT': '분만복수',
    'weaned': '이유두수',
    'bRatio': '분만율',
    'dRatio': '이유전 폐사율'
  };

  function drawPlot() {
    Meteor.call('THREE_YEARS.get',pastYear2, pastYear, currentYear, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var threeYears = result;

        var checked = $('input[name="optradio"]:checked').val();
        var txt = txtMap[checked];

        var week1 = [],
          week2 = [];

          var past_gCNT2 = [],
            past_bCNT2 = [],
            past_weaned2 = [],
            past_bRatio2 = [],
            past_dRatio2 = [],
            past_gCNT = [],
            past_bCNT = [],
            past_weaned = [],
            past_bRatio = [],
            past_dRatio = [],
            current_gCNT = [],
            current_bCNT = [],
            current_weaned = [],
            current_bRatio = [],
            current_dRatio = [];

          for (var i = 0; i < threeYears.length; i++) {
            if (threeYears[i].YEAR === pastYear.toString()) {
              if (threeYears[i].GUBUN === 'G_CNT') {
                past_gCNT.push(threeYears[i].VALUE);
                week1.push(threeYears[i].WEEK);
              } else if (threeYears[i].GUBUN === "B_CNT") {
                past_bCNT.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "EU_DUSU") {
                past_weaned.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "B_RATIO") {
                past_bRatio.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "PAESA") {
                past_dRatio.push(threeYears[i].VALUE);
              }
            }else if (threeYears[i].YEAR === pastYear2.toString()) {
              if (threeYears[i].GUBUN === 'G_CNT') {
                past_gCNT2.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "B_CNT") {
                past_bCNT2.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "EU_DUSU") {
                past_weaned2.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "B_RATIO") {
                past_bRatio2.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "PAESA") {
                past_dRatio2.push(threeYears[i].VALUE);
              }
            }
            else {
              if (threeYears[i].GUBUN === "G_CNT") {
                current_gCNT.push(threeYears[i].VALUE);
                week2.push(threeYears[i].WEEK);
              } else if (threeYears[i].GUBUN === "B_CNT") {
                current_bCNT.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "EU_DUSU") {
                current_weaned.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "B_RATIO") {
                current_bRatio.push(threeYears[i].VALUE);
              } else if (threeYears[i].GUBUN === "PAESA") {
                current_dRatio.push(threeYears[i].VALUE);
              }
            }
          }

        for (i = 0; i < 2; i++) {
          current_bCNT.pop();
          current_gCNT.pop();
          current_weaned.pop();
          current_bRatio.pop();
          current_dRatio.pop();
        }

        current_dRatio.pop();

        var period = [];
        for (i = 0; i < 52; i++) {
          period[i] = stringToWeek(week1[i]);
        }
        var trace11 = {
         x: period,
         y: past_gCNT2,
         connectgaps: true,
         mode: 'lines+markers',
         marker: {
           size: 8,
           opacity: 0.5
         },
         name: pastYear2 + "년 교배복수"
       };
       var trace12 = {
         x: period,
         y: past_bCNT2,
         mode: 'lines+markers',
         marker: {
           size: 8,
           opacity: 0.5
         },
         name: pastYear2 + "년 분만복수"
       };
       var trace13 = {
         x: period,
         y: past_weaned2,
         rotation: 90,
         mode: 'lines+markers',
         marker: {
           size: 8,
           opacity: 0.5
         },
         name: pastYear2 + "년 이유두수"
       };
       var trace14 = {
         x: period,
         y: past_bRatio2,
         rotation: 90,
         mode: 'lines+markers',
         marker: {
           size: 8,
           opacity: 0.5
         },
         name: pastYear2 + "년 분만율"
       };
       var trace15 = {
         x: period,
         y: past_dRatio2,
         rotation: 90,
         mode: 'lines+markers',
         marker: {
           size: 8,
           opacity: 0.5
         },
         name: pastYear2 + "년 이유전 폐사율"
       };
        var trace1 = {
          x: period,
          y: past_gCNT,
          connectgaps: true,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 교배복수"
        };
        var trace2 = {
          x: period,
          y: past_bCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 분만복수"
        };
        var trace3 = {
          x: period,
          y: past_weaned,
          rotation: 90,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 이유두수"
        };
        var trace4 = {
          x: period,
          y: past_bRatio,
          rotation: 90,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 분만율"
        };
        var trace5 = {
          x: period,
          y: past_dRatio,
          rotation: 90,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: pastYear + "년 이유전 폐사율"
        };

        var trace6 = {
          x: period,
          y: current_gCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 교배복수"
        };
        var trace7 = {
          x: period,
          y: current_bCNT,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 분만복수"
        };
        var trace8 = {
          x: period,
          y: current_weaned,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 이유두수"
        };
        var trace9 = {
          x: period,
          y: current_bRatio,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 분만율"
        };
        var trace10 = {
          x: period,
          y: current_dRatio,
          mode: 'lines+markers',
          marker: {
            size: 8,
            opacity: 0.5
          },
          name: currentYear + "년 이유전 폐사율"
        };

        var dataMap = {
          'gCNT': [trace1, trace6, trace11],
          'bCNT': [trace2, trace7 , trace12],
          'weaned': [trace3, trace8, trace13],
          'bRatio': [trace4, trace9 , trace14],
          'dRatio': [trace5, trace10 , trace15]
        };
        var data = dataMap[checked];

        layout = {
          title: '돼지 사육 동향 ( ' + txt + ' )',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false
        };
        Plotly.newPlot(gd, data, layout);
      }
    });
  }

  function addAnnotation() {
    Meteor.call('CURRENT_WEEK.get', function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let annotation = '현재 ' + result + ' 주차';
        annotationElement.innerHTML += annotation;
      }
    });
  }

  function addInitialPops() {
    Meteor.call('INITIAL_POPS.get', pastYear2, pastYear, currentYear,  function (error, result) {
      if (error) {
        console.log(error);
      } else {

        let pY2 = result[0].YEAR;
        let pY1 = result[1].YEAR;
        let cY = result[2].YEAR;

        let past_initial2 = result[0].VALUE;
        let past_initial = result[1].VALUE;
        let current_initial = result[2].VALUE;

        pastInitYear2.innerHTML = '■ ' + pY2 + ' ( 기초상시모돈';
        pastInitYear1.innerHTML = '■ ' + pY1 + ' ( 기초상시모돈';
        currentInitYear.innerHTML = '■ ' + cY + '( 기초상시모돈';

        pastInitElement2.innerHTML += comma(past_initial2);
        pastInitElement.innerHTML += comma(past_initial);
        currentInitElement.innerHTML += comma(current_initial);
      }
    })
  }


  drawPlot();
  addAnnotation();
  addInitialPops();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
  };

  $('input[name="optradio"]').click(function () {
    drawPlot();
  });

});
