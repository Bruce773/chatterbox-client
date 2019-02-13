var Parse = {

  server: `http://parse.${window.CAMPUS}.hackreactor.com/chatterbox/classes/messages`,

  create: function(message, successCB, errorCB = null) {
    // todo: save a message to the server

    /*
    ? The main goal is to built this object:
    var message = {
      username: 'shawndrost',
      text: 'trololo',
      roomname: '4chan'
    };

    -Check for room selected by .roomSelector
      -If no room selected return popup telling the user to select a room
    -Check for username in the URL
    -Check for message in #message input

    Fill in message obj with the data gathered above

    Submit POST request through AJAX. Code found on Learn.

    */
  },

  readAll: function(successCB, errorCB = null) {
    $.ajax({
      url: Parse.server,
      type: 'GET',
      data: { order: '-createdAt' },
      contentType: 'application/json',
      success: successCB,
      error: errorCB || function(error) {
        console.error('chatterbox: Failed to fetch messages', error);
      }
    });
  }

};