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
  
  $('.snippet_info').hide();
  $('.interval_form').hide();
  $('.mark_times').hide();
  $('.mark_buttons').hide();
  $('.create_interval_button').click(function(){
    $('.create_interval_button').hide();
    $('.mark_buttons').show("slide", {direction: "left"}, 2000);
    $('.interval_form').show("slide", {direction: "left"}, 2050);
    $('.snippet_info').hide();
    return false;
  });
  
  $('button.cancel').click(function(){
    $('.interval_form').hide("slide", {direction: "left"}, 500);
    $('.mark_buttons').hide("slide", {direction: "left"}, 500);
    $('.create_interval_button').show();
    return false;
  });
  
  $('.snippet_edit').hide();
  $('.snippet').click(function(){
    $('.interval_form').hide();
    $('.snippet_info').show();
    $('.mark_buttons').delegate().hide("slide", {direction: "left"}, 500);
    return false;
  });
  
  $('button.delete').click(function(){
    $('.snippet_info').hide();
    $('.create_interval_button').show();
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

/* Definition Function */
$(document).ready(function(){
	var hoverstatus = [];
	var offX = 4;
	var offY = 0;
	var zindex_inc = 1000;
	$(".define_me")
		.live("mouseenter lookup", function(e){
			var name = $(this).text();
			var offset = $(this).offset();
			var width = $(this).width();
			hoverstatus[name] = 1;
			if($("#definition_"+name.replace(" ", "_")).length){
				$("#definition_"+name.replace(" ", "_")).fadeIn("fast");
			}else{
				$.get(
					"/definitions/"+name,
					function(data){
						var def = $(data)
							.find(".definition_holder")
							.first()
							.prependTo("body")
							.css("z-index", zindex_inc++)
							.hide()
							.attr("id", "definition_"+name.replace(" ", "_"));
						if(hoverstatus[name]){
							def
								.fadeIn("fast")
								.css("position", "absolute")
								.css("top", (offset.top + offY) + "px")
								.css("left", (offset.left + width + offX) + "px");
						}
					}
				);
			}
		})
		.live("mousemove", function(e){
			var name = $(this).text();
			var offset = $(this).offset();
			var width = $(this).width();
			$("#definition_"+name.replace(" ", "_"))
				.css("position", "absolute")
				.css("top", (offset.top + offY) + "px")
				.css("left", (offset.left + width + offX) + "px");
		})
		.live("mouseleave", function(){
			var name = $(this).text();
			hoverstatus[name] = 0;
			$("#definition_"+name.replace(" ", "_")).trigger("goaway");
		});
	$(".definition_holder").live("goaway",function(){
		$(this).fadeOut("fast");
	});
	
	$(".fauxselect_button").click(function(){
		$(this).parent().find(".fauxselect").toggle("blind",{},"fast");
	});
	$(".fauxselect").hide();
});


