/**
 * Created by 小灰 on 2018/5/1.
 */

function Exposure($target, callback) {
    this.$target = $target;
    this.callback = callback;
    this.bind();
    this.check();
}

Exposure.prototype.bind = function () {
    var _this = this;
    $(window).on('scroll', function () {
        _this.check();
    })
};

Exposure.prototype.check = function () {
    if (this.isShow(this.$target)) {
        this.callback(this.$target);
    }
};

Exposure.prototype.isShow = function () {//可以访问到this,因为在一个函数里面

    var windowHeight = $(window).height(),
        scrollTop = $(window).scrollTop(),//滚动距离
        offsetTop = this.$target.offset().top;//位移

    return windowHeight+scrollTop >= offsetTop;
  /*  if (windowHeight + scrollTop > offsetTop && scrollTop < offsetTop + nodeHeight) {
        return true;
    } else {
        return false;
    }*/
};

var Lazy = (function () {

    return {
        init: function ($targets, callback) {
            $targets.each(function (idx, target) {
                new Exposure($(target), callback);
            })
        }
    }
})();

Lazy.init($('.container img'), function ($node) {
    showImg($node);
});

function showImg($img) {
    var imgUrl = $img.attr('data-src');
    $img.attr('src', imgUrl);
}