/**
 * Created by С�� on 2018/4/28.
 */
function Carousel($ct){
    console.log(this);
    this.$ct = $ct;
    this.init();
    this.bind();
    this.autoPlay();
}
//��д����ԭ��
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
        var imgWidth = this.imgWidth = $imgCt.children('li').width();//�õ�ͼƬ���400
        //.css(width) �� .width()֮��������Ǻ��߷���һ��û�е�λ����ֵ�����磬400����ǰ���Ƿ��ش���������λ���ַ��������磬400px
        var imgCount = this.imgCount = $imgCt.children('li').length;
        $imgCt.append($firstLi);//�ײ������һ��
        $imgCt.prepend($lastLi);//β���ӵ�һ��//��ʱ��6��ͼƬ
        $imgCt.width(imgWidth*(2 + imgCount));//����$imgCt���
        $imgCt.css({ left:-imgWidth});//�ı�ͼƬ��ʼλ�ã���ʾ��һ��ͼƬ���ڵڶ���λ��
    },

    bind: function () {
        var _this =this;
        //�����һ���¼�
        this.$btnPre.on('click', function (e){
            //�ж���
           if(_this.isAnimal === false){return}
           _this.isAnimal = false;
            _this.btnPre();
        });
        //�����ʾ��һ��
        this.$btnNext.on('click', function () {
            //�ж���
            if(_this.isAnimal === false){ return };
            _this.isAnimal = false;
            _this.btnNext();
        })
        //���С��ť�л�ͼƬ
        this.$buttons.children('li').on('click', function () {
            //ȡ���buttons��li����
            _this.idx = $(this).index();
            _this.$imgCt.animate({left:- _this.imgWidth * (_this.idx + 1)} , 500, function () {
                _this.buttons(_this.idx);
            })
        })
    },
    //��װ
    btnPre:function(){
        var _this = this;
        // ����leftֵ�ж�
        _this.imgCtLeft = _this.$imgCt.css('left');
        //imgCt����һ����λ
        _this.$imgCt.animate({ left:"+="+_this.imgWidth},500, function () {
            _this.idx = Math.abs(parseInt(_this.imgCtLeft)/parseInt(_this.imgWidth));
            //console.log('idx:'+(idx - 2));
            _this.idx = _this.idx - 2;
            _this.buttons(_this.idx);
            //ƫ����Ͽ���
            _this.isAnimal = true;
            if(parseInt(_this.imgCtLeft) === -_this.imgWidth){
                //Ѹ���л���������ͼ
                _this.$imgCt.css({ left:-_this.imgWidth * _this.imgCount});
                _this.idx =3;
                _this.buttons(_this.idx);
            }
        })
    },
    //��װ
    btnNext: function () {
        var _this =this;
        //imgCt��left
        _this.imgCtLeft = _this.$imgCt.css("left");
        _this.$imgCt.animate({ left : "-=" + _this.imgWidth },500, function () {
            //λ�Ƶľ���ֵ,����ͼ��,תΪͼƬ����
            _this.idx =Math.abs(parseInt(_this.imgCtLeft)/parseInt(_this.imgWidth));
            console.log('idx:+idx');
            _this.buttons(_this.idx);
            _this.isAnimal = true;
            if(parseInt(_this.imgCtLeft) === -_this.imgWidth * _this.imgCount){
                //Ѹ�����Ƶ��ڶ���
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