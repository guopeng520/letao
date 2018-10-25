$(function(){
  var chartLeft = echarts.init(document.getElementById('pic_left'));
  var chartRight = echarts.init(document.getElementById('pic_right'));

  // 指定图表的配置项和数据
  var optionLeft = {
      title: {
          text: '2018年注册人数'
      },
      tooltip: {},
      legend: {
          data:['人数']
      },
      xAxis: {
          data: ["一月","二月","三月","四月","五月","六月"]
      },
      yAxis: {},
      series: [{
          name: '人数',
          type: 'bar',
          data: [2800, 1200, 3200, 1900, 1900, 2800]
      }]
  };

  // 使用刚指定的配置项和数据显示图表。
  chartLeft.setOption(optionLeft);

  optionRight = {
    title : {
        text: '热门品牌',
        subtext: '2018年6月',
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        left: 'left',
        data: ['阿迪','耐克','李宁','特步','贵人鸟']
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:1335, name:'阿迪'},
                {value:310, name:'耐克'},
                {value:234, name:'李宁'},
                {value:135, name:'特步'},
                {value:548, name:'贵人鸟'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
};
chartRight.setOption(optionRight);
})