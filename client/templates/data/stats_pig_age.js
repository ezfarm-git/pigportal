
Template.stats_pig_age.onRendered(function () {

  Meteor.call('pig_age_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('pig_ages', res);
    }
  });

  var series = Session.get('pig_ages');

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  var d3 = Plotly.d3;
  var g = d3.select('div[id="plot_1"]');
  var gd = g.node();
  var g2 = d3.select('div[id="plot_2"]');
  var gd2 = g2.node();

  var time = [];
  var age_total = [];
  var age_under_2_total = [];
  var age_2_4_total = [];
  var age_4_6_total = [];
  var age_6_8_total = [];
  var age_6_8_female = [];
  var age_6_8_male = [];
  var age_over_8_total = [];
  var age_over_8_female = [];
  var age_over_8_male = [];

  function drawPlot(curCity) {

    var currnet_City = curCity;

    // Q 분기
    //T01	합계 / T02	2개월미만 / T03	2~4개월 / T04	4~6개월  / T05	6~8개월:계  / T06	6~8개월:암컷 / T07 6~8개월:수컷  / T08	8개월이상:계  / T09	8개월이상:암컷 /  T10	8개월이상:수컷
    // 14STD04410 마리 (단위)

    for (i = 0; i < series.length; i++) {
      if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          time[j] = series[i].Obs[j].$.TIME_PERIOD;
          age_total[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T02") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_under_2_total[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T03") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_2_4_total[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T04") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_4_6_total[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T06") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_6_8_female[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T07") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_6_8_male[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T08") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_over_8_female[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.ITEM === "T10") {
        for (j = 0; j < series[i].Obs.length; j++) {
          age_over_8_male[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      }
    }

    var period = [];
    for (i = 0; i < 5; i++) {
      period[i] = stringToDate(time[i]);
    }
    var trace2_y = [];
    for (i = 0; i < 5; i++) {
      trace2_y[i] = unitK(age_under_2_total[i]);
    }
    var trace3_y = [];
    for (i = 0; i < 5; i++) {
      trace3_y[i] = unitK(age_2_4_total[i]);
    }
    var trace4_y = [];
    for (i = 0; i < 5; i++) {
      trace4_y[i] = unitK(age_4_6_total[i]);
    }
    var trace6_y = [];
    for (i = 0; i < 5; i++) {
      trace6_y[i] = unitK(age_6_8_female[i]);
    }
    var trace7_y = [];
    for (i = 0; i < 5; i++) {
      trace7_y[i] = unitK(age_6_8_male[i]);
    }
    var trace9_y = [];
    for (i = 0; i < 5; i++) {
      trace9_y[i] = unitK(age_over_8_female[i]);
    }
    var trace10_y = [];
    for (i = 0; i < 5; i++) {
      trace10_y[i] = unitK(age_over_8_male[i]);
    }

    var total_stack = [];
    for (i = 0; i < 5; i++) {
      total_stack[i] = trace2_y[i] + trace3_y[i] + trace4_y[i] + trace6_y[i] + trace7_y[i] + trace9_y[i] + trace10_y[i];
    }

    var percent1 = [];
    var percent2 = [];
    var percent3 = [];
    var percent4 = [];
    var percent5 = [];
    var percent6 = [];
    var percent7 = [];

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

    var trace2 = {
      x: period,
      y: trace2_y,
      name: '2개월 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace3 = {
      x: period,
      y: trace3_y,
      name: '2~4개월 ',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace4 = {
      x: period,
      y: trace4_y,
      name: '4~6개월 ',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace6 = {
      x: period,
      y: trace6_y,
      name: '6~8개월 암컷',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace7 = {
      x: period,
      y: trace7_y,
      name: '6~8개월 수컷',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace9 = {
      x: period,
      y: trace9_y,
      name: '8개월 이상 암컷',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace10 = {
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
    var trace12 = {
      x: period,
      y: trace2_y,
      name: '2개월 미만',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace13 = {
      x: period,
      y: trace3_y,
      name: '2~4개월 ',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace14 = {
      x: period,
      y: trace4_y,
      name: '4~6개월 ',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var trace16 = {
      x: period,
      y: trace6_y,
      name: '6~8개월 암컷',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace17 = {
      x: period,
      y: trace7_y,
      name: '6~8개월 수컷',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var trace19 = {
      x: period,
      y: trace9_y,
      name: '8개월 이상 암컷',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace20 = {
      x: period,
      y: trace10_y,
      name: '8개월 이상 수컷',
      type: 'bar',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var data = [trace2, trace3, trace4, trace6, trace7, trace9, trace10];
    var data2 = [trace12, trace13, trace14, trace16, trace17, trace19, trace20];

    var layout = {
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

    var layout2 = {
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

    window.onresize = function () {
      Plotly.Plots.resize(gd);
      Plotly.Plots.resize(gd2);
    };
  }

  var txt = "전국";
  var setCity = "00";
  drawPlot(setCity);

  $('.citySelect').change(function () {
    var currentCity = this.value;
    txt = $('.citySelect option:selected').text();
    drawPlot(currentCity);
  });
});
