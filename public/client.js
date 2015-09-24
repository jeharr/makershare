$(function(){

  $.get('/users', appendToList);

  $('form').on('submit', function(event) {
    event.preventDefault();

    var form = $(this);
    var userData = form.serialize();

    $.ajax({
      type: 'POST', url: '/users', data: userData
    })
    .success(function(userName){
      console.log(userName);
      appendToList([userName]);
      form.trigger('reset');
    });
  });

  function appendToList(users) {
    var list = [];
    var content, user;
    console.log(users);
    for(var i in users){
      user = users[i];
      content = '<p >'+user+ '</p>';
      list.push($('<li>', { html: content }));
    }

    $('.user-list').append(list)
  }

    var target = $(event.currentTarget);

});
