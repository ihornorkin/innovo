 /* Send qtextarea */
  $('.btn-question').click(function() {
  var message = $('#question-field').val();
  $('#question-input').attr('value', message);
});

  /* Responsive slider */
  /* Need slick-slide http://kenwheeler.github.io/slick/*/
  $(window).on('orientationchange', function() {
    $(your-slider).slick('resize');
  });

  $(your-slider).slick({
    dots: false,
    arrow: true,
    slidesToShow: 3,
    responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    ]
  });

/* Standart slider */

$(your-selector).slick({
  dots: true,
  infinite: true,
  slidesToShow: 1
});

/* Video slider */

  $(you-selector).on('afterChange',function(e,o){$('iframe').each(function(){$(this)[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
});
}).slick({
  infinite: true,
  slidesToShow: 1,
  arrows: false,
  dots: true,
  draggable: false
});

    /* Smooth scroll on link */
  $("body").on("click",".custome-link", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 600);
  });

/* Wow js */
/* Need wow.js http://mynameismatthieu.com/WOW/ */

new WOW().init();

/* Need viewport-checker https://github.com/dirkgroenen/jQuery-viewport-checker */

    $(yourclass).viewportChecker({
    classToAdd: yourClass,
    offset: 200,
        callbackFunction: function(){
    });
   }
  });

/* Flip clock timer */
/* Timer selector http://flipclockjs.com/ */

var timerDays = 3;

var timerMill = Date.now() + (1000 * 60 * 60 * 24) * timerDays;
var timerNow = Date.now();

var currentDate = Date.now();
var futureDate = localStorage.getItem('dateTimer');

var diff = (futureDate - currentDate) / 1000;

if (timerNow > localStorage.getItem('dateTimer')) {
  localStorage.setItem('dateTimer', timerMill);
}

var clock = $('.timer').FlipClock(diff, {
  language : "ru-ru",
  autoStart: false,
  autoStart: true,
  clockFace: 'DailyCounter',
  countdown: true
});

/* Youtube video */

  if (!document.getElementsByClassName) {
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
   videos[i].style.backgroundImage = 'url(http://i.ytimg.com/vi/' + videos[i].id + '/sddefault.jpg)';

   var play = document.createElement("div");
   play.setAttribute("class","play");
   videos[i].appendChild(play);

   videos[i].onclick = function() {
    var iframe = document.createElement("iframe");
    var iframe_url = "https://www.youtube.com/embed/" + this.id + "?autoplay=1&autohide=1&rel=0&controls=0&enablejsapi=1";
    if (this.getAttribute("data-params")) iframe_url+='&'+this.getAttribute("data-params");
    iframe.setAttribute("src",iframe_url);
    iframe.setAttribute("frameborder",'0');

    iframe.style.width  = this.style.width;
    iframe.style.height = this.style.height;
    this.parentNode.replaceChild(iframe, this);
  }
}

/* Fancybox init */
/* Need fancybox http://fancyapps.com/fancybox/ */

  $(selector).fancybox({
    openEffect  : 'none',
    closeEffect : 'none'
  });

/* Yandex metric */

/* Js code */

var goal = btn.closest('form').find('[name=goal]').val();

/* Send form line */

yaCounterXXXXXX.reachGoal(goal);

/* Html */

<input type="hidden" name="goal" value="goal-name" />
