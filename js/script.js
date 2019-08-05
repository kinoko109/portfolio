const $animationElm = $('.m-anime'),
      activeClass = 'is-active';

$(function(){

    /**
     * class name
     */
    const openClass = 'is-open',
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
          $subTtl = $('.ttl-lv2'),
          $chaseNav = $('header');
          $loading = $('.l-loading');

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
        if ($target.length == 0) return;

        const position = $target.offset().top;

        // ナビの高さを考慮
        $('html , body').not(':animated').animate({
            scrollTop : position - $chaseNav.innerHeight()
        }, speed, 'swing');
    }

});


    /**
     * loading
     */
    let loadingDisp = () => {
        const hideClass = 'js-hide';
        const loadingDelay = 300;
        setTimeout(() => {
            $loading.addClass(hideClass);
            $animationElm.eq(0).addClass(activeClass);
        }, loadingDelay);
    };

    $(window).on('load', () => {
        loadingDisp();
    });