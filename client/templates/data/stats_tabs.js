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
            name: 'Plot1',
            slug: 'plot1',
            onRender: function(slub, tmpl) {
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

                Plotly.newPlot('plot_1', data, layout);
            }
        }, {
            name: 'Plot2',
            slug: 'plot2'
        }, {
            name: 'Plot3',
            slug: 'plot3',
            onRender: function(slug, tmpl) {

            }
        }];
    }
})
