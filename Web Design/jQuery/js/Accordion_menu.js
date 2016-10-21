!function(window,document,$,undefined){

	function accordion(){
		var $acc = $('.accordion');
		var $h1 = $acc.find('h1');
		$h1.on('click',function(){

			var $this = $(this);
			// var $ul = $('.accordion ul');
			// $ul.hide();
			$this.siblings().slideToggle();
			$this.parent().siblings().find('ul').slideUp();
						
		})

	}
	accordion();

 
}(window,document,jQuery);