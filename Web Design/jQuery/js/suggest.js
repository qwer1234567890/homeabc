/**
 * Created by Mr.W on 2016/10/14.
 */
!function(window,document,$,undefined){
    var date = [
        { name:'冬天1'},
        { name:'冬天2'},
        { name:'冬天3'},
        { name:'冬天4'},
        { name:'冬天5'},
        { name:'冬天6'},
        { name:'啊冬天7'},
        { name:'啊冬天8'},
        { name:'啊冬天9'},
        { name:'冬天10'}
    ];
    function renderSuggest(){

        var $searchWp = $('#searchWp'),
            $input = $searchWp.find('input'),
            $ul = $searchWp.find('ul');

        $input.on('keyup',function(e) {
            var val = $input.val(),
                kCode = e.keyCode,
                $lis = $ul.find('li'),///////////为了给index取值；
                index;
            index = $lis.filter('.on').index();////////////每次键盘抬起，得到带有on样式的li在li集合中的索引；
            if(kCode == 38){;
                if(index == -1){
                    index = 0;
                }
                index--;
                $lis.eq(index).addClass('on').siblings('.on').removeClass('on');
                $input.val($lis.eq(index).html());
                return;
            }else if(kCode == 40){
                index++;
                if(index == $lis.length){
                    index = 0;
                };
                $lis.eq(index).addClass('on').siblings('.on').removeClass('on');
                $input.val($lis.eq(index).html());
                return;
            };

            if(val == ''){
                $ul.hide();
            }else{
                $ul.html(renderLi(date,val));
                $ul.show();
            };
            $lis = $ul.find('li');///////////////第一次渲染ul以后重新得到li的集合，li集合就不再是空数组；此时
                                    /////////////下面的鼠标事件绑定才有效果；
            $lis.on('mouseover',function(){
                var $this = $(this);
                $this.addClass('on').siblings('.on').removeClass('on');
            });
            $ul.on('mouseout',function(){
                $ul.find('li.on').removeClass('on');
            });

        });

        function renderLi(resDate,key) {////////////////////////////根据输入的值来匹配resDate里的数据；
            var len = resDate.length;
            var arr = [],name;
            for(var i = 0; i < len; i ++){
                name = resDate[i].name;
                if(name.indexOf(key) == 0 ){////////////////////////只匹配开头一样的值；
                    arr.push('<li>',name,'</li>');
                };
            };
            return arr.slice(0,30).join('');////////////////////////得到的数组每三个数据是一组li数据，最多显示10组；
        };



    }
    renderSuggest();


}(window,document,jQuery)