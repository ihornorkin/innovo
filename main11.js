/* Entering your JS code here */

$(document).ready(function(){

// Scroll BAR

$(window).scroll(function() {
    // calculate the percentage the user has scrolled down the page
    var scrollPercent = 100 * $(window).scrollTop() / ($(document).height() - $(window).height());

    $('.bar-long').css('width', scrollPercent +"%"  );

  });

/* Smooth scroll on link */
$("body").on("click",".custome-link", function (event) {
  event.preventDefault();
  var id  = $(this).attr('href'),
  top = $(id).offset().top;
  $('body,html').animate({scrollTop: top}, 600);
});

$('#feedback-slider').slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  adaptiveHeight: true,
  responsive: [
  {
    breakpoint: 768,
    settings: {
      adaptiveHeight: true
    }
  }
  ]
});

$('#garanty-slider').slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  arrows: false,
  autoplay: true
});

$('#team-slider').slick({
  dots: true,
  infinite: true,
  slidesToShow: 1,
  responsive: [
  {
    breakpoint: 768,
    settings: {
      adaptiveHeight: true
    }
  }
  ]
})

$('#price-slider-nav').slick({
  dots: false,
  infinite: true,
  slideToScroll: 1,
  slidesToShow: 3,
  asNavFor: '#price-slider',
  focusOnSelect: true
});

$('#price-slider').slick({
  dots: true,
  infinite: true,
  slideToScroll: 1,
  slidesToShow: 1,
  asNavFor: '#price-slider-nav',
  fade: true,
  adaptiveHeight: true
});

var sliderNumbers = '#feedback-slider .slick-dots button, #garanty-slider .slick-dots button, #team-slider .slick-dots button, #price-slider .slick-dots button';

$(sliderNumbers).each(function(index, elem) {
  var tempText = $(elem).text();
  $(elem).text('0.' + tempText);
});

$('#feedback-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  var element = $('.feedback .current-position');
  element.addClass('hidden');
  setTimeout(function() {
    $('.feedback .current-position').text('0.' + i);
    element.removeClass('hidden');
  }, 400);
});

$('#garanty-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  var element = $('.result .current-position');
  element.addClass('hidden');
  $('.result .current-position-big').text('# 0' + i);
  setTimeout(function() {
    $('.result .current-position').text('0.' + i);
    element.removeClass('hidden');
  }, 400);
});

$('#team-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  var element = $('.team .current-position');
  element.addClass('hidden');
  $('.team .current-position-small').text('# 0' + i);
  setTimeout(function() {
    $('.team .current-position').text('0.' + i);
    element.removeClass('hidden');
  }, 400);
});

$('#price-slider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
  var i = (currentSlide ? currentSlide : 0) + 1;
  var element = $('.price .current-position');
  element.addClass('hidden');
  $('.price .current-position-big').text('# 0' + i);
  setTimeout(function() {
    $('.price .current-position').text('0.' + i);
    element.removeClass('hidden');
  }, 400);
});

$('.slick-dots').each(function(index, elem) {
  var height = $(elem).height() + 80;
  $(elem).parent().parent().find('.current-position').css('bottom', height + 'px');
});

$('#feedback-slider').on('afterChange', function(e,o) {
  $('iframe').each(function(){
    $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
  });
});

$('.controls-face button').on('click', function(event) {
  if (!$(this).hasClass('active')) {
    $(this).parent().find('button').removeClass('active');
    var image = '.' + $(this).attr('class');
    $(this).addClass('active');
    $(this).parent().parent().find('.clients').removeClass('.hide');
    $(this).parent().parent().find('.clients').hide();
    $(this).parent().parent().find(image).show();
  }
});

