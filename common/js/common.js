$(function(){

    /**
     * class name
     */
    var hideClass = 'js-hide',
        openClass = 'is-open',
        activeClass = 'is-active',
        drawlineClass = 'draw-line';

    /**
     * element
     */
    var $humBtn = $('.header-btn'),
        $humMenu = $('.nav'),
        $animationElm = $('.m-anime'),
        $subTtl = $('.ttl-lv2'),
        $aboutContent2 = $('.about-2col'),
        $chaseNav = $('header');

    /**
     * animationのdelay数値
     */
     var delay = 500;

    /**
     * loading
     */
    $(window).on('load', function (){
        setTimeout(function() {
            $('.l-loading').addClass(hideClass);
            $animationElm.eq(0).addClass(activeClass);
        }, delay);
    });


    /**
     * ハンバーガーメニュー
     */
    $humBtn.on('click', function(){
        $(this).toggleClass(openClass);

        $humMenu.toggleClass(openClass);

        return false;
    });

    /**
     * animation class付与
     */
    $(window).on('scroll load', function() {
        var animeEleLen = $animationElm.length;
        for (var i = 1; i < animeEleLen; i++) {
            var animationElmWh = $animationElm[i].getBoundingClientRect().top;
            var trigger = 80;
            //
            if (animationElmWh + trigger < window.innerHeight) {
                    $animationElm[i].classList.add(activeClass);
            }
        }
        subTtlAddClass();
    });

    function subTtlAddClass() {
        var subTtlLen = $subTtl.length;
        for (var i = 0; i < subTtlLen; i++) {
            if ($subTtl.eq(i).hasClass(activeClass)) {
                $subTtl.eq(i).addClass(drawlineClass);
            }
        }
    }

    /**
     * スムーススクロール,ページトップ
     */
    $('a[href^="#"]').on('click', function (){
        var href = $(this).attr('href');

        // ページ外リンクの場合
        if (href.indexOf('/') > -1) return;

        smoothScroll(href);
        return false;
    });

    function smoothScroll (href) {
        var speed = 500;
        var elem = (href === '#' || href === '') ? 'html' : href;
        var $target = $(elem);

        // 対象要素がなかった場合
        if ($target.length == 0) return false;

        var position = $target.offset().top;

        // 下層ページのローカルナビの高さを考慮
        $('html , body').not(':animated').animate({
            scrollTop : position - $chaseNav.innerHeight()
        }, speed, 'swing');
    }

});