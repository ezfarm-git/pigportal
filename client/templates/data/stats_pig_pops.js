Template.stats_pig_pops.onRendered(function () {

  Meteor.call('pig_farm_scale_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('pig_total', res);
    }
  });

  var series = Session.get('pig_total');

  function unitK(x) {
    return Math.round(x / 1000);
  }

  function unit10K(x) {
    return Math.round(x / 10000);
  }

  function stringToDate(x) {
    return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
  }

  var d3 = Plotly.d3;
  var g = d3.select('div[id="plot_1"]');
  var gd = g.node();

  var g2 = d3.select('div[id="plot_2"]');
  var gd2 = g2.node();

  var g3 = d3.select('div[id="plot_3"]');
  var gd3 = g3.node();

  var g4 = d3.select('div[id="plot_4"]');
  var gd4 = g4.node();

  var time = [];
  var city_farm = [];
  var city_scale = [];
  var scale_under_1000_cnt = [];
  var scale_1000_5000_cnt = [];
  var scale_5000_10000_cnt = [];
  var scale_over_10000_cnt = [];
  var scale_under_1000_farm = [];
  var scale_1000_5000_farm = [];
  var scale_5000_10000_farm = [];
  var scale_over_10000_farm = [];

  function drawPlot(curCity) {

    var currnet_City = curCity;

    // Q 분기 ,
    // ITEM T01 농가수 , T02 마리수 ,
    // C_A 시도별
    // C_B 사육규모 00 (전체) 05 (1000) 10 (1000~5000)  15(5000~10000) 20 (10000)

    for (i = 0; i < series.length; i++) {
      // 농가수
      if (series[i].$.C_A === currnet_City && series[i].$.C_B === "00" && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          time[j] = series[i].Obs[j].$.TIME_PERIOD;
          city_farm[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      }
      //마리수
      else if (series[i].$.C_A === currnet_City && series[i].$.C_B === "00" && series[i].$.ITEM === "T02") {
        for (j = 0; j < series[i].Obs.length; j++) {
          city_scale[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      }
      // 규모별 농가수
      else if (series[i].$.C_A === currnet_City && series[i].$.C_B === "05" && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          scale_under_1000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.C_B === "10" && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          scale_1000_5000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.C_B === "15" && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          if (series[i].Obs[j].$.OBS_VALUE === "-") {
            scale_5000_10000_farm[j] = "0";
          } else
            scale_5000_10000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.C_A === currnet_City && series[i].$.C_B === "20" && series[i].$.ITEM === "T01") {
        for (j = 0; j < series[i].Obs.length; j++) {
          if (series[i].Obs[j].$.OBS_VALUE === "-") {
            scale_over_10000_farm[j] = "0";
          } else
            scale_over_10000_farm[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      }

      // 규모별 마리수
      else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "05") {
        for (j = 0; j < series[i].Obs.length; j++) {
          scale_under_1000_cnt[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "10") {
        for (j = 0; j < series[i].Obs.length; j++) {
          scale_1000_5000_cnt[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "15") {
        for (j = 0; j < series[i].Obs.length; j++) {
          if (series[i].Obs[j].$.OBS_VALUE === "-") {
            scale_5000_10000_cnt[j] = "0";
          } else
            scale_5000_10000_cnt[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      } else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "20") {
        for (j = 0; j < series[i].Obs.length; j++) {
          if (series[i].Obs[j].$.OBS_VALUE === "-") {
            scale_over_10000_cnt[j] = "0";
          } else
            scale_over_10000_cnt[j] = series[i].Obs[j].$.OBS_VALUE;
        }
      }
    }

    var period = [];
    for (i = 0; i < 5; i++) {
      period[i] = stringToDate(time[i]);
    }
    var trace1_y = [];
    for (i = 0; i < 5; i++) {
      trace1_y[i] = city_farm[i];
    }
    var trace2_y = [];
    for (i = 0; i < 5; i++) {
      trace2_y[i] = unitK(city_scale[i]);
    }
    var trace_ratio_y = [];
    for (i = 0; i < 5; i++) {
      trace_ratio_y[i] = Math.round(parseInt(city_scale[i]) / parseInt(city_farm[i]));
    }
    var trace3_y = [];
    for (i = 0; i < 5; i++) {
      trace3_y[i] = scale_under_1000_farm[i];
    }
    var trace4_y = [];
    for (i = 0; i < 5; i++) {
      trace4_y[i] = scale_1000_5000_farm[i];
    }
    var trace5_y = [];
    for (i = 0; i < 5; i++) {
      trace5_y[i] = scale_5000_10000_farm[i];
    }
    var trace6_y = [];
    for (i = 0; i < 5; i++) {
      trace6_y[i] = scale_over_10000_farm[i];
    }
    var trace7_y = [];
    for (i = 0; i < 5; i++) {
      trace7_y[i] = unit10K(scale_under_1000_cnt[i]);
    }
    var trace8_y = [];
    for (i = 0; i < 5; i++) {
      trace8_y[i] = unit10K(scale_1000_5000_cnt[i]);
    }

    var trace9_y = [];
    for (i = 0; i < 5; i++) {
      trace9_y[i] = unit10K(scale_5000_10000_cnt[i]);
    }
    var trace10_y = [];
    for (i = 0; i < 5; i++) {
      trace10_y[i] = unit10K(scale_over_10000_cnt[i]);
    }

    var trace1 = {
      x: period,
      y: trace1_y,
      name: '농가수(가구)',
      type: 'bar'
    };
    var trace2 = {
      x: period,
      y: trace2_y,
      name: '사육두수(천 마리)',
      type: 'bar'
    };
    var trace_ratio = {
      x: period,
      y: trace_ratio_y,
      name: '가구당 사육두수',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace3 = {
      x: period,
      y: trace3_y,
      name: '1,000 두 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace4 = {
      x: period,
      y: trace4_y,
      name: '1,000 ~ 5,000 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace5 = {
      x: period,
      y: trace5_y,
      name: '5,000 ~ 10,000 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace6 = {
      x: period,
      y: trace6_y,
      name: '10,000 두 이상',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace7 = {
      x: period,
      y: trace7_y,
      name: '1,000 두 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace8 = {
      x: period,
      y: trace8_y,
      name: '1,000 ~ 5,000 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var trace9 = {
      x: period,
      y: trace9_y,
      name: '5,000 ~ 10,000 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace10 = {
      x: period,
      y: trace10_y,
      name: '10,000 두 이상',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var data = [trace1, trace2];
    var data2 = [trace_ratio];
    var data3 = [trace3, trace4, trace5, trace6];
    var data4 = [trace7, trace8, trace9, trace10];

    var layout = {
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

    var layout2 = {
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

    var layout3 = {
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

    var layout4 = {
      title: txt + ' 규모별 사육두수',
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
        text: '(단위: 만 마리)',
        showarrow: false,
        font: {
          size: 14
        }
      }],
      barmode: 'stack',
      showlegend: false,
    };

    Plotly.newPlot(gd4, data4, layout4);

    window.onresize = function () {
      Plotly.Plots.resize(gd);
      Plotly.Plots.resize(gd2);
      Plotly.Plots.resize(gd3);
      Plotly.Plots.resize(gd4);
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