$('.controls-slide button').on('click', function(event) {
  if (!$(this).hasClass('active')) {
    $(this).parent().find('button').removeClass('active');
    $(this).addClass('active');
    var btn = $(this);
    if (btn.hasClass('btn-video')) {
      btn.parent().parent().find('.slide-text').hide();
      btn.parent().parent().find('.slide-video').show();
    } else if (btn.hasClass('btn-feedback')) {
      btn.parent().parent().find('.slide-video').hide();
      btn.parent().parent().find('.slide-text').show();
      $('iframe').each(function(){
        $(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
      });
    }
  }
});

if (!document.getElementsByClassName) {
        // Поддержка IE8
        var getElementsByClassName = function(node, classname) {
          var a = [];
          var re = new RegExp('(^| )'+classname+'( |$)');
          var els = node.getElementsByTagName("*");
          for(var i=0,j=els.length; i<j; i++)
            if(re.test(els[i].className))a.push(els[i]);
          return a;
        }
        var videos = getElementsByClassName(document.body,"youtube");
      } else {
        var videos = document.getElementsByClassName("youtube");
      }

      var nb_videos = videos.length;
      for (var i=0; i<nb_videos; i++) {
        // Зная идентификатор видео на YouTube, легко можно найти его миниатюру
        videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

        // Добавляем иконку Play поверх миниатюры, чтобы было похоже на видеоплеер
        var play = document.createElement("div");
        play.setAttribute("class","play");
        videos[i].appendChild(play);

        videos[i].onclick = function() {
            // создаем iframe со включенной опцией autoplay
            var iframe = document.createElement("iframe");
            var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&enablejsapi=1&rel=0";
            if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
            iframe.setAttribute("src",iframe_url);
            iframe.setAttribute("frameborder",'0');

            // Высота и ширина iframe должны быть такими же, как и у родительского блока
            iframe.style.width  = this.style.width;
            iframe.style.height = this.style.height;

            // Заменяем миниатюру плеером с YouTube
            this.parentNode.replaceChild(iframe, this);
          }
        }

        $('input').focus(function(event) {
          $(this).parent().addClass('active');
          $(this).parent().parent().find('.form-title').css('opacity', '0.4');
        });

        $('input').focusout(function(event) {
          $(this).parent().removeClass('active');
          $(this).parent().parent().find('.form-title').css('opacity', '1');
        });

        $('.burger-menu').on('click', function(event) {
          $(this).toggleClass('menu-on');
          $('.navigation').toggleClass('navigation-open');
          $('body').toggleClass('menu-open');
        });

        $('input[type="tel"]').inputmask({
          mask: '+38 (999) 999-9999',
          showMaskOnHover: false,
          showMaskOnFocus: true
        });

        $('#scrollup img').mouseover( function(){
          $( this ).animate({opacity: 0.65},100);
        }).mouseout( function(){
          $( this ).animate({opacity: 1},100);
        });

        $(window).scroll(function(){
          if ( $(document).scrollTop() > 0 ) {
            $('#scrollup').fadeIn('slow');
          } else {
            $('#scrollup').fadeOut('slow');
          }
        });

        $('#scrollup').click(function() {
          $('body,html').animate({scrollTop:0},1000);
        });

        var leaveCounter = 0;

/*        function inWindow(element, id) {
          if ($(document).scrollTop() + $(window).height() > $(element).offset().top && $(document).scrollTop() - $(element).offset().top < $(element).height() && !$(element).hasClass('showed')) {
            dataLayer.push({'event': 'viewSection',   'section_id': id});
            $(element).addClass('showed');
            dataLayer.push({'event': 'viewSection',   'section_id': id});
          }
        }



        $(window).scroll(function() {
          inWindow('#header', 'header');
          inWindow('#price', 'price');
          inWindow('#team', 'team');
          inWindow('#phil', 'phil');
        })*/

var header = new Waypoint({
element: document.getElementById('header'),
  handler: function() {
    dataLayer.push({'event': 'viewSection',   'section_id': 'header'});
    console.log(dataLayer);
  }
});

var price = new Waypoint({
element: document.getElementById('price'),
  handler: function() {
    dataLayer.push({'event': 'viewSection',   'section_id': 'price'});
    console.log(dataLayer);
  }
});

var team = new Waypoint({
element: document.getElementById('team'),
  handler: function() {
    dataLayer.push({'event': 'viewSection',   'section_id': 'team'});
    console.log(dataLayer);
  }
});

var phil = new Waypoint({
element: document.getElementById('phil'),
  handler: function() {
    dataLayer.push({'event': 'viewSection',   'section_id': 'phil'});
    console.log(dataLayer);
  }
});

function isVisible(tag) {
    var t = $(tag);
    var w = $(window);
    var wt = w.scrollTop();
    var tt = t.offset().top;
    var tb = tt + t.height();
    //console.log((tb <= wt + w.height()) && (tt >= wt));
    return ((tb <= wt + w.height()) && (tt >= wt));
}

$(window).scroll(function () {
/*        if (!$("header").prop("shown") && isVisible($("header"))) {
            $("header").prop("shown", true);
           // alert("послать сигнал");
        }*/
               if (!$("#price").prop("shown") && isVisible($("#price"))) {
            $("#price").prop("shown", true);
           // alert("послать сигнал");
        } else {
          $("#price").prop("shown", false);
        }
    });

     });


