var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    FormView.fillRoomsMenu();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  fetch: function(callback = () => {}, selectedRoom = 'all') {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);

      //iterate over data.results
      // var count = 0;

      data.results.forEach((item) => {
        if (!item.username) {
          item.username = 'anonymous';
        }
        if (selectedRoom !== 'all') {
          if (item.text && item.roomname === selectedRoom) {
            item.username = _.escape(item.username);
            item.text = _.escape(item.text);
            $('#chats').append(MessageView.renderWithRoomName(item));
            // check to see if the username exists on the Friends obj
            if (Friends.friendsObj[`${item.username}`]) {
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'dodgerBlue');
            }
          }
        } else {
          item.username = _.escape(item.username);
          item.text = _.escape(item.text);
          if (item.text && !item.roomname) {
            $('#chats').append(MessageView.render(item));
            // check to see if the username exists on the Friends obj
            if (Friends.friendsObj[`${item.username}`]) {
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'dodgerBlue');
            }
          }
          if (item.roomname && item.text) {
            $('#chats').append(MessageView.renderWithRoomName(item));
            // check to see if the username exists on the Friends obj
            if (Friends.friendsObj[`${item.username}`]) {
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'dodgerBlue');
            }
          }
        }
      });
      // App.stopSpinner();
      Friends.initialize();
      callback();
    });
  },

  startSpinner: function() {
    App.$spinner.show();
    FormView.setStatus(true);
  },

  stopSpinner: function() {
    App.$spinner.fadeOut('fast');
    FormView.setStatus(false);
  },
};
