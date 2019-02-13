var App = {
  $spinner: $('.spinner img'),

  username: 'anonymous',

  initialize: function() {
    App.username = window.location.search.substr(10);

    FormView.initialize();
    RoomsView.initialize();
    MessagesView.initialize();

    // Fetch initial batch of messages
    App.startSpinner();
    App.fetch(App.stopSpinner);
  },

  fetch: function(callback = () => {}) {
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
        if (item.text) {
          item.username = _escapeChars(item.username);
          item.text = _escapeChars(item.text);
          $('#chats').append(MessageView.render(item));
        }
      });
      App.stopSpinner();
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
