$(function(){

  function getRedditPosts(redditID){
    var _url: 'https://www.reddit.com/r/funny.json?count=12';
    _url += redditID == undefined ? '' : '$after=' + redditID;
    $.ajax({
      url:_url
      method: 'GET',
      success: function(data){
        for (var i = 0; i < data.data.children.length; i++) {
          var post = data.data.children[i];
          // console.log(post.data.preview.images[0].resolutions[0].url);
          var postDiv = $('<div>')
          .addClass('post').data('reddit-id', post.data.name);
          postDiv.append($('<p>').text(post.data.title).attr("id", i+1));
          $('#posts').append(postDiv);

          var postThumb = $('<img>').attr("src", post.data.thumbnail);
          postDiv.append(postThumb);
        }
      },
      error: function(data){
        console.log(data);
      }
    });
  }
  getRedditPosts();

  $('#next').on('click', function() {
    // Load the next set of posts from reddit
    var lastID = $('.post:last-of-type').data('reddit-id');
  });
});
