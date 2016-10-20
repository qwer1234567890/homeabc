!function(window,document,$,undefined){

	function renderImgSlider($target) {
		var $arrows = $('.previous,.next');
		var imgBtn = $target.find('.imgBtn'),
			timer,
			$lis = $('.img-wp li');
		$lis.each(function(i,obj){
			console.log(obj)
			$(obj).attr('indx',i);
		});

		imgBtn.on('click',function(e,type,direction){
			var $this = $(this),
				index = $this.index(),
				$ul = $('.img-wp ul'),
				$lis = $('.img-wp li'),
				width = $lis.width();

			$this.addClass('on').siblings('.on').removeClass('on');
			if(type){

				if(direction == 'next'){
					$ul.animate({'margin-left':'-520px'},300,function(){
					$ul
						.append($lis.eq(0))
						.css('margin-left','0px');
					})
				}else{
					$ul
						.prepend($lis.eq(4))
						.css('margin-left','-520px')
						.animate({'margin-left':'0px'},300)
				}	
			}else{	
			$ul.animate({'margin-left': - index * width + 'px'},300)
			}
		});

		$target
			.on('mouseover',function(){
				$arrows.show();
				clearInterval(timer);
			})
			.on('mouseout',function(){
				$arrows.hide();
				run();
			});


		$arrows.on('click',function() {
			var $this = $(this),
			direction = 'next',
			currIndex = getCurrentIndex();
			if($this.hasClass('next')){
				currIndex++;
				if(currIndex > imgBtn.length - 1){
					currIndex = 0;
				}
			}else{
				currIndex--;
				if(currIndex < 0){
					currIndex = imgBtn.length - 1;
				}
				direction = 'prev';

			}
			imgBtn.eq(currIndex).trigger('click',[true,direction]);
		});
		function run(){
			timer = setInterval(function(){
			$arrows.filter('.next').trigger('click');
			},3000)
		};
		//run();

		function getCurrentIndex(){
			return $('.imgBtn').filter('.on').index();
		};

	}
	renderImgSlider($('.imgSlider'));


}(window,document,jQuery)