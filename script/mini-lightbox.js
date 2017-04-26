"use strict";

// style based off https://github.com/IonicaBizau/mini-lightbox/



function MiniLightbox( selector, delegation )
{
    // get all elements set by selector

    var elements = document.querySelectorAll(selector);

    // attribute elements click handler

    for( var i = 0, l = elements.length; i < l; i++ )
    {
        var el = elements[i];

        //new Image(el.getAttribute('data-image'));

        el.addEventListener('click', onImgClick);
        el.addEventListener('touchstart', onImgClick); // mobile
    }

    // custom open/close

    var customOpen = function( box, img )
    {
        box.classList.add('animated', 'fadeIn');
        img.classList.add('animated', 'fadeInUp');
    };

    var customClose = function( box, img )
    {
        img.classList.add('animated', 'fadeOutDown');

        setTimeout(function()
        {
            box.classList.add('animated', 'fadeOut');

            setTimeout(function()
            {
                box.classList.remove('animated', 'fadeOut');
                img.classList.remove('animated', 'fadeOutDown');

                box.classList.remove('open');

            }, 200);

        }, 200);

        return false;
    }

    // main

    var opened = false;

    var box = document.createElement('div');
    box.setAttribute('class', 'minilightbox');

    var img = document.createElement('img');

    //img.onerror = onImgError;

    box.appendChild(img);

    // append box the selected element or document

    if( typeof delegation !== 'undefined' )
    {
         var parent = document.querySelector(delegation);

         parent.appendChild(box);
    }
    else
    {
        document.body.appendChild(box);
    }

    // click event on the box

    box.addEventListener('click', onClose);
    box.addEventListener('touchstart', onClose); // mobile

    // window events

    window.addEventListener('scroll', onScroll);

    window.addEventListener('keydown', onKeydown);


    function onScroll( event )
    {
        close();
    }

    function onKeydown( event )
    {
        if( event.which !== 27) return; // escape

        close();
    }

    // img.thumbnail click event, check if image fail loading or not

    function onImgClick( event )
    {
        event.preventDefault();

        img.setAttribute('src', this.getAttribute('data-image') || this.href || this.src);

        img.addEventListener('load', onImgLoad);

        img.addEventListener('error', onImgError);

        // TODO remove events ?
    }

    function onImgLoad( event )
    {
        open();
    }

    function onImgError( event )
    {
        alert('Unable to load the picture!');
    }

    function open()
    {
        if( opened ) return;

        opened = true;


        if( customOpen && customOpen(box, img) === false ) return;

        box.classList.add('open');
    }

    function onClose( event )
    {
        event.preventDefault();

        close();
    }

    function close()
    {
        if( !opened ) return;

        opened = false;


        if( customClose && customClose(box, img) === false ) return;

        box.classList.remove('open');
    }

    /* custom animation open/close */

    function setCustomOpen( handler )
    {
        customOpen = handler;
    }

    function setCustomClose( handler )
    {
        customClose = handler;
    }



    return {
        onOpen:  setCustomOpen,
        onClose: setCustomClose,
    };

}

