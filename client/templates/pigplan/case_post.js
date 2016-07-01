Template.case_post.onRendered(function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '150240602048486',
            xfbml: true,
            version: 'v2.5'
        });
    };

    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
});

Template.case_post.helpers({
    post: function() {
        var postId = this.postId;
        return Case.find({
            _id: postId
        }).fetch()[0];
    }
});

Template.case_post.events({
    'click .nv-share': function() {
        window.open('http://band.us/plugin/share?body=' + $('article').html() + '&route=' + encodeURIComponent(document.URL), 'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
        return false;
    },
    'click .kk-share': function() {
        window.open('https://story.kakao.com/share?url=' + encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
        return false;
    },
    // 'click .fb-share': function() {
    //     window.open('https://www.facebook.com/dialog/share?app_id=150240602048486&display=popup&href=' + encodeURIComponent(document.URL) + '&redirect_uri=http://pig-portal.herokuapp.com', 'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
    //     return false;
    // }
    'click .fb-share': function() {
        FB.ui({
            method: 'share',
            href: window.location.href,
            title: $('h1').text(),
            picture: $('#hidden-image').attr('src')
        }, function(response){});
    }
})
