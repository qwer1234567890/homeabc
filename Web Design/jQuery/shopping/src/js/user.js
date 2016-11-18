/**
 * Created by Mr.W on 2016/10/23.
 */
!function(window,document,$,undefined){

    var app = angular.module('user',[]);

    app.controller('user_ctrl',function($scope,$http){
        
        $scope.param = {
            // classify: '',
            size: 9,
            page: 0
        };
        $scope.acPage = 0;

        $scope.cartList = function() {
            $http({
                url: 'php/shopping_cart_list.php'
            }).success(function(response){
                $scope.cartData = response.data;
                $scope.cartNum = response.total;
            });
        };

        $scope.onDelCart = function(a) {
            $http({
                url: 'php/shopping_cart_del.php',
                params:{id: a}
            }).success(function(response){
                $scope.cartList();
            });
        };


        $scope.showDlog = function() {
            $scope.timer = setTimeout(function(){
                $('#cartDlog').fadeIn();
            },300);         
        };

        $scope.hideDlog = function() {
            clearTimeout($scope.timer);
            $('#cartDlog').fadeOut();
        };

        $scope.onAddCart = function(a) {
           
            $http({
                url: 'php/shopping_cart_add.php',
                params: {gid: a}
            }).success(function(response){
                if(response.success){
                    $scope.cartList();
                }else{
                    layer.msg('加入购物车失败！请重试')
                };
            });
        };

        $scope.onJump = function() {
            var jumpPage = $scope.jumpIpt*1 - 1;

            //////当页面为空 没一个选项的时候/////////////
            if(isNaN(jumpPage)){
                layer.msg('请输入一个数字');
                $scope.jumpIpt = '';
                return;
            };
            if(jumpPage < 0){
                jumpPage = 0;
            }else if(jumpPage > $scope.pageArr.length - 1){
                jumpPage = $scope.pageArr.length - 1;
            };
//////当页面为空 没一个选项的时候 $scope.pageArr.length - 1 值为-1 此时的jumpPage输入一
///个大于它的值传给后台的page值是-1 会导致一直无法渲染 所以重新让jumpPage = 0/////////////
            if($scope.pageArr.length == 0){
                jumpPage = 0;
            };
////////////////////////////////////////////////////////////////////////////////////////
            $scope.param.page = jumpPage;
            listTable ();
            $scope.jumpIpt = '';
        };

        $scope.onSearch = function() {
            $scope.param.query = $scope.searchIpt;
            $scope.param.classify = '';
            listTable();
        };

        $scope.onGoodsList = function(a) {
            $scope.param.query = '';
            $scope.param.page = 0;
            $scope.param.classify = a;
            listTable();
        };
        

        $scope.onPaging = function () {
            $scope.param.page = this.$index;
            listTable ();
        };

        $scope.onFistPage = function() {
            $scope.param.page = 0;
            listTable ();
        };

        $scope.onPrevPage = function() {
            $scope.param.page--;
            listTable ();
        };

        $scope.onLastPage = function() {
            $scope.param.page = $scope.pageArr.length - 1;
            listTable ();
        };

        $scope.onNextPage = function() {
            $scope.param.page++;
            listTable ();
        };

        $scope.goToReg = function() {
            $scope.data = {};
            $('#regDlg').modal('show');
        };

        $scope.onReg = function() {
            //console.log($scope.data);
            $scope.isSubmiting = true;
            $http({
                url:'php/shopping_user_add.php',
                metohd: 'get',
                params: $scope.data
            }).success(function(response){
                if(response.success){
                    layer.msg('注册成功');
                }else{
                    layer.msg('注册失败');
                };
                $scope.isSubmiting = false;
                $('#regDlg').modal('hide');
            })
        };
        $scope.logOut = function() {
            if(confirm('确定要退出吗？')){
               $http({
                    url: 'php/shopping_user_logout.php',
                    method: 'get'
               }).success(function(response){
                    //console.log(response)
                    layer.msg('成功退出');
                    setTimeout(function(){
                        location.href = 'index.php';
                    },500);
               });
            };
        };
        // $scope.emailCheck = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,4}$/;
        // $scope.userCheck = /^[a-zA-z][a-zA-Z0-9_]{5,19}$/;
        // $scope.mobileCheck = /(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        
        function listTable() {

            $('#masker-wp').modal('show');
            $http({
                url: "php/shopping_goods_list.php",
                method: 'get',
                params: $scope.param
            }).success(function(response) {
                //console.log(response.data)
                if(response.success){

                    $scope.goodsData = response.data;
                    $scope.cartList && $scope.cartList();
                }else{
                    layer.msg('暂无数据')
                };
                $scope.searchIpt = '';
                $scope.acPage = $scope.param.page;
                $scope.pageArr = getPageArr(response.total,$scope.param.size);
                $('#masker-wp').modal('hide');
            });
           
        };
        listTable();

        function getPageArr (total,size) {
            
            return _.range(0,total/size);
        };

    });

   
///////////////handlebar 和Angular冲突 保留着 如果全用jquery 可以用/////////////////
        // function listTable() {
        //     var url = "php/shopping_goods_list.php";
        //     $('#masker-wp').modal('show');
        //     $.get(url, {size: 8,classify: 1},function(response){

        //         if(response.success){
        //             var source = $('#tLst').html();
        //             var template = Handlebars.compile(source)
        //             var html = template(response);
        //             $('#tLst').html(html);
        //         }else{

        //         };
        //         $('#masker-wp').modal('hide');
        //     },'json');
        // };
        // listTable();

}(window,document,jQuery)
