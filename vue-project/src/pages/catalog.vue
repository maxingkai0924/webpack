<template>
  <div class="containe">
    <div class="header">
      <ul class="nav">
        <template v-for="(item,index) in nav" >
          <li :key='index'>
            <a :href="item.url" :class="{active:index===currentIndex}">{{item.name}}</a>
          </li>
        </template>
      </ul>
    </div>
    <div class="center">
      <router-view/>
    </div>
    <div class="footer">
      <el-button @click='addNav()'>增加菜单</el-button>
    </div>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
export default {
  data () {
    return {
      name: 'catalog',
      currentIndex: 0
    }
  },
  watch: {
    $route: {
      handler (val) {
        this.currentIndex = val.meta.index
      },
      immediate: true
    }
  },
  computed: {
    ...mapState(['nav'])
  },
  methods: {
    ...mapMutations(['setNavlist']),
    addNav () {
      let obj = {
        url: '/',
        name: '关于我们'
      }
      this.setNavlist(obj)
    }
  }
}

</script>

<style lang="scss" scoped>
  .containe{
    .header{
      background:#2869ba;
      .nav{
        height:60px;
        width:1300px;
        margin: 0 auto;
        background: #2869ba;
        li{
          height:60px;
          float:left;
          a{
            padding: 0 30px;
            height:100%;
            line-height:60px;
            color:#fff;
            display: inline-block;
            transition:all 1s;
            &.active{
              background:rgba(0,0,0,0.1);
            }
            &:hover{
               background:rgba(0,0,0,0.1);
            }
          }
        }
      }
    }
  }
</style>
