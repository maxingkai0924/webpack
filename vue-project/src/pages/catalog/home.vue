<template>
  <div class="box">
    <div class="swiper-container">
       <el-carousel>
          <el-carousel-item>
            <img src="../../assets/images/1.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/2.jpg" alt="">
          </el-carousel-item>
          <el-carousel-item>
            <img src="../../assets/images/3.jpg" alt="">
          </el-carousel-item>
        </el-carousel>
    </div>
    <div class="content"></div>
    <div class="zhanti"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'home'
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped >
  @mixin commonCss($width) {
    height:$width;
    background:#fff;
    border-radius:4px;
    margin-top:20px;
  }
  .swiper-container{
    & /deep/.el-carousel{
      width:615px;
      height:260px;
      /deep/ .el-carousel__container{
        height:260px;
      }
      img{
        width: 100%;
        display: block;
        height:260px;
      }
    }
  }
  .content{
    @include commonCss(310px)
  }
  .zhanti{
    @include commonCss(693px)
  }
</style>
