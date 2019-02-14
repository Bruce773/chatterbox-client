var MessageView = {
  render: _.template(`
      <div class="chat">
        <div class="username">
          <%=username%>
        </div>
        <div class='text'>
          <%=text%>
        </div>
      </div>
    `),
  renderWithRoomName: _.template(`
    <div class="chat">
    <div class='outerDiv'>
        <div class="username">
          <%=username%>
        </div>
        <div class='roomNameOnMessage'>
          <%=roomname%>
        </div>
      </div>
      <div class='text'>
        <%=text%>
      </div>
    </div>
  `),
};
