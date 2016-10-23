/**
 * Created by Mr.W on 2016/10/22.
 */
!function(window,document,$,undefined){

    function imgslider () {
        var $imgWp = $('.slider-wp'),
            $imgLi =$imgWp.find('li'),
            $navWp =$('.nav-wp'),
            $nav = $navWp.find('li'),
            $b = $('b'),timer;

        $nav.on('click',function(){
            var $this = $(this);
            index = $this.index();
            $imgLi.eq(index).fadeIn(500).siblings('li:visible').fadeOut(500);

            $this.addClass('icon').siblings('.icon').removeClass('icon');
        })
        $b.on('click',function(){
            var $this = $(this);
            index = $nav.filter('.icon').index();

            if($this.hasClass('prev')){
                index++;
                if(index == 5){
                    index = 0;
                }
            }else{
                index--;
                if(index == -1){
                    index = 4;
                }
            }
            $nav.eq(index).trigger('click');
        })
        function auto() {
            timer = setInterval(function(){
                $b.filter('.prev').trigger('click');
            },2000);
        }
        auto();
        $('.imgslider').on('mouseenter',function(){
            $b.fadeIn();
            clearInterval(timer);
        });
        $('.imgslider').on('mouseleave',function(){
            $b.hide();
            auto();
        });


    }
    imgslider ();



}(window,document,jQuery)