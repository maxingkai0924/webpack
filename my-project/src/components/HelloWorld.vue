<template>
  <div class="hello">
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>
    <div>{{count}}</div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      active: 0,
      activeKey: 0
    }
  },
  methods: {
    ...mapMutations(['add']),
    ...mapActions(['addSync']),
    onClickLeft () {
      Toast('返回')
    },
    onClickRight () {
      Toast('按钮')
    }
  },
  computed: {
    ...mapState(['count']),
    ...mapGetters(['initCount'])
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: '/sdm/back/index/getMessage',
      data: {},
      maxRedirects: 10
    }).then((res) => {
      console.log(res)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
   .my-swipe .van-swipe-item {
     color: #fff;
     font-size: 20px;
     line-height: 150px;
     text-align: center;
     background-color: #39a9ed;
   }
</style>
