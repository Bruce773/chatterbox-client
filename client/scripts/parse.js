var Parse = {
  server: `http://parse.${
    window.CAMPUS
  }.hackreactor.com/chatterbox/classes/messages`,

  create: function(messageText, successCB, errorCB = null) {
    // todo: save a message to the server

    /*
    ? The main goal is to built this object:
    var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };
    -Check for room selected by .roomSelector
    $('.roomSelector').children('option:selected').val();
      -
    -Check for username in the URL
    -Check for message in #message input

    Fill in message obj with the data gathered above

    Submit POST request through AJAX. Code found on Learn.

    */

    var selectedRoom = $('.roomSelector')
      .children('option:selected')
      .val();
    var message = {
      username: '',
      text: '',
    };

    message.username = App.username;
    message.text = messageText;
    if (selectedRoom !== 'all') {
      message.roomname = selectedRoom;
    }

    console.log(selectedRoom);

    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.rpt.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function(data) {
        console.log('chatterbox: Message sent');
      },
      error: function(data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      },
    });
    $('#chats').html('');
    App.fetch();
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error:
        errorCB ||
        function(error) {
          console.error('chatterbox: Failed to fetch messages', error);
        },
    });
  },
};
