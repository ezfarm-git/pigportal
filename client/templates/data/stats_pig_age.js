
Template.stats_pig_age.onRendered(function () {

  let d3 = Plotly.d3;
  let g = d3.select('div[id="plot_1"]');
  let gd = g.node();
  let g2 = d3.select('div[id="plot_2"]');
  let gd2 = g2.node();

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  function drawPlot() {

    let current_City = $('.citySelect option:selected').val();
    let txt = $('.citySelect option:selected').text();

    Meteor.call('pig_age_by_city.get', function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let series = result;
        let time = [];
        let age_total = [];
        let age_under_2_total = [];
        let age_2_4_total = [];
        let age_4_6_total = [];
        let age_6_8_total = [];
        let age_6_8_female = [];
        let age_6_8_male = [];
        let age_over_8_total = [];
        let age_over_8_female = [];
        let age_over_8_male = [];

        // Q 분기
        //T01	합계 / T02	2개월미만 / T03	2~4개월 / T04	4~6개월  / T05	6~8개월:계  / T06	6~8개월:암컷 / T07 6~8개월:수컷  / T08	8개월이상:계  / T09	8개월이상:암컷 /  T10	8개월이상:수컷
        // 14STD04410 마리 (단위)

        for (i = 0; i < series.length; i++) {
          if (series[i].$.C_A === current_City && series[i].$.ITEM === "T01") {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              age_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T02") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_under_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T03") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_2_4_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T04") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_4_6_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T06") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_6_8_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T07") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_6_8_male[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T08") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_over_8_female[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.C_A === current_City && series[i].$.ITEM === "T10") {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_over_8_male[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
        }

        let period = [];
        for (i = 0; i < 5; i++) {
          period[i] = stringToDate(time[i]);
        }
        let trace2_y = [];
        for (i = 0; i < 5; i++) {
          trace2_y[i] = unitK(age_under_2_total[i]);
        }
        let trace3_y = [];
        for (i = 0; i < 5; i++) {
          trace3_y[i] = unitK(age_2_4_total[i]);
        }
        let trace4_y = [];
        for (i = 0; i < 5; i++) {
          trace4_y[i] = unitK(age_4_6_total[i]);
        }
        let trace6_y = [];
        for (i = 0; i < 5; i++) {
          trace6_y[i] = unitK(age_6_8_female[i]);
        }
        let trace7_y = [];
        for (i = 0; i < 5; i++) {
          trace7_y[i] = unitK(age_6_8_male[i]);
        }
        let trace9_y = [];
        for (i = 0; i < 5; i++) {
          trace9_y[i] = unitK(age_over_8_female[i]);
        }
        let trace10_y = [];
        for (i = 0; i < 5; i++) {
          trace10_y[i] = unitK(age_over_8_male[i]);
        }

        let total_stack = [];
        for (i = 0; i < 5; i++) {
          total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i] + trace6_y[i] + trace7_y[i] + trace9_y[i] + trace10_y[i];
        }

        let percent1 = [];
        let percent2 = [];
        let percent3 = [];
        let percent4 = [];
        let percent5 = [];
        let percent6 = [];
        let percent7 = [];

        for (var i = 0; i < 5; i++) {
          percent1[i] = trace2_y[i] / total_stack[i] * 100;
          if (percent1[i] <= 5) {
            percent1[i] = " ";
          } else {
            percent1[i] = Math.round(percent1[i] * 10) / 10 + '%';
          }

          percent2[i] = trace3_y[i] / total_stack[i] * 100;
          if (percent2[i] <= 5) {
            percent2[i] = " ";
          } else {
            percent2[i] = Math.round(percent2[i] * 10) / 10 + '%';
          }

          percent3[i] = trace4_y[i] / total_stack[i] * 100;
          if (percent3[i] <= 5) {
            percent3[i] = " ";
          } else {
            percent3[i] = Math.round(percent3[i] * 10) / 10 + '%';
          }

          percent4[i] = trace6_y[i] / total_stack[i] * 100;
          if (percent4[i] <= 5) {
            percent4[i] = " ";
          } else {
            percent4[i] = Math.round(percent4[i] * 10) / 10 + '%';
          }

          percent5[i] = trace7_y[i] / total_stack[i] * 100;
          if (percent5[i] <= 5) {
            percent5[i] = " ";
          } else {
            percent5[i] = Math.round(percent5[i] * 10) / 10 + '%';
          }

          percent6[i] = trace9_y[i] / total_stack[i] * 100;
          if (percent6[i] <= 5) {
            percent6[i] = " ";
          } else {
            percent6[i] = Math.round(percent6[i] * 10) / 10 + '%';
          }

          percent7[i] = trace10_y[i] / total_stack[i] * 100;
          if (percent7[i] <= 5) {
            percent7[i] = " ";
          } else {
            percent7[i] = Math.round(percent7[i] * 10) / 10 + '%';
          }

        }

        // lines

        let trace2 = {
          x: period,
          y: trace2_y,
          name: '2개월 미만',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace3 = {
          x: period,
          y: trace3_y,
          name: '2~4개월 ',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace4 = {
          x: period,
          y: trace4_y,
          name: '4~6개월 ',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace6 = {
          x: period,
          y: trace6_y,
          name: '6~8개월 암컷',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace7 = {
          x: period,
          y: trace7_y,
          name: '6~8개월 수컷',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace9 = {
          x: period,
          y: trace9_y,
          name: '8개월 이상 암컷',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace10 = {
          x: period,
          y: trace10_y,
          name: '8개월 이상 수컷',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        // bar
        let trace12 = {
          x: period,
          y: trace2_y,
          name: '2개월 미만',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace13 = {
          x: period,
          y: trace3_y,
          name: '2~4개월 ',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace14 = {
          x: period,
          y: trace4_y,
          name: '4~6개월 ',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        let trace16 = {
          x: period,
          y: trace6_y,
          name: '6~8개월 암컷',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace17 = {
          x: period,
          y: trace7_y,
          name: '6~8개월 수컷',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        let trace19 = {
          x: period,
          y: trace9_y,
          name: '8개월 이상 암컷',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace20 = {
          x: period,
          y: trace10_y,
          name: '8개월 이상 수컷',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        let data = [trace2, trace3, trace4, trace6, trace7, trace9, trace10];
        let data2 = [trace12, trace13, trace14, trace16, trace17, trace19, trace20];

        let layout = {
          title: txt + ' 돼지 월령별 사육 동향',
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

        let layout2 = {
          title: txt + ' 돼지 월령별 사육 비율',
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
          }, ],
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
          var add_annotation4 = {
            x: period[i],
            y: trace2_y[i] + trace3_y[i] + trace4_y[i] + trace6_y[i] + trace7_y[i] + trace9_y[i],
            text: percent6[i],
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

          layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3, add_annotation4);
        }
        Plotly.newPlot(gd2, data2, layout2);
      }
    });
  }

  drawPlot();

  window.onresize = function () {
    Plotly.Plots.resize(gd);
    Plotly.Plots.resize(gd2);
  };

  $('.citySelect').change(function () {
    drawPlot();
  });

});
