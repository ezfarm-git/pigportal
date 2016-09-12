
Template.product.onRendered(function () {

  let d3 = Plotly.d3;
  let gd3 = d3.select('div[id="plot_1"]');
  let gd = gd3.node();
  let annotationElement = document.getElementById('annotation');

  let today = new Date();
  let currentYear = today.getFullYear();
  let pastYear = currentYear - 1;

  function stringToWeek(x) {
    return x + '주';
  }

  let txtMap = {
    'gCNT': '교배복수',
    'bCNT': '분만복수',
    'weaned': '이유두수',
    'bRatio': '분만율',
    'dRatio': '이유전 폐사율'
  };

  function drawPlot() {
    Meteor.call('TWO_YEARS.get', pastYear, currentYear, function (error, result) {
      if (error) {
        console.log(error);
      } else {
        var twoYears = result;

        var checked = $('input[name="optradio"]:checked').val();
        var txt = txtMap[checked];

        var week1 = [],
          week2 = [];

        var past_gCNT = [],
          past_bCNT = [],
          past_weaned = [],
          past_bRatio = [],
          past_dRatio = [],
          current_gCNT = [],
          current_bCNT = [],
          current_weaned = [],
          current_bRatio = [],
          current_dRatio = [];

        for (var i = 0; i < twoYears.length; i++) {
          if (twoYears[i].YEAR === pastYear.toString()) {
            if (twoYears[i].GUBUN === 'G_CNT') {
              past_gCNT.push(twoYears[i].VALUE);
              week1.push(twoYears[i].WEEK);
            } else if (twoYears[i].GUBUN === "B_CNT") {
              past_bCNT.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "EU_DUSU") {
              past_weaned.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "B_RATIO") {
              past_bRatio.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "PAESA") {
              past_dRatio.push(twoYears[i].VALUE);
            }
          } else {
            if (twoYears[i].GUBUN === "G_CNT") {
              current_gCNT.push(twoYears[i].VALUE);
              week2.push(twoYears[i].WEEK);
            } else if (twoYears[i].GUBUN === "B_CNT") {
              current_bCNT.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "EU_DUSU") {
              current_weaned.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "B_RATIO") {
              current_bRatio.push(twoYears[i].VALUE);
            } else if (twoYears[i].GUBUN === "PAESA") {
              current_dRatio.push(twoYears[i].VALUE);
            }
          }
        }

        for (i = 0; i < 1; i++) {
          current_bCNT.pop();
          current_gCNT.pop();
          current_weaned.pop();
          current_bRatio.pop();
          current_dRatio.pop();
        }

        var period = [];
        for (i = 0; i < 52; i++) {
          period[i] = stringToWeek(week1[i]);
        }

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
          'gCNT': [trace1, trace6],
          'bCNT': [trace2, trace7],
          'weaned': [trace3, trace8],
          'bRatio': [trace4, trace9],
          'dRatio': [trace5, trace10]
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

  drawPlot();
  addAnnotation();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
  };

  $('input[name="optradio"]').click(function () {
    drawPlot();
  });

});
