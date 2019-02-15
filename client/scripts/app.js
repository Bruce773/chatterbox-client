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
    // Friends.initialize();
  },

  fetch: function(callback = () => {}, selectedRoom = 'all') {
    Parse.readAll((data) => {
      // examine the response from the server request:
      console.log(data);

      //iterate over data.results
      // var count = 0;

      var _escapeChars = function(string) {
        var newString;
        var stringArr = [];
        // iterate over the characters item.text
        for (var i = 0; i < string.length; i++) {
          // string.charAt(i);
          // if the current char is &
          if (string.charAt(i) === '&') {
            // replace with &amp;
            stringArr.push('&amp;');
          }
          // if the current char is <
          if (string.charAt(i) === '<') {
            // replace with &lt;
            stringArr.push('&lt;');
          }
          // if the current char is >
          if (string.charAt(i) === '>') {
            // replace with &gt;
            stringArr.push('&gt;');
          }
          // if the current char is "
          if (string.charAt(i) === '"') {
            // replace with &quot;
            stringArr.push('&quot;');
          }
          // if the current char is '
          if (string.charAt(i) === `'`) {
            // replace with &#x27;
            stringArr.push('&#x27;');
          }
          // if the current char is /
          if (string.charAt(i) === '/') {
            // replace with &#x2F;
            stringArr.push('&#x2F;');
          } else {
            stringArr.push(string.charAt(i));
          }
        }
        newString = stringArr.join('').toString();
        return newString;
      };

      data.results.forEach((item) => {
        // pass each item into the messageView.render and append the result to #chats div
        // count++;
        // console.log(item, count);

        if (!item.username) {
          item.username = 'anonymous';
        }
        if (selectedRoom !== 'all') {
          if (item.text && item.roomname === selectedRoom) {
            item.username = _escapeChars(item.username);
            item.text = _escapeChars(item.text);
            $('#chats').append(MessageView.renderWithRoomName(item));
            // check to see if the username exists on the Friends obj
            // console.log(Friends.friendsObj, Friends.friendsObj[`${item.username}`], item.username);
            if (Friends.friendsObj[`${item.username}`]) {
              // console.log(item.username, ' is in friends list');
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'red');
            }
          }
        } else {
          if (item.text && !item.roomname) {
            item.username = _escapeChars(item.username);
            item.text = _escapeChars(item.text);
            $('#chats').append(MessageView.render(item));
            // check to see if the username exists on the Friends obj
            // console.log(Friends.friendsObj, Friends.friendsObj[`${item.username}`], item.username);
            if (Friends.friendsObj[`${item.username}`]) {
              // console.log(item.username, ' is in friends list');
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'red');
            }
          }
          if (item.roomname && item.text) {
            $('#chats').append(MessageView.renderWithRoomName(item));
            // check to see if the username exists on the Friends obj
            // console.log(Friends.friendsObj, Friends.friendsObj[`${item.username}`], item.username);
            if (Friends.friendsObj[`${item.username}`]) {
              // console.log(item.username, ' is in friends list');
              // add highlight style to $('.username:contains(item.username)').css("color", "light-blue");
              $(`.username:contains('${item.username}')`).css('color', 'red');
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
