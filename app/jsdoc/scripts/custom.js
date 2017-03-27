(function($){

    var nav = $('nav'),
        classes = nav.find('> h3:contains(Classes):first');

    // if (classes.length > 0) {
    //     classes.hide();
    //     classes.next('ul').hide();
    // }

    $(document).ready(function(){
        var hash = window.location.hash;
        if (hash.length > 1) {
            var target = $('a[href^="'+hash+'"]');
            if (target.length === 1) {
                $('html, body').scrollTop(target.offset().top);
            }
        }

        $('#main > section.readme:first table, .description table').each(function(){
            $(this).addClass('params th-border');
        });

    });

}(jQuery));
