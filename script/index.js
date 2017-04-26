"use strict";

// debug
function l(t){console.log(t);}



(function() {

    // vars

    var scrolltotop, sliderindicator, miniLightbox, slideshow;


    window.addEventListener('load', function( event )
    {

        // scrolltotop

        scrolltotop = document.getElementById('scroll-to-top');

        scrolltotop.onclick = function( event )
        {
            event.preventDefault(); // #anchor

            onScrollToTop();
        };

        // slider indicator, on top

        sliderindicator = document.getElementById('slider-indicator');

        onSliderIndicator(); // first init

        window.addEventListener('scroll', onSliderIndicator);

        // LightBox imgs

        miniLightbox = MiniLightbox('.thumb', 'html');

        // Slideshow imgs

        var slideshow = document.getElementById('slideshow');

        MiniSlideshow(slideshow);



        console.log('window.load: ok');
    });


    /* utils */

    function onScrollToTop()
    {
        if( window.scrollY > 0 )
        {
            var interval = window.setInterval(function()
            {
                if( window.scrollY > 0 )
                    window.scrollTo( 0, window.scrollY - 200 );
                else
                    window.clearInterval( interval );
            }, 15);
        }

        /*if( window.scrollY > 0 ) {
            setTimeout( function() {
                window.scrollTo(0, window.scrollY - 200);
                onScrollToTop();
            }, 15);
        }*/
    }

    function onSliderIndicator( event )
    {
        var bh = document.body.clientHeight,
            wh = window.innerHeight,
            wy = window.scrollY,

            o = wy / ( bh - wh ) * 100;

        sliderindicator.style.width = o + '%';
    }


    function MiniSlideshow( container )
    {
        var slideIndex = 0;

        showSlides();

        function showSlides()
        {
            var slides = container.querySelectorAll('.slide');

            for( var i = 0, l = slides.length; i < l; i++ )
            {
                slides[i].style.display = 'none';
            }


            slideIndex++; // move current

            if( slideIndex > slides.length )
            {
                slideIndex = 1;
            }

            slides[slideIndex-1].style.display = 'block';  

            setTimeout(showSlides, 4500); // change image
        }
    }



})();
