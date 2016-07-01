// Route Configure
Router.configure({
    trackPageView: true
});

// Test
Router.route('/test', function() {
    this.render('test');
});

// Main

Router.route('/', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('main', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('mainNews_A'));
    this.wait(Meteor.subscribe('mainNews_B'));
    this.wait(Meteor.subscribe('mainNews_C'));
    this.wait(Meteor.subscribe('mainFocus_A'));
    this.wait(Meteor.subscribe('mainFocus_B'));
    this.wait(Meteor.subscribe('mainFocus_C'));
    this.wait(Meteor.subscribe('mainCorps'));
    this.wait(Meteor.subscribe('mainCardNews'));
    this.wait(Meteor.subscribe('mainInfographic'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'main'
});


// Data - Market

Router.route('/data/product', {
    layoutTemplate: 'layout_app',
    template: 'product',
    yieldRegions: {
        '': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_product'
});


// Data - Market

Router.route('/data/market', {
    layoutTemplate: 'layout_app',
    template: 'market',
    yieldRegions: {
        '': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_market'
});


// Data - Stats - Pig - Pops

Router.route('/data/stats/pig/pops', {
    layoutTemplate: 'layout_app',
    template: 'stats_pig_pops',
    yieldRegions: {
        'stats_pig_category': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_stats_pig_pops'
});


// Data - Stats - Pig - Grade

Router.route('/data/stats/pig/grade', {
    layoutTemplate: 'layout_app',
    template: 'stats_pig_grade',
    yieldRegions: {
        'stats_pig_category': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_stats_pig_grade'
});


// Data - Stats - Livestock - Pig - Pops - ByScale

// Router.route('/data/stats/livestock/pig_pops_by_scale', {
//     layoutTemplate: 'layout_app',
//     template: 'stats_livestock_pig_pops_by_scale',
//     yieldRegions: {
//         'stats_livestock_category': {to: 'sidebar_left'},
//         'banner': {to: 'sidebar_right'}
//     },
//     waitOn: function() {
//         return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
//     }
// }, {
//     name: 'data_stats_livestock_pig_pops_by_scale'
// });


// News

Router.route('/news/:category/:page', function() {
    this.layout('layout_app');
    this.render('news_category', {to: 'sidebar_left'});
    this.render('news', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'news'
});


// Card News

Router.route('/cardnews/:page', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('card_news', {
        to: 'main'
    });
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'cardnews'
});


// Corps

Router.route('/corps/:page', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('corps', {
        to: 'main'
    });
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'corps'
});

Router.route('/corps_post/:postId', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('corps_post', {
        to: 'main',
        data: {
            postId: this.params.postId
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('corpsPost', this.params.postId));
}, {
    name: 'corps_post'
});


// Focus

Router.route('/focus/:category/:page', function() {
    this.layout('layout_app');
    this.render('focus_category', {to: 'sidebar_left'});
    this.render('focus', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'focus'
});

Router.route('/focus_post/:postId', function() {
    this.layout('layout_app');
    this.render('focus_category', {to: 'sidebar_left'});
    this.render('focus_post', {
        to: 'main',
        data: {
            postId: this.params.postId
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('focusPost', this.params.postId));
}, {
    name: 'focus_post'
});


// Favorites

Router.route('/favorites', function() {
    this.layout('layout_app');
    this.render('favorites_category', {to: 'sidebar_left'});
    this.render('favorites_summary', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('favoritesSummary'));
}, {
    name: 'favorites'
});

Router.route('/favorites/:category', function() {
    this.layout('layout_app');
    this.render('favorites_category', {to: 'sidebar_left'});
    this.render('favorites', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('favoritesList', this.params.category));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'favorites_category'
});


// Infographic

Router.route('/infographic/:page', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('infographic', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'infographic'
});


// Events

Router.route('/events', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('events', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('events'));
}, {
    name: 'events'
});

// Pigplan Inroduction

Router.route('/pigplan/intro', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('pigplan_intro', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_intro'
});

// Pigplan Feature

Router.route('/pigplan/feature', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('pigplan_feature', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_feature'
});

// Pigplan Use Case

Router.route('/pigplan/case/:page', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('case', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_case'
});

Router.route('/case_post/:postId', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('case_post', {
        to: 'main',
        data: {
            postId: this.params.postId
        }
    });
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('casePost', this.params.postId));
}, {
    name: 'pigplan_case_post'
});
