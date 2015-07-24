// Notes
// Session is client only and gets reset after every page refresh - seems like it is designed to be used with a SPA.

// client.startup is called as soon as the DOM is ready
Meteor.startup(function() {
    console.log('Starting up Meteor App - Client');
    Session.set('currentChannel', 'general');
});

Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
});

// Helpers not attached to any specific template are available for all
Template.registerHelper('usernameFromId', function(userId) {
    var user = Meteor.users.findOne({
        _id: userId
    });

    // If no user found
    if (!user) {
        return "Anonymous";
    }

    // If user is authenticated via FB
    if (((user.services || {}).facebook)) {
        return user.services.facebook.name;
    }

    return user.username || 'Anonymous';
});

Template.registerHelper('timestampToTime', function(stamp) {

    if (!stamp) {
        return '';
    }

    var date = new Date(stamp);

    if (date == 'Invalid Date') {
        return '';
    }

    var s = date.getSeconds();
    var m = date.getMinutes();
    var h = date.getHours();

    return (h + ':' + m + ':' + s);
});

Template.registerHelper('deCuss', function(messageText) {
    // Remove profanities here
    return messageText;
});

Template.registerHelper('focusedChannel', function() {
    return Session.get('currentChannel');
});

Template.messages.helpers({
    // DB queries are categorized as a 'reactive data source'
    // All clients are automatically subscribed to any changes to this data source if 'auto-publish' package is used.
    // 	Otherwise only the published dataset is visible
    // The .find() below probably only works on the dataset that is available on the client side via minimongo (as this code is client only)
    // minimongo on the client side over DDP facilitates this live tracking.
    // The 'reactive' views are refreshed with every such update in the data (Blaze view engine).
    messageList: Messages.find({})
});


Template.listings.helpers({
    // {reactive: false} makes the query non reactive
    channelList: Channels.find()
});

Template.footer.helpers({
    userId: Meteor.userId()
});


// No need to do this on click, we do this when route changes and use the route to set the channel name
// Template.channel.events({
//     'click .channel': function(event) {
//         //event.preventDefault();
//         Session.set('currentChannel', this.channelName);
//     }
// });

// Inside a template helper, 'this' is bound to the template parameters
Template.channel.helpers({
    isActive: function() {
        if (this.channelName === Session.get('currentChannel')) {
            return ' active'
        } else {
            return '';
        }
    }
});
