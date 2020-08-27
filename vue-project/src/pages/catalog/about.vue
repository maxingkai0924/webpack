<template>
  <div class="containe">
    <div class="content">
      <img class="back" src="../../assets/images/abbg.png" alt="" />
      <div class="peson">
        <img src="../../assets/images/avatar.jpg" alt="头像" />
        <div>
          <h3>马云</h3>
          <p>
            有个富者，他用孔雀的毛编成丝，纯金打成钩，钩上镶钻石
            <br />
            并用珍珠做饵，持银质的钓杆钓鱼。鱼儿并不理睬。钓起鱼来的，反倒是那些持竹杆的垂钓者。
          </p>
        </div>
      </div>
      <div class="f1">
        <h3>内心独白</h3>
        <p>
          在这个步履匆匆的时代，也许，很多人和我一样，铭心的怀恋那没有网络，没有手机，没有轿车，没有霓虹的时代。人们日出而作，日落而息，固守着自己的家园，不去为网络浪潮的澎湃而惊心，不去为未接电话的耽搁而惊恐，也不去为夜色的喧嚣而烦恼。走着自己的道路，想着自己的心事，做着自己的事情，在湛蓝的天空下，每一天都是那样的从容，从容的让人看淡了花开花落，得失更迭，生死枯荣。周末天气不错，哪儿也不想去，洗干净橡木浴桶，安安稳稳泡个澡吧……
        </p>
        <span><button>留言</button></span>
      </div>
      <div class="f2">
        <h3>心路历程</h3>
        <div class="list">
          <template v-for="(item, index) in list">
            <dl :key="index">
              <dd><img :src="item.img" alt="" /></dd>
              <dt>
                <h5>{{ item.title | sub(10) }}</h5>
                <p :title="item.content">{{ item.content | sub(40) }}</p>
              </dt>
            </dl>
          </template>
        </div>
      </div>
      <div class="f3">
        <h3>我的博客</h3>
        <ul>
          <template v-for="(item, index) in btns">
            <li :key="index" :class="[index == 4 ? 'bor0' : '']">
              <h6>{{ item.text }}</h6>
              <p>2011年01月12日</p>
              <span>
                <button :style="item.cols">{{ item.text }}</button>
              </span>
            </li>
          </template>
        </ul>
      </div>
      <div class="f4">
        <h3>加入我们</h3>
        <ul>
          <li style="margin-left:20px;">
            <img src="../../assets/images/joinwx.png" alt="" />
            <p>网页设计交流吧</p>
            <span>QQ群号:280998807</span>
          </li>
          <li>
            <img src="../../assets/images/joinwx.png" alt="" />
            <p>网页设计交流吧</p>
            <span>QQ群号:280998807</span>
          </li>
          <li style="margin-left:20px;">
            <img src="../../assets/images/joinwx.png" alt="" />
            <p>网页设计交流吧</p>
            <span>QQ群号:280998807</span>
          </li>
          <li>
            <img src="../../assets/images/joinwxqun.png" alt="" />
            <p>网页设计交流吧</p>
            <span>QQ群号:280998807</span>
          </li>
        </ul>
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
            background: '#00c1de'
          },
          text: '今夕何夕'
        },
        {
          cols: {
            background: '#ff6600'
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
        },
        {
          img: require('../../assets/images/b01.jpg'),
          title: '鞣皮匠罗比达斯正在扫地。路是他的亲人，孤独是他的伙伴。',
          content:
            '王后庄重地说：“听我一言，尊敬的祭司，你日日夜夜专打清规戒律的死结，不知道爱的金子已经丢失，是我手沾灰尘的师傅从尘土里把它捡了起来。你可以骄傲地抱住那些毫无意义的打结的绳索，可我是爱的金子的乞丐，宁可头顶着尘土的赠予。'
        },
        {
          img: require('../../assets/images/h2.jpg'),
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
  padding: 0 20px;
}
@mixin commonTitle {
  h3 {
    height: 35px;
    color: #333;
    line-height: 35px;
    position: relative;
    padding-left: 10px;
    &::after {
      content: '';
      width: 130px;
      height: 1px;
      border-bottom: 1px dashed #000;
      position: absolute;
      top: 35px;
      left: 0;
    }
  }
}
.content {
  height: 1570px;
  background: #fff;
  border-radius: 4px;
  padding: 0 40px;
  overflow: hidden;
  position: relative;
  .back {
    position: absolute;
    top: 0;
    right: 0;
  }
  .peson {
    height: 180px;
    display: flex;
    align-items: center;
    img {
      width: 104px;
      height: 104px;
      border-radius: 50%;
      border: 2px solid #007aff;
    }
    div {
      height: 104px;
      margin-left: 15px;
      h3 {
        font-size: 18px;
        color: #333;
        margin-top: 15px;
      }
      p {
        font-size: 14px;
        color: #666;
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
  .f1 {
    @include commonTitle;
    p {
      color: #333;
      font-size: 14px;
      line-height: 22px;
      margin-top: 20px;
    }
    span {
      display: block;
      text-align: right;
      button {
        width: 100px;
        height: 30px;
        line-height: 30px;
        color: #fff;
        font-size: 14px;
        background: #000;
        border: 1px solid #000;
        cursor: pointer;
      }
    }
  }
  .f2 {
    @include commonTitle;
    .list {
      display: flex;
      flex-wrap: wrap;
      dl {
        width: 260px;
        height: 263px;
        background: #f3f3f3;
        overflow: hidden;
        margin: 20px 20px 0 0;
        transition: all 0.5s ease;
        cursor: pointer;
        &:hover {
          box-shadow: 0 0 10px #000;
          transform: translateY(-5px);
        }
        dd {
          width: 220px;
          margin: 18px auto 15px;
          img {
            width: 220px;
            height: 120px;
          }
        }
        dt {
          width: 220px;
          margin: 0 auto;
          h5 {
            font-size: 14px;
            color: #333;
          }
          p {
            color: #666;
            font-size: 14px;
            line-height: 20px;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .f3 {
    @include commonTitle;
    margin-top: 30px;
    ul {
      display: flex;
      li {
        width: 220px;
        height: 120px;
        border-right: 1px solid #e9eaed;
        text-align: center;
        margin: 20px 0;
        h6 {
          color: #333;
          font-size: 16px;
          margin-top: 8px;
        }
        p {
          color: #666;
          font-size: 14px;
          margin: 22px 0 14px 0;
        }
        span {
          display: block;
          button {
            width: 130px;
            height: 32px;
            border: none;
            color: #fff;
            outline: none;
            cursor: pointer;
          }
        }
        &.bor0 {
          border: none;
        }
      }
    }
  }
  .f4 {
    @include commonTitle;
    ul {
      display: flex;
      margin-top: 20px;
      li {
        width: 225px;
        height: 297px;
        box-shadow: 0 0 10px #ccc;
        font-size: 14px;
        color: #333;
        padding-left: 18px;
        margin-left: 45px;
        img {
          width: 190px;
          height: 194px;
          border: 5px solid #007aff;
          margin-top: 12px;
        }
        p {
          margin: 14px 0 17px 0;
        }
      }
    }
  }
}
</style>
