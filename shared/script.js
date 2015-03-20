(function() {
    
    var scrolled = false,
        children = $("section");

    $("nav a[data-for], .nav a[data-for]").on('click', scroll);
    
    $(".learn-more").on('click', function(e) {
        e.preventDefault();
        var targetId = $(e.target).remove().attr('data-for');
        $("#"+targetId).css({"max-height": "1000px"});
    })
    
    function checkScroll() {
        if (scrolled) {
            children.removeClass('selected');

            for (var i=0; i < self.children.length; i++) {
                var child = children.eq(i);
                var selector = child.find("[data-for]").attr('data-for');
                var target = $("."+selector)[0];
                if (target && isScrolledIntoView(target)) {
                    $(child).addClass('selected');
                    break;
                }
            }
            scrolled = false;
        }
        requestAnimationFrame(checkScroll);
    }
    requestAnimationFrame(checkScroll);
    
    function isScrolledIntoView(elem) {
        elem = $(elem).find('h3').get(0) || elem;
        
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();
        
        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && 
                (elemBottom <= docViewBottom) &&  (elemTop >= docViewTop) );
    }

    function scroll(event) {
        event.preventDefault();

        var className = $(event.target).closest('a').attr("data-for");
        var offset = $("header").height();
        var target = $("."+className);
        $("html,body").animate({scrollTop: target.offset().top - offset}, "slow");
    };
    
})();
    
