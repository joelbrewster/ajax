var page = 0;
var loading = false;
function getRedditPost(redditId,direction){

  var _url = 'https://www.reddit.com/r/jokes.json?count=6';
  // if (redditId == undifined){
    //   _url += '';
    // }else {
      //   _url += '&after=' + redditId;
      // }
      // same as line below
      _url += redditId == undefined ? '' : '&'+direction+'=' +redditId;
      $.ajax({
        url: _url,
        method:'GET',
        success: function(data){
          // $("#title").empty();
          $("#posts").empty();
          for(var i = 0; i < data.data.children.length; i++){
            var post =data.data.children[i];
            var postDiv = $('<div>').addClass('post')
            .data('reddit-id', post.data.name);

            // to call $('.post.eq(0)').data(reddit-id)

            postDiv.append($('<p>').text(post.data.title));
            postDiv.append($('<p>').text('------------------------------------------------------------'));
            postDiv.append($('<p>').text(post.data.selftext));
            // postDiv.append($('<p>').text(post.data.author));
            // postDiv.append($('<p>').text(post.data.created));
            if(post.data.thumbnail && post.data.thumbnail.indexOf('.jpg') != -1){
              postDiv.append($('<img>').attr('src', post.data.thumbnail));
            }

            $('#posts').append(postDiv);

            // $('#title').append($('<p>').text(post.data.title));
            // $('#title').append($('<p>').text("----------------------------------------"));
            // $('#posts').append($('<div>').text(post.data.selftext));
            // $('#posts').append($('<p>').text("========================================"));
          }
          loading = false;
        },
        error: function(data){
          console.log(data);
        }
      });
    }
    var loading = true;
    getRedditPost(undefined);

    $('#next').on('click', function(){
      console.log('shit');
      //load next set of posts
      if(!loading){
        loading = true
        var lastId = $('.post:last-of-type').data('reddit-id');
        page++;
        $('#previous').show();
        getRedditPost(lastId, 'after');
      }
    });
    $('#previous').on('click', function(){
      console.log('shit');
      //load previous set of posts
      if(!loading){
        loading = true
        var firstId = $('.post:first-of-type').data('reddit-id');
        page--;
        if (page == 0){
          $(this).hide();
        }
        getRedditPost(firstId, 'before');
      }
    });
