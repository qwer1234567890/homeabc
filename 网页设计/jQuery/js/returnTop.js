/**
 * Created by Mr.W on 2016/10/8.
 */
!function(window,document,$,undefined){
    function returnTop (){
        var $topBtn = $('#topBtn');
        $(window).on('scroll',function(){
            var $this = $(this),
                $nav = $('.nav'),
                st = $this.scrollTop(),
                nHeight = $('.top-wp').height(),
                $bottom = $('.bottom-wp');
            if(st >= nHeight){
                $nav.add($bottom).addClass('on');
            }else{
                $nav.add($bottom).removeClass('on');
            };
            return $('body').scrollTop() >= 300? $topBtn.slideDown() : $topBtn.slideUp();

        });
        $topBtn.on('click',function(){

            if($('body').scrollTop() <= 500){
                $('body').animate({'scrollTop':'0'},300);
            }else if($('body').scrollTop() > 500){
                $('body').animate({'scrollTop':'0'},500);
            }
        });
    }

    returnTop ();

}(window,document,jQuery)
