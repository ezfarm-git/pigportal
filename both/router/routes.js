// Home

Router.route('/', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('home', {to: 'main'});
    this.render('', {to: 'sidebar_right'});
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
    this.render('widget_1', {to: 'sidebar_right'});
}, {
    name: 'news'
});


// Card News

Router.route('/cardnews/:category/:page', function() {
    this.layout('layout_app');
    this.render('card_news_category', {to: 'sidebar_left'});
    this.render('card_news', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('widget_1', {to: 'sidebar_right'});
}, {
    name: 'card_news'
});


// Corps

Router.route('/corps/:category/:page', function() {
    this.layout('layout_app');
    this.render('corps_category', {to: 'sidebar_left'});
    this.render('corps', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('widget_1', {to: 'sidebar_right'});
}, {
    name: 'corps'
});

Router.route('/corps_post/:postId', function() {
    this.layout('layout_app');
    this.render('corps_category', {to: 'sidebar_left'});
    this.render('corps_post', {
        to: 'main',
        data: {
            postId: this.params.postId
        }
    });
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('corpsPost', this.params.postId));
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
    this.render('widget_1', {to: 'sidebar_right'});
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
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('focusPost', this.params.postId));
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
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('favoritesSummary'));
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
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('favoritesList', this.params.category));
    this.wait(Meteor.subscribe('images'));
});


// Infographic

Router.route('/infographic/:category/:page', function() {
    this.layout('layout_app');
    this.render('infographic_category', {to: 'sidebar_left'});
    this.render('infographic', {
        to: 'main',
        data: {
            categoryName: this.params.category
        }
    });
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'infographic'
});


// Events

Router.route('/events', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('events', {to: 'main'});
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('events'));
});

// Case

Router.route('/case/:page', function() {
    this.layout('layout_app');
    this.render('pigplan_category', {to: 'sidebar_left'});
    this.render('case', {to: 'main'});
    this.render('widget_1', {to: 'sidebar_right'});
}, {
    name: 'case'
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
    this.render('widget_1', {to: 'sidebar_right'});
    this.wait(Meteor.subscribe('casePost', this.params.postId));
});
