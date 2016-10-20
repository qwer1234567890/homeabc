!function(window,document,undefined){
    var Helper = {};
    Helper.fill = function(num){
        return num < 10 ? '0' + num : num;
    }
    Helper.Dater =function(){
        var date = new Date();
        var y = date.getFullYear();
        var M = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var m = date.getMinutes();
        var s = date.getSeconds();
        return [y,Helper.fill(M),Helper.fill(d),Helper.fill(h),Helper.fill(m),Helper.fill(s)]
    } 
    Helper.dom = function(id){
        return typeof(id) == 'string' ? document.getElementById(id) : id;
    }
    Helper.getType = function(item){
        return item instanceof Array ? 'array' : typeof item;
    }

    Helper.getWinHeight = function() {
        var h = window.innerHeight || document.documentElement.clientHeight;
        return h;
    }

    Helper.deepCopy = function(list) {
        var result;

        if(typeof list != 'object') {
            return;
        }

        if(list instanceof Array){
            result = [];
        }else{
            result = {};
        }

        for(key in list){
            result[key] = list[key];
        }

        return result;
    }
    
    window.Helper = Helper;
}(window,document)




