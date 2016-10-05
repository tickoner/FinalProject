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
