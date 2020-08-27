<template>
  <div class="containe">
    <div class="swiper-container">
      <el-carousel>
        <el-carousel-item name="12"><img src="../../assets/images/1.jpg" alt="" /></el-carousel-item>
        <el-carousel-item><img src="../../assets/images/2.jpg" alt="" /></el-carousel-item>
        <el-carousel-item><img src="../../assets/images/3.jpg" alt="" /></el-carousel-item>
      </el-carousel>
      <div class="center-img">
        <div class="center-img-box"><img src="../../assets/images/1.jpg" alt="" /></div>
        <div class="center-img-box"><img src="../../assets/images/2.jpg" alt="" /></div>
      </div>
      <div class="center-log">
        <h6>我的名片</h6>
        <p>网名：Dacnes</p>
        <p>职业：Web前端工程师，研发部</p>
        <p>现居：山东省-济南市</p>
        <p>Email: 15210447815@163.com</p>
        <ul>
          <li><img src="../../assets/images/c01.png" alt="" /></li>
          <li><img src="../../assets/images/c02.png" alt="" /></li>
          <li><img src="../../assets/images/c03.png" alt="" /></li>
          <li><img src="../../assets/images/c04.png" alt="" /></li>
        </ul>
      </div>
    </div>
    <div class="content">
      <div class="left">
        <div class="f2">
          <ul class="tab">
            <template v-for="(item, index) in tabs">
              <li :class="{ active: item.id === currentIndex }" :key="index" @click="hanldTabs(item)">{{ item.name }}</li>
            </template>
          </ul>
          <div class="f2-content">
            <div>
              <img src="../../assets/images/1.jpg" alt="" />
              <img src="../../assets/images/2.jpg" alt="" />
            </div>
            <ul>
              <template v-for="(item, index) in contents">
                <li :class="{ active: index === contentsIndex }" :key="index" @mousemove="moveContents(index)" @mouseout="outContents(index)">
                  <p>
                    <span class="code">{{ index + 1 }}</span>
                    <span>{{ item.title }}</span>
                  </p>
                  <p class="text">{{ item.content }}</p>
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div class="f3">
          <p class="title">
            <span>精彩专题</span>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>原创模板</el-breadcrumb-item>
              <el-breadcrumb-item>古典</el-breadcrumb-item>
              <el-breadcrumb-item>清新</el-breadcrumb-item>
              <el-breadcrumb-item>低调</el-breadcrumb-item>
            </el-breadcrumb>
          </p>
          <div class="list">
            <template v-for="(item, index) in list">
              <dl :key="index" :class="[index > 2 ? 'border0' : '']">
                <dd><img :src="item.img" alt="" /></dd>
                <dt>
                  <p>{{ item.title }}</p>
                  <div :title="item.content">{{ item.content | sub(55) }}</div>
                  <span>
                    <i class="el-icon-plus"></i>
                    文章阅读
                  </span>
                </dt>
              </dl>
            </template>
          </div>
        </div>
        <div class="f4"><img src="../../assets/images/longad.jpg" alt="" /></div>
        <div class="f5">
          <p class="title">最新博文</p>
          <div class="top">
            <h1>
              <span>【顶】</span>
              别让这些闹心的套路，毁了你的网页设计
            </h1>
            <div>
              <img src="../../assets/images/b04.jpg" alt="" />
              <img src="../../assets/images/b02.jpg" alt="" />
              <img src="../../assets/images/b05.jpg" alt="" />
              <img src="../../assets/images/b01.jpg" alt="" />
            </div>
            <p>
              一个人，越是有福气，越是善良；一个人，越是喜欢做善事，越是有福气。 生活中，一个人的善事，做的越多越有福气，坑人害人的事，不做更有福气。
              其实一个人的福气，都是从做人做事开始，该做的事就做，不该做的事就不做
            </p>
            <h6>
              <img src="../../assets/images/avatar.jpg" alt="" />
              <span>杨青青</span>
              <span>2018-10-20</span>
              <span class="text">【原创模板】</span>
            </h6>
          </div>
          <ul>
            <template v-for="(item, index) in list">
              <li :key="index">
                <h3>{{ item.title }}</h3>
                <div class="box">
                  <h4>
                    <img :src="item.img" alt="" />
                    <button type="button">原创模板</button>
                  </h4>
                  <div>
                    <span>{{ item.content }}</span>
                    <h6>
                      <img src="../../assets/images/avatar.jpg" alt="" />
                      <span>杨青青</span>
                      <span>2018-10-20</span>
                      <span class="text">【原创模板】</span>
                    </h6>
                    <button type="button" class="btn">阅读更多</button>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
      <div class="right">
        <div class="f2">
          <p class="title">网站公告</p>
          <ul>
            <template v-for="(item, index) in list">
              <li :key="index">{{ item.content }}</li>
            </template>
          </ul>
        </div>
        <div class="f3">
          <p class="title">点击排行</p>
          <img src="../../assets/images/h1.jpg" alt="" />
          <ul>
            <template v-for="(item, index) in list">
              <li :key="index">
                <span :class="[index < 3 ? 'orage' : 'borow']">{{ index + 1 }}</span>
                <p>{{ item.title }}</p>
              </li>
            </template>
          </ul>
        </div>
        <div class="f6"><img src="../../assets/images/ad02.jpg" alt="" /></div>
        <div class="f4">
          <p class="title">站长推荐</p>
          <img src="../../assets/images/h2.jpg" alt="" />
          <ul>
            <template v-for="(item, index) in list">
              <li :key="index">
                <img :src="item.img" alt="" />
                <p>{{ item.title }}</p>
              </li>
            </template>
          </ul>
        </div>
        <div class="f6"><img src="../../assets/images/ad.jpg" alt="" /></div>
        <div class="f5">
          <p class="title">站点信息</p>
          <div class="text">
            <p>
              <span>
                <strong>建站时间:</strong>
                2018-10-24
              </span>
            </p>
            <p>
              <span>
                <strong>网站程序:</strong>
                红色警戒共和国之辉
              </span>
            </p>
            <p>
              <span>
                <strong>主题模板:</strong>
                今夕何夕
              </span>
            </p>
            <p>
              <span>
                <strong>文章评论:</strong>
                459
              </span>
            </p>
            <p>
              <span>
                <strong>文章统计:</strong>
                656
              </span>
            </p>
            <p>
              <span>
                <strong>统计数据:</strong>
                百度一下
              </span>
            </p>
            <p>
              <span>
                <strong>微信公众号:</strong>
                扫描二维码，关注我们
              </span>
            </p>
            <p><img src="../../assets/images/joinwx.png" alt="" /></p>
          </div>
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
      currentIndex: 0,
      tabs: [
        {
          id: 0,
          name: '个人博客'
        },
        {
          id: 1,
          name: '工作日记'
        },
        {
          id: 2,
          name: '心路历程'
        },
        {
          id: 3,
          name: '我的博客'
        },
        {
          id: 4,
          name: '前端日记'
        }
      ],
      contents: [
        {
          title: '一个远道而来的旅行者听说以后，十分好奇',
          content: '村里住着一位老人，他仙风道骨，目光如炬，不管谁的手伸到他面前，只看一眼他就能马上说出对方的前途命运，无一偏差。'
        },
        {
          title: '花石榴开千瓣之花，却结不出粒米之实',
          content: '有个富者，他用孔雀的毛编成丝，纯金打成钩，钩上镶钻石，并用珍珠做饵，持银质的钓杆钓鱼。鱼儿并不理睬。钓起鱼来的，反倒是那些持竹杆的垂钓者。'
        },
        {
          title: '流岚飞雾，峰峙崖端，山后叠山，海上升月，都让人心旷神怡。浩叹天宇广袤，神州万象。',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        },
        {
          title: '个人博客，属于自己的小世界',
          content:
            '善于欣赏顽童，功在他独具慧眼。善于欣赏根木，高在他独运匠心。善于欣赏嚎啕中的悲壮，他必定饱经沧桑。善于欣赏残缺中的奇美，他必定深谙花好月圆。只是欣赏花容玉颜、海誓山盟，是欣赏者的肤浅。'
        }
      ],
      contentsIndex: 0,
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
  methods: {
    hanldTabs (items) {
      this.currentIndex = items.id
    },
    moveContents (items) {
      this.contentsIndex = items
    },
    outContents (items) {
      this.contentsIndex = items
    }
  },
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
.swiper-container {
  overflow: hidden;
  & /deep/.el-carousel {
    border-radius: 3px;
    width: 615px;
    height: 260px;
    float: left;
    /deep/ .el-carousel__container {
      height: 260px;
    }
    img {
      width: 100%;
      display: block;
      height: 260px;
    }
  }
  .center-img {
    width: 270px;
    float: left;
    margin: 0 19px 0 14px;
    .center-img-box:last-child {
      margin-top: 8px;
    }
    img {
      width: 270px;
      height: 125px;
      border-radius: 3px;
    }
  }
  .center-log {
    width: 280px;
    height: 260px;
    background: #2a2a2a;
    border-radius: 4px;
    float: left;
    overflow: hidden;
    h6 {
      font-size: 20px;
      color: #838993;
      margin: 17px 0 0 10px;
    }
    p {
      font-size: 12px;
      margin: 17px 0 0 20px;
      color: #d0d2d4;
    }
    ul {
      overflow: hidden;
      li {
        float: left;
        width: 52px;
        height: 52px;
        border-radius: 50%;
        text-align: center;
        border: 1px solid #161616;
        margin: 30px 0 0 10px;
        img {
          margin-top: 10px;
        }
      }
    }
  }
}
.content {
  overflow: hidden;
  .left {
    width: 900px;
    float: left;
    .f2 {
      @include commonCss(310px) .tab {
        height: 60px;
        overflow: hidden;
        border-bottom: 1px solid #e4e3e3;
        li {
          float: left;
          color: #333;
          height: 59px;
          line-height: 68px;
          padding: 0 18px;
          cursor: pointer;
          &.active {
            border-bottom: 2px solid #333;
          }
        }
      }
      .f2-content {
        overflow: hidden;
        div {
          width: 275px;
          float: left;
          img {
            width: 275px;
            height: 100px;
            display: block;
            margin-top: 10px;
            border-radius: 3px;
          }
        }
        ul {
          width: 567px;
          float: left;
          margin-left: 16px;
          li {
            padding: 8px 0 0 20px;
            margin-top: 5px;
            cursor: pointer;
            p {
              color: #333;
              span {
                width: 480px;
                display: inline-block;
                font-size: 14px;
                overflow: hidden; //超出的文本隐藏
                text-overflow: ellipsis; //溢出用省略号显示
                white-space: nowrap; //溢出不换行
                padding-left: 15px;
                &.code {
                  width: 20px;
                  height: 20px;
                  background: #9a9a9a;
                  color: #fff;
                  font-size: 12px;
                  text-align: center;
                  line-height: 20px;
                  padding: 0;
                }
              }
              &.text {
                color: #333;
                font-size: 12px;
                line-height: 22px;
                display: none;
              }
            }
            &.active {
              background: #f7f7f7;
              padding: 8px 20px 10px 20px;
              .text {
                display: block;
              }
              span {
                color: #000;
              }
              .code {
                background: #000;
              }
            }
          }
        }
      }
    }
    .f3 {
      @include commonCss(690px);
      @include commonTitle;
      & /deep/ .el-breadcrumb {
        float: right;
        margin-top: 22px;
      }
      .list {
        display: flex;
        flex-wrap: wrap;
        margin-top: 20px;
        dl {
          width: 275px;
          height: 285px;
          border-bottom: 1px solid #eee;
          border-right: 1px solid #eee;
          padding: 20px 0 0 20px;
          cursor: pointer;
          dd {
            width: 235px;
            height: 100px;
            overflow: hidden;
            img {
              width: 235px;
              height: 100px;
              border-radius: 4px;
              transition: all 1s ease;
              cursor: pointer;
              &:hover {
                transform: scale(1.5);
              }
            }
          }
          dt {
            p {
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
              font-size: 16px;
              color: #000;
              margin: 20px 0;
              font-weight: bold;
              width: 235px;
            }
            div {
              color: #999;
              font-size: 14px;
              padding: 0 10px;
              width: 235px;
              line-height: 18px;
            }
            span {
              color: #00997f;
              font-size: 14px;
              margin-top: 5px;
              padding-left: 10px;
              display: block;
              /deep/ i {
                font-size: 12px;
              }
            }
          }
          &.border0 {
            border-bottom: 0;
          }
        }
      }
    }
    .f4 {
      @include commonCss(170px);
      @include commonTitle;
      img {
        margin-top: 20px;
      }
    }
    .f5 {
      @include commonCss(auto);
      @include commonTitle;
      padding: 20px 20px;
      .top {
        border-bottom: 1px dashed #ccc;
        h1 {
          font-size: 18px;
          margin: 24px 0 12px 0;
          span {
            color: #ff0000;
          }
        }
        div {
          img {
            width: 200px;
            height: 140px;
            margin-right: 10px;
            border-radius: 6px;
            transition: all 0.5s ease;
            cursor: pointer;
            &:hover {
              box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
            }
          }
        }
        p {
          font-size: 14px;
          color: #666;
          margin-top: 18px;
          line-height: 18px;
        }
        h6 {
          height: 40px;
          font-size: 14px;
          color: #999;
          display: flex;
          align-items: center;
          margin: 25px 0;
          img {
            width: 34px;
            height: 34px;
            border: 2px solid #007aff;
            border-radius: 50%;
          }
          span {
            margin-left: 10px;
            &.text {
              color: #00997f;
            }
          }
        }
      }
      ul {
        li {
          height: 215px;
          border-bottom: 1px dashed #ccc;
          cursor: pointer;
          h3 {
            margin-top: 24px;
          }
          .box {
            display: flex;
            margin-top: 15px;
            position: relative;
            h4 {
              position: relative;
              width: 200px;
              overflow: hidden;
              img {
                width: 200px;
                height: 140px;
                border-radius: 4px;
              }
              button {
                position: absolute;
                top: 0;
                left: 0;
                background: #2db4db;
                outline: none;
                border: 1px solid #2db4db;
                color: #fff;
                padding: 4px;
                font-size: 14px;
              }
            }
            div {
              width: 635px;
              span {
                color: #999;
                display: block;
                margin: 20px 0 0 15px;
                font-size: 16px;
                line-height: 20px;
              }
              h6 {
                height: 40px;
                font-size: 14px;
                color: #999;
                display: flex;
                align-items: center;
                margin: 15px 0 25px 15px;
                img {
                  width: 34px;
                  height: 34px;
                  border: 2px solid #007aff;
                  border-radius: 50%;
                  margin-top: 10px;
                }
                span {
                  margin-left: 10px;
                  font-size: 14px;
                  &.text {
                    color: #00997f;
                  }
                }
              }
              .btn {
                position: absolute;
                bottom: 15px;
                right: 10px;
                background: #2db4db;
                outline: none;
                border: 1px solid #2db4db;
                color: #fff;
                padding: 4px 10px;
                font-size: 14px;
                border-radius: 4px;
              }
            }
          }
        }
      }
    }
  }
  .right {
    width: 280px;
    float: left;
    margin-left: 20px;
    overflow: hidden;
    .f2 {
      @include commonCss(auto);
      @include commonTitle;
      padding-bottom: 20px;
      ul {
        li {
          height: 38px;
          background: #f6f6f6;
          padding-left: 30px;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
          color: #333;
          font-size: 12px;
          margin-top: 12px;
          line-height: 38px;
          border-radius: 3px;
          position: relative;
          cursor: pointer;
          &::after {
            content: '';
            width: 3px;
            height: 3px;
            background: #333;
            position: absolute;
            top: 18px;
            left: 15px;
          }
        }
      }
    }
    .f3 {
      @include commonCss(552px);
      @include commonTitle;
      img {
        width: 242px;
        height: 110px;
        border-radius: 4px;
        margin-top: 20px;
      }
      ul {
        li {
          display: flex;
          height: 30px;
          align-items: center;
          justify-content: space-around;
          margin-top: 10px;
          span {
            display: block;
            width: 16px;
            height: 16px;
            line-height: 16px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            &.orage {
              background: #ff6600;
            }
            &.borow {
              background: #b1b1b1;
            }
          }
          p {
            width: 200px;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }
        }
      }
    }
    .f4 {
      @include commonCss(732px);
      @include commonTitle;
      & > img {
        width: 242px;
        height: 110px;
        border-radius: 4px;
        margin-top: 20px;
      }
      ul {
        margin-top: 20px;
        li {
          display: flex;
          margin-top: 10px;
          img {
            width: 70px;
            height: 60px;
          }
          p {
            font-size: 14px;
            color: #333;
            line-height: 16px;
            margin-left: 10px;
          }
        }
      }
    }
    .f5 {
      @include commonCss(495px);
      @include commonTitle;
      .text {
        p {
          font-size: 13px;
          margin-top: 15px;
          color: #666;
          strong {
            font-size: 13px;
            margin-right: 10px;
            color: #333;
            &.ac {
              color: #00997f;
            }
          }
        }
      }
    }
    .f6 {
      @include commonCss(214px);
      img {
        width: 240px;
        height: 170px;
        margin-top: 18px;
        border-radius: 4px;
      }
    }
  }
}
</style>
