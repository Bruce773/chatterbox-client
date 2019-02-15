var FormView = {
  $form: $('form'),

  initialize: function() {
    FormView.$form.on('submit', FormView.handleSubmit);
    $('.addRoomBtn').on('click', FormView.createNewRoom);
  },

  handleSubmit: function(event) {
    // Stop the browser from submitting the form
    event.preventDefault();
    var option = $('.roomSelector')
      .children('option:selected')
      .val();
    var text = $('#message').val();
    Parse.create(text);
    $('#chats').html('');
    App.fetch(App.stopSpinner, option);
    $('#message').val(' ');
    console.log('click!');
  },

  setStatus: function(active) {
    var status = active ? 'true' : null;
    FormView.$form.find('input[type=submit]').attr('disabled', status);
  },
  fillRoomsMenu: function() {
    Parse.readAll((data) => {
      var roomsObj = {};
      // iterate over data.results
      data.results.forEach(function(item) {
        // if there's a room add it to the roomsObj
        if (item.roomname) {
          roomsObj[item.roomname] = item.roomname;
        }
      });
      // $('.roomSelector').html('').prepend('<option value="all">All Rooms</option>');
      // iterate over roomsObj
      for (key in roomsObj) {
        // create option in .roomSelector that equals current key
        // console.log(key);
        $('.roomSelector').append(`<option value='${key}'>${key}</option>`);
      }
    });
  },
  createNewRoom: function() {
    var text = $('#message').val();
    if (!text) {
      alert(
        "You haven't entered in a room name. Please enter in a room name and try again!"
      );
    } else {
      $('.roomSelector').append(`<option value="${text}">${text}</option>`);
    }
  },
};
