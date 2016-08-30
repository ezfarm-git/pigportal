
Template.stats_pig_grade.onRendered(function () {

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
  var g5 = d3.select('div[id="plot_5"]');
  var gd5 = g5.node();
  var g6 = d3.select('div[id="plot_6"]');
  var gd6 = g6.node();

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

  // 경락가격
  function drawPlot() {

    var price_plus_1_total = [];
    var price_1_total = [];
    var price_2_total = [];
    var price_exc_total = [];

    var price_plus_1_female = [];
    var price_1_female = [];
    var price_2_female = [];
    var price_exc_female = [];

    var price_plus_1_neuter = [];
    var price_1_neuter = [];
    var price_2_neuter = [];
    var price_exc_neuter = [];

    var start = moment($('#datepicker1').val()).format('YYYYMM');
    var end = moment($('#datepicker2').val()).format('YYYYMM');

    Meteor.call('pig_price_by_grade.get', start, end, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        Session.setPersistent('pig_price', res);
        var series = Session.get('pig_price');

        //   월 : M
        //  항목: 13103112724T1	경락가격
        //  성별 : 13102112724A.001 전체  13102112724A.002 암  13102112724A.003	수   13102112724A.004	거세
        //  등급 : 13102112724B.018 1+   13102112724B.019 1    13102112724B.020	2      13102112724B.021	등외

        for (i = 0; i < series.length; i++) {
          // 전체
          if (series[i].$.C_13101112724A === "13102112724A_001" && series[i].$.C_13101112724B === "13102112724B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              price_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_001" && series[i].$.C_13101112724B === "13102112724B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_001" && series[i].$.C_13101112724B === "13102112724B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_001" && series[i].$.C_13101112724B === "13102112724B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_exc_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          // 암 등급별
          else if (series[i].$.C_13101112724A === "13102112724A_002" && series[i].$.C_13101112724B === "13102112724B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_plus_1_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_002" && series[i].$.C_13101112724B === "13102112724B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_1_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_002" && series[i].$.C_13101112724B === "13102112724B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_2_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_002" && series[i].$.C_13101112724B === "13102112724B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_exc_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          // 거세
          else if (series[i].$.C_13101112724A === "13102112724A_004" && series[i].$.C_13101112724B === "13102112724B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_plus_1_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_004" && series[i].$.C_13101112724B === "13102112724B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_1_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_004" && series[i].$.C_13101112724B === "13102112724B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_2_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112724A === "13102112724A_004" && series[i].$.C_13101112724B === "13102112724B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              price_exc_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
        } //for end

        for (i = 0; i < time.length; i++) {
          period[i] = stringToDate(time[i]);
        }

        // 경락가격
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
          y: price_exc_total,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };
        var trace5 = {
          x: period,
          y: price_plus_1_female,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace6 = {
          x: period,
          y: price_1_female,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace7 = {
          x: period,
          y: price_2_female,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace8 = {
          x: period,
          y: price_exc_female,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };
        var trace13 = {
          x: period,
          y: price_plus_1_neuter,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace14 = {
          x: period,
          y: price_1_neuter,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace15 = {
          x: period,
          y: price_2_neuter,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace16 = {
          x: period,
          y: price_exc_neuter,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };

        var p_data = [trace1, trace2, trace3, trace4];
        var p_data2 = [trace5, trace6, trace7, trace8];
        var p_data4 = [trace13, trace14, trace15, trace16];

        var layout = {
          title: '경락가격 (전체)',
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
          title: '경락가격 (암)',
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
        Plotly.newPlot(gd3, p_data2, layout2);

        var layout3 = {
          title: '경락가격 (거세)',
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
        Plotly.newPlot(gd5, p_data4, layout3);
      } // else end
    }); // method call end

  } // drowplot end

  function drawPlot2() {

    // 판정두수
    var quantity_plus_1_total = [];
    var quantity_1_total = [];
    var quantity_2_total = [];
    var quantity_exc_total = [];

    var quantity_plus_1_female = [];
    var quantity_1_female = [];
    var quantity_2_female = [];
    var quantity_exc_female = [];

    var quantity_plus_1_neuter = [];
    var quantity_1_neuter = [];
    var quantity_2_neuter = [];
    var quantity_exc_neuter = [];

    var start = moment($('#datepicker1').val()).format('YYYYMM');
    var end = moment($('#datepicker2').val()).format('YYYYMM');

    Meteor.call('pig_quantity_by_grade.get', start, end, function (error, res) {
      if (error) {
        console.log(error);
      } else {
        Session.setPersistent('pig_quantity', res);
        var series = Session.get('pig_quantity');

        //   월 : M
        //  항목: 13103112722T1	판정두수
        //  성별 : 13102112722A_.001 전체  13102112722A_002 암  13102112722A_003	수  13102112722A_004	거세
        //  등급 :13102112722B_018 1+   13102112722B_019 1    13102112722B_020	2      13102112722B_021	등외
        //  단위 : 14STD043555 두

        // 전체
        for (i = 0; i < series.length; i++) {
          if (series[i].$.C_13101112722A === "13102112722A_001" && series[i].$.C_13101112722B === "13102112722B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              quantity_plus_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_001" && series[i].$.C_13101112722B === "13102112722B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_001" && series[i].$.C_13101112722B === "13102112722B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_001" && series[i].$.C_13101112722B === "13102112722B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_exc_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          // 암 등급별
          else if (series[i].$.C_13101112722A === "13102112722A_002" && series[i].$.C_13101112722B === "13102112722B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_plus_1_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_002" && series[i].$.C_13101112722B === "13102112722B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_1_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_002" && series[i].$.C_13101112722B === "13102112722B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_2_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_002" && series[i].$.C_13101112722B === "13102112722B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_exc_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          // 거세
          else if (series[i].$.C_13101112722A === "13102112722A_004" && series[i].$.C_13101112722B === "13102112722B_018") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_plus_1_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_004" && series[i].$.C_13101112722B === "13102112722B_019") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_1_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_004" && series[i].$.C_13101112722B === "13102112722B_020") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_2_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_13101112722A === "13102112722A_004" && series[i].$.C_13101112722B === "13102112722B_021") {
            for (j = 0; j < series[i].Obs.length; j++) {
              quantity_exc_neuter[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }

        } //for end

        var period = [];
        for (i = 0; i < time.length; i++) {
          period[i] = stringToDate(time[i]);
        }

        var trace1 = {
          x: period,
          y: quantity_plus_1_total,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace2 = {
          x: period,
          y: quantity_1_total,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace3 = {
          x: period,
          y: quantity_2_total,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace4 = {
          x: period,
          y: quantity_exc_total,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };
        //
        var trace5 = {
          x: period,
          y: quantity_plus_1_female,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace6 = {
          x: period,
          y: quantity_1_female,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace7 = {
          x: period,
          y: quantity_2_female,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace8 = {
          x: period,
          y: quantity_exc_female,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };

        var trace13 = {
          x: period,
          y: quantity_plus_1_neuter,
          name: '1+ 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace14 = {
          x: period,
          y: quantity_1_neuter,
          name: '1 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace15 = {
          x: period,
          y: quantity_2_neuter,
          name: '2 등급',
          type: 'lines',
          connectgaps: true,
        };
        var trace16 = {
          x: period,
          y: quantity_exc_neuter,
          name: '등외',
          type: 'lines',
          connectgaps: true,
        };

        var q_data = [trace1, trace2, trace3, trace4];
        var q_data2 = [trace5, trace6, trace7, trace8];
        var q_data4 = [trace13, trace14, trace15, trace16];

        var layout = {
          title: '판정두수 (전체)',
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
        Plotly.newPlot(gd2, q_data, layout);

        var layout2 = {
          title: '판정두수 (암)',
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
        Plotly.newPlot(gd4, q_data2, layout2);

        var layout3 = {
          title: '판정두수 (거세)',
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
        Plotly.newPlot(gd6, q_data4, layout3);
      } // else end
    }); // method call end

  } // drawPlot2

  drawPlot();
  drawPlot2();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
    Plotly.Plots.resize(gd3);
    Plotly.Plots.resize(gd4);
    Plotly.Plots.resize(gd5);
    Plotly.Plots.resize(gd6);
  };

  $('.options_div').change(function () {
    drawPlot();
    drawPlot2();
  });

});
