// Route Configure
// Router.configure({
//     trackPageView: true
// });

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
    name: 'main',
    trackPageView: true
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
    name: 'data_market',
    trackPageView: true
});


// Data - Stats - PigPops

Router.route('/data/stats/pigpops', {
    layoutTemplate: 'layout_app',
    template: 'stats_pigpops',
    yieldRegions: {
        'stats_category': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_stats_pigpops',
    trackPageView: true
});


// Data - Stats - Grade

Router.route('/data/stats/grade', {
    layoutTemplate: 'layout_app',
    template: 'stats_grade',
    yieldRegions: {
        'stats_category': {to: 'sidebar_left'},
        'banner': {to: 'sidebar_right'}
    },
    waitOn: function() {
        return [IRLibLoader.load('https://cdn.plot.ly/plotly-latest.min.js')];
    }
}, {
    name: 'data_stats_grade',
    trackPageView: true
});


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
    name: 'news',
    trackPageView: true
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
    name: 'cardnews',
    trackPageView: true
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
    name: 'corps',
    trackPageView: true
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
    name: 'corps_post',
    trackPageView: true
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
    name: 'focus',
    trackPageView: true
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
    name: 'focus_post',
    trackPageView: true
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
    name: 'favorites',
    trackPageView: true
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
    name: 'favorites_category',
    trackPageView: true
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
    name: 'infographic',
    trackPageView: true
});


// Events

Router.route('/events', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('events', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('events'));
}, {
    name: 'events',
    trackPageView: true
});

// Pigplan Inroduction

Router.route('/pigplan/intro', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('pigplan_intro', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_intro',
    trackPageView: true
});

// Pigplan Feature

Router.route('/pigplan/feature', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('pigplan_feature', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_feature',
    trackPageView: true
});

// Pigplan Use Case

Router.route('/pigplan/case/:page', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('case', {to: 'main'});
    this.render('banner', {to: 'sidebar_right'});
}, {
    name: 'pigplan_case',
    trackPageView: true
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
    name: 'pigplan_case_post',
    trackPageView: true
});
