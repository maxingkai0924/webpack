//数据来源：
const dataSource = [
    {label:"国家海洋信息中心", value:"国家海洋信息中心", key:1},
    {label:"自然资源部北海信息中心", value:"自然资源部北海信息中心",  key:2 },
    {label:"国家海洋局东海信息中心",value:"国家海洋局东海信息中心", key:3},
    {label:"国家卫星海洋应用中心",value:"国家卫星海洋应用中心", key:4},
    {label:"华东师范大学",value:"华东师范大学",key:5 },
    {label:"国家深海基地管理中心",value:"国家深海基地管理中心", key:6},
    {label:"国家海洋局南海信息中心",value:"国家海洋局南海信息中心",key:7},
    {label:"自然资源部第二海洋研究所", value:"自然资源部第二海洋研究所",key:8},
    {label:"国家基础地理信息中心",value:"国家基础地理信息中心",key:9},
    {label:"中国极地研究中心", value:"中国极地研究中心",key:10},
    {label:"中国海洋石油集团",value:"中国海洋石油集团",key:11},
]
//时效性：
const timelinessList = [
    {label:"延迟", value:"延迟"},
    {label:"实时", value:"实时"},
    {label:"近实时", value:"近实时"},
]

//更新频率：
const frequencyList = [
    {label:"每日", value:"每日"},
    {label:"月度", value:"月度"},
    {label:"季度", value:"季度"},
    {label:"年度", value:"年度"}
]

//学科分类：
const subjectList = [
    {label:"海洋水文", value:"海洋水文"},
    {label:"海洋气象", value:"海洋气象"},
    {label:"海洋生物", value:"海洋生物"},
    {label:"海洋化学", value:"海洋化学"},
    {label:"海洋地质", value:"海洋地质"},
    {label:"海洋地球物理", value:"海洋地球物理"},
    {label:"海底地形", value:"海底地形"},
    {label:"实况分析数据", value:"实况分析数据"},
    {label:"再分析数据", value:"再分析数据"},
    {label:"统计分析数据", value:"统计分析数据"},
    {label:"遥感影像", value:"遥感影像"},
    {label:"矢量地图数据", value:"矢量地图数据"},
    {label:"海洋经济产品", value:"海洋经济产品"},
    {label:"海域海岛产品", value:"海域海岛产品"},
    {label:"海洋灾害产品", value:"海洋灾害产品"},
    {label:"海底地形命名", value:"海底地形命名"},
    {label:"海洋专题图集", value:"海洋专题图集"}
]

//主题分类：
const themeList = [
    {label:"实测数据", value:"实测数据"},
    {label:"地理与遥感数据", value:"地理与遥感数据"},
    {label:"专题信息产品", value:"专题信息产品"},
    {label:"分析预报数据", value:"分析预报数据"}
]

//共享方式：
const SharingList = [
    {label:"完全共享", value:"完全共享"},
    {label:"条件共享", value:"条件共享"}
]
module.exports = {
    dataSource,timelinessList,frequencyList,subjectList,themeList,SharingList
}
