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

    var $form = $('form');
    $form.on('submit',function(){
        
        return check();
            
    })
    function check() {

        var $user = $('[name="username"]');
                //$p_word = $('[name="password"]'),
                // $email = $('[name="email"]'),
                // $edu =  $('[name="edu"]'),
                // $desc = $('[name="desc"]'),
                // $hobbies = $('[name="hobbies"]'),
                // $all = $('[name]');
                if($user.val() == ''){
                    alert('用户名不能为空');
                    return false;            
                }

    }
 


}(window,document,jQuery)
