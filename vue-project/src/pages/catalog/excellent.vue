<template>
  <div class="containe">
    <div class="content">
      <div class="left">
        <div class="f1">
          <p class="title">站长推荐</p>
          <ul>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li v-for="(item,index) in btns" :key='index+60'>{{item.text}}</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
          </ul>
        </div>
        <div class="f2">
          <p class="title">站长推荐</p>
          <ul>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li v-for="(item,index) in btns" :key='index+70'>{{item.text}}</li>
            <li v-for="(item,index) in btns" :key='index+50'>{{item.text}}</li>
          </ul>
          <ul style="margin-top:30px;">
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li v-for="(item,index) in btns" :key='index+20'>{{item.text}}</li>
            <li v-for="(item,index) in btns" :key='index+30'>{{item.text}}</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
          </ul>
          <ul style="margin-top:30px;">
             <li v-for="(item,index) in btns" :key='index+10'>{{item.text}}</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li v-for="(item,index) in btns" :key='index+40'>{{item.text}}</li>
            <li>葛优个人博客</li>
            <li>寻之旅</li>
            <li>赵老师博客</li>
            <li>马云博客</li>
            <li>马化腾个人空间</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
            <li>马化腾个人空间</li>
            <li>李白随身日记</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'home',
      btns: [
        {
          cols: {
            background: '#036564'
          },
          text: '个人博客模板'
        },
        {
          cols: {
            background: '#eb6841'
          },
          text: 'css动画'
        },
        {
          cols: {
            background: '#3fb8af'
          },
          text: '布局'
        },
        {
          cols: {
            background: '#fe4365'
          },
          text: '今夕何夕'
        },
        {
          cols: {
            background: '#fc9d9a'
          },
          text: 'SEO'
        },
        {
          cols: {
            background: '#edc951'
          },
          text: '女程序员'
        },
        {
          cols: {
            background: '#c8c8a9'
          },
          text: '小世界'
        },
        {
          cols: {
            background: '#3299bb'
          },
          text: '网页设计'
        },
        {
          cols: {
            background: '#83af9b'
          },
          text: '个人博客'
        }
      ],
      list: [
        {
          img: require('../../assets/images/b02.jpg'),
          title: '个人博客，属于自己的小世界',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        },
        {
          img: require('../../assets/images/2.jpg'),
          title: '父母有时候也会像个孩子一样，希望可以黏着你',
          content:
            '父母有时候也会像个孩子一样，希望可以黏着你。小时候，黏着父母，我们觉得有安全感，可是长大后，渐渐发现，父母却变得越来越黏着我们，因为他们也渴望来自于孩子的安全感。因为他们害'
        },
        {
          img: require('../../assets/images/4.jpg'),
          title: '一个远道而来的旅行者听说以后，十分好奇',
          content: '村里住着一位老人，他仙风道骨，目光如炬，不管谁的手伸到他面前，只看一眼他就能马上说出对方的前途命运，无一偏差。'
        },
        {
          img: require('../../assets/images/3.jpg'),
          title: '花石榴开千瓣之花，却结不出粒米之实',
          content: '有个富者，他用孔雀的毛编成丝，纯金打成钩，钩上镶钻石，并用珍珠做饵，持银质的钓杆钓鱼。鱼儿并不理睬。钓起鱼来的，反倒是那些持竹杆的垂钓者。'
        },
        {
          img: require('../../assets/images/b05.jpg'),
          title: '鞣皮匠罗比达斯正在扫地。路是他的亲人，孤独是他的伙伴。',
          content:
            '王后庄重地说：“听我一言，尊敬的祭司，你日日夜夜专打清规戒律的死结，不知道爱的金子已经丢失，是我手沾灰尘的师傅从尘土里把它捡了起来。你可以骄傲地抱住那些毫无意义的打结的绳索，可我是爱的金子的乞丐，宁可头顶着尘土的赠予。'
        },
        {
          img: require('../../assets/images/1.jpg'),
          title: '流岚飞雾，峰峙崖端，山后叠山，海上升月，都让人心旷神怡。浩叹天宇广袤，神州万象。',
          content:
            '善于欣赏顽童，功在他独具慧眼。善于欣赏根木，高在他独运匠心。善于欣赏嚎啕中的悲壮，他必定饱经沧桑。善于欣赏残缺中的奇美，他必定深谙花好月圆。只是欣赏花容玉颜、海誓山盟，是欣赏者的肤浅。'
        }
      ]
    }
  },
  mounted () {},
  methods: {},
  filters: {
    sub: function (value, num) {
      if (value.length > num) {
        return value.substring(0, num) + '...'
      } else {
        return value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@mixin commonCss($width) {
  height: $width;
  background: #fff;
  border-radius: 4px;
  margin-top: 20px;
  padding: 0 20px;
}
@mixin commonTitle {
  .title {
    height: 60px;
    border-bottom: 1px solid #e4e3e3;
    color: #333;
    line-height: 80px;
    position: relative;
    &::after {
      content: '';
      width: 60px;
      height: 2px;
      background: #000;
      position: absolute;
      top: 58px;
      left: 0;
    }
  }
}
.content {
  overflow: hidden;
  .left {
    width: 1200px;
    .f1{
       @include commonCss(280px);
       @include commonTitle;
       padding-bottom:20px;
       ul{
          display: flex;
          padding:10px 10px 0 10px;
          flex-wrap: wrap;
          li{
            width:180px;
            height:30px;
            line-height:30px;
            text-align: center;
            font-size:14px;
            border:1px solid #ebebeb;
            color:#333;
            margin:10px 10px 0 0;
            cursor: pointer;
            border-radius:2px;
            &:hover{
               background:#222;
               color:#fff;
            }
          }
       }
    }
    .f2{
      @include commonCss(1060px);
      @include commonTitle;
      ul{
         display: flex;
         padding:10px;
         flex-wrap: wrap;
         li{
           width:180px;
           height:30px;
           line-height:30px;
           text-align: center;
           font-size:14px;
           border:1px solid #ebebeb;
           color:#333;
           margin:10px 10px 0 0;
           cursor: pointer;
           border-radius:2px;
           &:hover{
              background:#222;
              color:#fff;
           }
         }
      }
    }
  }
}
</style>
