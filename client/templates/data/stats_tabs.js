Template.stats_tabs.onRendered(function() {
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

ReactiveTabs.createInterface({
    template: 'basicTabs',
    onChnage: function(slug, template) {
        console.log('[tabs] Tab has changed! Current tab:', slug);
        console.log('[tabs] Template instance calling onChnage:', template);
    }
});

Template.stats_tabs.helpers({
    tabs: function() {
        // Every tab object MUST have a name and a slug!
        return [{
            name: '사육규모',
            slug: 'plot1',
            onRender: function() {
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
                var trace3_y = [];
                for (i = 0; i < 5; i++) {
                    trace3_y[i] = Math.round(parseInt(data2[i].DT) / parseInt(data1[i].DT));
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
                var trace3 = {
                    x: period,
                    y: trace3_y,
                    name: '가구당 사육두수',
                    type: 'lines',
                    xaxis: 'x2',
                    yaxis: 'y2'

                };

                var data = [trace3, trace1, trace2];

                var layout = {
                    title: '돼지 전국 사육규모',
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 22,
                        color: '#2c3e50'
                    },
                    xaxis: {domain: [0, 1]},
                    yaxis: {domain: [0, 0.44]},
                    xaxis2: {anchor: 'y2'},
                    yaxis2: {domain: [0.56, 1]},
                    barmode: 'group',
                    showlegend: true,
                    legend: {
                        x: 0.72,
                        y: -0.22,
                        orientation: 'v'
                    }
                };
                Plotly.newPlot(gd, data, layout);

                window.onresize = function() {
                    Plotly.Plots.resize(gd);
                };
            }
        }, {
            name: '월령별 사육규모',
            slug: 'plot2',
            onRender: function() {
                var d3 = Plotly.d3;
                var gd3 = d3.select('div[id="plot_2"]');
                var gd = gd3.node();
                function stringToDate(x) {
                    return x.substring(0, 4) + '년 ' + x.substring(5, 6) + '분기';
                }
                function unitK(x) {
                    return Math.round(x / 1000);
                }
                var data1 = Session.get('pig_pops_by_age_under_2_total');
                var data2 = Session.get('pig_pops_by_age_under_4_total');
                var data3 = Session.get('pig_pops_by_age_under_6_total');
                var data4 = Session.get('pig_pops_by_age_under_8_female_total');
                var data5 = Session.get('pig_pops_by_age_under_8_male_total');
                var data6 = Session.get('pig_pops_by_age_over_8_female_total');
                var data7 = Session.get('pig_pops_by_age_over_8_male_total');

                var period = [];
                for (i = 0; i < 5; i++) {
                    period[i] = stringToDate(data1[i].PRD_DE);
                }

                var trace1_y = [];
                for (i = 0; i < 5; i++) {
                    trace1_y[i] = unitK(data1[i].DT);
                }
                var trace2_y = [];
                for (i = 0; i < 5; i++) {
                    trace2_y[i] = unitK(data2[i].DT);
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

                var trace1 = {
                    x: period,
                    y: trace1_y,
                    name: '2개월 미만',
                    type: 'lines',
                    connectgaps: true
                };
                var trace2 = {
                    x: period,
                    y: trace2_y,
                    name: '2~4개월',
                    type: 'lines',
                    connectgaps: true
                };
                var trace3 = {
                    x: period,
                    y: trace3_y,
                    name: '4~6개월',
                    type: 'lines',
                    connectgaps: true
                };
                var trace4 = {
                    x: period,
                    y: trace4_y,
                    name: '6~8개월 암컷',
                    type: 'lines',
                    connectgaps: true
                };
                var trace5 = {
                    x: period,
                    y: trace5_y,
                    name: '6~8개월 수컷',
                    type: 'lines',
                    connectgaps: true
                };
                var trace6 = {
                    x: period,
                    y: trace6_y,
                    name: '8개월 이상 암컷',
                    type: 'lines',
                    connectgaps: true
                };
                var trace7 = {
                    x: period,
                    y: trace7_y,
                    name: '8개월 이상 수컷',
                    type: 'lines',
                    connectgaps: true
                };

                var data = [trace1, trace2, trace3, trace4, trace5, trace6, trace7];

                var layout = {
                    title: '월령별 사육규모',
                    titlefont: {
                        family: 'Jeju Gothic, serif',
                        size: 22,
                        color: '#2c3e50'
                    },
                    annotations: [
                        {
                            x: 3.7,
                            y: 3400,
                            text: '단위: 1000마리',
                            showarrow: false

                        }
                    ],
                    showlegend: false,
                };
                Plotly.newPlot(gd, data, layout);

                window.onresize = function() {
                    Plotly.Plots.resize(gd);
                };
            }
        }, {
            name: '등급별 판정두수',
            slug: 'plot3',
            onRender: function() {
                
            }
        }];
    },
    pig_farms_by_scale_total: function() {
        return Session.get('pig_farms_by_scale_total');
    }
})
