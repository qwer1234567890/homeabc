/**
 * Created by Mr.W on 2016/10/9.
 */
!function(window,documwnt,$,undefined){
///////模拟后台数据//////////////////////////
    var date = [
        {name:'北京',id:11},
        {name:'河北',id:12},
        {name:'山东',id:13},
        {name:'山西',id:14},
        {name:'辽宁',id:15}
    ];
    var date2 = {
        11:[
            {name:'北京市',id:1101}
        ],
        12:[
            {name:'石家庄',id:1201},
            {name:'保定',id:1202},
            {name:'邯郸',id:1203}
        ],
        13:[
            {name:'济南',id:1301},
            {name:'青岛',id:1302}
        ],
        14:[
            {name:'太原',id:1401},
            {name:'大同',id:1402}
        ],
        15:[
            {name:'沈阳',id:1501},
            {name:'铁岭',id:1502}
        ],
    }
    var date3 ={
        1101:[
            {name:'朝阳区',id:11011},
            {name:'东城区',id:11012},
            {name:'西城区',id:11013},
            {name:'昌平区',id:11014}
        ],
        1201:[
            {name:'东区',id:12011},
            {name:'西区',id:12012},
            {name:'南区',id:12013},
            {name:'北区',id:12014}
            ],
        1301:[
            {name:'前区',id:13011},
            {name:'后区',id:13012},
            {name:'left区',id:13013},
            {name:'right区',id:13014}
        ],
        1401:[
            {name:'东区',id:14011},
            {name:'西区',id:14012},
            {name:'南区',id:14013},
            {name:'北区',id:14014}
        ],
        1501:[
            {name:'上区',id:15011},
            {name:'下区',id:15012},
            {name:'左区',id:15013},
            {name:'右区',id:15014}
        ],
        1202:[
            {name:'上区',id:12021},
            {name:'下区',id:12022},
            {name:'左区',id:12023},
            {name:'右区',id:12024}
        ],
        1302:[
            {name:'上区',id:13021},
            {name:'下区',id:13022},
            {name:'左区',id:13023},
            {name:'右区',id:13024}
        ]
    }
    var $province = $('#province'),
        $city = $('#city'),
        $county = $('#county');
    function renderOpts(arr) {
        var opts = [];
        for(var i = 0; i < arr.length; i++){
            opts.push('<option value="',arr[i].id,'">',arr[i].name,'</option>');
        }
        return opts.join('');
    }
    $province
        .append(renderOpts(date))
        .on('change',function(){
            var val = $(this).val(),
                city;
            if(val == -1){
                $city.html('<option value="-1">请选择</option>');
                return;
            }
            city = date2[val];

                $city.html('<option value="-1">请选择</option>'+ renderOpts(city));
        })
    $city.on('change',function() {
        var val = $(this).val(),
            county;
        console.log(this.id)
        if(val == -1){

            $county.html('<option value="-1">请选择</option>');
            return;

        }
        county = date3[val];

        $county.html('<option value="-1">请选择</option>'+ renderOpts(county));
    })

}(window,document,$)
