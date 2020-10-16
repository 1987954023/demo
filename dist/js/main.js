console.log("加载成功")
require.config({
    paths: {
        'jquery': 'jquery-1.10.1.min',
        'cookie': 'jquery.cookie',
        'parabola': 'parabola copy',
        'index': 'index',
        'banner': 'banner'
    },
    shim: {
        //设置依赖关系
        "cookie": ['jquery'],
        //parabola 不遵从amd规范
        parabola: {
            exports: "_"
        }
    }

})
require(['index', 'banner'], function (index, banner) {

    index.download()
    index.california()
    index.show()
    index.locker()
    index.delect()
    index.delect_btn()
    banner.slideshow()


})