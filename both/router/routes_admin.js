// News

Router.route('admin/news', function() {
    this.layout('layout_admin');
    this.render('news_admin', {to: 'main'});
    this.wait(Meteor.subscribe('newsListAdmin'));
});


// Focus

Router.route('/admin/focus', function() {
    this.layout('layout_admin');
    this.render('focus_admin', {to: 'main'});
    this.wait(Meteor.subscribe('focusListAdmin'));
    this.wait(Meteor.subscribe('images'));
});
