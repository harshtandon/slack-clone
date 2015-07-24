Router.configure({
    layoutTemplate: 'app'
});

Router.route('/', function() {
    this.redirect('/general');
})

// The variables are available inside the template as the variable name also
Router.route('/:channelName', function() {
    Session.set('currentChannel', this.params.channelName);
    this.render('messages');
});
