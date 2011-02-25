$(document).ready(function(){
      
  var videoPlayer = VideoJS.setup('cove-video-player',{
//    offset: 30,
    controlsHiding: false
  });

  $("button.markstart").click(function(){
    videoPlayer.markSnippetStart();
    return false;
  });
  
  $("button.markend").click(function(){
    videoPlayer.markSnippetEnd();
    return false;
  });
  
  $('.interval_form').hide();
  $('.mark_times').hide();
  $('.create_interval_button').click(function(){
    $('.create_interval_button').hide();
    $('.mark_times').show("slide", {direction: "up"}, 1000);
    $('.interval_form').show("slide", {direction: "left"}, 1000);
    return false;
  });
  
  $('button.cancel').click(function(){
    $('.interval_form').hide("slide", {direction: "left"}, 1000);
    $('.mark_times').hide("slide", {direction: "up"}, 1000);
    $('.create_interval_button').show();
    return false;
  });
  
   $('button.save').click(function(){
    $('.interval_form').hide("slide", {direction: "left"}, 1000);
    $('.mark_times').hide("slide", {direction: "up"}, 000);
    $('.create_interval_button').show();
    return false;
  });
  
  $('.snippet_edit').hide();
  $('.snippet').click(function(){
    $('.interval_form').hide();
    $('.snippet_edit').show();
    return false;
  });
    
 
  $('#new_snippet').submit(function(event){
    $('#snippet_offset').val( videoPlayer.snippetStart() );
    $('#snippet_duration').val( videoPlayer.snippetDuration() );

    var target = $(event.target);

    // This part borrowed from Paul
    $.ajax({
      type: 'POST' ,
      url: target.attr( 'action' ),
      data: target.serialize(),
      beforeSend: function(xhr) {
        xhr.setRequestHeader("Accept",'text/html');
      },
      success: function(data) {
        $('#snippet_list').html(data);
        setTimeout( function() { jQuery(".noticeSuccessful").fadeTo(1000,0); }, 6000);
        setTimeout( function() { jQuery(".noticeErrors").fadeTo(1000,0); }, 30000);
        clearTimeout();
        return false;
      },
      dataType: 'text'
    });
    return true;
  });
});


