Template.focus_post.onRendered(function() {
    try {
        FB.XFBML.parse();
    } catch (e) {}
});

Template.focus_post.helpers({
    post: function() {
        var postId = this.postId;
        return Focus.find({
            _id: postId
        }).fetch()[0];
    }
});

Template.focus_post.events({
    'click .nv-share': function() {
        window.open('http://band.us/plugin/share?body=' + $('h1').text() + '&route=' + encodeURIComponent(document.URL), 'bandsharedialog', 'menubar=no,toolbar=no,resizable=no,scrollbars=yes,height=540,width=410');
        return false;
    },
    'click .kk-share': function() {
        window.open('https://story.kakao.com/share?url=' + encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
        return false;
    },
    'click .fb-share': function() {
        window.open('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL),
            'facebooksharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=540,width=410');
        return false;
    }
})
