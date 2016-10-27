/**
 * Created by Mr.W on 2016/10/23.
 */
!function(window,document,$,undefined){
   
    function jump (){
        var $rtBtn = $('#rtBtn');
        $rtBtn.on('click',function(){
            window.location.href = 'begin.html';
        });
    }
    jump ();

    function form_check(){
        var $form = $('form');
        $form.on('submit',function(){      
            return check();    
        });
    }
    form_check();  
/////////////// 得到选中的hobbies返回一个数组/////////////////
    function hob () {
            var arr = [];
            $('[name^="hobbies"]').each(function(){
                var $this = $(this);///将this转化为jQuery对象;
                //if($this.prop('checked')){  jquery的方法来判断复选框是否被选中;
                //if($this[0].checked){  如果用.checked判断是否被选中需要将jQuery对象转换为dom对象;
                if(this.checked){  ////这时候this是dom对象;只有在dom对象时xx.checked才返回true或者false;               
                arr.push($this.val());//这是用到了val()方法,所以this需要变成jQuery对象——$this;
                }
            })
            return arr;
        };
///////////// 事件账号文本框不能输入除数字和字母以外的字符;
    function uname_check(){
        var $uname = $('[name="username"]'),
            $u_div = $('#u_div'),
            user_check = /^[a-zA-z][a-zA-Z0-9_]{0,9}$/,
            user_check2 = /^[A-Za-z0-9]+$/,len;
            console.log($u_div[0])
        $uname.on('keydown',function(){
        len = $uname.val().length;
        });
        $uname.on('input',function(){
        //console.log(len);
            if(!user_check2.test($uname.val())){
                $uname.val($uname.val().substr(0,len));
            }else if(!user_check.test($uname.val())){
                $u_div.addClass('has-error');
            }else if($uname.val() ==''){
                $u_div.removeClass('has-error');
            }else{
                $u_div.removeClass('has-error');
            };
        });
    }
    uname_check();

   
////////////////////文本框动态显示字符数////////////////////
    function desc_check() {
        var $desc_control = $('#desc-control'),
            $desc = $('[name="desc"]'),
            $num1 = $desc_control.find('span:first'),
            $num2 = $desc_control.find('span:last'),
            len2 = 10,len1;
            $num1.html(0);
            $num2.html(len2);
        $desc.on('input',function () {
            len1 = $desc.val().length;
            $num1.html(len1);
            if(len1 > len2){
               $desc.val($desc.val().substr(0,len2));
               $num1.html(len2);
            }
        })
    }
    desc_check();    
    

    function check() {
        var mail_check = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        var user_check = /^[a-zA-z][a-zA-Z0-9_]{5,9}$/;

        var date = {
            username: $('[name="username"]').val(),
            password: $('[name="password"]').val(),
            email: $('[name="email"]').val(),
            edu: $('[name="edu"]').val(),
            hobbies: hob()
        };   
        //console.log(date.hobbies);
        if($.trim(date.username) == ''){
            alert('用户名不能为空');
            return false;            
        }else if(!user_check.test(date.username)){
            alert('请以字母开头输入数字或字母组合的6~10位数');
            return false;
        };
        if($.trim(date.password) == ''){
            alert('密码不能为空');
            return false;            
        }
        if(!mail_check.test(date.email)){
            alert('请输入正确的邮箱格式')
            return false;
        }
        if(date.edu == '0'){
            alert('请选择学历');
            return false;            
        }
        if(date.hobbies.length <= 0){
            alert('请选择爱好')
            return false;
        }
        //return false;
    }
}(window,document,jQuery)
