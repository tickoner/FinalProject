function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);

var flickrPhotoStream = function ($el, options) {
    var url = [
        'http://api.flickr.com/services/feeds/photoset.gne?nsid=',
        options.id,
        '&set=',
        options.setId,
        '&format=json&jsoncallback=?'
    ].join('');

    return $.getJSON(url).done(function (data) {
        $.each(data.items, function (index, item) {
            var link = item.media.m.replace('_m', '_z');

            $("<img />")
                .attr("src", item.media.m)
                .appendTo($el)
                .wrap(options.container || '')
                .wrap([
                    '<a href="',
                    link,
                    options.cssClass ? '" class="' + options.cssClass : '',
                    '" title="',
                    item.title,
                    '"></a>'
                ].join(''));
        });
    });
};

$.fn.flickrPhotoStream = function (options) {
    return flickrPhotoStream($(this).get(), options || {});
};

$('.flickr-widget-container').flickrPhotoStream({ id: '95570410@N07', setId: '72157645102454435' });

      // $('.flickr-widget-container').flickrPhotoStream({
      //     id: '95570410@N07',             // Flickr Id
      //     setId: '72157645102454435',          // Flick "Set" Id
      //     container: '<div />',    // wrap the image
      //     cssClass: 'photos-item'  // applied to the image's link
      // }).done(function () {});

$('body').prepend('<a href="#" class="back-to-top"><i class="fa fa-chevron-up" aria-hidden="true"></i></a>'); //button scroll to top

var amountScrolled = 300;

$(window).scroll(function() {
	if ( $(window).scrollTop() > amountScrolled ) {
		$('a.back-to-top').fadeIn('slow');
	} else {
		$('a.back-to-top').fadeOut('slow');
	}
});

$('a.back-to-top').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 700);
	return false;
});


//show or hide map
$(document).ready(function(){
  //load button
    $("#showmap-btn").click(function(){
       event.preventDefault();
        $(".map-cover").fadeToggle("slow", "linear");
    });
      //load table from json
    $.getJSON('data/users.json', function(data) {
      $('#users-table').DataTable( {
        data : data,
          "columns": [
              { "data": "Name" },
              { "data": "Email" },
              { "data": "Phone" },
              { "data": "Country" }
          ]
      });
    });
});
