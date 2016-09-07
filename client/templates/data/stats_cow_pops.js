Template.stats_cow_pops.onRendered(function () {

  let d3 = Plotly.d3;
  let g = d3.select('div[id="plot_1"]');
  let gd = g.node();
  let g2 = d3.select('div[id="plot_2"]');
  let gd2 = g2.node();
  let g3 = d3.select('div[id="plot_3"]');
  let gd3 = g3.node();

  function unitH(x) {
    return Math.round(x / 100);
  }

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  function drawPlot() {

    let current_City = $('.citySelect option:selected').val();
    let txt = $('.citySelect option:selected').text();
    let cow = $('input:radio[name="optradio"]:checked').next('label').text();
    let cowClass = $('input:radio[name="optradio"]:checked').val();

    let time = [];
    let city_farm = [];
    let city_scale = [];
    let scale_under_20_farm = [];
    let scale_20_50_farm = [];
    let scale_50_100_farm = [];
    let scale_over_100_farm = [];

    if (cowClass === 'korean') {
      Meteor.call('hanwoo_farm_scale_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          // Q 분기 ,  T01 농가수 , T02 마리수 , 사육규모 00 (전체) 05 (20미만) 10 (20~50)  15(50~100) 20 (100이상)

          for (i = 0; i < series.length; i++) {
            // 가구
            if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
                time[j] = series[i].Obs[j].$.TIME_PERIOD;
              }
            }
            //마리수
            else if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
            //규모별 농가수
            else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "05") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_under_20_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "10") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_20_50_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "15") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_50_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "20") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_over_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }

          let period = [];
          for (i = 0; i < 5; i++) {
            period[i] = stringToDate(time[i]);
          }
          let trace1_y = [];
          for (i = 0; i < 5; i++) {
            trace1_y[i] = unitH(city_farm[i]);
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
            trace3_y[i] = scale_under_20_farm[i];
          }
          let trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = scale_20_50_farm[i];
          }
          let trace5_y = [];
          for (i = 0; i < 5; i++) {
            trace5_y[i] = scale_50_100_farm[i];
          }
          let trace6_y = [];
          for (i = 0; i < 5; i++) {
            trace6_y[i] = scale_over_100_farm[i];
          }

          let trace1 = {
            x: period,
            y: trace1_y,
            name: '농가수(백 가구)',
            type: 'bar'
          };
          let trace2 = {
            x: period,
            y: trace2_y,
            name: '사육마리수(천 마리)',
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
            name: '20 두 미만',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace4 = {
            x: period,
            y: trace4_y,
            name: '20 ~ 50 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace5 = {
            x: period,
            y: trace5_y,
            name: '50 ~ 100 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace6 = {
            x: period,
            y: trace6_y,
            name: '100 두 이상',
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
            title: txt + ' ' + cow + ' 사육 동향',
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
              text: '농가수(백 가구), 사육두수(천 마리)',
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
            title: txt + ' ' + cow + ' 가구당 사육두수',
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
            title: txt + ' ' + cow + ' 규모별 가구수',
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
    } else if (cowClass === 'beef') {
      Meteor.call('yukwoo_farm_scale_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          // Q 분기 ,  T01 농가수 , T02 마리수 , 사육규모 00 (전체) 05 (20미만) 10 (20~50)  15(50~100) 20 (100이상)

          for (i = 0; i < series.length; i++) {
            // 가구
            if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
                time[j] = series[i].Obs[j].$.TIME_PERIOD;
              }
            }
            //마리수
            else if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
            //규모별 농가수
            else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "05") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_under_20_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "10") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_20_50_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "15") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_50_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "20") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_over_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }

          let period = [];
          for (i = 0; i < 5; i++) {
            period[i] = stringToDate(time[i]);
          }
          let trace1_y = [];
          for (i = 0; i < 5; i++) {
            trace1_y[i] = unitH(city_farm[i]);
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
            trace3_y[i] = scale_under_20_farm[i];
          }
          let trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = scale_20_50_farm[i];
          }
          let trace5_y = [];
          for (i = 0; i < 5; i++) {
            trace5_y[i] = scale_50_100_farm[i];
          }
          let trace6_y = [];
          for (i = 0; i < 5; i++) {
            trace6_y[i] = scale_over_100_farm[i];
          }

          let trace1 = {
            x: period,
            y: trace1_y,
            name: '농가수(백 가구)',
            type: 'bar'
          };
          let trace2 = {
            x: period,
            y: trace2_y,
            name: '사육마리수(천 마리)',
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
            name: '20 두 미만',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace4 = {
            x: period,
            y: trace4_y,
            name: '20 ~ 50 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace5 = {
            x: period,
            y: trace5_y,
            name: '50 ~ 100 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace6 = {
            x: period,
            y: trace6_y,
            name: '100 두 이상',
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
            title: txt + ' ' + cow + ' 사육 동향',
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
              text: '농가수(백 가구), 사육두수(천 마리)',
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
            title: txt + ' ' + cow + ' 가구당 사육두수',
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
            title: txt + ' ' + cow + ' 규모별 가구수',
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
    } else if (cowClass === 'dairy') {
      Meteor.call('dariy_farm_scale_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          // Q 분기 ,  T01 농가수 , T02 마리수 , 사육규모 00 (전체) 05 (20미만) 10 (20~50)  15(50~100) 20 (100이상)

          for (i = 0; i < series.length; i++) {
            // 가구
            if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
                time[j] = series[i].Obs[j].$.TIME_PERIOD;
              }
            }
            //마리수
            else if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_B === "00") {
              for (j = 0; j < series[i].Obs.length; j++) {
                city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
            //규모별 농가수
            else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "05") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_under_20_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "10") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_20_50_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "15") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_50_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === current_City && series[i].$.C_B === "20") {
              for (j = 0; j < series[i].Obs.length; j++) {
                scale_over_100_farm[j] = series[i].Obs[j].$.OBS_VALUE;
              }
            }
          }

          let period = [];
          for (i = 0; i < 5; i++) {
            period[i] = stringToDate(time[i]);
          }
          let trace1_y = [];
          for (i = 0; i < 5; i++) {
            trace1_y[i] = unitH(city_farm[i]);
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
            trace3_y[i] = scale_under_20_farm[i];
          }
          let trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = scale_20_50_farm[i];
          }
          let trace5_y = [];
          for (i = 0; i < 5; i++) {
            trace5_y[i] = scale_50_100_farm[i];
          }
          let trace6_y = [];
          for (i = 0; i < 5; i++) {
            trace6_y[i] = scale_over_100_farm[i];
          }

          let trace1 = {
            x: period,
            y: trace1_y,
            name: '농가수(백 가구)',
            type: 'bar'
          };
          let trace2 = {
            x: period,
            y: trace2_y,
            name: '사육마리수(천 마리)',
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
            name: '20 두 미만',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace4 = {
            x: period,
            y: trace4_y,
            name: '20 ~ 50 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace5 = {
            x: period,
            y: trace5_y,
            name: '50 ~ 100 두',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          let trace6 = {
            x: period,
            y: trace6_y,
            name: '100 두 이상',
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
            title: txt + ' ' + cow + ' 사육 동향',
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
              text: '농가수(백 가구), 사육두수(천 마리)',
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
            title: txt + ' ' + cow + ' 가구당 사육두수',
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
            title: txt + ' ' + cow + ' 규모별 가구수',
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
    }
  }

  drawPlot();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
    Plotly.Plots.resize(gd3);
  };

  $('input:radio[name="optradio"]').change(function () {
    drawPlot();
  });

  $('.citySelect').change(function () {
    drawPlot();
  });

});
