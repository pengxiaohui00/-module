/**
 * Created by 小灰 on 2018/4/28.
 */
function Carousel($ct){
    console.log(this);
    this.$ct = $ct;
    this.init();
    this.bind();
    this.autoPlay();
}
//重写对象原型
Carousel.prototype = {
    constructor:Carousel,
    init: function () {
        var $imgCt = this.$imgCt = this.$ct.find('.img-ct');
        var $btnPre = this.$btnPre = this.$ct.find('.btn-pre');
        var $btnNext = this.$btnNext = this.$ct.find('.btn-next');
        var $buttons = this.$buttons = this.$ct.find('.buttons');
        this.isAnimal = true;

        var $firstLi = $imgCt.children('li').first().clone();
        var $lastLi = $imgCt.children('li').last().clone();
        var imgWidth = this.imgWidth = $imgCt.children('li').width();//得到图片宽度400
        //.css(width) 和 .width()之间的区别是后者返回一个没有单位的数值（例如，400），前者是返回带有完整单位的字符串（例如，400px
        var imgCount = this.imgCount = $imgCt.children('li').length;
        $imgCt.append($firstLi);//首部加最后一张
        $imgCt.prepend($lastLi);//尾部加第一张//此时有6张图片
        $imgCt.width(imgWidth*(2 + imgCount));//重设$imgCt宽度
        $imgCt.css({ left:-imgWidth});//改变图片初始位置，显示第一张图片，在第二的位置
    },

    bind: function () {
        var _this =this;
        //点击上一张事件
        this.$btnPre.on('click', function (e){
            //判断锁
           if(_this.isAnimal === false){return}
           _this.isAnimal = false;
            _this.btnPre();
        });
        //点击显示下一张
        this.$btnNext.on('click', function () {
            //判断锁
            if(_this.isAnimal === false){ return };
            _this.isAnimal = false;
            _this.btnNext();
        })
        //点击小按钮切换图片
        this.$buttons.children('li').on('click', function () {
            //取点击buttons的li索引
            _this.idx = $(this).index();
            _this.$imgCt.animate({left:- _this.imgWidth * (_this.idx + 1)} , 500, function () {
                _this.buttons(_this.idx);
            })
        })
    },
    //封装
    btnPre:function(){
        var _this = this;
        // 根据left值判断
        _this.imgCtLeft = _this.$imgCt.css('left');
        //imgCt右移一个单位
        _this.$imgCt.animate({ left:"+="+_this.imgWidth},500, function () {
            _this.idx = Math.abs(parseInt(_this.imgCtLeft)/parseInt(_this.imgWidth));
            //console.log('idx:'+(idx - 2));
            _this.idx = _this.idx - 2;
            _this.buttons(_this.idx);
            //偏移完毕开锁
            _this.isAnimal = true;
            if(parseInt(_this.imgCtLeft) === -_this.imgWidth){
                //迅速切换到第四张图
                _this.$imgCt.css({ left:-_this.imgWidth * _this.imgCount});
                _this.idx =3;
                _this.buttons(_this.idx);
            }
        })
    },
    //封装
    btnNext: function () {
        var _this =this;
        //imgCt的left
        _this.imgCtLeft = _this.$imgCt.css("left");
        _this.$imgCt.animate({ left : "-=" + _this.imgWidth },500, function () {
            //位移的绝对值,除以图宽,转为图片索引
            _this.idx =Math.abs(parseInt(_this.imgCtLeft)/parseInt(_this.imgWidth));
            console.log('idx:+idx');
            _this.buttons(_this.idx);
            _this.isAnimal = true;
            if(parseInt(_this.imgCtLeft) === -_this.imgWidth * _this.imgCount){
                //迅速右移到第二张
                _this.$imgCt.css({ left:- _this.imgWidth })
                _this.idx = 0;
                _this.buttons(_this.idx);
            }
        })
    },

    buttons:function(idx){
        var _this =this ;
        _this.$buttons.children('li').siblings().removeClass('active');
        _this.$buttons.children('li').eq(_this.idx).addClass('active');
        console.log('_this.idx:'+idx)
    },

    autoPlay:function (){
        var _this =this;
        this.clock = setInterval(function(){
            if(_this.isAnimal === false){ return };
            _this.isAnimal = false;
            _this.btnNext();
    }, 5000);
    },

    stopAuto:function (){
    clearInterval(this.clock)
    }

};


new Carousel($('.carousel').eq(0));
new Carousel($('.carousel').eq(1));