/**
 * UTM Tracking Code
 * @param {*} name - name current UTM
 */
function getUTM(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
		results = regex.exec(location.search);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

var client_id;
function get_cookie ( cookie_name ){
		var results = document.cookie.match ( '(^|;) ?' + cookie_name + '=([^;]*)(;|$)' );
		if ( results )
			return ( decodeURIComponent( results[2] ) );
		else
			return null;
	}

		var cook_ga;
		$(document).ready(function(){
			var cookie_check = setInterval(function(){
				var ga = get_cookie('_ga');
				if (ga === null) {
					console.log('☹️');
				}else {
					cook_ga = "&_ga="+get_cookie('_ga');
					client_id = cook_ga.split('.')[2]+'.'+cook_ga.split('.')[3];
					console.log('🙂');
				};
			}, 500);
		});

/* Form validation and load politics */

$(function() {

  var thankUrl = 'http://' + window.location.host + '/thank.html';
  var btnId;

  $('.land-button').click(function() {
    btnId = $(this).attr('id');
    console.log(btnId);
  });

  $("[name=send]").click(function () {
    $(":input.error").removeClass('error');
    $(".allert").remove();


    var error;
    var btn = $(this);
    var ref = btn.closest('form').find('[required]');
    var msg = btn.closest('form').find('input');
    var send_btn = btn.closest('form').find('[name=send]');
    var send_options = btn.closest('form').find('[name=campaign_token]');
    var name_tl = btn.closest('form').find('[type=text]').val();
    var phone_tl = btn.closest('form').find('[type=tel]').val();
    var lead_type = btn.closest('form').data('lead');
		var form_type = btn.closest('form').data('form');
		var btnType;
		var utm_source = getUTM('utm_source');
		var utm_term = getUTM('utm_term');
		var utm_content = getUTM('utm_content');
		var utm_campaign = getUTM('utm_campaign');
		var utm_medium = getUTM('utm_medium');
		var number_of_button = btn.attr('id');
		msg += '&name=' + name_tl;
		msg += '&phone=' + phone_tl;
		msg += '&hostname=' + window.location.host;
		msg += '&page_url=' + window.location;
		msg += '&ref=' + document.referrer;
		msg += '&number_of_button=' + number_of_button;
		msg += '&client_id=' + client_id;
		msg += '&lead_type=' + lead_type;
		msg += '&form_type=' + form_type;
		msg += '&utm_source=' + utm_source;
		msg += '&utm_term=' + utm_term;
		msg += '&utm_content=' + utm_content;
		msg += '&utm_campaign=' + utm_campaign;
		msg += '&utm_medium=' + utm_medium;

    if (btn.hasClass('window-popup')) {
      btnType = 'popupForm';
    } else if (btn.hasClass('window-popup-leave')) {
      btnType = 'offerPopupForm';
    } else {
      btnType = 'mainForm';
    }

    $(ref).each(function() {
      if ($(this).val() == '') {
        var errorfield = $(this);
        $(this).addClass('error').parent().append('<i title="Заполните это поле" class="fa fa-exclamation-triangle allert" aria-hidden="true"></i>');
        error = 1;
        $(":input.error:first").focus();
        return;
      } else {
        var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
        if ($(this).attr("type") == 'email') {
          if(!pattern.test($(this).val())) {
            $("[name=email]").val('');
            $(this).addClass('error').parent().append('<i class="fa fa-exclamation-triangle allert" title="Укажите коректный e-mail" aria-hidden="true"></i>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
        var patterntel = /^()[- +()0-9]{9,18}/i;
        if ( $(this).attr("type") == 'tel') {
          if(!patterntel.test($(this).val())) {
            $("[name=phone]").val('');
            $(this).addClass('error').parent().append('<i class="fa fa-exclamation-triangle allert" title="Укажите коректный номер телефона" aria-hidden="true"></i>');
            error = 1;
            $(":input.error:first").focus();
          }
        }
      }
    });
    if(!(error==1)) {
      $(send_btn).each(function() {
        $(this).attr('disabled', true);
      });
      $(send_options).each(function() {
        $('#sending').append('<p class="sending">Отправка данных...</p>');
        $('#sending').slideDown('400');
          $.ajax({
            type: 'POST',
            url: 'mail.php',
            data: msg,
            success: function() {
              dataLayer.push({
							'event': 'formSubmit',  // всегда значение 'formSubmit'
							'formType': btnType,  //варианты: 'mainForm' - для формы на лэнде, 'popupForm' - для обычного попапа http://joxi.ru/V2V5MQLI0xwOGm , 'offerPopupForm' для этого попапа http://joxi.ru/1A5ZwNxtKn9xWr
						'lastCTA': btnId // id кнопки, по которой отобразился попап http://joxi.ru/V2V5MQLI0xwOGm , если регистрация по другой форме, то '(not set)'
						});
              console.log(dataLayer);
/*              $.ajax({
                type: 'POST',
                url: 'https://api.telegram.org/bot428402209:AAHl0i9LZX-JboMEM0r6OJEhTglRsI1oFCI/sendMessage?chat_id=346450360&text=У вас новый лид c Innovo LP: ' + 'Имя: ' + name_tl + ' ' + 'Телефон: ' + phone_tl,
              });*/
                             //Succes calback
                             setTimeout(function() {
                              document.location.href = thankUrl;
                            }, 4500);
                           },
                           //Error callback
                           error: function(xhr, str) {
                            alert('Возникла ошибка: ' + xhr.responseCode);
                          }
                        });
            $.ajax({
              type: 'POST',
              url: 'https://app.getresponse.com/add_subscriber.html',
              data: msg,
              statusCode: {0:function() {
                setTimeout(function(){ $('form').trigger("reset");
                  $("[name=send]").removeAttr("disabled"); }, 1000);
								//Succes calback
								setTimeout(function() {
									$('#sending-message').slideUp('400');
									$('#sending p').remove();
								}, 3000);
								$('.modal').modal('hide');
								$('#thank').modal('show');
								setTimeout(function() {
									$('#thank').modal('hide');
								}, 4000);
							}}
						});
					});
    }
    return false;
  })
});

/* Politics modal */

var privacy, refusing, compliance, destination;
$('[data-href="disclaimer"]').one('click', function() {

  var nameDisclaimer = $(this).attr('id');

  $.get('disclaimer.html', function (data) {
    privacy = $(data).closest('#privacy').html();
    refusing = $(data).closest('#refusing').html();
    compliance = $(data).closest('#compliance').html();
    disclaimerDest(nameDisclaimer);
  });

});

$('[data-href="disclaimer"]').click(function() {
  var nameDisclaimer = $(this).attr('id');
  disclaimerDest(nameDisclaimer);
});

destination = $('#disclaimer .content');
function disclaimerDest(nameDisclaimer) {

  switch (nameDisclaimer) {
    case 'privacy':
    destination.html(privacy);
    break;
    case 'refusing':
    destination.html(refusing);
    break;
    case 'compliance':
    destination.html(compliance);
    break;
  };

};
