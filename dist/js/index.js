//遵从amd规范
define(['parabola', 'jquery', 'cookie'], function (parabola, $) {


    function download() {
        num()
        locker()
        $.ajax({
            url: './data/data.json',
            success: function (arr) {

                var str = ``
                for (i = 0; i < arr.length; i++) {
                    str += `<li class="goods_item">
                    <div class="goods_pic">
                        <img src=${arr[i].img}
                            alt="">
                    </div>
                    <div class="goods_title">
                        <p>【京东超市】奥利奥软点小草莓0</p>
                    </div>
                    <div class="sc">
                        <div id="${arr[i].id}" class="sc_btn">加入购物车</div>
                    </div>
                </li>`
                }
                $(".goods_box ul").html(str);
            },
            error: function (error) {
                console.log(error)
            }

        })

    }

    function california() {



        $('.goods_box').on('click', '.sc_btn', function () {



            var id = $(this).attr('id')
            var first = $.cookie('goods') == null ? true : false
            if (first) {
                $.cookie('goods', JSON.stringify([{
                    id: id,
                    num: 1
                }]), {
                    expires: 7
                })
            } else {
                var cookieArr = JSON.parse($.cookie('goods'))
                var same = false
                for (i = 0; i < cookieArr.length; i++) {
                    if (cookieArr[i].id == id) {
                        same = true
                        break
                    }
                }
                same ? cookieArr[i].num++ : cookieArr.push({
                    id: id,
                    num: 1
                })
                $.cookie('goods', JSON.stringify(cookieArr), {
                    expires: 7
                })
            }

            num()
            locker()
            parckage($(this))
        })

    }

    function show() {



        $('.sc_right').mouseenter(function () {
            $(this).stop(true).animate({
                right: 0
            })
        }).mouseleave(function () {
            $(this).stop(true).animate({
                right: -270
            })
        })

    }

    function locker() {



        var cookieArr = JSON.parse($.cookie('goods'))
        var newArr = []

        $.ajax({
            url: './data/data.json',
            success: function (arr) {

                for (i = 0; i < arr.length; i++) {
                    for (j = 0; j < cookieArr.length; j++) {
                        if (arr[i].id == cookieArr[j].id) {
                            arr[i].num = cookieArr[j].num
                            newArr.push(arr[i])
                            break
                        }
                    }
                }
                var str = ``
                for (i = 0; i < newArr.length; i++) {
                    str += `<li id="${newArr[i].id}">
                    <div class="sc_goodsPic">
                        <img src=${newArr[i].img}
                            alt="">
                    </div>
                    <div class="sc_goodsTitle">
                        <p>这是商品曲奇饼干</p>
                    </div>
                    <div class="sc_goodsBtn">购买</div>
                    <div class="delete_goodsBtn">删除</div>
                    <div class="sc_goodsNum">
                        <div>
                            <button>+</button>
                            <button>-</button>
                            <span>商品数量：${newArr[i].num}</span>
                        </div>
                    </div>
                </li>`
                }
                $('.sc_right ul').html(str)
            }
        })
    }

    function num() {

        var cookieArr = JSON.parse($.cookie('goods'))
        var num = 0
        for (i = 0; i < cookieArr.length; i++) {
            num += cookieArr[i].num
        }
        $('.sc_right .sc_num').html(num)
    }

    function delect() {

        $('.sc_right').on('click', '.delete_goodsBtn', function () {
            var cookieArr = JSON.parse($.cookie('goods'))
            var id = $(this).closest('li').attr('id')
            $(this).closest('li').remove()
            for (i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    cookieArr.splice(i, 1)
                    break
                }
            }
            $.cookie('goods', JSON.stringify(cookieArr), {
                expires: 7
            })
            num()
        })
    }

    function delect_btn() {

        $('.sc_right ul').on('click', '.sc_goodsNum button', function () {
            var id = $(this).closest('li').attr('id')
            var cookieArr = JSON.parse($.cookie('goods'))
            for (i = 0; i < cookieArr.length; i++) {
                if (cookieArr[i].id == id) {
                    break
                }
            }
            if ($(this).html() == '+') {
                cookieArr[i].num++
            } else {
                cookieArr[i].num == 1 ? alert("不能在减了") : cookieArr[i].num--
            }
            $(this).siblings('span').html(`商品数量:${cookieArr[i].num}`)
            $.cookie('goods', JSON.stringify(cookieArr), {
                expires: 7
            })
            num()
        })


    }

    function parckage(btn) {

        $('#ball').css({
            left: btn.offset().left,
            top: btn.offset().top,
            display: 'block'
        })
        var X = $('.sc_pic').offset().left - btn.offset().left
        var Y = $('.sc_pic').offset().top - btn.offset().top
        var bool = new Parabola({
            el: "#ball",
            targetEl: null,
            offset: [X, Y],
            duration: 2000,
            curvature: 0.001,
            callback: function () {
                $("#ball").hide()
            }
        });
        bool.start()
    }
    return {
        download,
        california,
        show,
        locker,
        delect,
        delect_btn

    }
})