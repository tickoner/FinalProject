function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);


       $('.flickr-widget-container').flickrPhotoStream({ id: '95570410@N07', setId: '72157645102454435' });

      // $('.flickr-widget-container').flickrPhotoStream({
      //     id: '95570410@N07',             // Flickr Id
      //     setId: '72157645102454435',          // Flick "Set" Id
      //     container: '<div />',    // wrap the image
      //     cssClass: 'photos-item'  // applied to the image's link
      // }).done(function () {});
