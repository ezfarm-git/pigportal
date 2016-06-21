Template.market.onRendered(function() {
    let ServiceKey = 'JmEE9KKsD6GqqAE4gVCOzdm5IGFturnWcpM1vM5LUTuR9LR2CXdFre2PWLao3Bd5ausrhrckUDclysY3y9BNqw%3D%3D';

    var trace1 = {
        x: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        type: 'box',
        boxmean: true,
        name: '지난해 가격'
    };

    var trace2 = {
        x: [2, 3, 3, 3, 3, 5, 6, 6, 7],
        boxpoints: 'all',
        jitter: 0.3,
        pointpos: -1.8,
        type: 'box',
        boxmean: true,
        name: '이번 주 가격'
    };

    var data = [trace1, trace2];

    var layout = {
        title: '금주의 도축장별 경락가격',
        titlefont: {
            family: 'Jeju Gothic, serif',
            size: 22,
            color: '#2c3e50'
        },
        showlegend: false
    };

    Plotly.newPlot('market_plot', data, layout);
});
