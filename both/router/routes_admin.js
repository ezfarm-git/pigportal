Router.onBeforeAction(function() {
    if(!Meteor.userId()) {
        Router.go('/signin');
    } else {
        this.next();
    }
}, {
    only: ['admin_main', 'admin_news', 'admin_cardnews', 'admin_events', 'admin_corps',
           'admin_focus', 'admin_favorites', 'admin_infographic', 'admin_pigplan_case']
});

// Admin main

Router.route('/admin', function() {
    this.layout('layout_admin');
    this.render('main_admin', {to: 'main'});
}, {
    name: 'admin_main'
});


// Admin signin

Router.route('/signin', function() {
    this.render('signin', {to: 'main'});
}, {
    name: 'signin'
});

// News

Router.route('/admin/news', function() {
    this.layout('layout_admin');
    this.render('news_admin', {to: 'main'});
    this.wait(Meteor.subscribe('newsListAdmin'));
}, {
    name: 'admin_news'
});


// Card News

Router.route('/admin/cardnews', function() {
    this.layout('layout_admin');
    this.render('card_news_admin', {to: 'main'});
    this.wait(Meteor.subscribe('cardNewsListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_cardnews'
});


// Events

Router.route('/admin/events', function() {
    this.layout('layout_admin');
    this.render('events_admin', {to: 'main'});
    this.wait(Meteor.subscribe('events'));
}, {
    name: 'admin_events'
});


// Corps

Router.route('/admin/corps', function() {
    this.layout('layout_admin');
    this.render('corps_admin', {to: 'main'});
    this.wait(Meteor.subscribe('corpsListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_corps'
});


// Focus

Router.route('/admin/focus', function() {
    this.layout('layout_admin');
    this.render('focus_admin', {to: 'main'});
    this.wait(Meteor.subscribe('focusListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_focus'
});


// Favorites

Router.route('/admin/favorites', function() {
    this.layout('layout_admin');
    this.render('favorites_admin', {to: 'main'});
    this.wait(Meteor.subscribe('favoritesListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_favorites'
});

// Infographic

Router.route('/admin/infographic', function() {
    this.layout('layout_admin');
    this.render('infographic_admin', {to: 'main'});
    this.wait(Meteor.subscribe('infographicListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_infographic'
});

// Pigplan Case

Router.route('/admin/pigplan/case', function() {
    this.layout('layout_admin');
    this.render('case_admin', {to: 'main'});
    this.wait(Meteor.subscribe('caseListAdmin'));
    this.wait(Meteor.subscribe('images'));
}, {
    name: 'admin_pigplan_case'
});
