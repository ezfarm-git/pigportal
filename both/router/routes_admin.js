// News

Router.route('/admin/news', function() {
    this.layout('layout_admin');
    this.render('news_admin', {to: 'main'});
    this.wait(Meteor.subscribe('newsListAdmin'));
});


// Card News

Router.route('/admin/cardnews', function() {
    this.layout('layout_admin');
    this.render('card_news_admin', {to: 'main'});
    this.wait(Meteor.subscribe('cardNewsListAdmin'));
    this.wait(Meteor.subscribe('images'));
});


// Focus

Router.route('/admin/focus', function() {
    this.layout('layout_admin');
    this.render('focus_admin', {to: 'main'});
    this.wait(Meteor.subscribe('focusListAdmin'));
    this.wait(Meteor.subscribe('images'));
});


// Favorites

Router.route('/admin/favorites', function() {
    this.layout('layout_admin');
    this.render('favorites_admin', {to: 'main'});
    this.wait(Meteor.subscribe('favoritesListAdmin'));
    this.wait(Meteor.subscribe('images'));
});

// Infographic

Router.route('/admin/infographic', function() {
    this.layout('layout_admin');
    this.render('infographic_admin', {to: 'main'});
    this.wait(Meteor.subscribe('infographicListAdmin'));
    this.wait(Meteor.subscribe('images'));
});
