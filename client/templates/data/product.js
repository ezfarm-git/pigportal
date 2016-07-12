Template.product.onCreated(function() {

    var today = new Date();
    var currentYear = today.getFullYear();
    var pastYear = currentYear - 1;
    Session.setPersistent('currentYear', currentYear);
    Session.setPersistent('pastYear', pastYear);

    Meteor.call('TWO_YEARS.get', pastYear, currentYear, function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('twoyears', JSON.parse(result.content));
        }
    });

    Meteor.call('CURRENT_WEEK.get', function(error, result) {
        if (error) {
            console.log(error);
        } else {
            Session.setPersistent('currentweek', JSON.parse(result.content)[0]['WEEK']);
        }
    });
});

Template.product.onRendered(function() {
    var currentyear = Session.get('currentYear');
    var pastyear = Session.get('pastYear');
    var twoyears = Session.get('twoyears');
    var currentWeek = Session.get('currentweek');

    var d3 = Plotly.d3;
    var gd3 = d3.select('div[id="plot_1"]');
    var gd = gd3.node();

    function stringToWeek(x) {
        return x + '주';
    }

    var week1 = [],
        week2 = [];

    var pastBCNT = [],
        pastGCNT = [],
        pastEU_DUSU = [],
        currentBCNT = [],
        currentGCNT = [],
        currentEU_DUSU = [];

    $.each(twoyears, function(i, val) {
        if (twoyears[i].YEAR === pastyear.toString()) {
            if (twoyears[i].CATEGORY === 'BCNT') {
                pastBCNT.push(twoyears[i].VALUE);
                week1.push(twoyears[i].WEEK);
            } else if (twoyears[i].CATEGORY === "GCNT") {
                pastGCNT.push(twoyears[i].VALUE);
            } else {
                pastEU_DUSU.push(twoyears[i].VALUE);
            }
        } else {
            if (twoyears[i].CATEGORY === "BCNT") {
                currentBCNT.push(twoyears[i].VALUE);
                week2.push(twoyears[i].WEEK);
            } else if (twoyears[i].CATEGORY === "GCNT") {
                currentGCNT.push(twoyears[i].VALUE);
            } else {
                currentEU_DUSU.push(twoyears[i].VALUE);
            }
        }
    });

    for (i = 0; i < 3; i++) {
        currentBCNT.pop();
        currentGCNT.pop();
        currentEU_DUSU.pop();
    }

    var period = [];
    for (i = 0; i < 52; i++) {
        period[i] = stringToWeek(week1[i]);
    }

    var trace1 = {
        x: period,
        y: pastGCNT,
        connectgaps: true,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.8
        },
        name: pastyear + "년 교배복수"
    };

    var trace2 = {
        x: period,
        y: pastBCNT,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.5
        },
        name: pastyear + "년 분배복수"
    };

    var trace3 = {
        x: period,
        y: pastEU_DUSU,
        rotation: 90,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.5
        },
        name: pastyear + "년 이유두수"
    };

    var trace4 = {
        x: period,
        y: currentGCNT,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.5
        },
        name: currentyear + "년 교배복수"
    };

    var trace5 = {
        x: period,
        y: currentBCNT,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.5
        },
        name: currentyear + "년 분배복수"
    };

    var trace6 = {
        x: period,
        y: currentEU_DUSU,
        mode: 'lines+markers',
        marker: {
            size: 8,
            opacity: 0.5
        },
        name: currentyear + "년 이유두수"
    };

    var gcntData = [trace1, trace4];
    var bcntData = [trace2, trace5];
    var eu_dusuData = [trace3, trace6];

    var data = gcntData;

    var layout = {
        title: '돼지 사육 동향 <br> ',
        titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
        },
        showlegend: false,
        annotations: [{
            yanchor: 'top',
            y: 1.1,
            yref: 'paper',
            xanchor: 'right',
            x: 1,
            xref: 'paper',
            text: '현재 ' + currentWeek + ' 주차',
            showarrow: false,
            font: {
                size: 16
            }
        }]
    };

    Plotly.newPlot(gd, data, layout);

    $('input[name="optradio"]').click(function() {
        if (this.value === "BCNT") {
            var data = bcntData;
            Plotly.newPlot(gd, data, layout);
        } else if (this.value === "GCNT") {
            var data = gcntData;
            Plotly.newPlot(gd, data, layout);
        } else {
            var data = eu_dusuData;
            Plotly.newPlot(gd, data, layout);
        }
    });

    window.onresize = function() {
        Plotly.Plots.resize(gd);
    };

});
