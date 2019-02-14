var RoomsView = {
  $button: $('#rooms button'),
  $select: $('#rooms select'),

  initialize: function() {
    $(this.$select).change(function(event) {
      var option = $('.roomSelector')
        .children('option:selected')
        .val();
      // console.log(
      //   $('.roomSelector')
      //     .children('option:selected')
      //     .val()
      // );
      App.startSpinner();
      $('#chats').html('');
      App.fetch(App.stopSpinner, option);
    });
    $('.refreshMessages').on('click', () => {
      var option = $('.roomSelector')
        .children('option:selected')
        .val();
      App.startSpinner();
      // fillRoomsMenu();
      $('#chats').html('');
      App.fetch(App.stopSpinner, option);
    });
  },

  render: function() {},
};
