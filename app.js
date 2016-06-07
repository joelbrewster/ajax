$(function() {
  $.ajax({
    url:'https://www.reddit.com/r/funny.json',
    method:'GET',
    success: function(data){
      console.log(data);
      for (var i = 0; i < data.data.children.length; i++) {
        var post = data.data.children[i];
        $('body').append($('<p>').text(post.data.title));
      }
    },
    error: function(data){
      console.log(data);
    },
  });

  // var request = new XMLHttpRequest();
  // //request.open ("PROTOCOL", "URL");
  // request.open("GET", "https://www.reddit.com/r/funny.json");
  // request.send();


  // request.onreadystatechange = function(){
  //   console.log("Ready State: " + request.readyState);
  //   if (request.readyState === 4) {
  //     var data = JSON.parse(request.responseText);
  //     console.log(data);
  //   }
  // }

});
