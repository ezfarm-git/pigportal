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


// Calendar

Router.route('/calendar', function() {
    this.layout('layout_app');
    this.render('', {to: 'sidebar_left'});
    this.render('calendar', {to: 'main'});
    this.render('', {to: 'sidebar_right'});
});

//

// Router.route('/admin', {
//     layoutTemplate: 'layout_app',
//     yieldRegions: {
//         '', {to: 'sidebar_left'},
//         'admin', {to: 'main'},
//         '', {to: 'sidebar_right'}
//     },
//     subscriptions: function() {
//         this.subscribe('category');
//         this.subscribe('products');
//         this.register('categorieslist', Meteor.subscribe('category'));
//         this.register('productsList', Meteor.subscribe('products'));
//     },
//     action: function() {
//         this.render();
//     }
//     action: function() {
//         if(Roles.userIsInRole(Meteor.userId(), 'admin')) {
//             BlazeLayout.render('layout', {sidebar_left:'', main:'admin', sidebar_right:''});
//         } else {
//             BlazeLayout.render('layout', {sidebar_left:'', main:'unauthorized', sidebar_right:''});
//         }
//     }
// });

// Router.route('/register', {
//     layoutTemplate: 'layout_app',
//     yieldRegions: {
//         '', {to: 'sidebar_left'},
//         'admin', {to: 'main'},
//         '', {to: 'sidebar_right'}
//     },
//     action: function() {
//         BlazeLayout.render('layout', {sidebar_left:'', main:'register', sidebar_right:''});
//     }
// });
// Router.route('/profile', {
//     action: function() {
//         BlazeLayout.render('layout', {sidebar_left:'', main:'profile', sidebar_right:''});
//     }
// });
// Router.route('/signin', {
//     action: function() {
//         BlazeLayout.render('layout', {sidebar_left:'', main:'signin', sidebar_right:''});
//     }
// });
// Router.route('/signout', {
//     action: function() {
//         Meteor.logout(function(err) {
//             if(!err) {
//                 Router.go('/signin');
//             }
//         })
//     }
// });
// Router.route('/checkout', {
//     action: function() {
//         BlazeLayout.render('layout', {sidebar_left:'', main:'checkout', sidebar_right:''});
//     }
// });
// Router.route('/category/:categoryName', {
//     subscriptions: function(params) {
//         this.register('catlist', Meteor.subscribe("category"));
//         this.register('catproducts',Meteor.subscribe('products'));
//         this.register('usercart', Meteor.subscribe('usercart', Meteor.userId()));
//     },
//     triggersEnter: function(params) {
//         console.log("ENTER", params);
//     },
//     triggersExit: function(params) {
//         console.log("EXIT", params);
//     },
//     action: function() {
//         console.log("Running Action to render templates into layouts")
//         BlazeLayout.render('layout', {sidebar_left:'sidebar', main:'category', sidebar_right:''});
//     }
// });
