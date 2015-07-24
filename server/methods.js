// Server methods are likely queued of client cannot connect to the server
Meteor.methods({
    insertMessage: function(messageText, channel) {
        var message = {
            messageText: messageText,
            timestamp: new Date(),
            userId: Meteor.userId(),
            channel: channel
        };

        Messages.insert(message);
    }
});
