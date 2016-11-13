/**
 * Created by zl on 2016/11/13.
 */
var Tabslet=function (target,opts){
    this.init(target,opts);
};

Tabslet.prototype={
    init:function(target,opts){
            var _this=this;

            var defaultOpts = {
                defalutTab:0,
                tabname:'.hd',
                selectname:'.bd',
                animation: true,
                autoPlay: true,
                speed: 3000,
                customEvents:'before'
            };
            $.extend(defaultOpts, opts);
            _this.opts = defaultOpts;

            _this.index=0;
            _this.$switchLoad=$(target);
            _this.$hd=_this.$switchLoad.find(_this.opts.tabname);
            _this.$bd=_this.$switchLoad.find(_this.opts.selectname);
            _this.$controls=_this.$switchLoad.find('.control');
            _this.$last=_this.$controls.find('.last');

            _this.$next=_this.$controls.find('.next');


            _this.$hdLi=_this.$hd.find('ul li');
            _this.$bdUl=_this.$bd.find('ul');
        _this.$bdUl.hide();
            _this.index=opts.defalutTab;
            _this.$hdLi.removeClass('on');
            _this.$hdLi.eq(_this.index).addClass('on');
            _this.$bdUl.hide();
            _this.$bdUl.eq(_this.index).show();
            _this.switch(opts);
            _this.addEvents(opts);
            if(opts.autoPlay){
                _this.autoPlay();
            }
        },
    addEvents: function () {
        var _this=this;
        _this.$hdLi.click(function(){
            _this.index=$(this).index();
            _this.switch(_this.index)
        });
        _this.$hdLi.mouseover(function(){
            _this.index=$(this).index();
            _this.switch(_this.index)
        });
        $('.last').click(function(){
            _this.switch('last');
            console.log(22);
        });
        $('.next').click(function(){
            _this.switch('next');
        });
    },
    switch:function(direction){
        var _this=this;
        if(typeof _this.opts.onBefore=="function"){
            _this.opts.onBefore();
        }


            if(direction=='last'){
                _this.index--;
            }else if(direction=='next'){
                _this.index++;
            }
            if(_this.index>_this.$hdLi.length-1){
                _this.index=0;
            }
            if(_this.index<0){
                _this.index=_this.$hdLi.length-1;
            }

         if(_this.opts.animation){
             _this.$bdUl.hide();
             _this.$hdLi.removeClass('on');
             _this.$hdLi.eq(_this.index).addClass('on');
             _this.$bdUl.eq(_this.index).fadeIn();
         }else{
             _this.$hdLi.removeClass('on');
             _this.$hdLi.eq(_this.index).addClass('on');
             _this.$bdUl.hide();
             _this.$bdUl.eq(_this.index).show();
         }
            if(typeof _this.opts.onAfter=="function"){
                _this.opts.onAfter();
            }
            //}
    },
    autoPlay:function(){
        var _this=this;
        setInterval(function(){
            _this.index++;
            if(_this.index==4){
                _this.index=0;
            }
            _this.$hdLi.removeClass('on');
            _this.$hdLi.eq(_this.index).addClass('on');
            _this.$bdUl.hide();
            _this.$bdUl.eq(_this.index).show();
        },_this.opts.speed)
    }
};

