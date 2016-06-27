Template.corps_post.helpers({
    post: function() {
        var postId = this.postId;
        return Corps.find({
            _id: postId
        }).fetch()[0];
    }
});

Template.corps_post.events({
    'click .nv-share': function() {
        window.open("//band.us/plugin/share?body=hello&route=www.bloter.net", "share_band", "width=410, height=540, resizable=no");
    },
    'click .kk-share': function() {
        window.open('https://story.kakao.com/share?url='+encodeURIComponent(document.URL), 'kakaostorysharedialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=300,width=600');return false;
    },
    'click .fb-share': function() {
        window.open('https://www.facebook.com/dialog/share?app_id=150240602048486&display=popup&href='+encodeURIComponent(document.URL)+'&redirect_uri=http://pig-portal.herokuapp.com');return false;
    }
})
