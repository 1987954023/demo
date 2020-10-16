define(['jquery'], function ($) {

    function slideshow() {
        $(function () {
            var span = $("span")
            var btn = $("#box").find('ol li')
            var ul = $("#box").find('ul')
            var iNow = 1
            var timer = null
            var isRuning = null
            timer1()
            btn.click(function () {
                iNow = $(this).index() + 1
                console.log(iNow)
                tab()
            })
            span.eq(0).click(function () {
                if (!isRuning) {
                    iNow--
                    tab()
                }
            })
            span.eq(1).click(function () {
                if (!isRuning) {
                    iNow++
                    tab()
                }
            })

            function timer1() {
                timer = setInterval(function () {
                    iNow++
                    tab()
                }, 2000)
            }
            $('#box').mouseenter(function () {
                clearInterval(timer)
            }).mouseleave(function () {
                timer1()
            })


            function tab() {
                if (iNow == btn.size() + 1) {
                    btn.removeClass().eq(0).addClass('active')
                } else if (iNow == 0) {
                    btn.removeClass().eq(4).addClass('active')
                } else {
                    btn.removeClass().eq(iNow - 1).addClass('active')
                }
                isRuning = true
                ul.animate({
                    left: iNow * -470
                }, function () {
                    if (iNow == btn.size() + 1) {
                        iNow = 1
                        ul.css({
                            left: iNow * -470
                        })
                    } else if (iNow == 0) {
                        iNow = 5
                        ul.css({
                            left: iNow * -470
                        })
                    }
                    isRuning = false
                })
            }
        })




    }








    return {
        slideshow
    }
})