Template.stats_chicken_age.onRendered(function () {

  let d3 = Plotly.d3;
  let g = d3.select('div[id="plot_1"]');
  let gd = g.node();
  let g2 = d3.select('div[id="plot_2"]');
  let gd2 = g2.node();

  function unit10K(x) {
    return Math.round(x / 10000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  //  FREQ : Q 분기
  // ITEM  : T01 합계 / T02 3개월미만 / T03	3~6개월 / T04	6개월이상 /
  // C_A : 시도별
  // 14STD04410	마리
  function drawPlot() {

    let time = [];
    let age_total = [];
    let age_under_3_total = [];
    let age_3_6_total = [];
    let age_over_6_total = [];

    let current_City = $('.citySelect option:selected').val();
    let txt = $('.citySelect option:selected').text();

    Meteor.call('chicken_age_by_city.get', function (error, result) {
      if (error) {
        console.log(error);
      } else {
        let series = result;

        for (i = 0; i < series.length; i++) {
          if (series[i].$.ITEM === "T02" && series[i].$.C_A === current_City) {
            for (j = 0; j < series[i].Obs.length; j++) {
              time[j] = series[i].Obs[j].$.TIME_PERIOD;
              age_under_3_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.ITEM === "T03" && series[i].$.C_A === current_City) {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_3_6_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          } else if (series[i].$.ITEM === "T04" && series[i].$.C_A === current_City) {
            for (j = 0; j < series[i].Obs.length; j++) {
              age_over_6_total[j] = series[i].Obs[j].$.OBS_VALUE;
            }
          }
        } // for end

        let period = [];
        for (i = 0; i < 5; i++) {
          period[i] = stringToDate(time[i]);
        }
        let trace2_y = [];
        for (i = 0; i < 5; i++) {
          trace2_y[i] = unit10K(age_under_3_total[i]);
        }
        let trace3_y = [];
        for (i = 0; i < 5; i++) {
          trace3_y[i] = unit10K(age_3_6_total[i]);
        }
        let trace4_y = [];
        for (i = 0; i < 5; i++) {
          trace4_y[i] = unit10K(age_over_6_total[i]);
        }
        let total_stack = [];
        for (i = 0; i < 5; i++) {
          total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i];
        }

        let percent1 = [];
        let percent2 = [];
        let percent3 = [];
        for (i = 0; i < 5; i++) {
          percent1[i] = trace2_y[i] / total_stack[i] * 100;
          if (percent1[i] <= 5) {
            percent1[i] = " ";
          } else {
            percent1[i] = (Math.round(percent1[i] * 10) / 10) + '%';
          }
          percent2[i] = trace3_y[i] / total_stack[i] * 100;
          if (percent2[i] <= 5) {
            percent2[i] = " ";
          } else {
            percent2[i] = (Math.round(percent2[i] * 10) / 10) + '%';
          }
          percent3[i] = trace4_y[i] / total_stack[i] * 100;
          if (percent3[i] <= 5) {
            percent3[i] = " ";
          } else {
            percent3[i] = (Math.round(percent3[i] * 10) / 10) + '%';
          }
        }

        let trace2 = {
          x: period,
          y: trace2_y,
          name: '3개월 미만',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace3 = {
          x: period,
          y: trace3_y,
          name: '3~6개월',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace4 = {
          x: period,
          y: trace4_y,
          name: '6개월 이상',
          type: 'lines',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace5 = {
          x: period,
          y: trace2_y,
          name: '3개월 미만',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace6 = {
          x: period,
          y: trace3_y,
          name: '3~6개월',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };
        let trace7 = {
          x: period,
          y: trace4_y,
          name: '6개월 이상',
          type: 'bar',
          marker: {
            size: 10,
            opacity: 0.5
          },
        };

        let data = [trace2, trace3, trace4];
        let data2 = [trace5, trace6, trace7];

        let layout = {
          title: txt + ' 닭 월령별 사육 동향',
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
            text: '사육 두수(만 마리)',
            showarrow: false,
            font: {
              size: 16
            }
          }],
          showlegend: false
        };
        Plotly.newPlot(gd, data, layout);

        let layout2 = {
          title: txt + " 닭 월령별 사육 비율",
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
            text: '사육 두수(만 마리)',
            showarrow: false,
            font: {
              size: 16
            }
          }, ],
          barmode: 'stack',
          showlegend: false
        };

        for (i = 0; i < period.length; i++) {
          let add_annotation = {
            x: period[i],
            y: total_stack[i],
            text: total_stack[i],
            xanchor: 'center',
            yanchor: 'top',
            yref: 'y',
            showarrow: true,
            arrowhead: 0,
            ax: 0,
            ay: -20,
            font: {
              size: 13,
            }
          };
          let add_annotation1 = {
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
          let add_annotation2 = {
            x: period[i],
            y: trace2_y[i] + trace3_y[i],
            text: percent2[i],
            yref: 'y',
            showarrow: true,
            arrowhead: 0,
            ax: 0,
            ay: 7,
            font: {
              size: 13,
              color: 'ffffff',
            }
          };
          let add_annotation3 = {
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
          // add_annotation2,
          layout2.annotations.push(add_annotation, add_annotation1, add_annotation2, add_annotation3);
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
