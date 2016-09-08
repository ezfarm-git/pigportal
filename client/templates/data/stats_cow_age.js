
Template.stats_cow_age.onRendered(function () {

  var d3 = Plotly.d3;
  var g = d3.select('div[id="plot_1"]');
  var gd = g.node();
  var g2 = d3.select('div[id="plot_2"]');
  var gd2 = g2.node();

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  // FREQ (분기) : Q
  // ITEM : T01합계  /  T02 1세미만 /  T03	1~2세  /  T04	2세이상
  // C_A (시도별)
  // C_D (성별): 0 합계 /   1 암컷 /  2 수컷
  // UNIT (단위):	14STD04410 마리
  function drawPlot() {

    var time = [];
    var age_total = [];
    var age_under_1_total = [];
    var age_1_2_total = [];
    var age_over_2_total = [];

    var current_City = $('.citySelect option:selected').val();
    var txt = $('.citySelect option:selected').text();
    var cow = $('input:radio[name="optradio"]:checked').next('label').text();
    let cowClass = $('input:radio[name="optradio"]:checked').val();

    if (cowClass === 'korean') {
      Meteor.call('hanwoo_age_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          for (i = 0; i < series.length; i++) {

            if (series[i].$.C_D) {
              // 모든 연령별 성별 전체
              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else {

              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = "0";
                  } else {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                  }
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_1_2_total[j] = "0";
                  } else
                    age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_over_2_total[j] = "0";
                  } else
                    age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }
          } //for end

          var period = [];
          for (i = 0; i < time.length; i++) {
            period[i] = stringToDate(time[i]);
          }

          var trace2_y = [];
          for (i = 0; i < 5; i++) {
            trace2_y[i] = unitK(Number(age_under_1_total[i]));
          }
          var trace3_y = [];
          for (i = 0; i < 5; i++) {
            trace3_y[i] = unitK(Number(age_1_2_total[i]));
          }
          var trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = unitK(Number(age_over_2_total[i]));
          }

          var total_stack = [];
          for (i = 0; i < 5; i++) {
            total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i];
          }

          var percent1 = [];
          var percent2 = [];
          var percent3 = [];

          for (var i = 0; i < 5; i++) {
            percent1[i] = trace2_y[i] / total_stack[i] * 100;
            if (percent1[i] <= 10) {
              percent1[i] = " ";
            } else {
              percent1[i] = Math.round(percent1[i] * 10) / 10 + '%';
            }
            percent2[i] = trace3_y[i] / total_stack[i] * 100;
            if (percent2[i] <= 10) {
              percent2[i] = " ";
            } else {
              percent2[i] = Math.round(percent2[i] * 10) / 10 + '%';
            }
            percent3[i] = trace4_y[i] / total_stack[i] * 100;
            if (percent3[i] <= 10) {
              percent3[i] = " ";
            } else {
              percent3[i] = Math.round(percent3[i] * 10) / 10 + '%';
            }
          }

          // lines

          var trace2 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace3 = {
            x: period,
            y: trace3_y,
            name: '1~2세 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace4 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace6 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'bar',
          };
          var trace7 = {
            x: period,
            y: trace3_y,
            name: '1~2세',
            type: 'bar',
          };
          var trace8 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'bar',
          };

          var data = [trace2, trace3, trace4];
          var data2 = [trace6, trace7, trace8];

          var layout = {
            title: txt + ' ' + cow + ' 연령별 사육 동향',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'group',
            showlegend: false
          };
          Plotly.newPlot(gd, data, layout);

          var layout2 = {
            title: txt + ' ' + cow + ' 연령별 사육 비율',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'stack',
            showlegend: false
          };

          // percentage
          for (var i = 0; i < period.length; i++) {
            var add_annotation = {
              x: period[i],
              y: total_stack[i],
              text: total_stack[i],
              xanchor: 'center',
              yanchor: 'top',
              xref: 'x',
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: -20,
              font: {
                size: 13,
              }
            };
            var add_annotation1 = {
              x: period[i],
              y: trace2_y[i],
              text: percent1[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation2 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i],
              text: percent2[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation3 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i] + trace4_y[i],
              text: percent3[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };

            layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3);
          }
          Plotly.newPlot(gd2, data2, layout2);
        }
      });
    } else if (cowClass === 'beef') {
      Meteor.call('yukwoo_age_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          for (i = 0; i < series.length; i++) {

            if (series[i].$.C_D) {
              // 모든 연령별 성별 전체
              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else {

              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = "0";
                  } else {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                  }
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_1_2_total[j] = "0";
                  } else
                    age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_over_2_total[j] = "0";
                  } else
                    age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }
          } //for end

          var period = [];
          for (i = 0; i < time.length; i++) {
            period[i] = stringToDate(time[i]);
          }

          var trace2_y = [];
          for (i = 0; i < 5; i++) {
            trace2_y[i] = unitK(Number(age_under_1_total[i]));
          }
          var trace3_y = [];
          for (i = 0; i < 5; i++) {
            trace3_y[i] = unitK(Number(age_1_2_total[i]));
          }
          var trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = unitK(Number(age_over_2_total[i]));
          }

          var total_stack = [];
          for (i = 0; i < 5; i++) {
            total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i];
          }

          var percent1 = [];
          var percent2 = [];
          var percent3 = [];

          for (var i = 0; i < 5; i++) {
            percent1[i] = trace2_y[i] / total_stack[i] * 100;
            if (percent1[i] <= 10) {
              percent1[i] = " ";
            } else {
              percent1[i] = Math.round(percent1[i] * 10) / 10 + '%';
            }
            percent2[i] = trace3_y[i] / total_stack[i] * 100;
            if (percent2[i] <= 10) {
              percent2[i] = " ";
            } else {
              percent2[i] = Math.round(percent2[i] * 10) / 10 + '%';
            }
            percent3[i] = trace4_y[i] / total_stack[i] * 100;
            if (percent3[i] <= 10) {
              percent3[i] = " ";
            } else {
              percent3[i] = Math.round(percent3[i] * 10) / 10 + '%';
            }
          }

          // lines

          var trace2 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace3 = {
            x: period,
            y: trace3_y,
            name: '1~2세 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace4 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace6 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'bar',
          };
          var trace7 = {
            x: period,
            y: trace3_y,
            name: '1~2세',
            type: 'bar',
          };
          var trace8 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'bar',
          };

          var data = [trace2, trace3, trace4];
          var data2 = [trace6, trace7, trace8];

          var layout = {
            title: txt + ' ' + cow + ' 연령별 사육 동향',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'group',
            showlegend: false
          };
          Plotly.newPlot(gd, data, layout);

          var layout2 = {
            title: txt + ' ' + cow + ' 연령별 사육 비율',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'stack',
            showlegend: false
          };

          // percentage
          for (var i = 0; i < period.length; i++) {
            var add_annotation = {
              x: period[i],
              y: total_stack[i],
              text: total_stack[i],
              xanchor: 'center',
              yanchor: 'top',
              xref: 'x',
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: -20,
              font: {
                size: 13,
              }
            };
            var add_annotation1 = {
              x: period[i],
              y: trace2_y[i],
              text: percent1[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation2 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i],
              text: percent2[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation3 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i] + trace4_y[i],
              text: percent3[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3);
          }
          Plotly.newPlot(gd2, data2, layout2);
        }
      });
    } else if (cowClass === 'dairy') {
      Meteor.call('dairy_age_by_city.get', function (error, result) {
        if (error) {
          console.log(error);
        } else {
          let series = result;

          for (i = 0; i < series.length; i++) {

            if (series[i].$.C_D) {
              // 모든 연령별 성별 전체
              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  time[j] = series[i].Obs[j].$.TIME_PERIOD;
                  age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City && series[i].$.C_D === "0") {
                for (j = 0; j < series[i].Obs.length; j++) {
                  age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            } else {

              if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = "0";
                  } else {
                    time[j] = series[i].Obs[j].$.TIME_PERIOD;
                    age_under_1_total[j] = series[i].Obs[j].$.OBS_VALUE;
                  }
                }
              } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_1_2_total[j] = "0";
                  } else
                    age_1_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City) {
                for (j = 0; j < series[i].Obs.length; j++) {
                  if (series[i].Obs[j].$.OBS_VALUE === "-") {
                    age_over_2_total[j] = "0";
                  } else
                    age_over_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
                }
              }
            }
          } //for end

          var period = [];
          for (i = 0; i < time.length; i++) {
            period[i] = stringToDate(time[i]);
          }

          var trace2_y = [];
          for (i = 0; i < 5; i++) {
            trace2_y[i] = unitK(Number(age_under_1_total[i]));
          }
          var trace3_y = [];
          for (i = 0; i < 5; i++) {
            trace3_y[i] = unitK(Number(age_1_2_total[i]));
          }
          var trace4_y = [];
          for (i = 0; i < 5; i++) {
            trace4_y[i] = unitK(Number(age_over_2_total[i]));
          }

          var total_stack = [];
          for (i = 0; i < 5; i++) {
            total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i];
          }

          var percent1 = [];
          var percent2 = [];
          var percent3 = [];

          for (var i = 0; i < 5; i++) {
            percent1[i] = trace2_y[i] / total_stack[i] * 100;
            if (percent1[i] <= 10) {
              percent1[i] = " ";
            } else {
              percent1[i] = Math.round(percent1[i] * 10) / 10 + '%';
            }
            percent2[i] = trace3_y[i] / total_stack[i] * 100;
            if (percent2[i] <= 10) {
              percent2[i] = " ";
            } else {
              percent2[i] = Math.round(percent2[i] * 10) / 10 + '%';
            }
            percent3[i] = trace4_y[i] / total_stack[i] * 100;
            if (percent3[i] <= 10) {
              percent3[i] = " ";
            } else {
              percent3[i] = Math.round(percent3[i] * 10) / 10 + '%';
            }
          }

          // lines

          var trace2 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace3 = {
            x: period,
            y: trace3_y,
            name: '1~2세 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace4 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'lines',
            marker: {
              size: 10,
              opacity: 0.5
            },
          };
          var trace6 = {
            x: period,
            y: trace2_y,
            name: '1세 미만 ',
            type: 'bar',
          };
          var trace7 = {
            x: period,
            y: trace3_y,
            name: '1~2세',
            type: 'bar',
          };
          var trace8 = {
            x: period,
            y: trace4_y,
            name: '2세 이상 ',
            type: 'bar',
          };

          var data = [trace2, trace3, trace4];
          var data2 = [trace6, trace7, trace8];

          var layout = {
            title: txt + ' ' + cow + ' 연령별 사육 동향',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'group',
            showlegend: false
          };
          Plotly.newPlot(gd, data, layout);

          var layout2 = {
            title: txt + ' ' + cow + ' 연령별 사육 비율',
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
              text: '사육두수(천 마리)',
              showarrow: false,
              font: {
                size: 15
              }
            }],
            barmode: 'stack',
            showlegend: false
          };

          // percentage
          for (var i = 0; i < period.length; i++) {
            var add_annotation = {
              x: period[i],
              y: total_stack[i],
              text: total_stack[i],
              xanchor: 'center',
              yanchor: 'top',
              xref: 'x',
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: -20,
              font: {
                size: 13,
              }
            };
            var add_annotation1 = {
              x: period[i],
              y: trace2_y[i],
              text: percent1[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation2 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i],
              text: percent2[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };
            var add_annotation3 = {
              x: period[i],
              y: trace2_y[i] + trace3_y[i] + trace4_y[i],
              text: percent3[i],
              yref: 'y',
              showarrow: true,
              arrowhead: 0,
              ax: 0,
              ay: 10,
              font: {
                size: 13,
                color: 'ffffff',
              }
            };

            layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3);
          }
          Plotly.newPlot(gd2, data2, layout2);
        }
      });
    }

  }

  drawPlot();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
  };

  $('input:radio[name="optradio"]').change(function () {
    drawPlot();
  });

  $('.citySelect').change(function () {
    drawPlot();
  });

  // Loading Spinner
  var wait;
  function loadingSpin() {
    wait = setTimeout(showPage, 2000);
  }
  loadingSpin();
  function showPage() {
    document.getElementById("loader").style.display = "none";
    document.getElementById("chart-box").style.display = "block";
  }

});
