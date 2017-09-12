//Initialize particles.js
particlesJS.load('particles', 'assets/lib/particles.json');

//Initialize Animate-on-Scroll, and hard refresh 10 ticks after load
AOS.init({
    duration: 1000
});

$("#particles").fadeIn(8000);
$("#landing").fadeIn(3000);
$("#landing h2").delay(500).fadeIn(2000);
$("#read-more").delay(2000).fadeIn(2000);

//Smooth scrolling for all anchor links
$('a[href*="#"]')
    .not('[href="#"]')
    .click(function (event) {
        if (
            location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                event.preventDefault();
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000, function () {
                    var $target = $(target);
                    $target.focus();
                    if ($target.is(":focus")) {
                        return false;
                    } else {
                        $target.attr('tabindex', '-1');
                        $target.focus();
                    };
                });
            }
        }
    });
