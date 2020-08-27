<template>
  <div class="containe">
    <div class="content">
      <div class="left">
        <div class="f4">
          <img src="../../assets/images/lm03.jpg" alt="网页制作" />
          <div>
            <h1>博客网站制作</h1>
            <p>
              一个人，越是有福气，越是善良；一个人，越是喜欢做善事，越是有福气。 生活中，一个人的善事，做的越多越有福气，坑人害人的事，不做更有福气。
              其实一个人的福气，都是从做人做事开始，该做的事就做，不该做的事就不做
            </p>
          </div>
        </div>
        <div class="f5">
          <p class="title">最新博文</p>
          <div class="top">
            <h1>
              <span>【顶】</span>
              别让这些闹心的套路，毁了你的网页设计
            </h1>
            <div>
              <img src="../../assets/images/b01.jpg" alt="" />
              <img src="../../assets/images/b02.jpg" alt="" />
              <img src="../../assets/images/b05.jpg" alt="" />
              <img src="../../assets/images/b04.jpg" alt="" />
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
          <div class="pagination"><el-pagination background layout="prev, pager, next" :total="1000"></el-pagination></div>
        </div>
      </div>
      <div class="right">
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
        <div class="f4">
          <p class="title">本栏推荐</p>
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
        <div class="f2">
          <p class="title">标签云</p>
          <div>
              <template v-for="(item,index) in btns">
                <button :key='index' :style='item.cols'>{{item.text}}</button>
              </template>
          </div>
         </div>
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
    width: 900px;
    float: left;
    .f4 {
      height: 140px;
      background: #fff;
      border-radius: 4px;
      margin-top: 20px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      img {
        width: 130px;
        height: 100px;
      }
      div {
        height: 100px;
        padding-left: 20px;
        h1 {
          font-size: 20px;
          margin-top: 6px;
        }
        p {
          font-size: 14px;
          color: #666;
          margin-top: 15px;
          line-height: 20px;
        }
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
    .pagination {
      text-align: center;
      margin: 20px 0;
    }
  }
  .right {
    width: 280px;
    float: left;
    margin-left: 20px;
    overflow: hidden;
    .f2 {
      @include commonCss(250px);
      @include commonTitle;
      div{
        margin-top:10px;
        button{
          color:#fff;
          font-size:14px;
          padding:6px 10px;
          outline: none;
          border:none;
          margin:10px 0 0 5px;
          border-radius:2px;
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
  }
}
</style>
