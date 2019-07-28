$(function(){

    /**
     * class name
     */
    const hideClass = 'js-hide',
        openClass = 'is-open',
        activeClass = 'is-active',
        drawlineClass = 'draw-line',
        darkClass = 'darkmode';

    /**
     * element
     */
    const $body = $('body'),
        $darkBtn = $('.js-darkbtn'),
        $lightBtn = $('.js-lightbtn'),
        $humBtn = $('.header-btn'),
        $humMenu = $('.nav'),
        $animationElm = $('.m-anime'),
        $subTtl = $('.ttl-lv2'),
        $chaseNav = $('header');

    /**
     * animationのdelay数値
     */
     const delay = 300;

    /**
     * loading
     */
    $(window).on('load',  () => {
        setTimeout(() => {
            $('.l-loading').addClass(hideClass);
            $animationElm.eq(0).addClass(activeClass);
        }, delay);
    });

    /**
     * テーマ色変更
     */
    $darkBtn.on('click', () => {
        if($body.hasClass(darkClass)) {
            return;
        }
        $body.addClass(darkClass);

        return false;
    });

    $lightBtn.on('click', () => {
        $body.removeClass(darkClass);
    });

    /**
     * ハンバーガーメニュー
     */
    $humBtn.on('click', () => {
        $(this).toggleClass(openClass);

        $humMenu.toggleClass(openClass);

        return false;
    });

    /**
     * animation class付与
     */
    $(window).on('scroll load', () => {
        let animeEleLen = $animationElm.length;
        for (let i = 1; i < animeEleLen; i++) {
            let animationElmWh = $animationElm[i].getBoundingClientRect().top;
            const trigger = 80;
            //
            if (animationElmWh + trigger < window.innerHeight) {
                    $animationElm[i].classList.add(activeClass);
            }
        }
        subTtlAddClass();
    });

    function subTtlAddClass() {
        let subTtlLen = $subTtl.length;
        for (let i = 0; i < subTtlLen; i++) {
            if ($subTtl.eq(i).hasClass(activeClass)) {
                $subTtl.eq(i).addClass(drawlineClass);
            }
        }
    }

    /**
     * スムーススクロール,ページトップ
     */
    $('a[href^="#"]').on('click', function() {
        const href = $(this).attr('href');

        smoothScroll(href);
        return false;
    });

    function smoothScroll (href) {
        const speed = 500;
        const elem = (href === '#' || href === '') ? 'html' : href;
        const $target = $(elem);

        // 対象要素がなかった場合
        if ($target.length == 0) return false;

        const position = $target.offset().top;

        // 下層ページのローカルナビの高さを考慮
        $('html , body').not(':animated').animate({
            scrollTop : position - $chaseNav.innerHeight()
        }, speed, 'swing');
    }

});