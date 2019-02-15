var Friends = {
  friendsObj: {},
  initialize: function() {
    // console.log('Friends was initialized!');
    $('.username').on('click', function(event) {
      // console.log(Object.keys(event));
      var usernameText = $(event.target).text().trim();
      // console.log($(event.target).text().trim());
      Friends.friendsObj[usernameText] = usernameText;
      // console.log(Friends.friendsObj);
      $('.refreshMessages').click();
    });
  },
};
