Template.stats_cow_pops.onRendered(function () {

  Meteor.call('hanwoo_farm_scale_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('hanwoo_total', res);
    }
  });

  Meteor.call('yukwoo_farm_scale_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('yukwoo_total', res);
    }
  });

  Meteor.call('dariy_farm_scale_by_city.get', function (error, res) {
    if (error) {
      console.log(error);
    } else {
      Session.setPersistent('dariy_total', res);
    }
  });

  var txt = "전국 ";
  var cow = "한우";
  var series = Session.get('hanwoo_total');
  // var series2 = Session.get('yukwoo_total');
  // var series3  = Session.get('dariy_total');

  function unitH(x) {
    return Math.round(x / 100);
  }

  function unitK(x) {
    return Math.round(x / 1000);
  }

  var city_farm = [];
  var city_scale = [];
  var scale_under_20_cnt = [];
  var scale_20_50_cnt = [];
  var scale_50_100_cnt = [];
  var scale_over_100_cnt = [];
  var scale_under_20_farm = [];
  var scale_20_50_farm = [];
  var scale_50_100_farm = [];
  var scale_over_100_farm = [];

  // x축
  var time = [];

  function drawPlot(curCity) {
    var currnet_City = curCity;

    var d3 = Plotly.d3;
    var g = d3.select('div[id="plot_1"]');
    var gd = g.node();

    var g2 = d3.select('div[id="plot_2"]');
    var gd2 = g2.node();

    var g3 = d3.select('div[id="plot_3"]');
    var gd3 = g3.node();

    var g4 = d3.select('div[id="plot_4"]');
    var gd4 = g4.node();

    // Q 분기 ,  T01 농가수 , T02 마리수 , 사육규모 00 (전체) 05 (20미만) 10 (20~50)  15(50~100) 20 (100이상)

    $.each(series, function (i, val) {
      // 한우 가구
      if (series[i].$.ITEM === "T01" && series[i].$.C_A === currnet_City && series[i].$.C_B === "00") {
        $.each(series[i].Obs, function (iv, val) {
          city_farm[iv] = series[i].Obs[iv].$.OBS_VALUE;
          time[iv] = series[i].Obs[iv].$.TIME_PERIOD;
        });
      }
      //마리수
      else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "00") {
        $.each(series[i].Obs, function (iv, val) {
          city_scale[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      }

      //규모별 농가수
      else if (series[i].$.ITEM === "T01" && series[i].$.C_A === currnet_City && series[i].$.C_B === "05") {
        $.each(series[i].Obs, function (iv, val) {
          scale_under_20_farm[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === currnet_City && series[i].$.C_B === "10") {
        $.each(series[i].Obs, function (iv, val) {
          scale_20_50_farm[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === currnet_City && series[i].$.C_B === "15") {
        $.each(series[i].Obs, function (iv, val) {
          scale_50_100_farm[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T01" && series[i].$.C_A === currnet_City && series[i].$.C_B === "20") {
        $.each(series[i].Obs, function (iv, val) {
          scale_over_100_farm[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      }
      // 규모별 마리수
      else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "05") {
        $.each(series[i].Obs, function (iv, val) {
          scale_under_20_cnt[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } //마리수
      else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "10") {
        $.each(series[i].Obs, function (iv, val) {
          scale_20_50_cnt[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } //마리수
      else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "15") {
        $.each(series[i].Obs, function (iv, val) {
          scale_50_100_cnt[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      } else if (series[i].$.ITEM === "T02" && series[i].$.C_A === currnet_City && series[i].$.C_B === "20") {
        $.each(series[i].Obs, function (iv, val) {
          scale_over_100_cnt[iv] = series[i].Obs[iv].$.OBS_VALUE;
        });
      }
    });

    function stringToDate(x) {
      return x.substring(0, 4) + '년 ' + x.substring(6, 7) + '분기';
    }
    var period = [];
    for (i = 0; i < 5; i++) {
      period[i] = stringToDate(time[i]);
    }
    var trace1_y = [];
    for (i = 0; i < 5; i++) {
      trace1_y[i] = unitH(city_farm[i]);
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
      trace3_y[i] = scale_under_20_farm[i];
    }
    var trace4_y = [];
    for (i = 0; i < 5; i++) {
      trace4_y[i] = scale_20_50_farm[i];
    }
    var trace5_y = [];
    for (i = 0; i < 5; i++) {
      trace5_y[i] = scale_50_100_farm[i];
    }
    var trace6_y = [];
    for (i = 0; i < 5; i++) {
      trace6_y[i] = scale_over_100_farm[i];
    }
    var trace7_y = [];
    for (i = 0; i < 5; i++) {
      trace7_y[i] = unitK(scale_under_20_cnt[i]);
    }
    var trace8_y = [];
    for (i = 0; i < 5; i++) {
      trace8_y[i] = unitK(scale_20_50_cnt[i]);
    }

    var trace9_y = [];
    for (i = 0; i < 5; i++) {
      trace9_y[i] = unitK(scale_50_100_cnt[i]);
    }
    var trace10_y = [];
    for (i = 0; i < 5; i++) {
      trace10_y[i] = unitK(scale_over_100_cnt[i]);
    }

    var trace1 = {
      x: period,
      y: trace1_y,
      name: '농가수(백 가구)',
      type: 'bar'
    };
    var trace2 = {
      x: period,
      y: trace2_y,
      name: '사육마리수(천 마리)',
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
      name: '20 두 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace4 = {
      x: period,
      y: trace4_y,
      name: '20 ~ 50 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace5 = {
      x: period,
      y: trace5_y,
      name: '50 ~ 100 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace6 = {
      x: period,
      y: trace6_y,
      name: '100 두 이상',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace7 = {
      x: period,
      y: trace7_y,
      name: '20 두 미만',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace8 = {
      x: period,
      y: trace8_y,
      name: '20 ~ 50 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };

    var trace9 = {
      x: period,
      y: trace9_y,
      name: '50 ~ 100 두',
      type: 'lines',
      marker: {
        size: 10,
        opacity: 0.5
      },
    };
    var trace10 = {
      x: period,
      y: trace10_y,
      name: '100 두 이상',
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
      title: txt + cow + ' 사육 동향',
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

    var layout2 = {
      title: txt + cow + ' 가구당 사육두수',
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
      title: txt + cow + ' 규모별 가구수',
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
      title: txt + cow + ' 규모별 사육두수',
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
        text: '(단위: 천 마리)',
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

  var setCity = "00";
  drawPlot(setCity);

  $('input:radio[name="name"]').change(function () {
    // 한우
    if (this.value === "korean") {
      cow = " 한우 ";
      series = Session.get('hanwoo_total');
    } else if (this.value === "beef") {
      cow = " 육우 ";
      series = Session.get('yukwoo_total');
    } else {
      cow = " 젖소 "
      series = Session.get('dariy_total');
    }
    drawPlot(setCity);
  });

  $('.citySelect').change(function () {
    var currentCity = this.value;
    txt = $('.citySelect option:selected').text();
    drawPlot(currentCity);
  });
});
