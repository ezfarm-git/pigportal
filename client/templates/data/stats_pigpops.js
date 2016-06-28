Template.stats_pigpops.onCreated(function() {
    // 사육규모
    Meteor.call('pig_farms_by_scale_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_farms_by_scale_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_scale_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_scale_total', JSON.parse(result.content));
        }
    });
    // 월령별 사육규모
    Meteor.call('pig_pops_by_age_under_2_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_under_2_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_under_4_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_under_4_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_under_6_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_under_6_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_under_8_female_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_under_8_female_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_under_8_male_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_under_8_male_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_over_8_female_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_over_8_female_total', JSON.parse(result.content));
        }
    });
    Meteor.call('pig_pops_by_age_over_8_male_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('pig_pops_by_age_over_8_male_total', JSON.parse(result.content));
        }
    });
});


Template.stats_pigpops.onRendered(function() {

    var d3 = Plotly.d3;
    var gd3 = d3.select('div[id="plot_1"]');
    var gd = gd3.node();
    function stringToDate(x) {
        return x.substring(0, 4) + '년 ' + x.substring(5, 6) + '분기';
    }
    function unitK(x) {
        return Math.round(x / 1000);
    }
    var data1 = Session.get('pig_farms_by_scale_total');
    var data2 = Session.get('pig_pops_by_scale_total');

    var data3 = Session.get('pig_pops_by_age_under_2_total');
    var data4 = Session.get('pig_pops_by_age_under_4_total');
    var data5 = Session.get('pig_pops_by_age_under_6_total');
    var data6 = Session.get('pig_pops_by_age_under_8_female_total');
    var data7 = Session.get('pig_pops_by_age_under_8_male_total');
    var data8 = Session.get('pig_pops_by_age_over_8_female_total');
    var data9 = Session.get('pig_pops_by_age_over_8_male_total');

    var period = [];
    for (i = 0; i < 5; i++) {
        period[i] = stringToDate(data1[i].PRD_DE);
    }

    var trace1_y = [];
    for (i = 0; i < 5; i++) {
        trace1_y[i] = data1[i].DT;
    }
    var trace2_y = [];
    for (i = 0; i < 5; i++) {
        trace2_y[i] = unitK(data2[i].DT);
    }
    var trace_ratio_y = [];
    for (i = 0; i < 5; i++) {
        trace_ratio_y[i] = Math.round(parseInt(data2[i].DT) / parseInt(data1[i].DT));
    }

    var trace3_y = [];
    for (i = 0; i < 5; i++) {
        trace3_y[i] = unitK(data3[i].DT);
    }
    var trace4_y = [];
    for (i = 0; i < 5; i++) {
        trace4_y[i] = unitK(data4[i].DT);
    }
    var trace5_y = [];
    for (i = 0; i < 5; i++) {
        trace5_y[i] = unitK(data5[i].DT);
    }
    var trace6_y = [];
    for (i = 0; i < 5; i++) {
        trace6_y[i] = unitK(data6[i].DT);
    }
    var trace7_y = [];
    for (i = 0; i < 5; i++) {
        trace7_y[i] = unitK(data7[i].DT);
    }
    var trace8_y = [];
    for (i = 0; i < 5; i++) {
        trace8_y[i] = unitK(data8[i].DT);
    }
    var trace9_y = [];
    for (i = 0; i < 5; i++) {
        trace9_y[i] = unitK(data9[i].DT);
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
        name: '사육두수(1,000두)',
        type: 'bar'
    };
    var trace_ratio = {
        x: period,
        y: trace_ratio_y,
        name: '가구당 사육두수',
        type: 'lines',
        xaxis: 'x2',
        yaxis: 'y2'

    };

    var trace3 = {
        x: period,
        y: trace3_y,
        name: '2개월 미만',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace4 = {
        x: period,
        y: trace4_y,
        name: '2~4개월',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace5 = {
        x: period,
        y: trace5_y,
        name: '4~6개월',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace6 = {
        x: period,
        y: trace6_y,
        name: '6~8개월 암컷',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace7 = {
        x: period,
        y: trace7_y,
        name: '6~8개월 수컷',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace8 = {
        x: period,
        y: trace8_y,
        name: '8개월 이상 암컷',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var trace9 = {
        x: period,
        y: trace9_y,
        name: '8개월 이상 수컷',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };

    var data = [trace1, trace2, trace_ratio, trace3, trace4, trace5, trace6, trace7, trace8, trace9];

    var layout = {
        title: '돼지 전국 사육 동향',
        titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
        },
        xaxis: {domain: [0, 1]},
        yaxis: {domain: [0.72, 1]},
        xaxis2: {anchor: 'y2'},
        yaxis2: {domain: [0.36, 0.63]},
        xaxis3: {anchor: 'y3'},
        yaxis3: {domain: [0, 0.27]},
        annotations: [
            {
                yanchor: 'top',
                y: 1.015,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '가구수, 사육두수(1000마리)',
                showarrow: false,
                font: {size: 15}
            },
            {
                yanchor: 'top',
                y: 0.65,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '가구당 사육두수(마리)',
                showarrow: false,
                font: {size: 15}
            },
            {
                yanchor: 'top',
                y: 0.29,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '월령별 사육두수(1000마리)',
                showarrow: false,
                font: {size: 15}
            }
        ],
        barmode: 'group',
        showlegend: false
    };
    Plotly.newPlot(gd, data, layout);

    window.onresize = function() {
        Plotly.Plots.resize(gd);
    };
});
