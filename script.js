/* Author: 
    Ryan Gibbons ( rtgibbons )
*/
$(function() {
$(document).ready(function(){
    //set random position and angle
    $(".pic").each(function() { 
       throwAround($(this)); 
    });
	// Executed once all the page elements are loaded
	var preventClick=false;
	$(".pic a").bind("click",function(e){

		/* This function stops the drag from firing a click event and showing the lightbox */
		if(preventClick)
		{
			e.stopImmediatePropagation();
			e.preventDefault();
		}
	});

	$(".pic").draggable({

		/* Converting the images into draggable objects */
		containment: 'parent',
		start: function(e,ui){
			/* This will stop clicks from occuring while dragging */
			preventClick=true;
		},
		stop: function(e, ui) {
			/* Wait for 250 milliseconds before re-enabling the clicks */
			setTimeout(function(){ preventClick=false; }, 250);
		}
	});

	$('.pic').mousedown(function(e){
		/* Executed on image click */
		var maxZ = 0;

		/* Find the max z-index property: */
		$('.pic').each(function(){
			var thisZ = parseInt($(this).css('zIndex'))
			if(thisZ>maxZ) maxZ=thisZ;
		});

		/* Clicks can occur in the picture container (with class pic) and in the link inside it */
		if($(e.target).hasClass("pic"))
		{
			/* Show the clicked image on top of all the others: */
			$(e.target).css({zIndex:maxZ+1});
		}
		else $(e.target).closest('.pic').css({zIndex:maxZ+1});

        $(this).css('-moz-transform','rotate(0deg)');
        $(this).css('-webkit-transform','rotate(0deg)');

    
        $(this).css('width','512px').css('height','512px').css('top','10px');
        $(this).find('a').css('width','512px').css('height','512px');
        var i = $(this).find('img');
        i.attr('src', i.attr('src').replace('/i/s/','/i/l/'));

	}).mouseup(function(e){
        throwAround($(this));
    });
/* not yet
	/* Converting all the links to a fancybox gallery **
	$("a.fancybox").fancybox({
		zoomSpeedIn: 300,
		zoomSpeedOut: 300,
		overlayShow:false
	});

	/* Converting the share box into a droppable: **
	$('.drop-box').droppable({
		hoverClass: 'active',
		drop:function(event,ui){

			/* Fill the URL text field with the URL of the image. **
			/* The id of the image is appended as a hash #pic-123 **
			$('#url').val(location.href.replace(location.hash,'')+'#' + ui.draggable.attr('id'));
			$('#modal').dialog('open');
		}
	});

	/* Converts the div with id="modal" into a modal window  **
	$("#modal").dialog({
		bgiframe: true,
		modal: true,
		autoOpen:false,

		buttons: {
			Ok: function() {
				$(this).dialog('close');
			}
		}
	});

	if(location.hash.indexOf('#pic-')!=-1)
	{
		/* Checks whether a hash is present in the URL **
		/* and shows the respective image **
		$(location.hash+' a.fancybox').click();
	}*/

    function throwAround(me) {
        //me.find('a').css('width','128px').css('height','128px');

        var left = Math.floor(Math.random() * 835);
        var top = Math.floor(Math.random() * 400);
        var rot = Math.floor(Math.random() * 81) - 40;
        //me.css('-moz-transform', 'rotate(' + rot+'deg)').css('top',top+'px').css('left',left+'px');
        //me.css('-webkit-transform', 'rotate(' + rot+'deg)').css('top',top+'px').css('left',left+'px');

        var i = me.find('img');
        i.attr('src', i.attr('src').replace('/i/l/','/i/s/'));
        me.animate({
            width:'128',
            height:'128px',
            rotate: rot +'deg',
            top: top + 'px',
            left: left + 'px'
        }, 250, function() { 
        });

    }
});


});
