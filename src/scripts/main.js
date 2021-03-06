function toggleIcon(e) {
    $(e.target)
        .prev('.panel-heading')
        .find(".more-less")
        .toggleClass('glyphicon-plus glyphicon-minus');
}
$('.panel-group').on('hidden.bs.collapse', toggleIcon);
$('.panel-group').on('shown.bs.collapse', toggleIcon);

var flickrPhotoStream = function($el, options) {
    var url = [
        'http://api.flickr.com/services/feeds/photoset.gne?nsid=',
        options.id,
        '&set=',
        options.setId,
        '&format=json&jsoncallback=?'
    ].join('');

    return $.getJSON(url).done(function(data) {
        $.each(data.items, function(index, item) {
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

$.fn.flickrPhotoStream = function(options) {
    return flickrPhotoStream($(this).get(), options || {});
};

$('.flickr-widget-container').flickrPhotoStream({
    id: '95570410@N07',
    setId: '72157645102454435'
});

$('body').prepend('<a href="#" class="back-to-top"><i class="fa fa-chevron-up" aria-hidden="true"></i></a>'); //button scroll to top

var amountScrolled = 300;

$(window).scroll(function() {
    if ($(window).scrollTop() > amountScrolled) {
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
$(document).ready(function() {
    //load button
    $("#showmap-btn").click(function() {
        event.preventDefault();
        $(".map-cover").fadeToggle("slow", "linear");
    });
    //load table from json
    $.getJSON('data/users.json', function(data) {
        $('#users-table').DataTable({
            data: data,
            "columns": [{
                "data": "Name"
            }, {
                "data": "Email"
            }, {
                "data": "Phone"
            }, {
                "data": "Country"
            }],
            "lengthMenu": [25, 50, 75, 100],
            columnDefs: [{
                "targets": "_all",
                "width": "25%"
            }]
        });

    });

    //validation (sidebar subscribe)
    $('#sidebar-subscribe-form').validate({
        rules: {

            name: {
                required: true,
                minlength: 3,
                maxlength: 20,
            },

            email: {
                required: true,
            },
        },

        messages: {

            name: {
                required: "Tell Me Your Name",
                minlength: "Name must be at least 3 characters",
                maxlength: "Name is too long",
            },

            email: {
                required: "Please write Your e-mail address",
            },
        },
        submitHandler: function() {
          $.jGrowl("thank you for subscribing!");
        },
      //   success: {
      //       callback: function () {
      //           if ($("#sidebar-subscribe-form").valid()) {
      //       var form = $("#sidebar-subscribe-form");
      //       form.submit();
      //       } else {
      //       return false;
      //       }
      //     }
      // }
    });

    $('#news-letter-widget').validate({
      rules: {

          name: {
              required: true,
              minlength: 3,
              maxlength: 20,
          },

          email: {
              required: true,
              email: true,
          },
          password: {
              required: true,
              minlength: 6,
              maxlength: 16,
          },
      },

      messages: {

          name: {
              required: "Please Tell Me Your Name",
              minlength: "Name must be at least 3 characters",
              maxlength: "Name is too long",
          },

          email: {
              required: "Please write Your e-mail address",
              email: "Your email address is invalid"
          },
          comment: {
            required: "Please write Your e-mail address",
            minlength: "Comment must be at least 10 characters",
            maxlength: "Comment is too long",
          }
      },
      submitHandler: function() {
        $.jGrowl("thank you for subscribing!");
      }
    });

    //sign-in  form validate
    $('#form-signin').validate({
      rules: {
          name: {
              required: true,
              minlength: 3,
              maxlength: 20,
          },

          email: {
              required: true,
              email: true,
          },
          password: {
              required: true,
              minlength: 6,
              maxlength: 16,
          },
          password2: {
              required: true,
              minlength: 6,
              maxlength: 16,
              equalTo: '#inputPasswordSignIn',
          },
      },

      messages: {

          name: {
              required: "Please Tell Me Your Name",
              minlength: "Name must be at least 3 characters",
              maxlength: "Name is too long",
          },

          email: {
              required: "Please write Your e-mail address",
              email: "Your email address is invalid"
          },
          password: {
            required: "Please write Your e-mail address",
            minlength: "Password must be at least 6 characters",
            maxlength: "Password must be between 6 and 16 characters",
          },
          password2: {
            required: "Please write Your e-mail address",
            minlength: "Password must be at least 6 characters",
            maxlength: "Password must be between 6 and 16 characters",
            equalTo : "This password does not match that entered in the password field, please try again",
          },

      },
      submitHandler: function() {
        $.jGrowl("Successful login!");
      }
    });

});
