Template.stats_chicken_pops.onRendered(function () {

  let d3 = Plotly.d3;
  let g = d3.select('div[id="plot_1"]');
  let gd = g.node();
  let g2 = d3.select('div[id="plot_2"]');
  let gd2 = g2.node();
  let g3 = d3.select('div[id="plot_3"]');
  let gd3 = g3.node();
  let g4 = d3.select('div[id="plot_4"]');
  let gd4 = g4.node();

  function unitK(x) {
    return Math.round(x / 1000);
  }
  function unit10K(x) {
    return Math.round(x / 10000);
  }
  function unitM(x) {
    return Math.round(x / 1000000);
  }
  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }
  function stringToCount(x) {
    return x + '마리';
  }

  // FREQ 분기 Q
  // ITEM T01 농가수 , T02 마리수 ,
  // C_A 시도별
  // D_B 사육규모별 00 (전체) 05 (1000) 10 (1000~5000)  15(5000~10000) 20 (10000)
  function drawPlot() {

    let time = [];
    let city_farm = [];
    let city_scale = [];
    let scale_under_10000_cnt = [];
    let scale_10000_30000_cnt = [];
    let scale_30000_50000_cnt = [];
    let scale_over_50000_cnt = [];
    let scale_under_10000_farm = [];
    let scale_10000_30000_farm = [];
    let scale_30000_50000_farm = [];
    let scale_over_50000_farm = [];

    let current_City = $('.citySelect option:selected').val();
    let txt = $('.citySelect option:selected').text();

    Meteor.call('chicken_farm_scale_by_city.get', function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let series = result;

        for (i = 0; i < series.length; i++) {
          // 시도별 농가,마리수
          if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
            for (j = 0; j < series[i].Obs.length; j++) {
              city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          //규모별 농가수
          else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "05") {
            for (j = 0; j < series[i].Obs.length; j++) {
              scale_under_10000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "10") {
            for (j = 0; j < series[i].Obs.length; j++) {
              scale_10000_30000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "15") {
            for (j = 0; j < series[i].Obs.length; j++) {
              if (series[i].Obs[j].$.OBS_VALUE === "-") {
                scale_30000_50000_farm[j] = "0";
              } else {
                scale_30000_50000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "20") {
            for (j = 0; j < series[i].Obs.length; j++) {
              if (series[i].Obs[j].$.OBS_VALUE === "-") {
                scale_over_50000_farm[j] = "0";
              } else {
                scale_over_50000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }
        } // for end

        let period = [];
        for (i = 0; i < 5; i++) {
          period[i] = stringToDate(time[i]);
        }
        let trace1_y = [];
        for (i = 0; i < 5; i++) {
          trace1_y[i] = city_farm[i];
        }
        let trace2_y = [];
        for (i = 0; i < 5; i++) {
          trace2_y[i] = unit10K(city_scale[i]);
        }
        let trace_ratio_y = [];
        for (i = 0; i < 5; i++) {
          trace_ratio_y[i] = unitK(parseInt(city_scale[i]) / parseInt(city_farm[i]));
        }
        let trace3_y = [];
        for (i = 0; i < 5; i++) {
          trace3_y[i] = scale_under_10000_farm[i];
        }
        let trace4_y = [];
        for (i = 0; i < 5; i++) {
          trace4_y[i] = scale_10000_30000_farm[i];
        }
        let trace5_y = [];
        for (i = 0; i < 5; i++) {
          trace5_y[i] = scale_30000_50000_farm[i];
        }
        let trace6_y = [];
        for (i = 0; i < 5; i++) {
          trace6_y[i] = scale_over_50000_farm[i];
        }

        let trace1 = {
          x: period,
          y: trace1_y,
          name: '농가수(가구)',
          type: 'bar'
        };
        let trace2 = {
          x: period,
          y: trace2_y,
          name: '사육두수(10,000)',
          type: 'bar'
        };
        let trace_ratio = {
          x: period,
          y: trace_ratio_y,
          name: '가구당 사육두수',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace3 = {
          x: period,
          y: trace3_y,
          name: '10,000 미만',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace4 = {
          x: period,
          y: trace4_y,
          name: '10,000 ~ 30,000',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace5 = {
          x: period,
          y: trace5_y,
          name: '30,000 ~ 50,000',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace6 = {
          x: period,
          y: trace6_y,
          name: '50,000 이상',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        let data = [trace1, trace2];
        let data2 = [trace_ratio];
        let data3 = [trace3, trace4, trace5, trace6];

        let layout = {
          title: txt + ' 닭 사육 동향',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          annotations: [{
            yanchor: 'top',
            y: 1.1,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '가구수, 사육두수(만 마리)',
            showarrow: false,
            font: {
              size: 16
            }
          }],
          barmode: 'group',
          showlegend: false
        };
        Plotly.newPlot(gd, data, layout);

        let layout2 = {
          title: txt + ' 닭 가구당 사육두수 ',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          annotations: [{
            yanchor: 'top',
            y: 1.1,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위 : 천 마리/가구)',
            showarrow: false,
            font: {
              size: 16
            }
          }],
          showlegend: false
        };
        Plotly.newPlot(gd2, data2, layout2);

        let layout3 = {
          title: txt + ' 닭 규모별 가구수 ',
          titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
          },
          annotations: [{
            yanchor: 'top',
            y: 1.1,
            yref: 'paper',
            xanchor: 'right',
            x: 0.98,
            xref: 'paper',
            text: '(단위: 가구)',
            showarrow: false,
            font: {
              size: 16
            }
          }],
          showlegend: false,
        };
        Plotly.newPlot(gd3, data3, layout3);
      }
    });

  }

  drawPlot();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
    Plotly.Plots.resize(gd3);
  };

  $('.citySelect').change(function () {
    drawPlot();
  });

});
