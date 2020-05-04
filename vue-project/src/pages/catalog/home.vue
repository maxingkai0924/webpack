<template>
  <div class="containe">
    <div class="swiper-container">
       <el-carousel>
          <el-carousel-item name='12'>
            <img src="../../assets/images/1.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/2.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/3.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
        <div class="center-img">
          <div class="center-img-box">
            <img src="../../assets/images/1.jpg" alt="">
          </div>
          <div class="center-img-box">
            <img src="../../assets/images/2.jpg" alt="">
          </div>
        </div>
        <div class="center-log">
           <h6>我的名片</h6>
           <p>网名：Dacnes</p>
           <p>职业：Web前端工程师，研发部</p>
           <p>现居：山东省-济南市</p>
           <p>Email: 15210447815@163.com</p>
           <ul>
             <li>
               <img src="../../assets/images/c01.png" alt="">
             </li>
             <li>
               <img src="../../assets/images/c02.png" alt="">
             </li>
             <li>
               <img src="../../assets/images/c03.png" alt="">
             </li>
             <li>
               <img src="../../assets/images/c04.png" alt="">
             </li>
           </ul>
        </div>
    </div>
    <div class="content">
       <div class="left">
         <div class="f2">
            <ul class="tab">
              <template v-for="(item,index) in tabs">
                <li :class="{active:item.id===currentIndex}" :key='index' @click="hanldTabs(item)">{{item.name}}</li>
              </template>
            </ul>
            <div class="f2-content">
              <div>
                <img src="../../assets/images/1.jpg" alt="">
                <img src="../../assets/images/2.jpg" alt="">
              </div>
              <ul>
                <template v-for="(item,index) in contents">
                  <li :class="{active:index===contentsIndex}" :key='index' @mousemove="moveContents(index)" @mouseout="outContents(index)">
                    <p>
                      <span class="code">{{index+1}}</span>
                      <span>{{item.title}}</span>
                    </p>
                    <p class="text">{{item.content}}</p>
                  </li>
                </template>
              </ul>
            </div>
         </div>
         <div class="f3">
           <p class="title">精彩专题</p>
         </div>
         <div class="f4"></div>
         <div class="f5">
           <p class="title">最新博文</p>
         </div>
       </div>
       <div class="right">
         <div class="f2">
            <p class="title">网站公告</p>
            <ul>
              <template v-for="(item,index) in contents">
                 <li :key='index'>{{item.content}}</li>
              </template>
            </ul>
         </div>
         <div class="f3">
           <p class="title">点击排行</p>
         </div>
         <div class="f4">
           <p class="title">站长推荐</p>
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
          title: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        },
        {
          title: '个人博客，属于自己的小世界',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        },
        {
          title: '个人博客，属于自己的小世界',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        },
        {
          title: '个人博客，属于自己的小世界',
          content: '个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界个人博客，属于自己的小世界'
        }
      ],
      contentsIndex: 0
    }
  },
  mounted () {
  },
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
  }
}
</script>

<style lang="scss" scoped >
  @mixin commonCss($width) {
    height:$width;
    background:#fff;
    border-radius:4px;
    margin-top:20px;
    padding:0 20px;
  }
  @mixin commonTitle {
    .title{
      height:60px;
      border-bottom:1px solid #e4e3e3;
      color:#333;
      line-height:80px;
      position: relative;
      &::after{
        content:'';
        width:60px;
        height:2px;
        background:#000;
        position: absolute;
        top:58px;
        left:0;
      }
    }
  }
  .swiper-container{
    overflow: hidden;
    & /deep/.el-carousel{
      border-radius:3px;
      width:615px;
      height:260px;
      float: left;
      /deep/ .el-carousel__container{
        height:260px;
      }
      img{
        width: 100%;
        display: block;
        height:260px;
      }
    }
    .center-img{
      width:270px;
      float:left;
      margin:0 19px 0 14px;
      .center-img-box:last-child{
          margin-top:8px;
      }
      img{
        width:270px;
        height:125px;
        border-radius:3px;
      }
    }
    .center-log{
      width:280px;
      height:260px;
      background:#2a2a2a;
      border-radius:4px;
      float: left;
      overflow: hidden;
      h6{
        font-size:20px;
        color:#838993;
        margin:17px 0 0 10px;
      }
      p{
        font-size:12px;
        margin:17px 0 0 20px;
        color:#d0d2d4;
      }
      ul{
        overflow: hidden;
        li{
          float:left;
          width:52px;
          height:52px;
          border-radius:50%;
          text-align:center;
          border:1px solid #161616;
          margin:30px 0 0 10px;
          img{
            margin-top: 10px;
          }
        }
      }
    }
  }
  .content{
     overflow: hidden;
    .left{
      width:900px;
      float: left;
      .f2{
       @include commonCss(310px)
       .tab{
         height:60px;
         overflow: hidden;
         border-bottom:1px solid #e4e3e3;
         li{
           float:left;
           color:#333;
           height:59px;
           line-height:68px;
           padding:0 18px;
           cursor: pointer;
           &.active{
             border-bottom: 2px solid #333;
           }
         }
       }
       .f2-content{
         overflow: hidden;
          div{
            width:275px;
            float:left;
            img{
              width:275px;
              height:100px;
              display: block;
              margin-top:10px;
              border-radius:3px;
            }
          }
          ul{
            width:567px;
            float:left;
            margin-left: 16px;
            li{
              padding:8px 0 0 20px;
              margin-top:5px;
              cursor: pointer;
              p{
                color:#333;
                span{
                  width:480px;
                  display: inline-block;
                  font-size:14px;
                  overflow:hidden; //超出的文本隐藏
                  text-overflow:ellipsis; //溢出用省略号显示
                  white-space:nowrap; //溢出不换行
                  padding-left:15px;
                  &.code{
                    width:20px;
                    height:20px;
                    background:#9a9a9a;
                    color:#fff;
                    font-size:12px;
                    text-align:center;
                    line-height:20px;
                    padding:0;
                  }
                }
                &.text{
                  color:#333;
                  font-size:12px;
                  line-height:22px;
                  display: none;
                }
              }
              &.active{
                background:#f7f7f7;
                padding:8px 20px 10px 20px;
                .text{
                  display: block;
                }
                span{
                  color:#000;
                }
                .code{
                  background:#000;
                }
              }
            }
          }
       }
      }
      .f3{
         @include commonCss(690px);
         @include commonTitle;
      }
      .f4{
        @include commonCss(170px);
        @include commonTitle;
      }
      .f5{
        @include commonCss(500px);
        @include commonTitle;
      }
    }
    .right{
      width:280px;
      float: left;
      margin-left:20px;
      overflow: hidden;
      .f2{
        @include commonCss(310px);
        @include commonTitle
        ul{
          li{
            height:38px;
            background:#f6f6f6;
            padding-left:30px;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
            color:#333;
            font-size:12px;
            margin-top:12px;
            line-height:38px;
            border-radius:3px;
            position: relative;
            cursor: pointer;
            &::after{
              content:'';
              width:3px;
              height:3px;
              background:#333;
              position: absolute;
              top:18px;
              left: 15px;
            }
          }
        }
      }
      .f3{
         @include commonCss(552px);
         @include commonTitle;
      }
      .f4{
         @include commonCss(732px);
         @include commonTitle;
      }
    }
  }
</style>
