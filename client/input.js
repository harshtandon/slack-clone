Template.footer.events({
    'keypress input.input-box_text': function(event) {
        if (event.charCode === 13) {
            event.stopPropagation();

            var inputMessage = $(event.target).val();

            if (inputMessage) {
                Meteor.call('insertMessage', inputMessage, Session.get('currentChannel'));
            }

            $(event.target).val("");
            return false;
        }
    }
});
