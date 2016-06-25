Template.stats_grade.onRendered(function() {
    // 등급별 판정두수
    Meteor.call('quantity_by_grade_1+_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1+_total', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1_total', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_2_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_2_total', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_out_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_out_total', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1+_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1+_female', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1_female', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_2_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_2_female', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_out_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_out_female', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1+_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1+_male', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1_male', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_2_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_2_male', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_out_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_out_male', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1+_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1+_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_1_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_1_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_2_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_2_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('quantity_by_grade_out_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('quantity_by_grade_out_cast', JSON.parse(result.content));
        }
    });
    // 등급별 경락가격
    Meteor.call('price_by_grade_1+_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1+_total', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1_total', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_2_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_2_total', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_out_total.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_out_total', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1+_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1+_female', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1_female', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_2_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_2_female', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_out_female.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_out_female', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1+_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1+_male', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1_male', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_2_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_2_male', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_out_male.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_out_male', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1+_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1+_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_1_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_1_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_2_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_2_cast', JSON.parse(result.content));
        }
    });
    Meteor.call('price_by_grade_out_cast.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('price_by_grade_out_cast', JSON.parse(result.content));
        }
    });


    var d3 = Plotly.d3;
    var gd3 = d3.select('div[id="plot_1"]');
    var gd = gd3.node();
    function stringToDate(x) {
        return x.substring(0, 4) + '년 ' + x.substring(4, 6) + '월';
    }
    var data1 = Session.get('quantity_by_grade_1+_total');
    var data2 = Session.get('quantity_by_grade_1_total');
    var data3 = Session.get('quantity_by_grade_2_total');
    var data4 = Session.get('quantity_by_grade_out_total');
    var data5 = Session.get('quantity_by_grade_1+_female');
    var data6 = Session.get('quantity_by_grade_1_female');
    var data7 = Session.get('quantity_by_grade_2_female');
    var data8 = Session.get('quantity_by_grade_out_female');
    var data9 = Session.get('quantity_by_grade_1+_male');
    var data10 = Session.get('quantity_by_grade_1_male');
    var data11 = Session.get('quantity_by_grade_2_male');
    var data12 = Session.get('quantity_by_grade_out_male');
    var data13 = Session.get('quantity_by_grade_1+_cast');
    var data14 = Session.get('quantity_by_grade_1_cast');
    var data15 = Session.get('quantity_by_grade_2_cast');
    var data16 = Session.get('quantity_by_grade_out_cast');
    // Price
    var p_data1 = Session.get('price_by_grade_1+_total');
    var p_data2 = Session.get('price_by_grade_1_total');
    var p_data3 = Session.get('price_by_grade_2_total');
    var p_data4 = Session.get('price_by_grade_out_total');
    var p_data5 = Session.get('price_by_grade_1+_female');
    var p_data6 = Session.get('price_by_grade_1_female');
    var p_data7 = Session.get('price_by_grade_2_female');
    var p_data8 = Session.get('price_by_grade_out_female');
    var p_data9 = Session.get('price_by_grade_1+_male');
    var p_data10 = Session.get('price_by_grade_1_male');
    var p_data11 = Session.get('price_by_grade_2_male');
    var p_data12 = Session.get('price_by_grade_out_male');
    var p_data13 = Session.get('price_by_grade_1+_cast');
    var p_data14 = Session.get('price_by_grade_1_cast');
    var p_data15 = Session.get('price_by_grade_2_cast');
    var p_data16 = Session.get('price_by_grade_out_cast');

    var p_trace1_y = [];
    for (i = 0; i < 13; i++) {
        p_trace1_y[i] = p_data1[i].DT;
    }
    var p_trace2_y = [];
    for (i = 0; i < 13; i++) {
        p_trace2_y[i] = p_data2[i].DT;
    }
    var p_trace3_y = [];
    for (i = 0; i < 13; i++) {
        p_trace3_y[i] = p_data3[i].DT;
    }
    var p_trace4_y = [];
    for (i = 0; i < 13; i++) {
        p_trace4_y[i] = p_data4[i].DT;
    }

    var p_trace5_y = [];
    for (i = 0; i < 13; i++) {
        p_trace5_y[i] = p_data5[i].DT;
    }
    var p_trace6_y = [];
    for (i = 0; i < 13; i++) {
        p_trace6_y[i] = p_data6[i].DT;
    }
    var p_trace7_y = [];
    for (i = 0; i < 13; i++) {
        p_trace7_y[i] = p_data7[i].DT;
    }
    var p_trace8_y = [];
    for (i = 0; i < 13; i++) {
        p_trace8_y[i] = p_data8[i].DT;
    }

    var p_trace9_y = [];
    for (i = 0; i < 13; i++) {
        p_trace9_y[i] = p_data9[i].DT;
    }
    var p_trace10_y = [];
    for (i = 0; i < 13; i++) {
        p_trace10_y[i] = p_data10[i].DT;
    }
    var p_trace11_y = [];
    for (i = 0; i < 13; i++) {
        p_trace11_y[i] = p_data11[i].DT;
    }
    var p_trace12_y = [];
    for (i = 0; i < 13; i++) {
        p_trace12_y[i] = p_data12[i].DT;
    }

    var p_trace13_y = [];
    for (i = 0; i < 13; i++) {
        p_trace13_y[i] = p_data13[i].DT;
    }
    var p_trace14_y = [];
    for (i = 0; i < 13; i++) {
        p_trace14_y[i] = p_data14[i].DT;
    }
    var p_trace15_y = [];
    for (i = 0; i < 13; i++) {
        p_trace15_y[i] = p_data15[i].DT;
    }
    var p_trace16_y = [];
    for (i = 0; i < 13; i++) {
        p_trace16_y[i] = p_data16[i].DT;
    }

    var period = [];
    for (i = 0; i < 13; i++) {
        period[i] = stringToDate(data1[i].PRD_DE);
    }

    var p_trace1 = {
        x: period,
        y: p_trace1_y,
        name: '1+ 등급 전체',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace2 = {
        x: period,
        y: p_trace2_y,
        name: '1 등급 전체',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace3 = {
        x: period,
        y: p_trace3_y,
        name: '2 등급 전체',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace4 = {
        x: period,
        y: p_trace4_y,
        name: '등외 전체',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };

    var p_trace5 = {
        x: period,
        y: p_trace5_y,
        name: '1+ 등급 암',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace6 = {
        x: period,
        y: p_trace6_y,
        name: '1 등급 암',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace7 = {
        x: period,
        y: p_trace7_y,
        name: '2 등급 암',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace8 = {
        x: period,
        y: p_trace8_y,
        name: '등외 암',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };

    var p_trace9 = {
        x: period,
        y: p_trace9_y,
        name: '1+ 등급 수',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace10 = {
        x: period,
        y: p_trace10_y,
        name: '1 등급 수',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace11 = {
        x: period,
        y: p_trace11_y,
        name: '2 등급 수',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace12 = {
        x: period,
        y: p_trace12_y,
        name: '등외 수',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };

    var p_trace13 = {
        x: period,
        y: p_trace13_y,
        name: '1+ 등급 거세',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace14 = {
        x: period,
        y: p_trace14_y,
        name: '1 등급 거세',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace15 = {
        x: period,
        y: p_trace15_y,
        name: '2 등급 거세',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    var p_trace16 = {
        x: period,
        y: p_trace16_y,
        name: '등외 거세',
        type: 'lines',
        connectgaps: true,
        xaxis: 'x3',
        yaxis: 'y3'
    };
    //

    var trace1_y = [];
    for (i = 0; i < 13; i++) {
        trace1_y[i] = data1[i].DT;
    }
    var trace2_y = [];
    for (i = 0; i < 13; i++) {
        trace2_y[i] = data2[i].DT;
    }
    var trace3_y = [];
    for (i = 0; i < 13; i++) {
        trace3_y[i] = data3[i].DT;
    }
    var trace4_y = [];
    for (i = 0; i < 13; i++) {
        trace4_y[i] = data4[i].DT;
    }
    var total_sum_y = [];
    for (i = 0; i < 13; i++) {
        total_sum_y[i] = parseInt(data1[i].DT) + parseInt(data2[i].DT) + parseInt(data3[i].DT) + parseInt(data4[i].DT);
    }

    var trace5_y = [];
    for (i = 0; i < 13; i++) {
        trace5_y[i] = data5[i].DT;
    }
    var trace6_y = [];
    for (i = 0; i < 13; i++) {
        trace6_y[i] = data6[i].DT;
    }
    var trace7_y = [];
    for (i = 0; i < 13; i++) {
        trace7_y[i] = data7[i].DT;
    }
    var trace8_y = [];
    for (i = 0; i < 13; i++) {
        trace8_y[i] = data8[i].DT;
    }
    var female_sum_y = [];
    for (i = 0; i < 13; i++) {
        female_sum_y[i] = parseInt(data5[i].DT) + parseInt(data6[i].DT) + parseInt(data7[i].DT) + parseInt(data8[i].DT);
    }

    var trace9_y = [];
    for (i = 0; i < 13; i++) {
        trace9_y[i] = data9[i].DT;
    }
    var trace10_y = [];
    for (i = 0; i < 13; i++) {
        trace10_y[i] = data10[i].DT;
    }
    var trace11_y = [];
    for (i = 0; i < 13; i++) {
        trace11_y[i] = data11[i].DT;
    }
    var trace12_y = [];
    for (i = 0; i < 13; i++) {
        trace12_y[i] = data12[i].DT;
    }
    var male_sum_y = [];
    for (i = 0; i < 13; i++) {
        male_sum_y[i] = parseInt(data9[i].DT) + parseInt(data10[i].DT) + parseInt(data11[i].DT) + parseInt(data12[i].DT);
    }

    var trace13_y = [];
    for (i = 0; i < 13; i++) {
        trace13_y[i] = data13[i].DT;
    }
    var trace14_y = [];
    for (i = 0; i < 13; i++) {
        trace14_y[i] = data14[i].DT;
    }
    var trace15_y = [];
    for (i = 0; i < 13; i++) {
        trace15_y[i] = data15[i].DT;
    }
    var trace16_y = [];
    for (i = 0; i < 13; i++) {
        trace16_y[i] = data16[i].DT;
    }
    var cast_sum_y = [];
    for (i = 0; i < 13; i++) {
        cast_sum_y[i] = parseInt(data13[i].DT) + parseInt(data14[i].DT) + parseInt(data15[i].DT) + parseInt(data16[i].DT);
    }

    var trace1 = {
        x: period,
        y: trace1_y,
        name: '1+ 등급 전체',
        type: 'lines',
        connectgaps: true
    };
    var trace2 = {
        x: period,
        y: trace2_y,
        name: '1 등급 전체',
        type: 'lines',
        connectgaps: true
    };
    var trace3 = {
        x: period,
        y: trace3_y,
        name: '2 등급 전체',
        type: 'lines',
        connectgaps: true
    };
    var trace4 = {
        x: period,
        y: trace4_y,
        name: '등외 전체',
        type: 'lines',
        connectgaps: true
    };
    var trace_total_sum = {
        x: period,
        y: total_sum_y,
        name: '전체 합계',
        type: 'bar',
        xaxis: 'x2',
        yaxis: 'y2'
    };

    var trace5 = {
        x: period,
        y: trace5_y,
        name: '1+ 등급 암',
        type: 'lines',
        connectgaps: true
    };
    var trace6 = {
        x: period,
        y: trace6_y,
        name: '1 등급 암',
        type: 'lines',
        connectgaps: true
    };
    var trace7 = {
        x: period,
        y: trace7_y,
        name: '2 등급 암',
        type: 'lines',
        connectgaps: true
    };
    var trace8 = {
        x: period,
        y: trace8_y,
        name: '등외 암',
        type: 'lines',
        connectgaps: true
    };
    var trace_female_sum = {
        x: period,
        y: female_sum_y,
        name: '암 합계',
        type: 'bar',
        xaxis: 'x2',
        yaxis: 'y2'
    };

    var trace9 = {
        x: period,
        y: trace9_y,
        name: '1+ 등급 수',
        type: 'lines',
        connectgaps: true
    };
    var trace10 = {
        x: period,
        y: trace10_y,
        name: '1 등급 수',
        type: 'lines',
        connectgaps: true
    };
    var trace11 = {
        x: period,
        y: trace11_y,
        name: '2 등급 수',
        type: 'lines',
        connectgaps: true
    };
    var trace12 = {
        x: period,
        y: trace12_y,
        name: '등외 수',
        type: 'lines',
        connectgaps: true
    };
    var trace_male_sum = {
        x: period,
        y: male_sum_y,
        name: '수 합계',
        type: 'bar',
        xaxis: 'x2',
        yaxis: 'y2'
    };

    var trace13 = {
        x: period,
        y: trace13_y,
        name: '1+ 등급 거세',
        type: 'lines',
        connectgaps: true
    };
    var trace14 = {
        x: period,
        y: trace14_y,
        name: '1 등급 거세',
        type: 'lines',
        connectgaps: true
    };
    var trace15 = {
        x: period,
        y: trace15_y,
        name: '2 등급 거세',
        type: 'lines',
        connectgaps: true
    };
    var trace16 = {
        x: period,
        y: trace16_y,
        name: '등외 거세',
        type: 'lines',
        connectgaps: true
    };
    var trace_cast_sum = {
        x: period,
        y: cast_sum_y,
        name: '거세 합계',
        type: 'bar',
        xaxis: 'x2',
        yaxis: 'y2'
    };

    var data_total = [trace1, trace2, trace3, trace4, trace_total_sum, p_trace1, p_trace2, p_trace3, p_trace4];
    var data_female = [trace5, trace6, trace7, trace8, trace_female_sum, p_trace5, p_trace6, p_trace7, p_trace8];
    var data_male = [trace9, trace10, trace11, trace12, trace_male_sum, p_trace9, p_trace10, p_trace11, p_trace12];
    var data_cast = [trace13, trace14, trace15, trace16, trace_cast_sum, p_trace13, p_trace14, p_trace15, p_trace16];
    var data = data_total;

    var layout = {
        title: '등급별 판정두수, 경락가격',
        titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
        },
        showlegend: false,
        xaxis: {domain: [0, 1]},
        yaxis: {domain: [0.36, 0.63]},
        xaxis2: {anchor: 'y2'},
        yaxis2: {domain: [0.72, 1]},
        xaxis3: {anchor: 'y3'},
        yaxis3: {domain: [0, 0.27]},
        annotations: [
            {
                yanchor: 'top',
                y: 1,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '판정두수 합계(마리)',
                showarrow: false,
                font: {size: 15}
            },
            {
                yanchor: 'top',
                y: 0.62,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '등급별 판정두수(마리)',
                showarrow: false,
                font: {size: 15}
            },
            {
                yanchor: 'top',
                y: 0.27,
                yref: 'paper',
                xanchor: 'right',
                x: 1,
                xref: 'paper',
                text: '등급별 경락가격 (원/kg)',
                showarrow: false,
                font: {size: 15}
            }
        ]
    };
    Plotly.newPlot(gd, data, layout);

    $('input[name="optradio"]').click(function() {
        if (this.value === "data_total") {
            var data = data_total;
            Plotly.newPlot(gd, data, layout);
        } else if (this.value === "data_female") {
            var data = data_female;
            Plotly.newPlot(gd, data, layout);
        } else if (this.value === "data_male") {
            var data = data_male;
            Plotly.newPlot(gd, data, layout);
        } else if (this.value === "data_cast") {
            var data = data_cast;
            Plotly.newPlot(gd, data, layout);
        }
    });

    window.onresize = function() {
        Plotly.Plots.resize(gd);
    };
});
