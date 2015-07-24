Meteor.methods({
    insertMessage: function(messageText) {
        var message = {
            messageText: '** '+ messageText + '**',
            timestamp: new Date(),
            userId: Meteor.userId()
        };

        Messages.insert(message);
    }
});
