Template.stats_cow_grade.onRendered(function () {

  var time = [];
  var period = [];

  var d3 = Plotly.d3;
  var g = d3.select('div[id="plot_1"]');
  var gd = g.node();
  var g2 = d3.select('div[id="plot_2"]');
  var gd2 = g2.node();
  var g3 = d3.select('div[id="plot_3"]');
  var gd3 = g3.node();
  var g4 = d3.select('div[id="plot_4"]');
  var gd4 = g4.node();

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(5, 7) + '월';
  }

  var today = new Date();
  var startPrd = new Date();
  var endPrd = new Date();

  startPrd.setFullYear(today.getFullYear() - 1);
  startPrd.setMonth(today.getMonth() - 2);
  endPrd.setMonth(today.getMonth() - 2);

  document.getElementById("datepicker1").value = moment(new Date(startPrd)).format('YYYY-MM');
  document.getElementById("datepicker2").value = moment(new Date(endPrd)).format('YYYY-MM');

  // 경락가격 , 두수
  function drawPlot(cow) {

    var setCow = cow;

    var price_two_plus_1_total = [];
    var price_plus_1_total = [];
    var price_1_total = [];
    var price_2_total = [];
    var price_3_total = [];

    var count_two_plus_1_total = [];
    var count_plus_1_total = [];
    var count_1_total = [];
    var count_2_total = [];
    var count_3_total = [];

    var start = moment($('#datepicker1').val()).format('YYYYMM');
    var end = moment($('#datepicker2').val()).format('YYYYMM');

    Meteor.call('cow_grade_by_quality.get', start, end, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        Session.setPersistent('cow_quality', res);
        var series = Session.get('cow_quality');

        //   월 : M
        //  항목 : 	13103112719T1	두수 / 13103112719T2 경락가격
        //  품종 : 	13102112719A_001	소전체 / 13102112719A_002	한우 / 13102112719A_003	젖소 / 13102112719A_004	육우
        //  등급 : 13101112719B_001	1++ / 13101112719B_002	1+ / 13101112719B_003	1 / 13101112719B_004	2 / 13101112719B_005	3
        // 도매시장별 : C_13101112719C_001	계
        // 단위 : 14STD05638 원/㎏   /  14STD04355	두

        for (i = 0; i < series.length; i++) {
          if (series[i].$.C_13101112719A === setCow && series[i].$.C_13101112719B === "13102112719B_001" && series[i].$.C_13101112719C === "13102112719C_001") {
            if (series[i].$.ITEM === "13103112719T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  price_two_plus_1_total[j] = "0";
                } else {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  price_two_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else if (series[i].$.ITEM === "13103112719T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  count_two_plus_1_total[j] = "0";
                } else {
                  count_two_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }
          } else if (series[i].$.C_13101112719A === setCow && series[i].$.C_13101112719B === "13102112719B_002" && series[i].$.C_13101112719C === "13102112719C_001") {
            if (series[i].$.ITEM === "13103112719T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  price_plus_1_total[j] = "0";
                } else {
                  price_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else if (series[i].$.ITEM === "13103112719T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  count_plus_1_total[j] = "0";
                } else {
                  count_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }

          } else if (series[i].$.C_13101112719A === setCow && series[i].$.C_13101112719B === "13102112719B_003" && series[i].$.C_13101112719C === "13102112719C_001") {
            if (series[i].$.ITEM === "13103112719T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  price_1_total[j] = "0";
                } else {
                  price_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else if (series[i].$.ITEM === "13103112719T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                if (series[i].Obs[j].$.OBS_VALUE === "-") {
                  count_1_total[j] = "0";
                } else {
                  count_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }
          } else if (series[i].$.C_13101112719A === setCow && series[i].$.C_13101112719B === "13102112719B_004" && series[i].$.C_13101112719C === "13102112719C_001") {
            if (series[i].$.ITEM === "13103112719T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                price_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "13103112719T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                count_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          } else if (series[i].$.C_13101112719A === setCow && series[i].$.C_13101112719B === "13102112719B_005" && series[i].$.C_13101112719C === "13102112719C_001") {

            if (series[i].$.ITEM === "13103112719T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                price_3_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "13103112719T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                count_3_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }
        } //for end

        for (i = 0; i < time.length; i++) {
          period[i] = stringToDate(time[i]);
        }

        // 경락가격
        var trace0 = {
          x: period,
          y: price_two_plus_1_total,
          name: '1++ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace1 = {
          x: period,
          y: price_plus_1_total,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace2 = {
          x: period,
          y: price_1_total,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace3 = {
          x: period,
          y: price_2_total,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace4 = {
          x: period,
          y: price_3_total,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };
        // 두수
        var trace5 = {
          x: period,
          y: count_two_plus_1_total,
          name: '1++ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace6 = {
          x: period,
          y: count_plus_1_total,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace7 = {
          x: period,
          y: count_1_total,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace8 = {
          x: period,
          y: count_2_total,
          name: '2등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace9 = {
          x: period,
          y: count_3_total,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };

        var p_data = [trace0, trace1, trace2, trace3, trace4];
        var c_data = [trace5, trace6, trace7, trace8, trace9];

        var layout = {
          title: txt + '경락가격 (육질)',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false,
          annotations: [{
            yanchor: 'top',
            y: 1.05,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위: 원 / Kg)',
            showarrow: false,
            font: {
              size: 15
            },
          }]
        };
        Plotly.newPlot(gd, p_data, layout);

        var layout2 = {
          title: txt + '판정두수 (육질)',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false,
          annotations: [{
            yanchor: 'top',
            y: 1.05,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위: 마리)',
            showarrow: false,
            font: {
              size: 15
            },
          }]
        };
        Plotly.newPlot(gd2, c_data, layout2);

      } // else end
    }); // method call end

  } // drowplot end

  function drawPlot2(cow) {

    // 판정두수
    var setCow = cow;

    var price_A_total = [];
    var price_B_total = [];
    var price_C_total = [];

    var count_A_total = [];
    var count_B_total = [];
    var count_C_total = [];

    var start = moment($('#datepicker1').val()).format('YYYYMM');
    var end = moment($('#datepicker2').val()).format('YYYYMM');

    Meteor.call('cow_grade_by_quantity.get', start, end, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        Session.setPersistent('cow_quantity', res);
        var series = Session.get('cow_quantity');

        for (i = 0; i < series.length; i++) {

          if (series[i].$.C_13101112720A === setCow && series[i].$.C_13101112720B === "13102112720B_001" && series[i].$.C_13101112720C === "13102112720C_001") {
            if (series[i].$.ITEM === "13103112720T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                time[j] = series[i].Obs[j].$.TIME_PERIOD;
                price_A_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "13103112720T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                time[j] = series[i].Obs[j].$.TIME_PERIOD;
                count_A_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }

          } else if (series[i].$.C_13101112720A === setCow && series[i].$.C_13101112720B === "13102112720B_002" && series[i].$.C_13101112720C === "13102112720C_001") {
            if (series[i].$.ITEM === "13103112720T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                price_B_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "13103112720T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                count_B_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }

          } else if (series[i].$.C_13101112720A === setCow && series[i].$.C_13101112720B === "13102112720B_003" && series[i].$.C_13101112720C === "13102112720C_001") {
            if (series[i].$.ITEM === "13103112720T2") {
              for (j = 0; j < series[i].Obs.length; j++) {
                price_C_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "13103112720T1") {
              for (j = 0; j < series[i].Obs.length; j++) {
                count_C_total[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }
        } //for end

        var period = [];
        for (i = 0; i < time.length; i++) {
          period[i] = stringToDate(time[i]);
        }

        // 경락가격
        var trace0 = {
          x: period,
          y: price_A_total,
          name: 'A 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace1 = {
          x: period,
          y: price_B_total,
          name: 'B 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace2 = {
          x: period,
          y: price_C_total,
          name: 'C 등급',
          type: 'lines',
          connectgaps: true,
        };

        // 두수
        var trace5 = {
          x: period,
          y: count_A_total,
          name: 'A 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace6 = {
          x: period,
          y: count_B_total,
          name: 'B 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace7 = {
          x: period,
          y: count_C_total,
          name: 'C 등급',
          type: 'lines',
          connectgaps: true,
        };

        var p_data = [trace0, trace1, trace2];
        var c_data = [trace5, trace6, trace7];

        var layout = {
          title: txt + '경락가격 (육량)',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false,
          annotations: [{
            yanchor: 'top',
            y: 1.05,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위: 원 / Kg)',
            showarrow: false,
            font: {
              size: 15
            },
          }]
        };
        Plotly.newPlot(gd3, p_data, layout);

        var layout2 = {
          title: txt + '판정두수 (육량)',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          showlegend: false,
          annotations: [{
            yanchor: 'top',
            y: 1.05,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위: 마리)',
            showarrow: false,
            font: {
              size: 15
            },
          }]
        };
        Plotly.newPlot(gd4, c_data, layout2);

      } // else end
    }); // method call end

  } // drawPlot2

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
    Plotly.Plots.resize(gd3);
    Plotly.Plots.resize(gd4);

  };

  var txt = "전체 ";
  var setCow = "13102112719A_001";
  drawPlot(setCow);
  var setCow2 = "13102112720A_001"
  drawPlot2(setCow2);

  $('input:radio[name="name"]').change(function () {
    if (this.value === "total") {
      txt = "전체 ";
      setCow = "13102112719A_001";
      setCow2 = "13102112720A_001";
      drawPlot(setCow);
      drawPlot2(setCow2);
    } else if (this.value === "korean") {
      txt = "한우 ";
      setCow = "13102112719A_002";
      setCow2 = "13102112720A_002";
      drawPlot(setCow);
      drawPlot2(setCow2);

    } else if (this.value === "beef") {
      txt = "육우 ";
      setCow = "13102112719A_003";
      setCow2 = "13102112720A_003";
      drawPlot(setCow);
      drawPlot2(setCow2);
    } else if (this.value === "dairy") {
      txt = "젖소 ";
      setCow = "13102112719A_004";
      setCow2 = "13102112720A_004";
      drawPlot(setCow);
      drawPlot2(setCow2);
    }
  });

  $('.options_div').change(function () {
    drawPlot(setCow);
    drawPlot2(setCow2);
  });

});
