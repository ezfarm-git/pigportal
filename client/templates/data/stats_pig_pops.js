Template.stats_pig_pops.onRendered(function () {

  let d3 = Plotly.d3;
  let g = d3.select('div[id="plot_1"]');
  let gd = g.node();
  let g2 = d3.select('div[id="plot_2"]');
  let gd2 = g2.node();
  let g3 = d3.select('div[id="plot_3"]');
  let gd3 = g3.node();
  // let g4 = d3.select('div[id="plot_4"]');
  // let gd4 = g4.node();

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function unit10K(x) {
    return Math.round(x / 10000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  // Q 분기 ,
  // ITEM T01 농가수 , T02 마리수 ,
  // C_A 시도별
  // C_B 사육규모 00 (전체) 05 (1000) 10 (1000~5000)  15(5000~10000) 20 (10000)
  function drawPlot() {

    Session.setPersistent('notComplete', true);
    console.log(Session.get('notComplete'));

    let current_City = $('.citySelect option:selected').val();
    let txt = $('.citySelect option:selected').text();

    Meteor.call('pig_farm_scale_by_city.get', function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let series = result;

        let time = [];
        let city_farm = [];
        let city_scale = [];
        let scale_under_1000_cnt = [];
        let scale_1000_5000_cnt = [];
        let scale_5000_10000_cnt = [];
        let scale_over_10000_cnt = [];
        let scale_under_1000_farm = [];
        let scale_1000_5000_farm = [];
        let scale_5000_10000_farm = [];
        let scale_over_10000_farm = [];

        for (i = 0; i < series.length; i++) {
          // 농가수
          if (series[i].$.C_A === current_City && series[i].$.C_B === "00" && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          //마리수
          else if (series[i].$.C_A === current_City && series[i].$.C_B === "00" && series[i].$.ITEM === "T02") {
            for (j = 0; j < series[i].Obs.length; j++) {
              city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
          // 규모별 농가수
          else if (series[i].$.C_A === current_City && series[i].$.C_B === "05" && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              scale_under_1000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.C_B === "10" && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              scale_1000_5000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.C_B === "15" && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              if (series[i].Obs[j].$.OBS_VALUE === "-") {
                scale_5000_10000_farm[j] = "0";
              } else
                scale_5000_10000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.C_B === "20" && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              if (series[i].Obs[j].$.OBS_VALUE === "-") {
                scale_over_10000_farm[j] = "0";
              } else
                scale_over_10000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
        }

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
          trace2_y[i] = unitK(city_scale[i]);
        }
        let trace_ratio_y = [];
        for (i = 0; i < 5; i++) {
          trace_ratio_y[i] = Math.round(parseInt(city_scale[i]) / parseInt(city_farm[i]));
        }
        let trace3_y = [];
        for (i = 0; i < 5; i++) {
          trace3_y[i] = scale_under_1000_farm[i];
        }
        let trace4_y = [];
        for (i = 0; i < 5; i++) {
          trace4_y[i] = scale_1000_5000_farm[i];
        }
        let trace5_y = [];
        for (i = 0; i < 5; i++) {
          trace5_y[i] = scale_5000_10000_farm[i];
        }
        let trace6_y = [];
        for (i = 0; i < 5; i++) {
          trace6_y[i] = scale_over_10000_farm[i];
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
          name: '사육두수(천 마리)',
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
          name: '1,000 두 미만',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace4 = {
          x: period,
          y: trace4_y,
          name: '1,000 ~ 5,000 두',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace5 = {
          x: period,
          y: trace5_y,
          name: '5,000 ~ 10,000 두',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace6 = {
          x: period,
          y: trace6_y,
          name: '10,000 두 이상',
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
          title: txt + ' 돼지 사육 동향',
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
            text: '농가수(가구), 사육두수(천 마리)',
            showarrow: false,
            font: {
              size: 14
            }
          }],
          barmode: 'group',
          showlegend: false
        };
        Plotly.newPlot(gd, data, layout);

        let layout2 = {
          title: txt + ' 가구당 사육두수',
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
            text: '(단위: 마리/가구)',
            showarrow: false,
            font: {
              size: 14
            }
          }],
          showlegend: false
        };
        Plotly.newPlot(gd2, data2, layout2);

        let layout3 = {
          title: txt + ' 규모별 가구수',
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
              size: 14
            }
          }],
          showlegend: false,
        };
        Plotly.newPlot(gd3, data3, layout3);
      }
    });
    Session.setPersistent('notComplete', false);
    console.log(Session.get('notComplete'));
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

Template.stats_pig_pops.helpers({
  notComplete: function() {
    return Session.get('notComplete');
  }
});
